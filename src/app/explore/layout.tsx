import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Explore Experiences by Mood",
  description:
    "Explore experiences by mood and interest. Discover curated activities and hosts near you, and book real-life moments that match how you feel — on MySlotMate.",
  alternates: { canonical: "/explore" },
  openGraph: {
    title: "Explore Experiences by Mood | MySlotMate",
    description:
      "Discover curated activities and hosts near you, and book real-life moments that match how you feel.",
    url: "/explore",
  },
};

export default function ExploreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
