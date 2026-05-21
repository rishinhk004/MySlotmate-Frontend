import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Become a Host",
  description:
    "Become a host on MySlotMate. Share your skills, run experiences, and earn doing what you love. Set your own schedule and start hosting in minutes.",
  alternates: { canonical: "/become-host" },
  openGraph: {
    title: "Become a Host | MySlotMate",
    description:
      "Share your skills, run experiences, and earn doing what you love. Start hosting on MySlotMate.",
    url: "/become-host",
  },
};

export default function BecomeHostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
