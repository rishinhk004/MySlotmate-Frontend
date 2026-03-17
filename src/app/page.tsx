"use client";
import * as components from "../components";
import { useState } from "react";
export default function HomePage() {
  const [mode, setMode] = useState("All");
  return (
    <main className="overflow-hidden flex min-h-screen flex-col gap-8 items-center justify-start bg-linear-to-b from-[#e4f8ff] to-white text-[#000000] pb-8">
      <components.Navbar />
      <components.Home.Hero />
      <components.Home.people />
      {/* Category Filter Pills */}
      <div className="flex justify-center w-full px-6 md:px-12 lg:px-20 mt-8">
        <div className="flex gap-3 flex-wrap justify-center">
          <button 
            onClick={() => setMode("All")} 
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              mode === "All" 
                ? "bg-[#0094CA] text-white" 
                : "bg-white border border-gray-200 text-gray-700 hover:border-[#0094CA]"
            }`}
          >
            <span className="flex items-center gap-2">🏠 All</span>
          </button>
          <button 
            onClick={() => setMode("Adventure")} 
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              mode === "Adventure" 
                ? "bg-[#0094CA] text-white" 
                : "bg-white border border-gray-200 text-gray-700 hover:border-[#0094CA]"
            }`}
          >
            <span className="flex items-center gap-2">⛰️ Adventure</span>
          </button>
          <button 
            onClick={() => setMode("Social")} 
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              mode === "Social" 
                ? "bg-[#0094CA] text-white" 
                : "bg-white border border-gray-200 text-gray-700 hover:border-[#0094CA]"
            }`}
          >
            <span className="flex items-center gap-2">🎉 Social</span>
          </button>
          <button 
            onClick={() => setMode("Wellness")} 
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              mode === "Wellness" 
                ? "bg-[#0094CA] text-white" 
                : "bg-white border border-gray-200 text-gray-700 hover:border-[#0094CA]"
            }`}
          >
            <span className="flex items-center gap-2">🧘 Wellness</span>
          </button>
        </div>
      </div>
      <components.Home.Trending />
      <components.Home.Banner />
      <components.Home.AllHosts />
      <components.Home.Idea/>
      <components.Home.Footer/>
    </main>
  );
}
