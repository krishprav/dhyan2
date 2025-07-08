import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const Navbar = () => {
  const [sidebar, setSidebar] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (sidebar) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [sidebar]);

  return (
    <div className="fixed top-0 left-0 w-full z-50 flex justify-center pointer-events-none">
      {/* Main Navbar Container */}
      <div
        className="w-[92%] max-w-5xl px-5 md:px-10 py-4 md:py-0 rounded-[20px] md:rounded-[28px] border-[1.5px] border-[#0D0D0D] 
                   backdrop-blur-[14.95px] bg-[rgba(18,21,27,0.6)] flex items-center justify-between relative shadow-lg 
                   pointer-events-auto mt-3 sm:mt-4 h-[52px] md:h-[68px]"
        style={{
          background: 'radial-gradient(100% 100% at 100% 0%, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%), radial-gradient(100% 100% at 0% 0%, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%), rgba(18, 21, 27, 0.6)'
        }}
      >
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <div
            className="flex items-center justify-center flex-col gap-1 cursor-pointer rounded-full w-[24px] h-[24px]"
            onClick={() => setSidebar((prev) => !prev)}
          >
            <div className="bg-white rounded-3xl h-[2.5px] w-[20px]" />
            <div className="bg-white rounded-3xl h-[2.5px] w-[20px]" />
          </div>
        </div>

        {/* Brand Name */}
        <div className={`flex items-center gap-2 ${isMobile ? 'absolute left-1/2 -translate-x-1/2' : ''}`}>
          <img
            src="/dhyanlogo.svg"
            alt="DhyanApp Logo"
            className="h-[18px] w-auto md:h-[28px]"
          />
          <div className="text-white font-['SF_Pro_Display'] text-[15px] font-bold md:font-['Geist'] md:text-[22px] md:font-semibold">
            DhyanApp
          </div>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-3 lg:gap-4 text-sm font-medium text-white">
          {["About", "Practices", "Testimonials", "Blog", "Contact"].map((label) => (
            <a
              key={label}
              href={`/#${label}`}
              className="hover:text-[#00b4d8] transition whitespace-nowrap text-center 
                         font-['SF_Pro_Display'] text-[13.5px] font-medium tracking-[0.25px]"
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
            className="fixed top-0 right-0 z-[70] w-full h-screen text-white shadow-2xl bg-[rgba(0,0,0,0.75)] backdrop-blur-[8px] overflow-hidden"
          >
            {/* Close Button */}
            <div className="absolute top-6 right-6 z-[100] pointer-events-auto">
              <button
                onClick={() => setSidebar(false)}
                className="text-white hover:text-[#00b4d8] transition-colors font-light 
                           flex items-center justify-center leading-none w-7 h-7 text-3xl"
                tabIndex={0}
                aria-label="Close menu"
              >
                ×
              </button>
            </div>

            <div className="flex flex-col items-center justify-center h-full px-4 gap-8">
              {["About", "Practices", "Testimonials", "Blog", "Contact"].map((label) => (
                <a
                  key={label}
                  href={`/#${label}`}
                  onClick={() => setSidebar(false)}
                  className="hover:text-[#00b4d8] transition-colors text-[32px] font-['SF_Pro_Display'] font-light"
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