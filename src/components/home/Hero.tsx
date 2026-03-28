"use client";
import React, { useRef, useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import HeroCard from "./HeroCard";
import { useListPublicEvents } from "~/hooks/useApi";
import { type EventDTO } from "~/lib/api";

interface HeroProps {
    filterBarRef?: React.RefObject<HTMLDivElement | null>;
}

const Hero: React.FC<HeroProps> = ({ filterBarRef }) => {
    const heroRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const [hoveredButton, setHoveredButton] = useState<"book" | "list" | null>(null);
    const [hostId, setHostId] = useState<string | null>(null);
    const { data: events } = useListPublicEvents();
    
    useEffect(() => {
        const id = localStorage.getItem("msm_host_id");
        setHostId(id);
    }, []);
    
    // Get 3 random future events
    const randomFutureEvents: EventDTO[] = useMemo<EventDTO[]>(() => {
        if (!events) return [];
        
        const now = new Date();
        const futureEvents = events.filter((event) => {
            const eventDate = new Date(event.time);
            return eventDate > now;
        });
        
        if (futureEvents.length === 0) return [];
        
        // Shuffle and return 3 random events
        const shuffled = [...futureEvents].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, 3);
    }, [events]);
    
    const handleBookTime = () => {
        if (filterBarRef?.current) {
            filterBarRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
        } else {
            router.push("/experiences");
        }
    };
    
    const handleListTime = () => {
        if (hostId) {
            router.push("/host-dashboard/experiences");
        } else {
            router.push("/become-host");
        }
    };


    return (
        <div 
            ref={heroRef}
            className="relative w-full overflow-hidden"
        >

            {/* Content Layer */}
            <div className="relative z-10 py-[5rem] site-x w-full justify-around gap-[3rem] items-center flex flex-col lg:flex-row text-[#000000]">
                <div className="flex flex-col scale-100 lg:scale-150">
                    <h1 className="text-2xl font-bold text-center lg:text-left">
                        Book People&apos;s<br />
                        <span className="text-[#0094CA]">Time.</span>
                    </h1>
                    <p className="text-sm text-center text-[#606060] lg:text-left mb-4">
                        Pick an interest. Meet someone who shares it.
                    </p>
                    <div className="flex flex-row gap-6 justify-start items-center text-semibold">
                        <button 
                            onClick={handleBookTime}
                            onMouseEnter={() => setHoveredButton("book")}
                            onMouseLeave={() => setHoveredButton(null)}
                            className={`w-[45%] lg:w-auto lg:px-6 rounded-md mt-2 p-2 transition-all duration-300 ease-out hover:-translate-y-1 text-sm ${
                                hoveredButton === "list"
                                    ? "bg-[#ffffff] text-[#231F20] border border-[#BBBBBB]"
                                    : "bg-[#0094CA] text-[#ffffff]"
                            }`}
                        >
                            Book Time
                        </button>
                        <button 
                            onClick={handleListTime}
                            onMouseEnter={() => setHoveredButton("list")}
                            onMouseLeave={() => setHoveredButton(null)}
                            className={`w-[45%] lg:w-auto lg:px-6 rounded-md mt-2 p-2 transition-all duration-300 ease-out hover:-translate-y-1 text-sm ${
                                hoveredButton === "list"
                                    ? "bg-[#0094CA] text-[#ffffff]"
                                    : "bg-[#ffffff] text-[#231F20] border border-[#BBBBBB]"
                            }`}
                        >
                            List Time
                        </button>
                    </div>
                    
                    <div className="flex flex-row justify-center items-center lg:justify-start mt-4">
                        <div className="flex -space-x-2">
                            <div className="h-[1.5rem] w-[1.5rem] rounded-full bg-[#EEEEEE] border border-[#ffffff]"><img className="rounded-full" src="/assets/home/profile1.png" alt="P1"/></div>
                            <div className="h-[1.5rem] w-[1.5rem] rounded-full bg-[#EEEEEE] border border-[#ffffff]"><img className="rounded-full" src="/assets/home/profile2.png" alt="P2"/></div>
                            <div className="h-[1.5rem] w-[1.5rem] rounded-full bg-[#EEEEEE] border border-[#ffffff]"><img className="rounded-full" src="/assets/home/profile3.png" alt="P3"/></div>
                            <div className="h-[1.5rem] w-[1.5rem] rounded-full bg-[#EEEEEE] border border-[#ffffff] text-[#000000] text-[0.5rem] flex items-center justify-center"><span>+10K</span></div>
                        </div>
                        <p className="text-[0.5rem] text-[#8E8E8E] ml-2">Used by interesting people</p>
                    </div>
                </div>

                <div className='group relative isolate flex flex-col items-center justify-center gap-4 lg:gap-0'>
                    <div
                        className="pointer-events-none absolute inset-[-8rem] -z-0 rounded-lg opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100"
                        style={{
                            backgroundImage:
                                "radial-gradient(circle at center, rgba(255, 182, 193, 0.15) 0%, rgba(255, 192, 203, 0.08) 34%, rgba(255, 200, 210, 0) 82%), linear-gradient(to right, rgba(240, 200, 210, 0.4) 1px, transparent 1px), linear-gradient(to bottom, rgba(240, 200, 210, 0.4) 1px, transparent 1px)",
                            backgroundSize: "100% 100%, 60px 60px, 60px 60px",
                            backgroundPosition: "center, center, center",
                            maskImage: "radial-gradient(circle at center, rgba(0, 0, 0, 0.95) 14%, rgba(0, 0, 0, 0.55) 52%, rgba(0, 0, 0, 0.2) 72%, rgba(0, 0, 0, 0) 100%)",
                            WebkitMaskImage: "radial-gradient(circle at center, rgba(0, 0, 0, 0.95) 14%, rgba(0, 0, 0, 0.55) 52%, rgba(0, 0, 0, 0.2) 72%, rgba(0, 0, 0, 0) 100%)",
                        }}
                    />
                    {randomFutureEvents && randomFutureEvents.length > 0 ? (
                        <>
                            <div className="relative z-10 origin-bottom-right transition-transform duration-500 ease-out lg:translate-x-[10rem] lg:translate-y-[1rem] lg:group-hover:rotate-[7deg]">
                                <HeroCard 
                                    id={randomFutureEvents[0]!.id}
                                    photo={randomFutureEvents[0]!.cover_image_url ?? "/assets/home/heropic1.png"} 
                                    type={randomFutureEvents[0]!.mood ?? "Adventure"} 
                                    title={randomFutureEvents[0]!.title} 
                                    description={randomFutureEvents[0]!.hook_line ?? "..."} 
                                    duration={`${randomFutureEvents[0]!.duration_minutes ?? 0} mins`}
                                />
                            </div>
                            <div className="relative z-10 origin-center transition-transform duration-500 ease-out lg:group-hover:-rotate-[7deg]">
                                <HeroCard 
                                    id={randomFutureEvents[1]?.id}
                                    photo={randomFutureEvents[1]?.cover_image_url ?? "/assets/home/heropic2.png"} 
                                    type={randomFutureEvents[1]?.mood ?? "Adventure"} 
                                    title={randomFutureEvents[1]?.title ?? "Coming Soon"} 
                                    description={randomFutureEvents[1]?.hook_line ?? "..."} 
                                    duration={`${randomFutureEvents[1]?.duration_minutes ?? 0} mins`}
                                />
                            </div>
                            <div className="relative z-10 origin-top-left transition-transform duration-500 ease-out lg:translate-x-[10rem] lg:translate-y-[-1rem] lg:group-hover:rotate-[7deg]">
                                <HeroCard 
                                    id={randomFutureEvents[2]?.id}
                                    photo={randomFutureEvents[2]?.cover_image_url ?? "/assets/home/heropic3.png"} 
                                    type={randomFutureEvents[2]?.mood ?? "Chill"} 
                                    title={randomFutureEvents[2]?.title ?? "Coming Soon"} 
                                    description={randomFutureEvents[2]?.hook_line ?? "..."} 
                                    duration={`${randomFutureEvents[2]?.duration_minutes ?? 0} mins`}
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="relative z-10 origin-bottom-right transition-transform duration-500 ease-out lg:translate-x-[10rem] lg:translate-y-[1rem] lg:group-hover:rotate-[7deg]">
                                <HeroCard photo="/assets/home/heropic1.png" type="Adventure" title="Mountain Trekking" description="..." duration="2 days" />
                            </div>
                            <div className="relative z-10 origin-center transition-transform duration-500 ease-out lg:group-hover:-rotate-[7deg]">
                                <HeroCard photo="/assets/home/heropic2.png" type="Adventure" title="Scuba Diving" description="..." duration="1 day" />
                            </div>
                            <div className="relative z-10 origin-top-left transition-transform duration-500 ease-out lg:translate-x-[10rem] lg:translate-y-[-1rem] lg:group-hover:rotate-[7deg]">
                                <HeroCard photo="/assets/home/heropic3.png" type="Chill" title="Urban Photography Walk" description="..." duration="4 hours" />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Hero;
