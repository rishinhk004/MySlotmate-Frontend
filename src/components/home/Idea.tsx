const Idea=()=>{
    return(
        <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center">
                <h1>The Idea Behind MySlotmate</h1>
                <p>Book time with interesting people</p>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-around">
                <div className="flex flex-col items-center justify-center">
                    <img />
                    <h1>Real People</h1>
                    <p>Our community is vetted to ensure safety and authenticity for every experience</p>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <img />
                    <h1>Right Fit</h1>
                    <p>Don't just book a slot, book a moment. Find what feels right for you today.</p>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <img />
                    <h1>Book Now</h1>
                    <p>Secure your slot in seconds with our seamless and secure checkout process.</p>
                </div>
            </div>
        </div>
    );
}

export default Idea;