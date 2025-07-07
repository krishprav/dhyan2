import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const Navbar = () => {
  const [sidebar, setSidebar] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Call on initial render
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  return (
    <div className="fixed top-0 left-0 w-full z-50 flex justify-center pointer-events-none">
      <div
        // Changed desktop height from 60px to 72px (h-18)
        className="w-[90%] max-w-6xl px-5 md:px-12 py-[28px] md:h-18 md:py-0 rounded-[28px] border-[1.7px] border-[#0D0D0D] outline outline-[1.7px] outline-offset-[-1.7px] backdrop-blur-[14.95px] bg-[rgba(18,21,27,0.6)] flex items-center justify-between relative shadow-lg pointer-events-auto mt-3 sm:mt-4"
      >
        {/* Mobile Menu Button - Left */}
        <div className="md:hidden">
          <div
            className="flex items-center justify-center flex-col gap-[4px] cursor-pointer rounded-full w-[26px] h-[26px]"
            onClick={() => setSidebar((prev) => !prev)}
          >
            <div className="bg-white rounded-3xl h-[3px] w-[26px]" />
            <div className="bg-white rounded-3xl h-[3px] w-[26px]" />
          </div>
        </div>

        {/* Brand Name */}
        <div className={`flex items-center gap-2 ${isMobile ? 'absolute left-1/2 -translate-x-1/2' : ''}`}>
          <img
            src="/dhyanlogo.svg"
            alt="DhyanApp Logo"
            className="h-[22px] w-auto md:h-[32.45px] md:w-[32.45px]"
          />
          <div className="text-white font-['SF_Pro_Display'] text-[17.36px] font-bold leading-5 md:font-['Geist'] md:text-[26px] md:font-semibold">
            DhyanApp
          </div>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center space-x-3 lg:space-x-4 xl:space-x-6 text-sm font-medium text-white">
          {["About", "Practices", "Testimonials", "Blog", "Contact"].map((label) => (
            <a
              key={label}
              href={`/#${label}`}
              className="hover:text-[#00b4d8] transition whitespace-nowrap text-white text-center font-['SF_Pro_Display'] text-[15px] font-medium tracking-[0.3px]"
            >
              {label}
            </a>
          ))}
        </div>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {sidebar && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 right-0 z-[70] w-full h-screen text-white shadow-2xl bg-[rgba(0,0,0,0.70)] backdrop-blur-[7px]"
          >
            {/* Close Button */}
            <div className="absolute top-[62px] right-[50px] z-[100] pointer-events-auto">
              <button
                onClick={() => setSidebar(false)}
                className="text-white hover:text-[#00b4d8] transition-colors font-light flex items-center justify-center leading-none w-[26px] h-[26px] text-2xl"
                tabIndex={0}
                aria-label="Close menu"
              >
                ×
              </button>
            </div>

            <div className="flex flex-col items-center justify-center h-full px-4 sm:px-6 gap-10">
              {["About", "Practices", "Testimonials", "Blog", "Contact"].map((label) => (
                <a
                  key={label}
                  href={`/#${label}`}
                  onClick={() => setSidebar(false)}
                  className="hover:text-[#00b4d8] transition-colors text-4xl font-['SF_Pro_Display'] font-normal"
                >
                  {label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;