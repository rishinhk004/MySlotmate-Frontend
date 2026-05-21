import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Stories & Guides",
  description:
    "Stories, tips, and guides from MySlotMate — on hosting experiences, discovering activities, and making the most of your time with the people around you.",
  alternates: { canonical: "/blogs" },
  openGraph: {
    title: "Blog — Stories & Guides | MySlotMate",
    description:
      "Tips, stories, and guides on hosting experiences and discovering activities with MySlotMate.",
    url: "/blogs",
  },
};

export default function BlogsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
