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
      className="relative flex flex-col items-end justify-center overflow-hidden min-h-screen w-full px-2 sm:px-4 md:px-8 bg-no-repeat bg-cover"
      style={{ margin: "0 auto" }}
    >
      {/* Background SVG */}
      <img
        src="/Rectangle11.svg"
        alt="Background"
        className="absolute top-0 left-0 w-full h-[40vh] md:h-[60vh] lg:h-[825px] object-cover pointer-events-none select-none"
        style={{ zIndex: 0 }}
      />

      {/* Contact Card */}
      <div
        className="relative flex flex-col md:flex-row bg-white rounded-3xl shadow-2xl overflow-hidden z-10 border border-gray-100 w-full max-w-screen-lg mx-auto"
        style={{ minHeight: "400px" }}
      >
        {/* Left: Form Section */}
        <div className="flex flex-col justify-center px-4 py-8 md:p-12 w-full md:w-1/2 gap-2">
          <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 mb-2 leading-tight tracking-tight">
            Get in touch
          </h1>
          <p className="text-base md:text-lg text-gray-600 mb-7">
            We are here for you! How can we help?
          </p>

          <form className="space-y-5" autoComplete="off">
            <label className="block">
              <span className="sr-only">Name</span>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full px-5 text-base placeholder-gray-500 outline-none border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                style={{
                  height: "56px",
                  borderRadius: "18px",
                  background: "#F5F8FF",
                }}
                required
              />
            </label>
            <label className="block">
              <span className="sr-only">Email</span>
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full px-5 text-base placeholder-gray-500 outline-none border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                style={{
                  height: "56px",
                  borderRadius: "18px",
                  background: "#F5F8FF",
                }}
                required
              />
            </label>
            <label className="block">
              <span className="sr-only">Message</span>
              <textarea
                placeholder="Go ahead, We are listening..."
                className="w-full px-5 py-3 text-base resize-none placeholder-gray-500 outline-none border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                style={{
                  height: "140px",
                  borderRadius: "18px",
                  background: "#F5F8FF",
                }}
                required
              />
            </label>
            <button
              type="submit"
              className="w-full text-white font-semibold hover:opacity-95 active:scale-95 transition-all shadow-md"
              style={{
                height: "56px",
                borderRadius: "18px",
                background: "#007AFF",
                fontSize: "18px",
                letterSpacing: "0.01em",
              }}
            >
              Submit
            </button>
          </form>
        </div>

        {/* Right: Yogi & Contact Info */}
        <div className="flex flex-col items-center justify-center px-4 py-8 md:py-0 md:px-10 w-full md:w-1/2 gap-7 bg-gradient-to-b md:bg-none from-blue-50/60 to-transparent">
          <img
            src="/yogi.svg"
            alt="Yogi Illustration"
            className="w-[140px] sm:w-[180px] md:w-[220px] lg:w-[260px] h-auto drop-shadow-md"
          />

          <div className="space-y-5 w-full max-w-xs">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center shadow-md">
                <img
                  src="/location.svg"
                  alt="Location"
                  className="w-5 h-5 filter brightness-0 invert"
                />
              </div>
              <p className="text-sm md:text-[15px] text-gray-800 leading-relaxed">
                #2397/29A, 18th Main Road, <br />
                Kumaraswamy Layout - Stage II, <br />
                Bengaluru, Karnataka - 560078
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center shadow-md">
                <img
                  src="/mail.svg"
                  alt="Email"
                  className="w-5 h-5 filter brightness-0 invert"
                />
              </div>
              <p className="text-sm md:text-[15px] text-gray-800">
                contact@epilepto.com
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive Spacer below card */}
      <div className="w-full h-8 md:h-16 lg:h-24 xl:h-32" />

      {/* Back to Top Button */}
      {showTopButton && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-blue-500 shadow-xl flex items-center justify-center hover:bg-blue-600 active:scale-95 transition-all z-50"
          aria-label="Back to top"
        >
          <img src="/backtotop.svg" alt="Back to top" className="w-5 h-5" />
        </button>
      )}
    </section>
  );
};

export default Contact;
