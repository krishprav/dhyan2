/* eslint-disable @typescript-eslint/no-explicit-any */
import { SlCalender } from "react-icons/sl";
import { IoPersonSharp } from "react-icons/io5";
import Markdown from "react-markdown";
import { Link, useParams } from "react-router-dom";
import { firestore } from "../../firebase";
import { collection, doc, getDoc, getDocs, limit, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";

const BlogPage = () => {
    const { id } = useParams();
    const [data, setData] = useState<any>();
    const [blogs, setBlogs] = useState<any>();
    const [loading, setLoading] = useState(true);
    const queryParams = new URLSearchParams(window.location.search);
    const type = queryParams.get('type');

    // Fetch current blog post
    useEffect(() => {
        const fetchData = async () => {
            if (!id) return;
            
            setLoading(true);
            try {
                const docRef = doc(firestore, "articleFilesV1", id);
                const docSnapshot = await getDoc(docRef);

                if (docSnapshot.exists()) {
                    setData({ id: docSnapshot.id, ...docSnapshot.data() });
                    console.log({ id: docSnapshot.id, ...docSnapshot.data() });
                } else {
                    console.log('No such document!');
                }
            } catch (error) {
                console.error('Error getting document:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]);

    // Fetch related blogs
    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const q = query(
                    collection(firestore, 'articleFilesV1'), 
                    where('ArticleCategory', '==', type), 
                    where('availableOnWebsite', '==', true),
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
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-2xl text-gray-500">Loading blog...</div>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-2xl text-gray-500">Blog not found</div>
            </div>
        );
    }

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
                    src={data?.backgroundImageURL || data?.teaserImageURL || "/blog-1.jpg"} 
                    onError={(e) => {
                        (e.target as HTMLImageElement).src = "/blog-1.jpg";
                    }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 z-20"></div>
                <div className="w-full z-30 text-white absolute bg-transparent h-full flex flex-col max-md:items-start justify-end p-14 max-md:p-5">
                    <Link 
                        to="/blogs" 
                        className="absolute font-bigshoulderdisplay text-2xl bg-black top-5 border-2 px-5 max-md:text-sm py-1 text-center hover:bg-gray-800 transition-colors"
                    >
                        ← Back to Blogs
                    </Link>
                    <div>
                        <div 
                            className="text-6xl max-md:text-2xl pb-10"
                            style={{
                                fontFamily: '"Gelica", sans-serif',
                                fontWeight: 400,
                            }}
                        >
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
                                {formatDate(data?.date)}
                            </div>
                        </div>
                    </div>
                    {data?.audioURL && (
                        <div className="mt-6">
                            <audio className="max-md:scale-75" controls src={data?.audioURL}>
                                Your browser does not support the audio element.
                            </audio>
                        </div>
                    )}
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
                        {blogs?.filter((item: any) => item.id !== id).slice(0, 3).map((e: any) => (
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

            {/* Footer */}
            <div className="relative z-20">
                <Footer />
            </div>
        </div>
    );
}

export default BlogPage; 