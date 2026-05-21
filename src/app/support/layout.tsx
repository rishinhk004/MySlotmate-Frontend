import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Help & Support",
  description:
    "MySlotMate help and support. Find answers about bookings, hosting, payments, and your account, or get in touch with our team.",
  alternates: { canonical: "/support" },
  openGraph: {
    title: "Help & Support | MySlotMate",
    description:
      "Find answers about bookings, hosting, payments, and your account on MySlotMate.",
    url: "/support",
  },
};

export default function SupportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
