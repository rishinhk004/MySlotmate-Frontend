"use client";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { FiArrowLeft } from "react-icons/fi";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    id: 1,
    question: "I'm experiencing audio/video issues. What should I do?",
    answer:
      "First, check your internet connection and ensure both your camera and microphone are enabled. Try refreshing the page or restarting the app. If issues persist, clear your browser cache and try a different browser.",
  },
  {
    id: 2,
    question: "How do I troubleshoot connection problems?",
    answer:
      "Connection issues are often due to poor internet. Try moving closer to your WiFi router, closing other bandwidth-heavy applications, or switching to a wired connection if possible.",
  },
  {
    id: 3,
    question: "The app keeps crashing. How can I fix this?",
    answer:
      "Try updating the app to the latest version from your app store. If you're using web, clear your browser cache. Ensure your device has sufficient storage space available.",
  },
  {
    id: 4,
    question: "I can't find a feature. Where is it?",
    answer:
      "Check if you're using the latest version of the app. Features may have moved or been redesigned. Our support team can walk you through the interface.",
  },
];

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
        <Link
          href="/support"
          className="inline-flex items-center gap-2 text-[#0094CA] hover:text-[#007dab] mb-6 font-medium"
        >
          <FiArrowLeft className="h-5 w-5" />
          Back to Support
        </Link>

        {/* Header */}
        <div className="mb-12">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Technical Support
          </h1>
          <p className="text-gray-600">
            Get help with connection, audio/video, and app issues.
          </p>
        </div>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {faqItems.map((item) => (
              <div
                key={item.id}
                className="border border-gray-200 rounded-lg overflow-hidden bg-white hover:shadow-md transition"
              >
                <button
                  onClick={() => handleFAQToggle(item.id)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition"
                >
                  <span className="font-semibold text-gray-900 text-left">
                    {item.question}
                  </span>
                  <span className="text-[#0094CA] font-bold">
                    {expandedId === item.id ? "−" : "+"}
                  </span>
                </button>
                {expandedId === item.id && (
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Quick Fixes */}
        <section className="mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
            Quick Troubleshooting Tips
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: "🔄", title: "Restart", desc: "Close and reopen the app" },
              { icon: "📶", title: "Internet", desc: "Check your WiFi connection" },
              { icon: "🔌", title: "Permissions", desc: "Allow camera/mic access" },
              { icon: "🗑️", title: "Cache", desc: "Clear browser data" },
            ].map((tip, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
              >
                <div className="text-2xl mb-2">{tip.icon}</div>
                <h3 className="font-semibold text-gray-900">{tip.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{tip.desc}</p>
              </div>
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
