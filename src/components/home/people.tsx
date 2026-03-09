"use client";
import PeopleCard from "./PeopleCard";
import Link from 'next/link';
import peopleData from '../../data/People.json';

type Person = {
    id: number;
    name: string;
    imageUrl: string;
    rating: string;
    location?: string;
}

const People = () => {
    const people = Array.isArray(peopleData) ? (peopleData.slice(0, 10) as Person[]) : [];
    return (
        <div className="flex flex-col items-center justify-center gap-4 mt-8">
            <div className="flex flex-row justify-around items-center gap-4 w-screen px-[10vw]">
                <h1 className="text-xl text-left text-[#000000] font-medium">Interesting People Near You</h1>
                <Link href="/people" className="text-[#0094CA] text-sm flex flex-row items-center justify-center gap-2">
                    <span>see more</span>
                    <span className="bg-[#0094CA] w-[2.5rem] h-[2.5rem] flex items-center justify-center rounded-full">{/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/assets/home/keyboard_arrow_right.svg" alt="See More" />
                    </span>
                </Link>
            </div>
            <div className="flex flex-row-reverse items-center justify-start w-screen gap-4 px-[10vw] overflow-x-auto overflow-y-hidden flex-nowrap snap-x snap-mandatory touch-pan-x hide-scrollbar" style={{ WebkitOverflowScrolling: 'touch' }}>
                {people.map((p: Person) => (
                    <PeopleCard key={p.id} name={p.name} imageUrl={p.imageUrl} rating={p.rating} />
                ))}
            </div>
        </div>
    );
}

export default People;