const Footer = () => {
    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex flex-row items-center justify-center">
                <div className="flex flex-col items-center justify-center">
                    <img src="/assets/home/logo.png" alt="Logo" />
                    <h1>+91 9876543210</h1>
                    <h1>support@myslotmate.com</h1>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <h1>Quick Links</h1>
                    <div className="flex flex-col items-center justify-center">
                        <a>About Us</a>
                        <a>Blogs</a>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <a>Moments</a>
                    <a>Become a host</a>
                </div>
                <div className="flex flex-col items-start justify-center">
                    <h1>Subscribe</h1>
                    <div className="flex flex-row"><input type="text" placeholder="Get product updates" /><button>Subscribe</button></div>
                </div>
            </div>
            <hr />
            <div className="flex flex-col md:flex-row items-center justify-center">
                <div className="flex flex-col md:flex-row items-center justify-center">
                    <a>Linkedin</a>
                    <a>Facebook</a>
                    <a>Twitter</a>
                </div>
                <p>A product of MOODVERSE pvt Ltd</p>
                <p>@2025 Myslotmate. All rights reserved.</p>
            </div>
        </div>
    );
}
export default Footer;