import { useEffect, useRef, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
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
import { Blogs } from './components/pages/Blogs';
import BlogPage from './components/pages/BlogPage';

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const featuresRef = useRef(null);

  useEffect(() => {
    // Refresh ScrollTrigger after all components mount
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    // Create a ScrollTrigger to hide navbar during Features section
    ScrollTrigger.create({
      trigger: "#features",
      start: "top 10%",
      end: "bottom 10%",
      onEnter: () => setShowNavbar(false),
      onLeave: () => setShowNavbar(true),
      onEnterBack: () => setShowNavbar(false),
      onLeaveBack: () => setShowNavbar(true),
    });

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const HomePage = () => (
    <div className="main-container">
      {showNavbar && <Navbar />}
      <Hero />
      <Features />
      <Social />
      <Testimonial />
      <Blog />
      <Contact />
      <Footer />
    </div>
  );

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/blog/:id" element={<BlogPage />} />
    </Routes>
  );
};

export default App;