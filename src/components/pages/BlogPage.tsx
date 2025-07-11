/* eslint-disable @typescript-eslint/no-explicit-any */
import { SlCalender } from "react-icons/sl";
import { IoPersonSharp } from "react-icons/io5";
import Markdown from "react-markdown";
import { Link, useLocation, useParams } from "react-router-dom";
import { firestore } from "../../firebase";
import { collection, doc, getDoc, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import getTime from "../../utils/getTime";

const BlogPage = () => {
    const location = useLocation();
    const pathSegments = location.pathname.split('/');
    const lastRouteName = pathSegments[pathSegments.length - 1];
    const { id } = useParams();
    const [data, setData] = useState<any>();
    const [blogs, setBlogs] = useState<any>();
    const [showBackToTop, setShowBackToTop] = useState(false);
    const queryParams = new URLSearchParams(window.location.search);
    const type = queryParams.get('type');

    // Fetch current blog post
    useEffect(() => {
        const fetchData = async () => {
            try {
                const docRef = doc(firestore, "articleFilesV1", lastRouteName);
                const docSnapshot = await getDoc(docRef);

                if (docSnapshot.exists()) {
                    setData({ id: docSnapshot.id, ...docSnapshot.data() });
                    console.log({ id: docSnapshot.id, ...docSnapshot.data() });
                } else {
                    console.log('No such document!');
                }
            } catch (error) {
                console.error('Error getting document:', error);
            }
        };

        fetchData();
    }, [lastRouteName]);

    // Fetch related blogs
    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const q = query(
                    collection(firestore, 'articleFilesV1'), 
                    where('category', '==', type), 
                    orderBy('date', 'desc'), 
                    limit(4)
                );
                const snapshot = await getDocs(q);
                const newData = await snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                console.log("related blog Data is ", newData);
                setBlogs(newData);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        if (type) {
            fetchAllData();
        }
    }, [type]);

    const formatData = (longText: string) => {
        if (longText && /<br\s*\/?>/i.test(longText)) {
            return longText.replace(/<br\s*\/?>/gi, '\n').replace(/\n{2,}/g, '\n\n');
        } else {
            return longText;
        }
    };
//@ts-ignore
    const formatDate = (dateString: string) => {
        if (!dateString) return "Recently Updated";
        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            });
        } catch {
            return "Recently Updated";
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Show/hide back to top button based on scroll position
    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            setShowBackToTop(scrollTop > 300);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Scroll to top function
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <div className="h-full w-screen relative" 
             style={{
                 backgroundImage: "url('/blog_bg.png')",
                 backgroundSize: 'cover',
                 backgroundPosition: 'center',
                 backgroundRepeat: 'no-repeat',
                 minHeight: '100vh'
             }}>
            {/* Navbar */}
            <div className="relative z-50">
                <Navbar />
            </div>

            {/* Hero Section */}
            <div className="relative h-screen max-md:h-[50vh] w-full">
                <img 
                    className="h-full w-full absolute z-10 object-cover" 
                    src={data?.backgroundImageURL} 
                    onError={(e) => {
                        // Fallback to teaserImageURL if backgroundImageURL fails
                        const target = e.target as HTMLImageElement;
                        if (target.src !== data?.teaserImageURL && data?.teaserImageURL) {
                            target.src = data.teaserImageURL;
                        } else {
                            target.src = "/blog-1.jpg";
                        }
                    }}
                    onLoad={() => {
                        console.log('Background image loaded successfully:', data?.backgroundImageURL);
                    }}
                />
                <div className="w-full z-30 text-white absolute bg-transparent h-full flex flex-col max-md:items-start justify-end p-14 max-md:p-5">
                    <Link 
                        to="/#blog" 
                        className="absolute top-5 left-5 flex items-center gap-2 px-6 py-3 rounded-full 
                                 bg-white/10 backdrop-blur-md border border-white/20 
                                 text-white font-medium text-base transition-all duration-300
                                 hover:bg-white/20 hover:border-white/30 hover:scale-105
                                 shadow-lg hover:shadow-xl"
                        style={{ fontFamily: '"SF Pro Display", sans-serif' }}
                    >
                        <svg 
                            className="w-4 h-4" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M10 19l-7-7m0 0l7-7m-7 7h18" 
                            />
                        </svg>
                        Back to Blogs
                    </Link>
                    <div>
                        <div className="font-bigshoulderdisplay text-6xl max-md:text-2xl pb-10">
                            {data?.primaryTitle}
                        </div>
                        {data?.subTitle && (
                            <div 
                                className="text-2xl max-md:text-lg mb-6 opacity-90"
                                style={{
                                    fontFamily: '"SF Pro Display", sans-serif',
                                }}
                            >
                                {data.subTitle}
                            </div>
                        )}
                        <div className="flex items-start gap-5 max-md:gap-1 max-md:flex-col text-xl max-md:text-sm">
                            <div className="inline-flex gap-2 justify-center items-center">
                                <IoPersonSharp />
                                {data?.multiMediaType !== "spinnedAudio" ? data?.originalAuthorName : "Dhyan App"}
                            </div>
                            <div className="inline-flex gap-2 justify-center items-center">
                                <SlCalender /> 
                                Updated on: {data?.date ? getTime(data.date) : 'No date available'}
                            </div>
                        </div>
                    </div>
                    <audio className="max-md:scale-75" controls src={data?.audioURL}></audio>
                </div>
            </div>

            {/* Blog Content */}
            <div className="py-16 px-[158px] max-md:p-8 text-justify">
                <div 
                    className="whitespace-pre-wrap max-w-none"
                    style={{
                        color: 'black',
                        fontSize: '20px',
                        fontFamily: 'SF Pro Display',
                        fontWeight: '400',
                        lineHeight: '36px',
                        wordWrap: 'break-word'
                    }}
                >
                    {data?.fullText ? (
                        <Markdown
                            components={{
                                p: ({children}) => (
                                    <p style={{
                                        color: 'black',
                                        fontSize: '20px',
                                        fontFamily: 'SF Pro Display',
                                        fontWeight: '400',
                                        lineHeight: '36px',
                                        wordWrap: 'break-word',
                                        marginBottom: '20px'
                                    }}>
                                        {children}
                                    </p>
                                ),
                                h1: ({children}) => (
                                    <h1 style={{
                                        color: 'black',
                                        fontSize: '32px',
                                        fontFamily: 'SF Pro Display',
                                        fontWeight: '600',
                                        lineHeight: '40px',
                                        marginBottom: '24px',
                                        marginTop: '32px'
                                    }}>
                                        {children}
                                    </h1>
                                ),
                                h2: ({children}) => (
                                    <h2 style={{
                                        color: 'black',
                                        fontSize: '28px',
                                        fontFamily: 'SF Pro Display',
                                        fontWeight: '600',
                                        lineHeight: '36px',
                                        marginBottom: '20px',
                                        marginTop: '28px'
                                    }}>
                                        {children}
                                    </h2>
                                ),
                                h3: ({children}) => (
                                    <h3 style={{
                                        color: 'black',
                                        fontSize: '24px',
                                        fontFamily: 'SF Pro Display',
                                        fontWeight: '600',
                                        lineHeight: '32px',
                                        marginBottom: '16px',
                                        marginTop: '24px'
                                    }}>
                                        {children}
                                    </h3>
                                ),
                                strong: ({children}) => (
                                    <strong style={{
                                        color: 'black',
                                        fontWeight: '600'
                                    }}>
                                        {children}
                                    </strong>
                                )
                            }}
                        >
                            {formatData(data.fullText)}
                        </Markdown>
                    ) : (
                        <div className="text-gray-500 text-center py-10">
                            No content available for this blog post.
                        </div>
                    )}
                </div>
            </div>

            {/* Related Articles */}
            {blogs && blogs.length > 0 && (
                <div className="py-5 bg-gray-50">
                    <div 
                        className="text-[64px] self-center max-sm:text-[36px] px-16 max-md:px-8 text-center mb-8 text-gray-900"
                        style={{
                            fontFamily: '"Gelica", sans-serif',
                            fontWeight: 400,
                        }}
                    >
                        Related Articles
                    </div>
                    <div className="flex gap-7 items-center justify-center w-full overflow-x-auto overflow-y-hidden noScroll px-16 max-md:px-8">
                        {blogs
                            ?.filter((item: any) => item.id !== id)
                            .slice(0, 3)
                            .map((e: any) => (
                                <Link 
                                    to={`/blog/${e.id}?type=${type}`} 
                                    className="h-[344px] min-w-[400px] max-w-[400px] flex-shrink-0 bg-white rounded-3xl shadow-lg hover:scale-105 transition-transform duration-300"
                                    key={e.id}
                                >
                                    <img 
                                        className="h-[268px] w-full object-cover rounded-t-3xl" 
                                        src={e?.teaserImageURL || "/blog-1.jpg"} 
                                        onError={(event) => {
                                            (event.target as HTMLImageElement).src = "/blog-1.jpg";
                                        }}
                                    />
                                    <div className="text-left w-full bg-cover p-[5%] font-medium text-sm">
                                        <div className="font-semibold mb-2">
                                            {e?.primaryTitle.length > 60 
                                                ? `${e?.primaryTitle.slice(0, 60)}...` 
                                                : e?.primaryTitle}
                                        </div>
                                        <div className="text-gray-600 text-xs">
                                            {e?.multiMediaType !== "spinnedAudio" ? e?.originalAuthorName : "Dhyan App"}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                    </div>
                </div>
            )}

            {/* Back to Top Button */}
            {showBackToTop && (
                <div className="flex justify-center py-8">
                    <button
                        onClick={scrollToTop}
                        className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 
                                 flex items-center justify-center text-gray-800 
                                 transition-all duration-300 hover:bg-white/20 hover:border-white/30 
                                 hover:scale-110 shadow-lg hover:shadow-xl
                                 bg-gradient-to-r from-white/15 to-white/5"
                        aria-label="Back to top"
                    >
                        <svg 
                            className="w-6 h-6" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M5 10l7-7m0 0l7 7m-7-7v18" 
                            />
                        </svg>
                    </button>
                </div>
            )}

            {/* Footer */}
            <div className="relative z-20">
                <Footer />
            </div>
        </div>
    );
}

export default BlogPage; 