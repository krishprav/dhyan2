"use client";

import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import InteractiveStars from "./InteractiveStars"; 

const Footer = () => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = -(e.clientY / window.innerHeight) * 2 + 1;
    setMouse({ x, y });
  };

  return (
    <footer
      onMouseMove={handleMouseMove}
      className="relative w-full overflow-hidden bg-gradient-to-b from-[#0A4A5C] to-[#000000] text-white"
    >
      {/* Background Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 10], fov: 75 }}
          style={{ pointerEvents: "none" }}
        >
          <InteractiveStars mouse={mouse} />
        </Canvas>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8 md:gap-4">
          <div className="flex flex-col items-start gap-6">
            <div className="flex items-center gap-3">
              <img src="/logo.svg" alt="Epilepto Systems Logo" width={32} height={38} />
              <h2
                className="font-bold"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "38px",
                  lineHeight: "40px",
                  fontFeatureSettings: '"liga" off, "clig" off',
                }}
              >
                Epilepto Systems
              </h2>
            </div>
            <div className="flex gap-6">
              <a href="#" aria-label="Facebook" className="hover:opacity-80 transition-opacity">
                <img src="/facebook.svg" alt="Facebook" width={24} height={24} />
              </a>
              <a href="#" aria-label="Twitter" className="hover:opacity-80 transition-opacity">
                <img src="/twitter.svg" alt="Twitter" width={24} height={24} />
              </a>
              <a href="#" aria-label="Instagram" className="hover:opacity-80 transition-opacity">
                <img src="/instagram.svg" alt="Instagram" width={24} height={24} />
              </a>
              <a href="#" aria-label="LinkedIn" className="hover:opacity-80 transition-opacity">
                <img src="/linkedin.svg" alt="LinkedIn" width={24} height={24} />
              </a>
            </div>
          </div>

          <div className="flex flex-col items-start md:items-center space-y-3 text-base text-[#CCC]">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms & Conditions</a>
            <a href="#" className="hover:text-white transition-colors">Contact us</a>
          </div>

          <div className="hidden md:flex flex-col justify-end text-sm font-semibold"
            style={{ fontFamily: "'SF Pro Display', Arial, sans-serif" }}>
            <span>© Copyright <strong>Epilepto</strong>. All Rights Reserved</span>
          </div>
        </div>

        <div className="md:hidden text-center mt-8 text-sm font-semibold"
          style={{ fontFamily: "'SF Pro Display', Arial, sans-serif" }}>
          © Copyright <strong>Epilepto</strong>. All Rights Reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
