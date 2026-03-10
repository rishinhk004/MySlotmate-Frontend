"use client";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { FiArrowLeft, FiSearch } from "react-icons/fi";

interface CommonTopic {
  id: number;
  logo:string;
  title: string;
  description: string;
}
const commonTopics: CommonTopic[] = [
  {
    id: 1,
    logo: "/assets/support/video_camera_front.svg",
    title: "Session & Meeting",
    description: "Audio/video quality, connection drops, and recording issues.", 
  },
  {
    id: 2,  
    logo: "/assets/support/calendar_today.svg",
    title: "Booking Problems",
    description: "Calendar sync errors, double bookings, and cancellations.",
  },
  {
    id: 3,
    logo: "/assets/support/currency_rupee_circle.svg",
    title: "Payment & Payout",
    description: "Withdrawal delays, tax documents, and invoice disputes.",
  },
  {
    id: 4,
    logo: "/assets/support/space_dashboard.svg",
    title: "Dashboard Errors",
    description: "Login issues, broken analytics, or interface bugs.",
  }];
const CommonTopicsCard=({ topic }: { topic: CommonTopic })=>{
  return (
    <div className="flex flex-col items-start justify-start gap-3 bg-[#ffffff] shadow-sm shadow-[#6d6d6d6b] rounded-lg p-4 w-full">
      <div className="flex flex-col items-start justify-center gap-2">
        <img src={topic.logo} alt={`${topic.title} logo`} className="w-8 h-8" />
        <h3 className="text-md sm:text-lg font-semibold text-gray-900">{topic.title}</h3>
      </div>
      <p className="text-gray-500 text-sm">{topic.description}</p>
    </div>
  )
}

export default function TechnicalSupportPage() {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [contactDetails, setContactDetails] = useState({
    name: "",
    email: "",
    issue: "",
  });

  const handleFAQToggle = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Your request has been submitted. We'll get back to you soon!");
    setContactDetails({ name: "", email: "", issue: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#e4f8ff] to-white">
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-4xl mx-auto w-full">
        {/* Back Button */}
        <div className="flex flex-row items-center justify-start gap-2 mb-12">
          <Link
            href="/support"
            className="inline-flex items-center gap-2 text-[#717171] font-medium"
          >
            Support & Safety&gt;
          </Link>
          <span className="text-[#000000] text-sm font-medium">Technical Support</span>
        </div>
        {/* Header */}
        <div className="mb-12 flex flex-col items-center gap-2 justify-center">
          <h1 className="text-2xl sm:text-4xl font-semibold text-gray-900 mb-2">
            How can we help you today?
          </h1>
          <p className="text-gray-400">
            Find answers, troubleshoot issues, or connect with our specialized support team for hosts.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-row items-center justify-center bg-[#ffffff] shadow-sm shadow-[#6d6d6d6b] rounded-full w-full md:w-[80%] lg:w-[60%]">
            <FiSearch color="#0094CA" size={20} className="ml-3" />
            <input type="text" placeholder="Search for articles, errors or anything you need..." className="rounded-lg py-2 px-4 text-[#474956] border-0 bg-transparent outline-0 w-full" />
          </div>
        </div>
        <section>
          <h2 className="text-[#000000] font-semibold text-md sm:text-xl">
            Common Topics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
            {commonTopics.map((topic) => (
              <CommonTopicsCard key={topic.id} topic={topic} />
            ))} 
          </div>
        </section>
        {/* Contact Support Form */}
        <section>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
            Still Having Issues?
          </h2>
          <div className="bg-white rounded-xl border border-gray-200 shadow-md p-6 sm:p-8">
            <form onSubmit={handleContactSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={contactDetails.name}
                  onChange={(e) =>
                    setContactDetails({ ...contactDetails, name: e.target.value })
                  }
                  placeholder="Your name"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0094CA] focus:ring-1 focus:ring-[#0094CA]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={contactDetails.email}
                  onChange={(e) =>
                    setContactDetails({ ...contactDetails, email: e.target.value })
                  }
                  placeholder="your@email.com"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0094CA] focus:ring-1 focus:ring-[#0094CA]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Issue Description
                </label>
                <textarea
                  value={contactDetails.issue}
                  onChange={(e) =>
                    setContactDetails({ ...contactDetails, issue: e.target.value })
                  }
                  placeholder="Describe your technical issue in detail"
                  rows={4}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-[#0094CA] focus:ring-1 focus:ring-[#0094CA] resize-none"
                  required
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-[#0094CA] text-white font-semibold rounded-lg hover:bg-[#007dab] transition"
                >
                  Submit Request
                </button>
                <Link
                  href="/support"
                  className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-gray-400 transition"
                >
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
