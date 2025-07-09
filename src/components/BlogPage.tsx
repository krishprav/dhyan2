import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import InteractiveStars from "./InteractiveStars";
import Navbar from "./Navbar";
import Contact from "./Contact";
import Footer from "./Footer";

interface BlogPost {
  id: number;
  image: string;
  title: string;
  description: string;
  date: string;
  category: string;
}

const BlogPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("Knowledge");
  const [searchTerm, setSearchTerm] = useState("");
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = -(e.clientY / window.innerHeight) * 2 + 1;
    setMouse({ x, y });
  };

  const categories = ["Knowledge", "Service", "Devotion", "Yoga", "Meditation"];

  const blogPosts: BlogPost[] = [
    { 
      id: 1, 
      image: "/blog_image.png", 

      title: "Osho: Alertness Awareness Mindfulness", 
      description: "TriLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut...",
      date: "02 Jun 2025",
      category: "Knowledge"
    },
    { 
      id: 2, 
      image: "/blog_image.png", 
      title: "Osho: Alertness Awareness Mindfulness", 
      description: "TriLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut...",
      date: "02 Jun 2025",
      category: "Knowledge"
    },
    { 
      id: 3, 
      image: "/blog_image.png", 
      title: "Osho: Alertness Awareness Mindfulness", 
      description: "TriLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut...",
      date: "02 Jun 2025",
      category: "Service"
    },
    { 
      id: 4, 
      image: "/blog_image.png", 
      title: "Osho: Alertness Awareness Mindfulness", 
      description: "TriLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut...",
      date: "02 Jun 2025",
      category: "Devotion"
    },
    { 
      id: 5, 
      image: "/blog_image.png", 
      title: "Osho: Alertness Awareness Mindfulness", 
      description: "TriLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut...",
      date: "02 Jun 2025",
      category: "Yoga"
    },
    { 
      id: 6, 
      image: "/blog_image.png", 
      title: "Osho: Alertness Awareness Mindfulness", 
      description: "TriLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut...",
      date: "02 Jun 2025",
      category: "Meditation"
    },
    { 
      id: 7, 
      image: "/blog_image.png", 
      title: "Osho: Alertness Awareness Mindfulness", 
      description: "TriLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut...",
      date: "02 Jun 2025",
      category: "Knowledge"
    },    { 
      id: 8, 
      image: "/blog_image.png", 
      title: "Osho: Alertness Awareness Mindfulness", 
      description: "TriLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut...",
      date: "02 Jun 2025",
      category: "Knowledge"
    },    { 
      id: 9, 
      image: "/blog_image.png", 
      title: "Osho: Alertness Awareness Mindfulness", 
      description: "TriLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut...",
      date: "02 Jun 2025",
      category: "Knowledge"
    },
    { 
      id: 10, 
      image: "/blog_image.png", 
      title: "Osho: Alertness Awareness Mindfulness", 
      description: "TriLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut...",
      date: "02 Jun 2025",
      category: "Knowledge"
    },
  ];

  const filteredPosts = blogPosts.filter(post => 
    post.category === selectedCategory && 
    (post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
     post.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const BlogCard = ({ post }: { post: BlogPost }) => (
    <div 
             style={{
         width: '100%', 
         height: '100%', 
         padding: '18.15px', 
         background: 'white', 
         borderRadius: '23.99px', 
         outline: '1.51px #EEEEEE solid', 
         outlineOffset: '-1.51px', 
         flexDirection: 'column', 
         justifyContent: 'center', 
         alignItems: 'center', 
         gap: '12px', 
         display: 'inline-flex',
         cursor: 'pointer',
         transition: 'all 0.3s ease'
       }}
      className="hover:shadow-lg hover:-translate-y-1"
      onClick={() => navigate(`/blogs/${post.id}`)}
    >
      <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: '20.99px', display: 'flex'}}>
        <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: '18.15px', display: 'flex'}}>
          <div style={{alignSelf: 'stretch', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', gap: '12.10px', display: 'flex'}}>
            <div style={{alignSelf: 'stretch', justifyContent: 'flex-start', alignItems: 'center', gap: '18.15px', display: 'inline-flex'}}>
              <div style={{flex: '1 1 0', justifyContent: 'flex-start', alignItems: 'center', gap: '14.99px', display: 'flex'}}>
                <div style={{flex: '1 1 0', justifyContent: 'flex-start', alignItems: 'flex-start', gap: '6.05px', display: 'flex'}}>
                  <div style={{color: '#7B7B7B', fontSize: '18px', fontFamily: 'Inter', fontWeight: '400', lineHeight: '25.20px', wordWrap: 'break-word'}}>Posted on</div>
                  <div style={{color: '#676767', fontSize: '18.15px', fontFamily: 'Satoshi', fontWeight: '400', wordWrap: 'break-word'}}>•</div>
                  <div style={{color: '#7B7B7B', fontSize: '18px', fontFamily: 'Inter', fontWeight: '400', lineHeight: '25.20px', wordWrap: 'break-word'}}>{post.date}</div>
                </div>
              </div>
              <div style={{width: '30.25px', height: '30.25px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'}}>
                <svg width="16" height="4" viewBox="0 0 16 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="2" cy="2" r="2" fill="#141414"/>
                  <circle cx="8" cy="2" r="2" fill="#141414"/>
                  <circle cx="14" cy="2" r="2" fill="#141414"/>
                </svg>
              </div>
            </div>
          </div>
          <img 
            style={{width: '100%', height: '269.90px', borderRadius: '10.59px', objectFit: 'cover'}} 
            src={post.image}
            alt={post.title}
          />
        </div>
      </div>
      <div style={{width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start', gap: '6.05px', display: 'inline-flex'}}>
        <div style={{color: '#141414', fontSize: '20px', fontFamily: 'Inter', fontWeight: '600', lineHeight: '24px', wordWrap: 'break-word'}}>{post.title}</div>
      </div>
      <div style={{alignSelf: 'stretch'}}>
        <span style={{color: '#676767', fontSize: '18px', fontFamily: 'Inter', fontWeight: '400', lineHeight: '25.20px', wordWrap: 'break-word'}}>{post.description} </span>
        <span style={{color: '#007AFF', fontSize: '18px', fontFamily: 'Inter', fontWeight: '500', lineHeight: '25.20px', wordWrap: 'break-word', textDecoration: 'none'}}>Read Full Article →</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen relative overflow-hidden" onMouseMove={handleMouseMove}>
      {/* Interactive Stars Background */}
      <div className="absolute inset-0 z-0">
        <div 
          className={`
            w-full h-full
            ${isDesktop 
              ? 'md:w-[1930px] md:h-[362px] md:absolute md:top-0 md:left-1/2 md:transform md:-translate-x-1/2' 
              : 'relative min-h-screen'
            }
          `}
        >
          <Canvas
            camera={{ 
              position: [0, 0, 10], 
              fov: isDesktop ? 60 : 75 
            }}
            style={{ 
              pointerEvents: "none",
              width: '100%',
              height: '100%'
            }}
          >
            <InteractiveStars mouse={mouse} />
          </Canvas>
        </div>
      </div>

      {/* Blog Background Images */}
      <div className="absolute inset-0 z-1" style={{ top: isDesktop ? '362px' : '0px' }}>
        {/* Main Blog Background */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/blog_bg.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            width: '100%',
            minHeight: '100vh'
          }}
        />
        
      </div>

      {/* Navbar */}
      <div className="relative z-50">
        <Navbar />
      </div>

      {/* Title and Search Section - Above Interactive Stars */}
      <div className="relative z-20 py-8">
        <h1 
          style={{ 
            position: 'absolute',
            left: '148px',
            top: '181px',
            width: '203px',
            height: '95px',
            color: 'white', 
            fontSize: '80px', 
            fontFamily: 'Gelica', 
            fontWeight: '400', 
            wordWrap: 'break-word',
            lineHeight: '95px',
            textAlign: 'left'
          }}
        >
          Blogs
        </h1>
        
                {/* Search Bar - Same line as Blogs title */}
        <div 
          style={{ 
            position: 'absolute',
            right: '148px',
            top: '181px',
            height: '95px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}
        >
          {/* Search Input Container */}
          <div 
            style={{
              width: '350px',
              height: '68px',
              padding: '20px 30px 20px 42px',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '34px',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(20px)',
              display: 'flex',
              alignItems: 'center',
              gap: '16px'
            }}
          >
            {/* Search Icon */}
            <div style={{
              width: '20px',
              height: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <svg 
                width="18" 
                height="18" 
                viewBox="0 0 20 20" 
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zM19 19l-4.35-4.35" 
                  stroke="rgba(255, 255, 255, 0.7)" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            
            {/* Search Input */}
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent border-none outline-none flex-1 placeholder-white placeholder-opacity-70"
              style={{
                fontFamily: 'SF Pro Display',
                fontWeight: '400',
                fontSize: '16px',
                borderRadius: '24px',
                color: '#FFFFFF'
              }}
            />
          </div>
          
          {/* Search Button - Outside the search bar */}
          <button 
            style={{
              background: '#007AFF',
              borderRadius: '24px',
              padding: '14px 28px',
              border: 'none',
              cursor: 'pointer',
              color: 'white',
              fontSize: '16px',
              fontFamily: 'SF Pro Display',
              fontWeight: '500',
              height: '68px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              whiteSpace: 'nowrap'
            }}
            className="hover:bg-blue-600 transition-colors"
          >
            Search
          </button>
        </div>
      </div>

      {/* Main Content - Below Interactive Stars */}
      <div className="relative z-20 max-w-7xl mx-auto px-4" style={{ paddingTop: '320px', paddingBottom: '32px' }}>

                  {/* Category Tabs */}
          <div 
            className="flex justify-center mb-8 px-4"
            style={{
              gap: 'clamp(6px, 1.5vw, 20px)',
              flexWrap: 'nowrap',
              width: '100%',
              maxWidth: '100vw',
              overflowX: 'auto'
            }}
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className="transition-all hover:scale-105 flex-shrink-0"
                style={{
                  width: 'clamp(120px, 14vw, 220px)',
                  height: 'clamp(40px, 4.5vw, 60px)',
                  background: selectedCategory === category 
                    ? 'linear-gradient(360deg, #007AFF 0%, #04BEFE 100%)'
                    : 'linear-gradient(0deg, #E8F3FF 0%, #E8F3FF 100%), linear-gradient(360deg, #007AFF 0%, #04BEFE 100%)',
                  borderRadius: '20px',
                  border: '1px #B8B8B8 solid',
                  color: selectedCategory === category ? 'white' : '#6F6F6F',
                  fontSize: 'clamp(14px, 1.5vw, 20px)',
                  fontFamily: 'SF Pro Display',
                  fontWeight: '400',
                  wordWrap: 'break-word',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textAlign: 'center',
                  minWidth: '100px'
                }}
              >
                {category}
              </button>
            ))}
          </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

                  {/* Load More Button */}
          <div className="text-center">
            <button 
              className="inline-flex items-center gap-3 text-white px-8 py-4 rounded-full font-medium hover:opacity-90 transition-all"
              style={{
                background: 'linear-gradient(90deg, #007AFF 0%, #04BEFE 100%)',
                fontSize: '18px',
                fontFamily: 'SF Pro Display',
                fontWeight: '500'
              }}
            >
              Load more blogs
              <img 
                src="/assets/images/right.svg" 
                alt="arrow" 
                className="w-[7px] h-[11px] ml-1"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
            </button>
          </div>
        </div>

        {/* Contact Section */}
        <div className="relative z-20">
          <Contact />
        </div>

        {/* Footer Section */}
        <div className="relative z-20">
          <Footer />
        </div>
      </div>
  );
};

export default BlogPage; 



 