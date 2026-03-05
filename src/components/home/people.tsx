"use client";

interface PeopleCardProps{
    name:string;
    imageUrl:string;
    rating:string;
}
const PeopleCard=(props:PeopleCardProps)=>{
    return(
        <div className="flex-shrink-0 snap-start flex flex-col items-center justify-center rounded-2xl m-5 h-[15rem] w-[18rem] overflow-hidden">
            <div className="bg-gray-200 rounded-2xl w-full h-full overflow-hidden relative" style={{backgroundImage:`url(${props.imageUrl})`,backgroundSize:"cover",backgroundPosition:"center"}}>
                <img src="/assets/home/verified.svg" alt="Verified" className="h-[1rem] w-[1rem] absolute bottom-0 right-0" />
            </div>
            <p className="text-sm text-gray-800 mt-2">{props.name}</p>
            <div className="flex flex-row justify-center items-center w-full mt-1">
                <img src="/assets/home/star.svg" alt="Star" className="h-[1rem] w-[1rem]" />
                <p className="text-sm text-gray-800 ml-1">{props.rating}</p>
            </div>
        </div>
    );
}

const People=()=>{
    return(
        <div className="flex flex-col items-center justify-center gap-4 mt-8">
            <div className="flex flex-row justify-around items-center gap-4 w-screen px-[10vw]">
                <h1 className="text-xl text-left text-[#000000] font-medium">Interesting People Near You</h1>
                <button className="text-[#0094CA] text-sm">see more</button>
            </div>
            <div className="flex flex-row items-center justify-center w-full gap-4 px-4 overflow-x-auto overflow-y-hidden flex-nowrap snap-x snap-mandatory">
                <PeopleCard name="John Doe" imageUrl="/assets/home/people1.png" rating="4.5" />
                <PeopleCard name="Jane Smith" imageUrl="/assets/home/people2.png" rating="4.8" />
                <PeopleCard name="Robert Johnson" imageUrl="/assets/home/people3.png" rating="4.2" />
            </div>
        </div>
    );
}

export default People;