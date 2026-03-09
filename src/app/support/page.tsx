"use client";
import Link from "next/link";
import React from "react";

interface AssistCard {
  title: string;
  logo?: string;
  description: string;
  action: {
    label: string;
    href: string;
  };
}

const AssistCardComponent: React.FC<AssistCard> = ({
  title,
  logo,
  description,
  action,
}) => {
  return (
    <div className="flex flex-col items-start justify-start bg-[#ffffff] shadow-md rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow h-full w-full">
      {logo && <div className="mb-3 text-2xl">{logo}</div>}
      <h2 className="font-semibold text-base text-gray-900">{title}</h2>
      <p className="text-sm text-[#6B7280] mt-3 flex-grow leading-relaxed">{description}</p>
      <Link
        className="text-[#0094CA] font-medium hover:text-[#007dab] transition mt-auto pt-4"
        href={action.href}
      >
        {action.label} →
      </Link>
    </div>
  );
};

const SupportPage = () => {
  // Example cards data
  const assistCards: AssistCard[] = [
    {
      title: "Report a Participant",
      description:
        "Flag behavioral issues, harassment or violations of community guidelines immediately.",
      action: {
        label: "Report Issue",
        href: "/support/report",
      },
    },
    {
      title: "Technical Support",
      description:
        "Help with audio, video, connection problems, or app glitches during your hosting.",
      action: {
        label: "Get tech help",
        href: "/support/technical",
      },
    },
    {
      title: "Policy Help",
      description:
        "Clarifications on booking rules, cancellation policies, and payout schedules.",
      action: {
        label: "View Policies",
        href: "/support/policies",
      },
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#e4f8ff] to-white">
      <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-7xl mx-auto w-full">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Support & Safety
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              We're here to help you host with confidence
            </p>
          </div>
          <Link
            href="/support/tickets"
            className="px-4 py-2 text-sm font-medium bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition self-start sm:self-auto"
          >
            All tickets raised
          </Link>
        </div>

        {/* Emergency SOS Section */}
        <div className="mb-12 rounded-xl border-2 border-orange-200 bg-white shadow-md overflow-hidden">
          <div className="flex flex-col p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-[#EA580C] mb-4">
              🚨 Emergency SOS
            </h2>
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Need immediate help during a live session?
                </h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  Our specialized trust & safety team is on standby 24/7 to
                  assist you with urgent situations.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <button className="px-6 py-2.5 bg-[#0094CA] text-white font-medium rounded-lg hover:bg-[#007dab] transition text-sm">
                  Contact Trust & Safety
                </button>
                <button className="px-6 py-2.5 bg-white text-gray-800 font-medium border-2 border-gray-300 rounded-lg hover:border-[#0094CA] hover:text-[#0094CA] transition text-sm">
                  Local Emergency Services
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* How can we assist you Section */}
        <div className="mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
            How can we assist you?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {assistCards.map((card, index) => (
              <AssistCardComponent key={index} {...card} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SupportPage;