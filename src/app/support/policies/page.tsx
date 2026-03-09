"use client";
import Link from "next/link";
import { useState } from "react";
import { FiArrowLeft, FiChevronDown } from "react-icons/fi";

interface PolicySection {
  id: number;
  title: string;
  icon: string;
  content: {
    heading: string;
    items: string[];
  }[];
}

const policySections: PolicySection[] = [
  {
    id: 1,
    title: "Booking Policies",
    icon: "📅",
    content: [
      {
        heading: "Booking Confirmation",
        items: [
          "Bookings are confirmed once payment is received",
          "You'll receive a confirmation email with slot details",
          "Cancellations must be made 24 hours before the experience",
          "Late cancellations may incur a cancellation fee",
        ],
      },
      {
        heading: "Rescheduling",
        items: [
          "Reschedule for free if done 48 hours in advance",
          "Limited reschedule options after 48 hours",
          "Contact our support team for urgent rescheduling needs",
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Cancellation Policy",
    icon: "🚫",
    content: [
      {
        heading: "Cancellation by Participant",
        items: [
          "Full refund if cancelled more than 48 hours before",
          "50% refund if cancelled 24-48 hours before",
          "No refund if cancelled less than 24 hours before",
          "Emergency cancellations may be eligible for refund",
        ],
      },
      {
        heading: "Host Cancellation",
        items: [
          "Host must provide at least 48 hours notice",
          "Participant receives full refund + 10% credit",
          "Emergency cancellations are handled case-by-case",
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Payout Schedule",
    icon: "💰",
    content: [
      {
        heading: "Earnings & Payouts",
        items: [
          "Earnings are calculated after 5% platform fee",
          "Payouts are processed every 7 days",
          "Minimum payout threshold is $25",
          "Direct bank transfer to your registered account",
        ],
      },
      {
        heading: "Payment Hold",
        items: [
          "Payments are held for 48 hours after experience",
          "This allows time for dispute resolution",
          "Review the holding window in your dashboard",
        ],
      },
    ],
  },
  {
    id: 4,
    title: "Host Responsibilities",
    icon: "🎯",
    content: [
      {
        heading: "During the Experience",
        items: [
          "Start the experience on time",
          "Maintain a safe and respectful environment",
          "Follow all community guidelines",
          "Be responsive to participant needs",
        ],
      },
      {
        heading: "Cancellation Penalties",
        items: [
          "Repeated cancellations may result in account suspension",
          "Last-minute cancellations affect your rating",
          "Provide valid reasons for cancellations",
        ],
      },
    ],
  },
];

export default function PoliciesPage() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const handleToggle = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
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
            Policies & Guidelines
          </h1>
          <p className="text-gray-600">
            Understand our booking, cancellation, and payout policies to host with
            confidence.
          </p>
        </div>

        {/* Policy Sections */}
        <div className="space-y-4">
          {policySections.map((section) => (
            <div
              key={section.id}
              className="border border-gray-200 rounded-xl overflow-hidden bg-white hover:shadow-md transition"
            >
              <button
                onClick={() => handleToggle(section.id)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{section.icon}</span>
                  <span className="font-semibold text-gray-900 text-lg">
                    {section.title}
                  </span>
                </div>
                <FiChevronDown
                  className={`h-5 w-5 text-gray-400 transition-transform ${
                    expandedId === section.id ? "transform rotate-180" : ""
                  }`}
                />
              </button>

              {expandedId === section.id && (
                <div className="px-6 py-6 bg-gray-50 border-t border-gray-200 space-y-6">
                  {section.content.map((subsection, idx) => (
                    <div key={idx}>
                      <h3 className="font-semibold text-gray-900 mb-3">
                        {subsection.heading}
                      </h3>
                      <ul className="space-y-2">
                        {subsection.items.map((item, itemIdx) => (
                          <li
                            key={itemIdx}
                            className="flex items-start gap-3 text-gray-700"
                          >
                            <span className="text-[#0094CA] font-bold mt-0.5">
                              •
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Important Notice */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="font-semibold text-gray-900 mb-2">📌 Important Notice</h3>
          <p className="text-gray-700 text-sm leading-relaxed">
            These policies are designed to protect both hosts and participants. For
            specific situations or exceptions, please contact our support team. All
            policies are subject to change with 30 days' notice.
          </p>
        </div>

        {/* Need Help Section */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">
            Can't find the answer you're looking for?
          </p>
          <Link
            href="/support"
            className="inline-block px-6 py-3 bg-[#0094CA] text-white font-semibold rounded-lg hover:bg-[#007dab] transition"
          >
            Go Back to Support
          </Link>
        </div>
      </main>
    </div>
  );
}
