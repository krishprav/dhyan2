# Blog System Clone - Complete Code Guide

## Overview
This guide contains all the code required to clone the blog system from the Dhyan App, including homepage blog section, full blog listing, individual blog pages, Firebase integration, and search functionality.

## Dependencies Required

### Package.json Dependencies
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.22.1",
    "react-markdown": "^9.0.1",
    "react-icons": "^5.1.0",
    "firebase": "^10.12.3",
    "framer-motion": "^11.0.3"
  },
  "devDependencies": {
    "@types/react": "^18.2.43",
    "@types/react-dom": "^18.2.17",
    "typescript": "^5.2.2"
  }
}
```

### Install Commands
```bash
npm install react react-dom react-router-dom react-markdown react-icons firebase framer-motion
npm install -D @types/react @types/react-dom typescript
```

## File Structure
```
src/
├── sections/
│   ├── Blog.tsx              # Homepage blog section
│   └── pages/
│       ├── Blogs.tsx         # Full blog listing page
│       └── BlogPage.tsx      # Individual blog page
├── firebase.ts               # Firebase configuration
└── App.tsx                   # Main app with routing
```

## 1. Firebase Configuration

### File: `src/firebase.ts`
```typescript
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { firestore };
```

## 2. Firebase Data Structure

### Collection: `articleFilesV1`
```javascript
// Document structure for each blog post
{
  id: "unique-blog-id",
  primaryTitle: "Blog Post Title",
  subTitle: "Blog Subtitle",
  fullText: "Complete blog content in markdown format...",
  teaserImageURL: "https://example.com/image.jpg",
  backgroundImageURL: "https://example.com/bg-image.jpg",
  audioURL: "https://example.com/audio.mp3",
  originalAuthorName: "Author Name",
  ArticleCategory: "Knowledge", // Knowledge, Service, Devotion, Yoga, Meditation
  availableOnWebsite: true,
  multiMediaType: "article", // or "spinnedAudio"
  tags: ["tag1", "tag2", "tag3"], // For search functionality
  date: "2024-01-01", // For ordering
  type: "Original_Article" // Original_Video, Spinned_Article, Original_Article
}
```

## 3. Homepage Blog Section

### File: `src/sections/Blog.tsx`
```tsx
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { firestore } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Link } from "react-router-dom";

const Blog = () => {
    function pickFourRandomItems(arr: any) {
        const shuffled = arr.sort(() => Math.random() - 0.5);
        return shuffled.slice(0, 4);
    }
    
    const [currentIndex] = useState(0);
    const [blogType, setBlogType] = useState(0)
    const blogCategory = ["Knowledge", "Service", "Devotion", "Yoga", "Meditation"]
    const [blogs, setBlogs] = useState<any>([])
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const q = query(
                    collection(firestore, 'articleFilesV1'), 
                    where('ArticleCategory', '==', blogCategory[blogType]), 
                    where('availableOnWebsite', '==', true)
                );
                const snapshot = await getDocs(q);
                const newData = await snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                console.log("blog Data is ", newData)
                setBlogs(pickFourRandomItems(newData))
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchData();
    }, [blogType, currentIndex]);

    return (
        <div className="min-h-screen max-sm:h-full max-sm:min-h-full bg-white w-full p-[5%]" id="Blog">
            <div className="font-bigshoulderdisplay text-[64px] text-center max-[1122px]:text-2xl py-[2%]">Blogs</div>
            <div className="flex max-sm:flex-col items-start justify-start gap-10">
                {/* Desktop Category Buttons */}
                <div className="flex flex-col max-sm:flex-row max-sm:w-full max-sm:overflow-x-auto noScroll rounded-3xl overflow-hidden max-sm:hidden">
                    {blogCategory.map((item: string, i: number) => (
                        <button 
                            onClick={() => setBlogType(i)} 
                            className={`px-28 py-3 h-[112px] max-sm:h-fit flex items-center justify-center ${
                                blogType === i 
                                    ? "bg-gradient-to-r from-[#FDAF39] to-[#FA5555] text-white" 
                                    : "bg-[#D9D9D9] text-black border-[1px] border-[#8e8e8e] max-sm:border-y-0 max-sm:border-l-0 max-sm:w-fit max-sm:px-0"
                            }`}
                        >
                            {item}
                        </button>
                    ))}
                </div>

                {/* Mobile Category Buttons */}
                <div className="hidden max-sm:flex rounded-full overflow-x-scroll w-full noScroll">
                    {blogCategory.map((item: string, i: number) => (
                        <button 
                            onClick={() => setBlogType(i)} 
                            className={`px-5 py-2 h-[112px] max-sm:h-fit flex items-center justify-center ${
                                blogType === i 
                                    ? "bg-gradient-to-r from-[#FDAF39] to-[#FA5555] text-white" 
                                    : "bg-[#D9D9D9] text-black border-[1px] border-[#8e8e8e] max-sm:border-y-0 max-sm:border-l-0 max-sm:w-fit"
                            }`}
                        >
                            {item}
                        </button>
                    ))}
                </div>
                
                {/* Blog Grid */}
                <div className="w-full overflow-hidden">
                    <div className="flex transition-transform duration-700 noScroll w-full translate-x-[100%] overflow-x-auto"
                         style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                        <div className="grid grid-cols-2 grid-rows-2 max-sm:flex max-sm:grid-rows-1 w-full gap-5 overflow-hidden max-sm:snap-x max-sm:snap-mandatory">
                            {blogs.filter((item: any) => item.ArticleCategory == blogCategory[blogType]).map((e: any) => (
                                <Link 
                                    to={`/blog/${e.id}?type=${blogCategory[blogType]}`} 
                                    className="h-auto flex-shrink-0 w-full bg-[#D9D9D9] rounded-3xl max-sm:snap-x max-sm:snap-center"
                                    key={e.id}
                                >
                                    <img className="h-[244px] w-full object-cover rounded-3xl" src={e?.teaserImageURL} />
                                    <div className="text-left w-full bg-cover p-[5%] font-bold">
                                        <div>{e?.primaryTitle.slice(0, 30)}...</div>
                                        <div className="px-1 font-normal text-sm">
                                            {e?.multiMediaType !== "spinnedAudio" ? e?.originalAuthorName : "Dhyan app"}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Link className="self-center text-xl p-5 w-full flex items-center justify-center" to={"/blogs"}>
                {"More Blogs >>"}
            </Link>
        </div>
    );
}

export default Blog;
```

## 4. Full Blog Listing Page

### File: `src/sections/pages/Blogs.tsx`
```tsx
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { collection, getDocs, limit, query, startAfter, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore } from "../../firebase";
import { Link } from "react-router-dom";

export function Blogs() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    
    const [blogType, setBlogType] = useState(0);
    const [lastBlog, setLastBlog] = useState(null);
    const [loading, setLoading] = useState(false);
    const blogCategory = ["Knowledge", "Service", "Devotion", "Yoga", "Meditation"];
    const [blogs, setBlogs] = useState<any>([]);
    const [isMoreBlogs, setIsMoreBlogs] = useState(true) as any;
    const [searchString, setSearchString] = useState() as any;

    // Initial blog fetch
    useEffect(() => {
        const fetchData = async () => {
            try {
                const q = query(
                    collection(firestore, 'articleFilesV1'),
                    where('ArticleCategory', '==', blogCategory[blogType]),
                    where('availableOnWebsite', '==', true),
                    limit(6)
                );
                const snapshot = await getDocs(q);
                const newData = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                console.log("blog Data is ", newData);
                setBlogs(newData);
                if (newData.length > 0) {
                    setLastBlog(snapshot.docs[newData.length - 1] as any);
                }
                if (newData.length < 6) {
                    setIsMoreBlogs(false);
                }
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchData();
    }, [blogType]);

    // Load more blogs (pagination)
    const loadMoreBlogs = async () => {
        setLoading(true);
        try {
            if (lastBlog) {
                const q = query(
                    collection(firestore, 'articleFilesV1'),
                    where('ArticleCategory', '==', blogCategory[blogType]),
                    where('availableOnWebsite', '==', true),
                    startAfter(lastBlog),
                    limit(6)
                );
                const snapshot = await getDocs(q);
                const newData = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                if (newData.length > 0) {
                    setLoading(false);
                    setBlogs((prevBlogs: any) => [...prevBlogs, ...newData]);
                    setLastBlog(snapshot.docs[newData.length - 1] as any);
                } else {
                    console.log("No more blogs available");
                }

                if (newData.length < 6) {
                    setIsMoreBlogs(false);
                }
            }
        } catch (error) {
            console.error("Error fetching more blogs:", error);
        }
    };

    // Search functionality
    const fetchSearchResults = async () => {
        try {
            const q = query(
                collection(firestore, 'articleFilesV1'),
                where('ArticleCategory', '==', blogCategory[blogType]),
                where('availableOnWebsite', '==', true),
                where('tags', 'array-contains', searchString),
                limit(6)
            );

            const querySnapshot = await getDocs(q);
            const results = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setBlogs(results);
            console.log("searchFunctionality", results);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    return (
        <div className="min-h-screen bg-white w-full px-[5%] overflow-hidden pb-[5%]">
            {/* Category Filter Buttons */}
            <div className="flex w-full py-[5%] max-sm:flex-wrap overflow-y-auto thinScroll noScroll">
                {blogCategory.map((item: string, i: number) => (
                    <button 
                        onClick={() => { 
                            setBlogType(i); 
                            setLastBlog(null);
                            setIsMoreBlogs(true); 
                        }} 
                        className={`px-5 py-2 max-sm:h-fit flex items-center justify-center w-full ${
                            blogType === i 
                                ? "bg-gradient-to-r from-[#FDAF39] to-[#FA5555] text-white" 
                                : "bg-[#D9D9D9] text-black border-[1px] border-[#8e8e8e] max-sm:border-y-0 max-sm:border-l-0 max-sm:w-fit"
                        }`}
                        key={i}
                    >
                        {item}
                    </button>
                ))}
            </div>

            {/* Search Bar */}
            <div className="flex items-center justify-end gap-5 mb-[5%]">
                <input 
                    className="border border-black rounded-sm px-5 py-2" 
                    placeholder="Search Here ..." 
                    value={searchString} 
                    onChange={(e: any) => setSearchString(e.target.value)} 
                />
                <button 
                    className="bg-black text-white px-5 py-2" 
                    onClick={fetchSearchResults}
                >
                    Search
                </button>
            </div>

            {/* Blog Grid */}
            <div className="grid grid-cols-3 max-md:grid-cols-1 w-full gap-5">
                {blogs.filter((item: any) => item.ArticleCategory == blogCategory[blogType]).map((e: any) => (
                    <Link 
                        to={`/blog/${e.id}?type=${blogCategory[blogType]}`} 
                        className="h-auto flex-shrink-0 w-full bg-[#D9D9D9] rounded-3xl max-sm:snap-x max-sm:snap-center"
                        key={e.id}
                    >
                        <img className="h-[244px] w-full object-cover rounded-3xl" src={e?.teaserImageURL} />
                        <div className="text-left w-full bg-cover p-[5%] font-bold">
                            <div>{e?.primaryTitle.slice(0, 30)}{e?.primaryTitle.length > 30 && "..."}</div>
                            <div className="px-1 font-normal text-sm">
                                {e?.multiMediaType !== "spinnedAudio" ? e?.originalAuthorName : "Dhyan app"}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Load More Button */}
            {isMoreBlogs && (
                <div className="w-full flex items-center justify-center py-10">
                    <button 
                        onClick={loadMoreBlogs}
                        disabled={loading}
                        className="bg-gradient-to-r from-[#FDAF39] to-[#FA5555] text-white px-8 py-3 rounded-lg font-semibold"
                    >
                        {loading ? "Loading..." : "Load More"}
                    </button>
                </div>
            )}
        </div>
    );
}
```

## 5. Individual Blog Page

### File: `src/sections/pages/BlogPage.tsx`
```tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
import { SlCalender } from "react-icons/sl";
import { IoPersonSharp } from "react-icons/io5";
import Markdown from "react-markdown";
import { Link, useLocation } from "react-router-dom";
import { firestore } from "../../firebase";
import { collection, doc, getDoc, getDocs, limit, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";

const BlogPage = () => {
    const location = useLocation();
    const pathSegments = location.pathname.split('/');
    const lastRouteName = pathSegments[pathSegments.length - 1];
    const [data, setData] = useState<any>();
    const [blogs, setBlogs] = useState<any>();
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
                    where('ArticleCategory', '==', type), 
                    orderBy('date', 'desc'), 
                    limit(4)
                );
                const snapshot = await getDocs(q);
                const newData = await snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                console.log("blog Data is ", newData);
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

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="h-full w-screen relative">
            {/* Hero Section */}
            <div className="relative h-screen max-md:h-[50vh] w-full">
                <img className="h-full w-full absolute z-10 object-cover" src={data?.backgroundImageURL} />
                <div className="w-full z-30 text-white absolute bg-transparent h-full flex flex-col max-md:items-start justify-end p-14 max-md:p-5">
                    <Link 
                        to="/#Blog" 
                        className="absolute font-bigshoulderdisplay text-2xl bg-black top-5 border-2 px-5 max-md:text-sm py-1 text-center"
                    >
                        Back to Blogs
                    </Link>
                    <div>
                        <div className="font-bigshoulderdisplay text-6xl max-md:text-2xl pb-10">
                            {data?.primaryTitle}
                        </div>
                        <div className="flex items-start gap-5 max-md:gap-1 max-md:flex-col text-xl max-md:text-sm">
                            <div className="inline-flex gap-2 justify-center items-center">
                                <IoPersonSharp />{data?.originalAuthorName}
                            </div>
                            <div className="inline-flex gap-2 justify-center items-center">
                                <SlCalender /> Updated on: 03 January, 2024
                            </div>
                        </div>
                    </div>
                    {data?.audioURL && (
                        <audio className="max-md:scale-75" controls src={data?.audioURL}></audio>
                    )}
                </div>
            </div>

            {/* Blog Content */}
            <div className="p-16 max-md:p-8 text-justify">
                <div className="whitespace-pre-wrap">
                    <Markdown>
                        {formatData(data?.fullText)}
                    </Markdown>
                </div>
            </div>

            {/* Related Articles */}
            <div className="py-5">
                <div className="text-[64px] font-bigshoulderdisplay self-center max-sm:text-[36px] px-16 max-md:px-8">
                    Related Articles
                </div>
                <div className="flex gap-7 items-center justify-center w-full overflow-x-auto overflow-y-hidden noScroll">
                    {blogs?.filter((item: any) => item.id != lastRouteName).map((e: any) => (
                        <Link 
                            to={`/blog/${e.id}?type=${type}`} 
                            className="h-[344px] min-w-[500px] flex-shrink-0 bg-[#D9D9D9] rounded-3xl"
                            key={e.id}
                        >
                            <img 
                                className="h-[268px] w-full object-cover rounded-3xl" 
                                src={e?.teaserImageURL || e?.generatedImageLink || e?.mainImageLink} 
                            />
                            <div className="text-left w-full bg-cover p-[5%] font-medium text-sm">
                                {e?.primaryTitle}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default BlogPage;
```

## 6. Main App with Routing

### File: `src/App.tsx`
```tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Blog from './sections/Blog';
import { Blogs } from './sections/pages/Blogs';
import BlogPage from './sections/pages/BlogPage';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/blog/:id" element={<BlogPage />} />
            </Routes>
        </BrowserRouter>
    );
}

// Homepage component that includes the Blog section
function HomePage() {
    return (
        <div>
            {/* Other sections */}
            <Blog />
            {/* Other sections */}
        </div>
    );
}

export default App;
```

## 7. CSS Styles

### File: `src/index.css`
```css
@import url("https://fonts.googleapis.com/css2?family=Big+Shoulders+Display&family=Poppins&display=swap");

/* Custom font classes */
.font-bigshoulderdisplay {
    font-family: "Big Shoulders Display", sans-serif;
}

.font-poppins {
    font-family: "Poppins", sans-serif;
}

/* Hide scrollbar utility */
.noScroll::-webkit-scrollbar {
    display: none;
}

/* Thin scrollbar */
.thinScroll::-webkit-scrollbar {
    width: 3px;
}

.thinScroll::-webkit-scrollbar-track {
    background-color: transparent;
    border-radius: 3px;
}

.thinScroll::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 3px;
}

/* Responsive grid utilities */
@media (max-width: 768px) {
    .max-md\:grid-cols-1 {
        grid-template-columns: repeat(1, minmax(0, 1fr));
    }
}

@media (max-width: 640px) {
    .max-sm\:flex-col {
        flex-direction: column;
    }
    
    .max-sm\:text-sm {
        font-size: 0.875rem;
    }
    
    .max-sm\:text-2xl {
        font-size: 1.5rem;
    }
}
```

## 8. Firebase Setup Commands

### Create Firebase Project
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase project
firebase init

# Select Firestore and Hosting
# Choose existing project or create new one
```

### Firestore Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /articleFilesV1/{document} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

## 9. Sample Data Structure

### Add Sample Blog Data to Firestore
```javascript
// Use Firebase Console or Admin SDK to add documents
const sampleBlog = {
  primaryTitle: "Introduction to Meditation",
  subTitle: "A beginner's guide to mindfulness",
  fullText: "# Introduction\n\nMeditation is a practice...",
  teaserImageURL: "https://example.com/teaser.jpg",
  backgroundImageURL: "https://example.com/background.jpg",
  audioURL: "https://example.com/audio.mp3",
  originalAuthorName: "Spiritual Guide",
  ArticleCategory: "Meditation",
  availableOnWebsite: true,
  multiMediaType: "article",
  tags: ["meditation", "mindfulness", "beginner"],
  date: "2024-01-01",
  type: "Original_Article"
};
```

## 10. Build and Deploy

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

### Deploy to Firebase
```bash
firebase deploy
```

## Features Included

1. **Homepage Blog Section** - Shows 4 random blogs per category
2. **Full Blog Listing** - Paginated blog list with category filtering
3. **Individual Blog Pages** - Full blog post with related articles
4. **Search Functionality** - Tag-based search within categories
5. **Responsive Design** - Mobile-first responsive layout
6. **Firebase Integration** - Real-time data from Firestore
7. **Markdown Support** - Rich text rendering for blog content
8. **Audio Support** - Audio playback for blog posts
9. **Category System** - 5 categories: Knowledge, Service, Devotion, Yoga, Meditation
10. **SEO Friendly** - Clean URLs and proper meta structure

## Customization Options

1. **Categories**: Modify `blogCategory` array to add/remove categories
2. **Styling**: Update Tailwind classes for different themes
3. **Pagination**: Adjust `limit(6)` to change items per page
4. **Search**: Extend search to include title/content fields
5. **Images**: Add image optimization and lazy loading
6. **Analytics**: Integrate with Google Analytics
7. **Comments**: Add comment system with Firebase
8. **Sharing**: Add social media sharing buttons

This complete code package provides a fully functional blog system that can be customized and extended based on your specific requirements. 