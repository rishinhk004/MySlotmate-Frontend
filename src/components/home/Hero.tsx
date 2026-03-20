import React, { useState, useRef } from "react";
import HeroCard from "./HeroCard";

const Hero: React.FC = () => {
    const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
    const heroRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (heroRef.current) {
            const rect = heroRef.current.getBoundingClientRect();
            setMousePos({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            });
        }
    };

    return (
        <div 
            ref={heroRef}
            onMouseMove={handleMouseMove}
            className="relative w-full overflow-hidden"
        >
            {/* Spotlight Grid & Glow Layer */}
            {/* Added 'hidden lg:block' to hide on mobile/tablet and show only on large screens */}
            <div
                className="pointer-events-none absolute inset-0 z-0 hidden lg:block"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, #ffffff 1px, transparent 1px),
                        linear-gradient(to bottom, #ffffff 1px, transparent 1px),
                        radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(128, 0, 0, 0.15), transparent)
                    `,
                    backgroundSize: '113px 113px, 113px 113px, 100% 100%',
                    backgroundRepeat: 'repeat, repeat, no-repeat',
                    WebkitMaskImage: `radial-gradient(450px circle at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 100%)`,
                    maskImage: `radial-gradient(450px circle at ${mousePos.x}px ${mousePos.y}px, black 0%, transparent 100%)`,
                }}
            />

            {/* Content Layer */}
            <div className="relative z-10 py-[5rem] px-4 md:px-[4rem] lg:px-[8rem] w-full justify-around gap-[3rem] items-center flex flex-col lg:flex-row text-[#000000]">
                <div className="flex flex-col scale-100 lg:scale-150">
                    <h1 className="text-2xl font-bold text-center lg:text-left">
                        Book People&apos;s<br />
                        <span className="text-[#0094CA]">Time.</span>
                    </h1>
                    <p className="text-sm text-center text-[#606060] lg:text-left mb-4">
                        Pick an interest. Meet someone who shares it.
                    </p>
                    <div className="flex flex-row gap-6 justify-center text-semibold">
                        <button className="w-[45%] lg:w-auto lg:px-6 bg-[#0094CA] text-[#ffffff] text-sm rounded-md mt-2 p-2">Book Time</button>
                        <button className="w-[45%] lg:w-auto lg:px-6 bg-[#ffffff] text-[#231F20] border border-[#BBBBBB] rounded-md mt-2 text-sm p-2">List Time</button>
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

                <div className='flex flex-col items-center justify-center gap-4 lg:gap-0'>
                    <div className="lg:translate-x-[10rem] lg:translate-y-[1rem]">
                        <HeroCard photo="/assets/home/heropic1.png" type="Adventure" title="Mountain Trekking" description="..." duration="2 days" />
                    </div>
                    <HeroCard photo="/assets/home/heropic2.png" type="Adventure" title="Scuba Diving" description="..." duration="1 day" />
                    <div className="lg:translate-x-[10rem] lg:translate-y-[-1rem]">
                        <HeroCard photo="/assets/home/heropic3.png" type="Chill" title="Urban Photography Walk" description="..." duration="4 hours" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Hero;