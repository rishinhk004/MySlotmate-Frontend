"use client";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { FiArrowLeft } from "react-icons/fi";

export default function ReportIssuePage() {
  const [formData, setFormData] = useState({
    issueType: "behavioral",
    participantName: "",
    description: "",
    date: "",
    evidence: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Report submitted successfully. Our team will review it shortly.");
    setFormData({
      issueType: "behavioral",
      participantName: "",
      description: "",
      date: "",
      evidence: "",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#e4f8ff] to-white">
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-4xl mx-auto w-full">
        {/* Back Button */}
        <Link
          href="/support"
          className="inline-flex items-center gap-2 text-[#0094CA] hover:text-[#007dab] mb-6 font-medium"
        >
          <FiArrowLeft className="h-5 w-5" />
          Back to Support
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Report a Participant
          </h1>
          <p className="text-gray-600">
            Flag behavioral issues, harassment, or violations of community guidelines.
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-md p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Issue Type */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Type of Issue
              </label>
              <select
                name="issueType"
                value={formData.issueType}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0094CA] focus:ring-1 focus:ring-[#0094CA]"
              >
                <option value="behavioral">Behavioral Misconduct</option>
                <option value="harassment">Harassment or Abuse</option>
                <option value="safety">Safety Concern</option>
                <option value="fraud">Fraud or Deception</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Participant Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Participant's Name
              </label>
              <input
                type="text"
                name="participantName"
                value={formData.participantName}
                onChange={handleChange}
                placeholder="Full name of the participant"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0094CA] focus:ring-1 focus:ring-[#0094CA]"
                required
              />
            </div>

            {/* Date of Incident */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Date of Incident
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0094CA] focus:ring-1 focus:ring-[#0094CA]"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Provide detailed information about what happened"
                rows={5}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0094CA] focus:ring-1 focus:ring-[#0094CA] resize-none"
                required
              />
            </div>

            {/* Evidence */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Supporting Evidence
              </label>
              <textarea
                name="evidence"
                value={formData.evidence}
                onChange={handleChange}
                placeholder="Screenshots, messages, or other supporting information"
                rows={4}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0094CA] focus:ring-1 focus:ring-[#0094CA] resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-[#0094CA] text-white font-semibold rounded-lg hover:bg-[#007dab] transition"
              >
                Submit Report
              </button>
              <Link
                href="/support"
                className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-gray-400 transition"
              >
                Cancel
              </Link>
            </div>
          </form>

          {/* Info Box */}
          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>Privacy Notice:</strong> Your report will be kept confidential and
              reviewed by our trust & safety team within 24 hours. We take all reports
              seriously and will take appropriate action.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
