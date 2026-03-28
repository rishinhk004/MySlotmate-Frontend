"use client";
import { useRouter } from "next/navigation";

interface CardProps{
    photo:string;
    type:string;
    title:string;
    description:string;
    duration:string;
    id?: string;
}
const HeroCard=({photo,type,title,description,duration,id}:CardProps)=>{
    const router = useRouter();
    
    const handleViewDetails = () => {
        if (id) {
            router.push(`/experience/${id}`);
        }
    };
    
    return(
        <>
            <div
                className="flex flex-row rounded-2xl w-[18rem] h-[8rem] bg-[#ffffff] scale-100 md:scale-105 lg:scale-110 transition-all duration-300 mt-4 hover:shadow-2xl overflow-hidden"
                style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', border: '1px solid var(--Colors-Neutral-500, #A4A4A4)' }}
            >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photo} alt={title} className="object-cover rounded-l-2xl w-24 h-full flex-shrink-0" />
                <div className="flex flex-col items-start justify-center p-2 flex-1 min-w-0 h-full overflow-hidden">
                    <h1 className="text-xs font-bold text-[#6A9955] uppercase">{type}</h1>
                    <h1 className="text-sm font-semibold truncate max-w-full">{title}</h1>
                    <p className="text-xs text-[#6B7280] truncate max-w-full flex-1">{description}</p>
                    <div className="flex flex-row justify-between w-full text-xs mt-auto">
                        <span className="bg-[#F3F4F6] text-[#374151] p-0.5 rounded-[6px]">{duration}</span>
                        <button onClick={handleViewDetails} className="text-[#127D87] hover:underline">View Details</button>
                    </div>
                </div>
            </div>
        </>
    );
}
export default HeroCard;
