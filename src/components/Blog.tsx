/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { firestore } from "../firebase";
import { collection, getDocs, query, where, limit } from "firebase/firestore";

interface BlogPost {
  id: string;
  primaryTitle: string;
  subTitle: string;
  teaserImageURL: string;
  originalAuthorName: string;
  ArticleCategory: string;
  multiMediaType: string;
}

const Blog: React.FC = () => {
  function pickFourRandomItems(arr: any[]) {
    const shuffled = arr.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 4);
  }

  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch from all categories and then pick 4 random
        const q = query(
          collection(firestore, 'articleFilesV1'),
          where('availableOnWebsite', '==', true),
          limit(20) // Get more to have better random selection
        );
        const snapshot = await getDocs(q);
        const newData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as BlogPost[];
        console.log("blog Data is ", newData);
        setBlogs(pickFourRandomItems(newData));
      } catch (error) {
        console.error("Error fetching data: ", error);
        // Fallback to empty array on error
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="relative w-full min-h-screen py-16 sm:py-20 lg:py-24 ">
      <div className="relative z-10 max-w-[1530px] mx-auto px-4 sm:px-6 lg:px-8 overflow-visible">

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
            Explore our collection of articles on meditation, spirituality, and mindful living <br className="hidden sm:block" />to guide you on your journey to inner peace and self-discovery.
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
        {loading ? (
          <div className="flex justify-center items-center h-[500px]">
            <div className="text-xl text-gray-500">Loading blogs...</div>
          </div>
        ) : blogs.length === 0 ? (
          <div className="flex justify-center items-center h-[500px]">
            <div className="text-xl text-gray-500">No blogs found.</div>
          </div>
        ) : (
          <div className="px-8 py-16 sm:px-12 sm:py-20 lg:px-16 lg:py-24 overflow-visible">
            <div className="flex overflow-x-auto overflow-y-visible gap-24 pb-20 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-32 lg:gap-40 xl:gap-48 sm:pb-24 sm:overflow-visible justify-start sm:justify-items-center sm:max-w-fit sm:mx-auto no-scrollbar">
              {blogs.map((post) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.id}?type=${post.ArticleCategory}`}
                  className="relative w-[300px] sm:w-[360px] h-[500px] flex-shrink-0 rounded-[26px] shadow-[0px_20px_50px_rgba(14,24,44,0.15)] overflow-hidden cursor-pointer
                             transition-all duration-300 ease-in-out group
                             hover:scale-105 sm:hover:scale-108 hover:-translate-y-2 sm:hover:-translate-y-4
                             mx-8 sm:mx-6 lg:mx-8"
                >
                  <img
                    src={post.teaserImageURL || "/blog-1.jpg"}
                    alt={post.primaryTitle}
                    className="w-full h-full object-cover absolute top-0 left-0 transition-transform duration-300 ease-in-out"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/blog-1.jpg";
                    }}
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
                      {post.primaryTitle.length > 50 
                        ? `${post.primaryTitle.slice(0, 50)}...` 
                        : post.primaryTitle}
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
                      {post.subTitle || `By ${post.multiMediaType !== "spinnedAudio" ? post.originalAuthorName : "Dhyan App"}`}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

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
              Start Your Meditation Journey Today
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
              Download the Dhyan app and access thousands of guided meditations,
              breathing exercises, and mindfulness practices.
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