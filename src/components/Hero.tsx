import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";
import HeroPhone from "./HeroPhone";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const videoContainerRef = useRef(null);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  // GSAP animations remain the same
  useGSAP(() => {
    gsap.from(".title", {
      opacity: 0,
      yPercent: 100,
      duration: 1.5,
      ease: "expo.out",
    });
    gsap.from(".subtitle", {
      opacity: 0,
      yPercent: 100,
      duration: 1.5,
      ease: "expo.out",
      delay: 0.5,
    });
    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      })
      .to(".right-leaf", { y: 200 }, 0)
      .to(".left-leaf", { y: -200 }, 0)
      .to(".arrow", { y: 100 }, 0);
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
    if (videoRef.current) {
      videoRef.current.onloadedmetadata = () => {
        if (videoRef.current && videoRef.current.duration) {
          tl.to(videoRef.current, {
            currentTime: videoRef.current.duration,
          });
        }
      };
    }
    if (videoContainerRef.current) {
      ScrollTrigger.create({
        trigger: "#hero",
        start: "bottom top",
        onEnter: () =>
          gsap.to(videoContainerRef.current, {
            autoAlpha: 0,
            duration: 0.3,
            ease: "power2.out",
          }),
        onLeaveBack: () =>
          gsap.to(videoContainerRef.current, {
            autoAlpha: 1,
            duration: 0.5,
            ease: "power2.inOut",
          }),
      });
    }
  }, []);

  return (
    <>
      <div ref={videoContainerRef} className="fixed inset-0 z-0 w-full h-full pointer-events-none">
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          src="/videos/output2.mp4"
          className="w-full h-full object-cover pointer-events-none"
        />
      </div>
      <section
        id="hero"
        className="flex flex-col md:flex-row items-center justify-center min-h-screen relative z-10 pt-[50px] mt-0 pb-4 sm:pb-8 md:pb-0 text-center"
      >
        <div className="absolute inset-0 z-0 pointer-events-none flex justify-end h-full">
          <div
            className={`h-full ${
              isMobile
                ? "w-[80vw] translate-x-[10%] max-w-[400px] min-w-[200px]"
                : "w-1/2 translate-x-[20%] min-w-[300px]"
            }`}
          />
        </div>
        <div
          className="relative z-10 flex-1 w-full flex flex-col items-center justify-center px-4 sm:px-6 md:px-12 lg:px-24 xl:px-60 pt-12 sm:pt-16 md:pt-20 max-w-[1200px] mx-auto"
          style={{ marginTop: "-48px" }}
        >
          <div className="w-full">
            {isMobile ? (
              // Mobile view remains centered
              <div className="text-center">
                <div
                  style={{
                    color: "white",
                    fontSize: 60,
                    fontFamily: "Samarkan",
                    fontWeight: "400",
                    marginBottom: "8px",
                    marginTop: "38px",
                  }}
                >
                  DHYAN
                </div>
                <div
                  style={{
                    textAlign: "center",
                    color: "white",
                    fontSize: 26,
                    fontFamily: "Sweet Romance",
                    fontWeight: "400",
                    lineHeight: "50px",
                    marginBottom: "8px",
                  }}
                >
                  A Comprehensive App for Spiritual Life
                </div>
                <div
                  style={{
                    color: "white",
                    fontSize: 24,
                    fontFamily: "SF Pro Display",
                    fontWeight: "500",
                    marginBottom: "6px",
                  }}
                >
                  Download now on
                </div>
              </div>
            ) : (
              // Desktop view
              <>
                <h1
                  className="text-white font-[Samarkan] font-normal leading-none mb-2 title text-center"
                  style={{ fontSize: "210px" }}
                >
                  dhyan
                </h1>
                {/* Container that left-aligns the content below the title */}
                <div
                  className="w-full flex flex-col items-start"
                  style={{ paddingLeft: "52px" }}
                >
                  <h2
                    className="text-white font-[Sweet Romance] subtitle text-left font-normal"
                    style={{
                      fontSize: "68px",
                      lineHeight: "102px",
                    }}
                  >
                    A Comprehensive App for Spiritual Life
                  </h2>

                  {/* CHANGED: New container to center the text and icons relative to each other */}
                  <div className="flex flex-col items-center" style={{ marginTop: "40px" }}>
                    <div
                      style={{
                        color: "white",
                        fontSize: 26,
                        fontFamily: "SF Pro Display",
                        fontWeight: "500",
                      }}
                    >
                      Download now on
                    </div>
                    <div className="mt-4 flex gap-2">
                      <a href="#">
                        <img
                          src="/playstore.svg"
                          alt="Google Play"
                          className="h-8 sm:h-10 md:h-12"
                        />
                      </a>
                      <a href="#">
                        <img
                          src="/applestore.svg"
                          alt="App Store"
                          className="h-8 sm:h-10 md:h-12"
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          {isMobile && (
            <div className="mt-1 mb-2 text-center w-full">
              <div className="flex justify-center gap-2">
                <a href="#">
                  <img src="/playstore.svg" alt="Google Play" className="h-12" />
                </a>
                <a href="#">
                  <img src="/applestore.svg" alt="App Store" className="h-12" />
                </a>
              </div>
            </div>
          )}

          {isMobile && (
            <div
              className="flex justify-center w-full scale-90 mt-0 mb-0 -ml-[30px]"
              style={{
                width: "500px",
                height: "729px",
                marginTop: "-24px",
              }}
            >
              <HeroPhone />
            </div>
          )}
        </div>
        {!isMobile && (
          <div className="flex-1 w-full flex items-center justify-center md:justify-end md:pr-12 mt-8 sm:mt-12 md:mt-24 md:-ml-[30px]">
            <HeroPhone />
          </div>
        )}
      </section>
    </>
  );
};

export default Hero;