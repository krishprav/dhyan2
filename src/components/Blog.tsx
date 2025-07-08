import React from "react";
import { Link } from "react-router-dom";

interface BlogPost {
  id: number;
  image: string;
  title: string;
  description: string;
}

const Blog: React.FC = () => {
  const blogPosts: BlogPost[] = [
    { id: 1, image: "/blog-1.jpg", title: "The Science of Meditation", description: "Understanding how meditation rewires your brain for peace and clarity." },
    { id: 2, image: "/blog-2.jpg", title: "Ancient Wisdom for Modern Life", description: "Timeless meditation techniques adapted for contemporary living." },
    { id: 3, image: "/blog-3.jpg", title: "Building Daily Practice", description: "Create sustainable meditation habits that transform your daily routine." },
    { id: 4, image: "/blog-4.jpg", title: "Stress to Serenity", description: "Proven methods to overcome anxiety and find lasting inner peace." },
  ];

  return (
    <div className="relative w-full min-h-screen overflow-hidden py-16 sm:py-20 lg:py-24 ">
      <div className="relative z-10 max-w-[1530px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* --- HEADER SECTION --- */}
        <div className="text-center mb-10 md:mb-12">
          {/* Responsive Blogs Title */}
          <h1
            className="mb-4 sm:mb-6 text-5xl md:text-7xl lg:text-[80px]"
            style={{
              color: '#000',
              fontFamily: '"Gelica", sans-serif',
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: 'normal',
            }}
          >
            Blogs
          </h1>

          {/* Responsive Descriptive Paragraph */}
          <p
            className="max-w-[1000px] mx-auto text-md md:text-xl lg:text-[31px]"
            style={{
              color: '#626262',
              fontFamily: '"SF Pro Display", sans-serif',
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: '1.5',
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore <br className="hidden sm:block" />magna aliqua. Ut enim ad minim veniam
          </p>
        </div>

        {/* --- UNIVERSAL "View All" Link --- */}
        <div className="flex justify-end mb-4">
          <Link
            to="/blogs"
            className="text-lg md:text-xl font-medium no-underline transition-opacity hover:opacity-80"
            style={{
              color: '#4285F4',
              fontFamily: '"SF Pro Display", sans-serif',
            }}
          >
            View All
          </Link>
        </div>
        
        {/* --- BLOG CARDS --- */}
        <div className="flex overflow-x-auto gap-4 pb-4 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-[30px] sm:pb-0 justify-start sm:justify-items-center sm:max-w-fit sm:mx-auto no-scrollbar">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="relative w-[300px] sm:w-[360px] h-[500px] flex-shrink-0 rounded-[26px] shadow-[0px_20px_50px_rgba(14,24,44,0.15)] overflow-hidden cursor-pointer
                         transition-all duration-300 ease-in-out group
                         hover:scale-105 sm:hover:scale-108 hover:-translate-y-2 sm:hover:-translate-y-4"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover absolute top-0 left-0 transition-transform duration-300 ease-in-out"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-[#4285F4] to-transparent opacity-0 group-hover:opacity-100
                           transition-opacity duration-300"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white text-left">
                <h3
                  className="mb-2 break-words"
                  style={{
                    fontFamily: '"Gelica", sans-serif',
                    fontSize: '28px',
                    fontWeight: 500,
                    lineHeight: '36.4px'
                  }}
                >
                  {post.title}
                </h3>
                <p
                  className="break-words"
                  style={{
                    fontFamily: '"SF Pro Display", sans-serif',
                    fontSize: '20px',
                    lineHeight: '30px',
                    opacity: 0.9,
                  }}
                >
                  {post.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 md:mt-[186px]" />

        {/* --- CTA Section --- */}
        <div className="relative rounded-[28px] shadow-[0px_20px_50px_rgba(14,24,44,0.15)] text-center max-w-[1304px] h-[404px] mx-auto
                       flex flex-col items-center justify-center
                       px-6 sm:px-[100px] lg:px-[229px] bg-white">
          <img src="/Google Play Store.svg" alt="Google Play" className="absolute w-[64px] h-[64px] top-[24px] left-[24px] transform -rotate-12 opacity-80 hidden md:block" />
          <img src="/Apple App Store.svg" alt="App Store" className="absolute w-[64px] h-[64px] bottom-[24px] right-[24px] transform rotate-12 opacity-80 hidden md:block" />
          <div className="relative z-10 flex flex-col items-center">
            <h2
              className="text-black mb-6 max-w-[566px] text-3xl md:text-[36px]"
              style={{
                fontFamily: '"Gelica", sans-serif',
                fontSize: '24px',
                fontWeight: 400,
                lineHeight: '1.3',
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing
            </h2>
            <p
              className="max-w-[566px] mx-auto mb-10 text-base sm:text-lg md:text-[22px]"
              style={{
                color: '#626262',
                fontFamily: '"SF Pro Display", sans-serif',
                fontSize: '18px',

                lineHeight: '1.5',
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <button
              className="text-white transition-colors transform hover:scale-105"
              style={{
                backgroundColor: '#4285F4',
                fontFamily: '"SF Pro Display", sans-serif',
                fontSize: '16px',
                fontWeight: 500,
                lineHeight: 'normal',
                textAlign: 'center',
                padding: '16px 40px',
                borderRadius: '12px',
              }}
            >
              Try for free &rarr;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;