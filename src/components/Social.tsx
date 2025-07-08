import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

const Social = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const mockupData = [
    {
      image: "/social_mock.png",
      heading: "Spiritual Community",
      paragraph:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      image: "/progress_mock.png",
      heading: "Track your Progress",
      paragraph:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
  ];

  useEffect(() => {
    const context = gsap.context(() => {
      const container = containerRef.current;
      const section = sectionRef.current;
      const imageContainer = imageContainerRef.current;

      if (!container || !section || !imageContainer) return;

      // Check if mobile device
      const isMobile = window.innerWidth < 768;

      if (isMobile) {
        // For mobile, we'll use a simpler scroll trigger
        gsap.set(container, { height: `${mockupData.length * 100}vh` });
        
        const sections = gsap.utils.toArray(".mobile-section");
        
        sections.forEach((section: any, i) => {
          ScrollTrigger.create({
            trigger: section,
            start: "top center",
            end: "bottom center",
            onEnter: () => setCurrentIndex(i),
            onEnterBack: () => setCurrentIndex(i),
          });
        });
      } else {
        // Original desktop animation
        gsap.set(container, { height: `${mockupData.length * 100}vh` });

        const masterTimeline = gsap.timeline({ paused: true });

        masterTimeline.to(
          imageContainer,
          {
            yPercent: (-100 * (mockupData.length - 1)) / mockupData.length,
            ease: "none",
          },
          0
        );

        ScrollTrigger.create({
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
          pin: section,
          animation: masterTimeline,
          onUpdate: (self) => {
            const newIndex = Math.floor(self.progress * mockupData.length);
            if (newIndex < mockupData.length) {
              setCurrentIndex(newIndex);
            }
          },
        });
      }
    });

    return () => context.revert();
  }, [mockupData.length]);

  return (
    <div
      ref={containerRef}
      className="social-container relative pt-12 md:pt-32 pb-12 md:pb-32"
    >
      {/* Mobile Layout */}
      <div className="md:hidden w-full">
        {mockupData.map((item, index) => (
          <div 
            key={index}
            className="mobile-section min-h-screen w-full flex flex-col items-center justify-start pt-20 px-4"
          >
            <div className="w-full max-w-[600px] text-left mb-8">
              <h1 className="text-2xl sm:text-3xl font-normal text-black mb-4 md:mb-6" style={{ fontFamily: "Gelica, serif" }}>
                {item.heading}
              </h1>
              <p className="text-base sm:text-lg text-[#626262] font-medium leading-relaxed" style={{ fontFamily: '"SF Pro Display", sans-serif' }}>
                {item.paragraph}
              </p>
            </div>
            
            <div className="relative w-[220px] h-[450px] -ml-5">
              <img
                src={item.image}
                alt={item.heading}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:block">
        <div
          ref={sectionRef}
          className="min-h-screen w-full flex items-center justify-center overflow-hidden"
        >
          <div className="relative z-20 w-full h-full flex flex-col md:flex-row items-center justify-center">
            {/* Text Section */}
            <div className="relative md:absolute md:top-1/3 md:-translate-y-1/3 md:left-[143px] w-full md:max-w-[600px] text-left px-4 md:px-0 mb-8 md:mb-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: -30, y: 0 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  exit={{ opacity: 0, x: 30, y: 0 }}
                  transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
                >
                  <h1 className="text-3xl sm:text-3xl md:text-[62px] font-normal text-black mb-4 md:mb-6" style={{ fontFamily: "Gelica, serif" }}>
                    {mockupData[currentIndex].heading}
                  </h1>
                  <p className="text-base sm:text-lg md:text-[22px] text-[#626262] font-medium leading-relaxed md:leading-[30px]" style={{ fontFamily: '"SF Pro Display", sans-serif' }}>
                    {mockupData[currentIndex].paragraph}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Image Section */}
            <div className="w-full flex justify-center md:block md:absolute md:top-1/2 md:-translate-y-1/2 md:left-[1148px] md:right-[325px]">
              <div
                className="relative w-[220px] h-[450px] sm:w-[300px] sm:h-[600px] md:w-[416px] md:h-[852px]"
                style={{ width: undefined, height: undefined }}
              >
                <div
                  ref={imageContainerRef}
                  className="absolute top-0 left-0 w-full"
                  style={{ height: `${mockupData.length * 100}%` }}
                >
                  {mockupData.map((item, index) => (
                    <div
                      key={index}
                      className="w-full h-full flex items-center justify-center py-4 md:py-8"
                      style={{ height: `${100 / mockupData.length}%` }}
                    >
                      <img
                        src={item.image}
                        alt={item.heading}
                        className="w-full h-full object-contain"
                        style={{ maxWidth: "416px", maxHeight: "852px" }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Social;