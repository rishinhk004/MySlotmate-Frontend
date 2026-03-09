"use client";
import TrendingCard from "./TrendingCard";
import Link from 'next/link';
import activitiesData from '../../data/Activities.json';

type Activity = {
    id: number;
    title: string;
    imageUrl: string;
    pricing: string;
    location?: string;
}

const Trending = () => {
    const activities = Array.isArray(activitiesData) ? (activitiesData.slice(0, 10) as Activity[]) : [];
    return (
        <div className="flex flex-col items-center justify-center w-full mt-20 gap-4">
            <div className="flex flex-row items-center justify-around w-full px-4">
                <h1 className="text-xl text-left text-[#000000] font-medium">Trending Activities</h1>
                <Link href="/activities" className="text-[#0094CA] text-sm">see more</Link>
            </div>
            <div className="flex flex-row justify-center items-center w-full gap-4 overflow-x-auto overflow-y-hidden flex-nowrap snap-x snap-mandatory">
                {activities.map((a: Activity) => (
                    <TrendingCard key={a.id} title={a.title} imageUrl={a.imageUrl} pricing={a.pricing} />
                ))}
            </div>
        </div>
    );
}
export default Trending;