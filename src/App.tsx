import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/all";
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Social from './components/Social';
import Testimonial from './components/Testimonial';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const featuresRef = useRef(null);

  useEffect(() => {
    // A slight delay to ensure all components are mounted before refreshing ScrollTrigger
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    // Intersection Observer to hide Navbar in Features section
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setShowNavbar(!entry.isIntersecting);
        });
      },
      { threshold: 0.5 }
    );
    if (featuresRef.current) {
      observer.observe(featuresRef.current);
    }
    return () => {
      clearTimeout(timer);
      if (featuresRef.current) observer.unobserve(featuresRef.current);
    };
  }, []);

  return (
    // This single div holds the entire page's responsive background
    <div className="main-container">
      {showNavbar && <Navbar />}

      {/* The Hero video will play and fade out to reveal the background image */}
      <Hero />

      {/* Attach the ref here for the navbar observer */}
      <div ref={featuresRef}>
        <Features />
      </div>

      <Social />
      <Testimonial />
      <Blog />
      <Contact />
      <Footer />
    </div>
  );
};

export default App;