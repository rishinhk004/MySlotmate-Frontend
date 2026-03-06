const Banner = () => {
    return (
        <section className="w-full bg-transparent py-8 px-4 sm:px-6 lg:px-12 text-[#000000]">
            <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
                <div className="w-full lg:w-1/2 flex items-center justify-center">
                    <img
                        src="/assets/home/cover.svg"
                        alt="Banner"
                        className="w-full h-auto object-contain"
                    />
                </div>

                <div className="flex flex-col md:flex-row items-center justify-center">
                    <div className="flex flex-col justify-center items-center">
                        <h1>Earn with <br/> MySlotMate</h1>
                        <button>List Your Time</button>
                    </div>
                    <div className="flex flex-col items-center justify-center">
                        <h1>Host Meaningful experiences</h1>
                        <h1>Earn Per slot</h1>
                        <h1>Build your local community</h1>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Banner;