import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
  fullContent: string;
  date: string;
  category: string;
  author: string;
  readTime: string;
}

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
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

  // Mock blog data - in a real app, this would come from an API
  const blogPosts: BlogPost[] = [
    { 
      id: 1, 
      image: "/blog_image.png", 
      title: "Osho: Alertness Awareness Mindfulness", 
      description: "TriLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut...",
      fullContent: `
        <p>Vipassana is often described as a form of meditation that seeks insight into the true nature of reality. Let's break down the word itself, vi - multiple, passana - to see something in a unique way or seeing more closely. It has one main objective - to help us train ourselves to see things as they truly are, which only happens when we are fully in the present moment and nowhere else.</p>

        <p>We are then able to accept that everything in this world is impermanent and breakthrough illusions or Maya and work towards Moksha or liberation. Vipassana can be further divided into two parts, Observation, and Control.</p>

        <h2>Understanding Observation and Control</h2>
        <p>To be able to emphasize control over anything, you first have to study the object, understand it carefully, and only then you will be able to form an opinion or pass judgment and then achieve any sort of control over it. In this case, the observation we are referring to is Self-Study.</p>

        <h2>Practical Application: The Bed-Making Practice</h2>
        <p>Take for example: How do you leave your bedroom after you have finished your morning rituals? Do you make your bed or leave it messy? Do you depend on the housekeeper to make your bed for you? Studies show that making your bed every morning is correlated with better productivity, a greater sense of well-being and stronger skills at sticking to a budget.</p>

        <p>If you start your day by making your bed then you have already accomplished one task for the day. Some studies even show this habit leads to better sleep at night.</p>

        <h2>The Path to Liberation</h2>
        <p>Vipassana is often described as a form of meditation that seeks insight into the true nature of reality. Let's break down the word itself, vi - multiple, passana - to see something in a unique way or seeing more closely. It has one main objective - to help us train ourselves to see things as they truly are, which only happens when we are fully in the present moment and nowhere else.</p>

        <p>We are then able to accept that everything in this world is impermanent and breakthrough illusions or Maya and work towards Moksha or liberation. Vipassana can be further divided into two parts, Observation, and Control.</p>

        <h2>Self-Study and Mindful Living</h2>
        <p>To be able to emphasize control over anything, you first have to study the object, understand it carefully, and only then you will be able to form an opinion or pass judgment and then achieve any sort of control over it. In this case, the observation we are referring to is Self-Study.</p>

        <p>Take for example: How do you leave your bedroom after you have finished your morning rituals? Do you make your bed or leave it messy? Do you depend on the housekeeper to make your bed for you? Studies show that making your bed every morning is correlated with better productivity, a greater sense of well-being and stronger skills at sticking to a budget.</p>

        <p>If you start your day by making your bed then you have already accomplished one task for the day. Some studies even show this habit leads to better sleep at night.</p>
      `,
      date: "02 Jun 2025",
      category: "Knowledge",
      author: "Dharma Singh",
      readTime: "8 min read"
    },
    // Add more blog posts as needed
  ];

  const currentPost = blogPosts.find(post => post.id === parseInt(id || '1'));

  if (!currentPost) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Blog post not found</h1>
          <button 
            onClick={() => navigate('/blogs')}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Back to Blogs
          </button>
        </div>
      </div>
    );
  }

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

      {/* Blog Background */}
      <div className="absolute inset-0 z-1" style={{ top: isDesktop ? '362px' : '0px' }}>
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

      {/* Back Button */}
      <div className="relative z-20 pt-8 pl-8">
        <button 
          onClick={() => navigate('/blogs')}
          className="flex items-center gap-2 text-white hover:text-blue-300 transition-colors"
          style={{
            fontSize: '16px',
            fontFamily: 'SF Pro Display',
            fontWeight: '400'
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5M12 19L5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back to Blogs
        </button>
      </div>

      {/* Main Content */}
      <div className="relative z-20 max-w-4xl mx-auto px-4" style={{ paddingTop: '40px', paddingBottom: '80px' }}>
        
        {/* Blog Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <span 
              className="px-4 py-2 rounded-full text-sm font-medium"
              style={{
                background: 'linear-gradient(360deg, #007AFF 0%, #04BEFE 100%)',
                color: 'white',
                fontFamily: 'SF Pro Display'
              }}
            >
              {currentPost.category}
            </span>
            <span className="text-gray-300 text-sm">
              {currentPost.date} • {currentPost.readTime}
            </span>
          </div>

          <h1 
            className="text-white mb-6"
            style={{
              color: 'white', 
              fontSize: '80px', 
              fontFamily: 'FONTSPRING DEMO - Gelica Rg', 
              fontWeight: '400', 
              wordWrap: 'break-word',
              lineHeight: '1.2'
            }}
          >
            {currentPost.title}
          </h1>

          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-medium text-sm">
                {currentPost.author.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div>
              <p className="text-white font-medium" style={{ fontFamily: 'SF Pro Display' }}>
                {currentPost.author}
              </p>
              <p className="text-gray-300 text-sm">Author</p>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="mb-12">
          <img 
            src={currentPost.image}
            alt={currentPost.title}
            className="w-full h-80 object-cover rounded-lg"
          />
        </div>

        {/* Blog Content */}
        <div 
          className="prose prose-lg max-w-none"
          style={{
            color: 'white',
            fontFamily: 'SF Pro Display',
            fontSize: '18px',
            lineHeight: '1.7'
          }}
        >
          <div 
            dangerouslySetInnerHTML={{ __html: currentPost.fullContent }}
            className="blog-content"
          />
        </div>

        {/* Share Section */}
        <div className="mt-16 pt-8 border-t border-gray-600">
          <h3 className="text-white text-xl font-medium mb-6" style={{ fontFamily: 'SF Pro Display' }}>
            Share this article
          </h3>
          <div className="flex gap-4">
            <button className="p-3 bg-blue-600 hover:bg-blue-700 rounded-full transition-colors">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
              </svg>
            </button>
            <button className="p-3 bg-blue-800 hover:bg-blue-900 rounded-full transition-colors">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.566-1.35 2.14-2.21z"/>
              </svg>
            </button>
            <button className="p-3 bg-green-600 hover:bg-green-700 rounded-full transition-colors">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.56-.01-.188 0-.49.07-.747.35-.257.28-.983.96-.983 2.34 0 1.38.983 2.71 1.12 2.91.137.2 1.949 2.98 4.72 4.18.66.28 1.18.45 1.58.57.66.21 1.26.18 1.74.11.53-.08 1.76-.72 2.01-1.41.248-.7.248-1.3.173-1.42-.074-.12-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.89 3.488"/>
              </svg>
            </button>
          </div>
        </div>

      </div>

      {/* Contact Section */}
      <div className="relative z-20">
        <Contact />
      </div>

      {/* Footer */}
      <div className="relative z-20">
        <Footer />
      </div>

      <style>{`
        .blog-content h2 {
          color: white;
          font-size: 28px;
          font-weight: 600;
          margin: 32px 0 16px 0;
          font-family: 'SF Pro Display', sans-serif;
        }
        
        .blog-content h3 {
          color: white;
          font-size: 24px;
          font-weight: 600;
          margin: 24px 0 12px 0;
          font-family: 'SF Pro Display', sans-serif;
        }
        
        .blog-content p {
          margin-bottom: 20px;
          color: rgba(255, 255, 255, 0.9);
        }
        
        .blog-content strong {
          color: white;
          font-weight: 600;
        }
        
        .blog-content em {
          font-style: italic;
          color: rgba(255, 255, 255, 0.8);
        }
      `}</style>
    </div>
  );
};

export default BlogDetail; 