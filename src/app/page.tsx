"use client";
import * as components from "../components";
import { useState } from "react";
export default function HomePage() {
  const [mode, setMode] = useState("All");
  return (
    <main className="overflow-hidden flex min-h-screen flex-col items-center justify-center bg-linear-to-b from-[#e4f8ff] to-[rgba(0, 148, 202, 0)] text-[#000000]">
      <components.Home.Hero />
      <components.Home.people />
      <div className="flex flex-col items-center justify-center w-full mt-8">
        <div className="flex flex-row text-[#000000] bg-[#d2f0fb9b] items-center justify-around gap-2 w-[100%] md:w-[50%] p-2 rounded-full">
          <button onClick={() => setMode("All")} className={`p-4 px-8 rounded-2xl shadow-olive-800`} style={{ background: `${mode === "All" ? "linear-gradient(90deg,#0094CA,#D5F4FF)" : "#ccddff"}` }}>All</button>
          <button onClick={() => setMode("Adventure")} className="p-4 px-8 rounded-2xl shadow-olive-800" style={{ background: `${mode === "Adventure" ? "linear-gradient(90deg,#0094CA,#D5F4FF)" : "#ccddff"}` }}>Adventure</button>
          <button onClick={() => setMode("Social")} className="p-4 px-8 rounded-2xl shadow-olive-800" style={{ background: `${mode === "Social" ? "linear-gradient(90deg,#0094CA,#D5F4FF)" : "#ccddff"}` }}>Social</button>
          <button onClick={() => setMode("Wellness")} className="p-4 px-8 rounded-2xl shadow-olive-800" style={{ background: `${mode === "Wellness" ? "linear-gradient(90deg,#0094CA,#D5F4FF)" : "#ccddff"}` }}>Wellness</button>
        </div>
      </div>
      <components.Home.Trending />
      <components.Home.Banner />
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Find People Like you</h2>
            <button className="text-sm px-3 py-1 rounded">See More</button>
          </div>

          <div className="overflow-x-auto overflow-y-hidden -mx-4 px-4">
            <div className="inline-flex gap-4 items-stretch w-max snap-x snap-mandatory">
              <components.Home.TrendingCard title="Hiking" imageUrl="/assets/home/hiking.jpg" pricing="$50" />
              <components.Home.TrendingCard title="Dining" imageUrl="/assets/home/dining.png" pricing="$30" />
              <components.Home.TrendingCard title="An Evening of Jazz" imageUrl="/assets/home/jazz.png" pricing="$40" />
              <components.Home.TrendingCard title="Pottery" imageUrl="/assets/home/pottery.png" pricing="$35" />
              <components.Home.TrendingCard title="Hiking" imageUrl="/assets/home/hiking.jpg" pricing="$50" />
              <components.Home.TrendingCard title="Dining" imageUrl="/assets/home/dining.png" pricing="$30" />
              <components.Home.TrendingCard title="An Evening of Jazz" imageUrl="/assets/home/jazz.png" pricing="$40" />
              <components.Home.TrendingCard title="Pottery" imageUrl="/assets/home/pottery.png" pricing="$35" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
