import Link from "next/link";

const Footer = () => {
  return (
    <footer className="mt-4 w-full border-t border-[#aeddf873] bg-[linear-gradient(180deg,#dff2ff,#f4fbff)]">
      <div className="site-x">
        <div className="mx-auto w-full max-w-[1120px] py-10">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/home/logo.png" alt="Myslotmate" className="mb-3 h-10 w-auto" />
              <p className="text-sm text-[#5e88ab]">A product of Moodverse Pvt Ltd</p>
              <p className="mt-1 text-sm text-[#5e88ab]">support@myslotmate.com</p>
            </div>

            <div>
              <h4 className="text-sm font-bold text-[#16304c]">Quick Links</h4>
              <div className="mt-3 space-y-2 text-sm text-[#5e88ab]">
                <Link href="/support" className="block hover:text-[#0e8ae0]">Safety</Link>
                <Link href="/support/terms-conditions" className="block hover:text-[#0e8ae0]">Guidelines</Link>
                <Link href="/hosts" className="block hover:text-[#0e8ae0]">Community</Link>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold text-[#16304c]">For Hosts</h4>
              <div className="mt-3 space-y-2 text-sm text-[#5e88ab]">
                <Link href="/become-host" className="block hover:text-[#0e8ae0]">List Your Time</Link>
                <Link href="/host-dashboard" className="block hover:text-[#0e8ae0]">Host Corner</Link>
                <Link href="/experiences" className="block hover:text-[#0e8ae0]">Stories</Link>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-bold text-[#16304c]">Subscribe</h4>
              <p className="mt-3 text-sm text-[#5e88ab]">Get the latest stories and experiences in your inbox.</p>
              <div className="mt-3 flex items-center rounded-full border border-[#78bce759] bg-white p-1">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full bg-transparent px-3 text-sm text-[#16304c] outline-none"
                  suppressHydrationWarning
                />
                <button
                  type="button"
                  className="h-10 w-10 rounded-full bg-[linear-gradient(135deg,#1fa7ff,#63ceff)] text-sm font-bold text-white"
                >
                  &gt;
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-[#aeddf873] pt-4 text-sm text-[#5e88ab]">
            <p>@2026 Myslotmate. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
