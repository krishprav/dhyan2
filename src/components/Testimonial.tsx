"use client";
import React, { useState, useEffect } from "react";

// Testimonial data
const testimonials = [
  {
    text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in`,
    name: "John Doe",
    image: "/profile.png",
    stars: 5,
  },
  {
    text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in`,
    name: "John Doe",
    image: "/profile.png",
    stars: 5,
  },  {
    text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in`,
    name: "John Doe",
    image: "/profile.png",
    stars: 5,
  },  {
    text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in`,
    name: "John Doe",
    image: "/profile.png",
    stars: 5,
  },  {
    text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in`,
    name: "John Doe",
    image: "/profile.png",
    stars: 5,
  },  {
    text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in`,
    name: "John Doe",
    image: "/profile.png",
    stars: 5,
  },  {
    text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in`,
    name: "John Doe",
    image: "/profile.png",
    stars: 5,
  },
];

// Star Rating Component
interface StarRatingProps {
  count?: number;
  isActive?: boolean;
}

const StarRating: React.FC<StarRatingProps> = ({ count = 5, isActive = false }) => (
  <div className="flex flex-row gap-1">
    {[...Array(count)].map((_, i) => (
      <svg key={i} xmlns="http://www.w3.org/2000/svg" fill={isActive ? "#FFFFFF" : "#ACACAC"} viewBox="0 0 24 24" width={20} height={20} className="inline-block drop-shadow-sm">
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
      </svg>
    ))}
  </div>
);

// Testimonial Card Component
interface TestimonialCardProps {
  text: string;
  name: string;
  image: string;
  stars: number;
  isActive?: boolean;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ text, name, image, stars, isActive = false }) => {
  const cardStyle = {
    backgroundImage: `url(${isActive ? '/testimonial_card.svg' : '/testimonial_card2.svg'})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  };

  return (
    <div
      className={`
        ${isActive ? 'text-white shadow-2xl' : 'text-gray-700 shadow-lg'}
        rounded-2xl p-4 sm:p-5 lg:p-6 flex flex-col items-center w-[280px] h-[320px] sm:w-[300px] sm:h-[340px] lg:w-[320px] lg:h-[360px]
        transition-all duration-500 ease-out relative overflow-hidden
      `}
      style={cardStyle}
    >
      <div className={`absolute top-4 right-4 text-2xl opacity-20 z-10 ${isActive ? 'text-white' : 'text-gray-400'}`}>"</div>
      <div className="relative z-20 flex flex-col h-full w-full">
        <p className={`text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 text-justify line-clamp-6 flex-1 ${isActive ? 'text-white/90' : 'text-gray-600'}`}>
          {text}
        </p>
        <div className="flex items-center w-full gap-3 sm:gap-4 mt-auto">
          <img
            src={image}
            alt={name}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover shadow-lg flex-shrink-0"
          />
          <div className="flex flex-col">
            <span className={`font-bold text-sm sm:text-base lg:text-lg mb-1 ${isActive ? 'text-white' : 'text-gray-800'}`}>
              {name}
            </span>
            <StarRating count={stars} isActive={isActive} />
          </div>
        </div>
      </div>
    </div>
  );
};

// Arrow Button Component
interface ArrowButtonProps {
  direction: "left" | "right";
  onClick?: () => void;
  disabled?: boolean;
}

const ArrowButton: React.FC<ArrowButtonProps> = ({ direction, onClick, disabled = false }) => (
  <button
    className={`w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-white border border-gray-300 text-gray-600 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-all duration-200 shadow-lg ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
    aria-label={direction === "left" ? "Previous" : "Next"}
    type="button"
    onClick={onClick}
    disabled={disabled}
  >
    {direction === "left" ? (
      <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M19 12H5m0 0l7 7-7-7 7-7" /></svg>
    ) : (
      <svg className="w-6 h-6 sm:w-7 sm:h-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M5 12h14m0 0l-7-7 7 7-7 7" /></svg>
    )}
  </button>
);

// Carousel Dots Component
interface CarouselDotsProps {
  total: number;
  current: number;
  onChange: (index: number) => void;
}

const CarouselDots: React.FC<CarouselDotsProps> = ({ total, current, onChange }) => (
  <div className="flex items-center justify-center gap-3">
    {[...Array(total)].map((_, index) => (
      <button key={index} className={`w-3 h-3 rounded-full transition-all duration-300 ${index === current ? 'bg-blue-500 scale-125' : 'bg-blue-200 hover:bg-blue-300'}`} onClick={() => onChange(index)} aria-label={`Go to testimonial ${index + 1}`} />
    ))}
  </div>
);

// Header Component
const TestimonialHeader = () => (
    <div className="text-center mb-8 sm:mb-10 lg:mb-12 px-4">
        <h2
            className="text-5xl sm:text-6xl lg:text-7xl font-normal text-black mb-4"
            style={{ fontFamily: '"Gelica", sans-serif' }}
        >
            Testimonials
        </h2>
        <p
            className="text-base sm:text-lg lg:text-xl leading-relaxed max-w-2xl mx-auto text-[#626262] font-medium"
            style={{ fontFamily: '"SF Pro Display", sans-serif' }}
        >
            Discover how Dhyan has transformed lives and brought peace to thousands of users worldwide. Read their inspiring stories.
        </p>
    </div>
);

// Main Testimonials Component
const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(2);
  const [isAnimating, setIsAnimating] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavigation = (newIndex: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(newIndex);
    setTimeout(() => setIsAnimating(false), 500); // Animation duration
  };

  const nextTestimonial = () => handleNavigation((currentIndex + 1) % testimonials.length);
  const prevTestimonial = () => handleNavigation((currentIndex - 1 + testimonials.length) % testimonials.length);
  const goToTestimonial = (index: number) => handleNavigation(index);

  const getCardStyle = (index: number) => {
    const isMobile = windowWidth < 640; // Tailwind's 'sm' breakpoint

    if (isMobile) {
      const isActive = index === currentIndex;
      return {
        transform: `scale(${isActive ? 1 : 0.9}) translateY(${isActive ? '-10px' : '0px'})`,
        zIndex: isActive ? 10 : 0,
        opacity: isActive ? 1 : 0,
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        pointerEvents: isActive ? 'auto' as const : 'none' as const,
      };
    }

    let cardWidth = windowWidth < 1024 ? 300 : 320;
    // --- CHANGE ---
    // Increased the gap between cards from 30 to 40 for more spacing.
    const distance = cardWidth + 40; 
    const basePositions = [
      { x: -2 * distance, y: 80, rotation: -15, scale: 0.9, zIndex: 1, opacity: 0.7 },
      { x: -distance, y: -10, rotation: -8, scale: 1, zIndex: 5, opacity: 0.9 },
      { x: 0, y: -50, rotation: 0, scale: 1, zIndex: 10, opacity: 1 },
      { x: distance, y: -10, rotation: 8, scale: 1, zIndex: 5, opacity: 0.9 },
      { x: 2 * distance, y: 80, rotation: 15, scale: 0.9, zIndex: 1, opacity: 0.7 },
    ];

    let relativeIndex = index - currentIndex;
    if (relativeIndex > testimonials.length / 2) relativeIndex -= testimonials.length;
    if (relativeIndex < -testimonials.length / 2) relativeIndex += testimonials.length;

    const positionIndex = relativeIndex + 2;

    if (positionIndex < 0 || positionIndex >= basePositions.length) {
      return { opacity: 0, pointerEvents: 'none' as const, transform: 'scale(0)' };
    }

    const pos = basePositions[positionIndex];
    return {
      transform: `translate(${pos.x}px, ${pos.y}px) scale(${pos.scale}) rotate(${pos.rotation}deg)`,
      zIndex: pos.zIndex,
      opacity: pos.opacity,
      transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      pointerEvents: 'auto' as const,
    };
  };

  return (
    <section className="w-full pt-16 sm:pt-20 lg:pt-24 pb-8 sm:pb-12 lg:pb-16 px-4 flex flex-col items-center min-h-screen overflow-hidden relative">
      <div className="relative z-10 w-full max-w-7xl flex flex-col items-center">
        <TestimonialHeader />

        <div className="relative w-full h-[400px] sm:h-[420px] md:h-[450px] lg:h-[480px] flex items-center justify-center mt-4">
          {testimonials.map((testimonial, index) => (
            <div
              key={`${index}-${testimonial.name}`}
              className="absolute"
              style={getCardStyle(index)}
            >
              <TestimonialCard
                {...testimonial}
                isActive={index === currentIndex}
              />
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center w-full gap-4 sm:gap-8 mt-8">
            <ArrowButton direction="left" onClick={prevTestimonial} disabled={isAnimating} />
            <CarouselDots
              total={testimonials.length}
              current={currentIndex}
              onChange={goToTestimonial}
            />
            <ArrowButton direction="right" onClick={nextTestimonial} disabled={isAnimating} />
        </div>
      </div>
    </section>
  );
};

export default Testimonials;