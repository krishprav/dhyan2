"use client";

import { useState, useEffect } from "react";

const Contact = () => {
  const [showTopButton, setShowTopButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById("contact-section");
      if (section) {
        const rect = section.getBoundingClientRect();
        setShowTopButton(rect.top <= 0 && rect.bottom >= window.innerHeight);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="contact-section"
      className="relative flex flex-col items-center justify-center min-h-screen w-full overflow-hidden"
    >
      {/* Top Gradient Background */}
      <img
        src="/Rectangle11.svg"
        alt="Background"
        className="absolute top-0 left-0 w-full h-[40vh] md:h-[60vh] object-cover pointer-events-none select-none"
        style={{ zIndex: 0 }}
      />

      {/* Bubble pattern background */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[200px] bg-contain bg-no-repeat bg-center z-0"
        style={{ backgroundImage: "url('/contact-bubble-pattern.svg')" }}
      ></div>

      {/* Contact Card */}
      <div className="relative flex flex-col md:flex-row bg-white rounded-3xl shadow-2xl overflow-hidden z-10 border border-gray-200 w-full max-w-[1200px] mx-4 my-16 md:my-0">
        {/* Left: Form Section */}
        <div className="flex flex-col justify-center px-6 py-8 md:p-12 w-full md:w-1/2 gap-5">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Get in touch
          </h1>
          <p className="text-gray-600 mb-7 text-lg">
            We are here for you! How can we help?
          </p>

          <form className="space-y-6" autoComplete="off">
            <label className="block">
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full px-5 py-4 text-base placeholder:text-gray-400 outline-none border border-[#D6E0FF] focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                style={{
                  borderRadius: "12px",
                  background: "#F5F8FF",
                }}
                required
              />
            </label>
            
            <label className="block">
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full px-5 py-4 text-base placeholder:text-gray-400 outline-none border border-[#D6E0FF] focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                style={{
                  borderRadius: "12px",
                  background: "#F5F8FF",
                }}
                required
              />
            </label>
            
            <label className="block">
              <textarea
                placeholder="Go ahead, We are listening..."
                className="w-full px-5 py-4 text-base resize-none placeholder:text-gray-400 outline-none border border-[#D6E0FF] focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                style={{
                  height: "140px",
                  borderRadius: "12px",
                  background: "#F5F8FF",
                }}
                required
              />
            </label>
            
            <button
              type="submit"
              className="w-full text-white font-medium hover:opacity-95 active:scale-[0.98] transition-all duration-200 shadow-md py-4"
              style={{
                borderRadius: "12px",
                background: "linear-gradient(90deg, #007AFF 0%, #00B2FF 100%)",
                fontSize: "18px",
              }}
            >
              Submit
            </button>
          </form>
        </div>

        {/* Right: Contact Info */}
        <div className="flex flex-col items-center justify-center px-6 py-8 md:p-12 w-full md:w-1/2 gap-8 bg-[#F5F8FF]">
          <div className="flex flex-col items-center gap-8">
            <img
              src="/yogi.svg"
              alt="Contact us"
              className="w-[200px] md:w-[280px] h-auto"
            />

            <div className="space-y-6 w-full max-w-xs">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                  <img
                    src="/location.svg"
                    alt="Location"
                    className="w-5 h-5"
                  />
                </div>
                <p className="text-gray-800 leading-relaxed text-base">
                  #2397/29A, 18th Main Road, <br />
                  Kumaraswamy Layout - Stage II, <br />
                  Bengaluru, Karnataka - 560078
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0">
                  <img
                    src="/mail.svg"
                    alt="Email"
                    className="w-5 h-5"
                  />
                </div>
                <p className="text-gray-800 text-base">
                  contact@epilepto.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Link */}
      {showTopButton && (
        <div className="mt-10 mb-16 md:mb-24 flex justify-center w-full z-20">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 text-blue-500 hover:text-blue-700 transition-colors font-medium text-lg"
          >
            Back to top
            <img src="/arrow-up.svg" alt="Up arrow" className="w-5 h-5" />
          </button>
        </div>
      )}
    </section>
  );
};

export default Contact;