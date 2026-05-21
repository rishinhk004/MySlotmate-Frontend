import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Browse Experiences",
  description:
    "Browse and book unique experiences hosted by real people — workshops, city walks, coffee chats, adventures and more. Find your next moment on MySlotMate.",
  alternates: { canonical: "/experiences" },
  openGraph: {
    title: "Browse Experiences | MySlotMate",
    description:
      "Browse and book unique experiences hosted by real people near you. Find your next moment on MySlotMate.",
    url: "/experiences",
  },
};

export default function ExperiencesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
