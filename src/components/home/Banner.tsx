const Banner=()=>{
    return(
        <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col lg:flex-row items-center justify-center w-full h-[50vh] lg:h-[20vh]">
                <img src="/assets/home/cover.svg" alt="Banner" className="w-full h-[50%] lg:w-[50%] lg:h-full" />
                <div className="flex flex-col md:flex-row items-center justify-center">
                    <div className="flex flex-col items-center justify-center">
                        <h2>Earn with <br/> MySlotMate</h2>
                        <button>List Your Time</button>
                    </div>
                    <div className="flex flex-col items-center justify-center mt-4 md:ml-8">
                        <p>Host meaningful experiences</p>
                        <p>Earn per slot</p>
                        <p>Build your local community</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Banner;