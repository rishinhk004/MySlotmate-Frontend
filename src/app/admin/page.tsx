"use client";

import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "~/utils/firebase";
import { Navbar } from "~/components";
import Link from "next/link";
import { FiArrowLeft, FiDownload, FiCheckCircle, FiXCircle, FiAlertCircle } from "react-icons/fi";
import { LuLoader2 } from "react-icons/lu";
import { toast } from "sonner";
import {
  usePendingHostApplications,
  useApproveHostApplication,
  useRejectHostApplication,
} from "~/hooks/useApi";
import { env } from "~/env";
import type { HostDTO } from "~/lib/api";

export default function AdminPage() {
  const [user] = useAuthState(auth);
  const [idToken, setIdToken] = useState<string | null>(null);
  const [selectedApp, setSelectedApp] = useState<HostDTO | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [isDeciding, setIsDeciding] = useState(false);

  // Check if user is admin
  const isAdmin =
    !!user?.email &&
    user.email.toLowerCase() === String(env.NEXT_PUBLIC_ADMIN_EMAIL ?? "").toLowerCase();

  // Get Firebase ID token for admin requests
  useEffect(() => {
    if (user) {
      void user.getIdToken().then((token) => {
        setIdToken(token);
        console.log("🔑 Firebase ID Token obtained");
      });
    }
  }, [user]);

  // Debug: Log admin check
  useEffect(() => {
    console.log("👤 User email:", user?.email);
    console.log("🔐 Expected admin email:", env.NEXT_PUBLIC_ADMIN_EMAIL);
    console.log("✅ Is Admin:", isAdmin);
  }, [user, isAdmin]);

  // Fetch pending applications
  const { data: applications, isLoading, refetch, error } = usePendingHostApplications(idToken);

  // Debug: Log pending applications
  useEffect(() => {
    console.log("📋 Pending applications:", applications);
    if (error) {
      console.error("❌ Error fetching applications:", error);
    }
  }, [applications, error]);
  const approveAppMutation = useApproveHostApplication();
  const rejectAppMutation = useRejectHostApplication();

  if (!user) {
    return (
      <>
        <Navbar />
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Admin Access Required</h1>
          <p className="max-w-md text-gray-500">Please log in to access the admin panel.</p>
          <Link href="/" className="rounded-full bg-[#0094CA] px-8 py-3 text-sm font-semibold text-white transition hover:bg-[#007dab]">
            Go Home
          </Link>
        </div>
      </>
    );
  }

  if (!isAdmin) {
    return (
      <>
        <Navbar />
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
          <h1 className="text-2xl font-bold text-gray-900">Access Denied</h1>
          <p className="max-w-md text-gray-500">You do not have permission to access this page.</p>
          <Link href="/" className="rounded-full bg-[#0094CA] px-8 py-3 text-sm font-semibold text-white transition hover:bg-[#007dab]">
            Go Home
          </Link>
        </div>
      </>
    );
  }

  const handleApprove = async (app: HostDTO) => {
    if (!idToken) {
      toast.error("Authentication failed. Please refresh the page.");
      return;
    }

    setIsDeciding(true);
    try {
      await approveAppMutation.mutateAsync({ hostId: app.id, idToken });
      toast.success(`✅ Approved ${app.first_name} ${app.last_name}`);
      setSelectedApp(null);
      await refetch();
    } catch (err) {
      console.error("Approval failed:", err);
      toast.error("Failed to approve application");
    } finally {
      setIsDeciding(false);
    }
  };

  const handleReject = async (app: HostDTO) => {
    if (!idToken) {
      toast.error("Authentication failed. Please refresh the page.");
      return;
    }

    setIsDeciding(true);
    try {
      await rejectAppMutation.mutateAsync({
        hostId: app.id,
        idToken,
        reason: rejectReason || undefined,
      });
      toast.success(`❌ Rejected ${app.first_name} ${app.last_name}`);
      setSelectedApp(null);
      setRejectReason("");
      await refetch();
    } catch (err) {
      console.error("Rejection failed:", err);
      toast.error("Failed to reject application");
    } finally {
      setIsDeciding(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Host Applications</h1>
              <p className="mt-1 text-gray-600">Review and manage pending host applications</p>
            </div>
            <Link
              href="/"
              className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-gray-900 border border-gray-200 hover:bg-gray-50 transition"
            >
              <FiArrowLeft size={16} />
              Back Home
            </Link>
          </div>

          {/* Applications List */}
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <LuLoader2 className="h-8 w-8 animate-spin text-[#0094CA]" />
            </div>
          ) : !applications || applications.length === 0 ? (
            <div className="rounded-lg border border-gray-200 bg-white p-12 text-center">
              <FiCheckCircle className="mx-auto h-12 w-12 text-green-500 mb-3" />
              <p className="text-lg font-medium text-gray-900">No Pending Applications</p>
              <p className="mt-1 text-gray-600">All host applications have been reviewed!</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {applications.map((app) => (
                <button
                  key={app.id}
                  onClick={() => setSelectedApp(app)}
                  className="rounded-lg border border-gray-200 bg-white p-6 text-left hover:border-[#0094CA] hover:shadow-md transition"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {app.first_name} {app.last_name}
                      </h3>
                      <div className="mt-2 space-y-1 text-sm text-gray-600">
                        <p>📍 {app.city}</p>
                        <p>📞 {app.phn_number}</p>
                        <p>✨ Experiences: {app.experience_desc}</p>
                        {app.moods && app.moods.length > 0 && (
                          <p>🎯 Moods: {app.moods.map((m) => m.charAt(0).toUpperCase() + m.slice(1)).join(", ")}</p>
                        )}
                      </div>
                    </div>
                    <span
                      className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
                        app.application_status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      <FiAlertCircle size={12} />
                      {app.application_status.toUpperCase()}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Application Detail Modal */}
        {selectedApp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl">
              {/* Header */}
              <div className="sticky top-0 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
                <h2 className="text-xl font-bold text-gray-900">
                  {selectedApp.first_name} {selectedApp.last_name}
                </h2>
                <button
                  onClick={() => {
                    setSelectedApp(null);
                    setRejectReason("");
                  }}
                  className="text-gray-400 hover:text-gray-600 transition"
                >
                  ✕
                </button>
              </div>

              {/* Content */}
              <div className="space-y-6 px-6 py-6">
                {/* Personal Info */}
                <div>
                  <h3 className="mb-3 font-semibold text-gray-900">Personal Information</h3>
                  <div className="grid gap-3 text-sm text-gray-600">
                    <p>
                      <span className="font-medium text-gray-900">Name:</span> {selectedApp.first_name} {selectedApp.last_name}
                    </p>
                    <p>
                      <span className="font-medium text-gray-900">Phone:</span> {selectedApp.phn_number}
                    </p>
                    <p>
                      <span className="font-medium text-gray-900">City:</span> {selectedApp.city}
                    </p>
                  </div>
                </div>

                {/* Experience Details */}
                <div>
                  <h3 className="mb-3 font-semibold text-gray-900">Experience Details</h3>
                  <div className="space-y-3 text-sm text-gray-600">
                    <p>
                      <span className="font-medium text-gray-900">Description:</span> {selectedApp.experience_desc}
                    </p>
                    {selectedApp.moods && selectedApp.moods.length > 0 && (
                      <p>
                        <span className="font-medium text-gray-900">Moods:</span>{" "}
                        {selectedApp.moods.map((m) => m.charAt(0).toUpperCase() + m.slice(1)).join(", ")}
                      </p>
                    )}
                    {selectedApp.preferred_days && selectedApp.preferred_days.length > 0 && (
                      <p>
                        <span className="font-medium text-gray-900">Preferred Days:</span>{" "}
                        {selectedApp.preferred_days.map((d) => d.toUpperCase()).join(", ")}
                      </p>
                    )}
                    {selectedApp.group_size && (
                      <p>
                        <span className="font-medium text-gray-900">Group Size:</span> Up to {selectedApp.group_size} people
                      </p>
                    )}
                  </div>
                </div>

                {/* Bio */}
                {selectedApp.description && (
                  <div>
                    <h3 className="mb-3 font-semibold text-gray-900">About</h3>
                    <p className="text-sm text-gray-600">{selectedApp.description}</p>
                  </div>
                )}

                {/* Government ID */}
                {selectedApp.government_id_url && (
                  <div>
                    <h3 className="mb-3 font-semibold text-gray-900">Government ID</h3>
                    <a
                      href={selectedApp.government_id_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg bg-[#0094CA] px-4 py-2 text-sm font-semibold text-white hover:bg-[#007dab] transition"
                    >
                      <FiDownload size={16} />
                      View Document
                    </a>
                  </div>
                )}

                {/* Reject Reason */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-900">
                    Rejection Reason (if rejecting)
                  </label>
                  <textarea
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                    placeholder="Enter reason for rejection (optional)"
                    rows={3}
                    className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:border-[#0094CA] focus:ring-1 focus:ring-[#0094CA]"
                  />
                </div>

                {/* Actions */}
                <div className="flex gap-3 border-t border-gray-200 pt-6">
                  <button
                    onClick={() => handleReject(selectedApp)}
                    disabled={isDeciding}
                    className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-red-100 px-4 py-3 font-semibold text-red-700 hover:bg-red-200 transition disabled:opacity-50"
                  >
                    {isDeciding ? (
                      <>
                        <LuLoader2 className="h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <FiXCircle size={18} />
                        Reject
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => handleApprove(selectedApp)}
                    disabled={isDeciding}
                    className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-green-100 px-4 py-3 font-semibold text-green-700 hover:bg-green-200 transition disabled:opacity-50"
                  >
                    {isDeciding ? (
                      <>
                        <LuLoader2 className="h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <FiCheckCircle size={18} />
                        Approve
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
