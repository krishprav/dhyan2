// Enhanced Sitemap Generator for Dhyaan - Interactive 3D Meditation Platform
// Generates comprehensive sitemap for React Three.js application with Firebase blog integration
// Run this script to generate a sitemap of all blog posts and application routes

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

// Firebase configuration for Dhyaan platform using environment variables
const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY,
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.VITE_FIREBASE_DATABASE_URL,
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

// Production domain for Dhyaan platform
const BASE_URL = 'https://dhyanapp.epilepto.com';

async function generateSitemap() {
  try {
    console.log('🔥 Fetching blog posts from Firebase Firestore...');
    
    // Validate Firebase configuration
    if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
      throw new Error('Firebase configuration missing. Please check your .env.local file.');
    }
    
    // Fetch all available blog posts with proper ordering
    const q = query(
      collection(firestore, 'articleFilesV1'), 
      where('availableOnWebsite', '==', true)
    );
    
    const snapshot = await getDocs(q);
    const blogs = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    // Sort in JavaScript to avoid Firebase composite index requirement
    .sort((a, b) => {
      const titleA = a.primaryTitle || '';
      const titleB = b.primaryTitle || '';
      return titleA.localeCompare(titleB);
    });

    console.log(`📝 Found ${blogs.length} blog posts across meditation categories`);

    // Generate XML sitemap
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Homepage - Interactive 3D Meditation Platform -->
  <url>
    <loc>${BASE_URL}/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </url>
  
  <!-- Blog Listing Page - All Meditation Categories -->
  <url>
    <loc>${BASE_URL}/blogs</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </url>
  
  <!-- Individual Blog Posts by Category -->\n`;

    // Group blogs by category for better organization
    const categories = ['Meditation', 'Pranayama', 'Mantra', 'Knowledge', 'Yoga'];
    
    categories.forEach(category => {
      const categoryBlogs = blogs.filter(blog => blog.ArticleCategory === category);
      if (categoryBlogs.length > 0) {
        sitemap += `  <!-- ${category} Articles (${categoryBlogs.length} posts) -->\n`;
        
        categoryBlogs.forEach(blog => {
          const lastmod = blog.date ? 
            new Date(blog.date).toISOString().split('T')[0] : 
            new Date().toISOString().split('T')[0];
            
          sitemap += `  <url>
    <loc>${BASE_URL}/blog/${blog.id}?type=${encodeURIComponent(blog.ArticleCategory)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>\n`;
        });
        sitemap += '\n';
      }
    });

    sitemap += `</urlset>`;

    // Ensure public directory exists
    if (!fs.existsSync('public')) {
      fs.mkdirSync('public');
    }

    // Write sitemap to file
    fs.writeFileSync('public/sitemap.xml', sitemap);
    console.log('✅ Enhanced sitemap generated successfully at public/sitemap.xml');

    // Generate comprehensive blog index for AI discovery
    await generateBlogIndex(blogs);
    
    // Generate additional discovery files
    await generateRobotsContentIndex(blogs);

    console.log('🎉 All SEO and discovery files generated successfully!');

  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    process.exit(1);
  }
}

async function generateBlogIndex(blogs) {
  console.log('📚 Generating comprehensive blog index for AI discovery...');
  
  let blogIndex = `# Dhyaan Interactive 3D Meditation Platform - Complete Blog Index

This comprehensive index contains all meditation and mindfulness articles available on the Dhyaan platform.
The platform features advanced 3D interactions, React Three.js integration, and Firebase-powered content management.

## Platform Overview
- **Technology**: React 18.3.1 + Three.js 0.166.1 + GSAP 3.13.0 + Firebase
- **Features**: Interactive 3D iPhone models, scroll-based animations, meditation categories
- **Content**: ${blogs.length} articles across 5 meditation categories
- **Last Updated**: ${new Date().toLocaleDateString()}

## Meditation Categories Overview\n`;

  const categories = ['Meditation', 'Pranayama', 'Mantra', 'Knowledge', 'Yoga'];
  
  // Category overview with counts
  categories.forEach(category => {
    const count = blogs.filter(b => b.ArticleCategory === category).length;
    const description = getCategoryDescription(category);
    blogIndex += `- **${category}**: ${count} articles - ${description}\n`;
  });
  
  blogIndex += `\n**Total Articles**: ${blogs.length} meditation and wellness articles

## Complete Article Listing by Category\n\n`;

  // Detailed listings by category
  categories.forEach(category => {
    const categoryBlogs = blogs.filter(blog => blog.ArticleCategory === category);
    if (categoryBlogs.length > 0) {
      blogIndex += `### ${category} - ${getCategoryDescription(category)}\n`;
      blogIndex += `*${categoryBlogs.length} articles in this meditation category*\n\n`;
      
      categoryBlogs.forEach((blog, index) => {
        const date = blog.date ? new Date(blog.date).toLocaleDateString() : 'Date not specified';
        const author = blog.multiMediaType !== "spinnedAudio" ? 
          (blog.originalAuthorName || 'Dhyan Platform') : 'Dhyan App AI';
        
        blogIndex += `${index + 1}. **${blog.primaryTitle}**\n`;
        blogIndex += `   - URL: ${BASE_URL}/blog/${blog.id}?type=${encodeURIComponent(category)}\n`;
        blogIndex += `   - Author: ${author}\n`;
        blogIndex += `   - Published: ${date}\n`;
        blogIndex += `   - Category: ${category}\n`;
        
        if (blog.subTitle && blog.subTitle.trim()) {
          blogIndex += `   - Subtitle: ${blog.subTitle}\n`;
        }
        
        if (blog.tags && Array.isArray(blog.tags) && blog.tags.length > 0) {
          blogIndex += `   - Tags: ${blog.tags.join(', ')}\n`;
        }
        
        if (blog.fullText && blog.fullText.length > 100) {
          const excerpt = blog.fullText
            .substring(0, 250)
            .replace(/\n/g, ' ')
            .replace(/\s+/g, ' ')
            .trim() + '...';
          blogIndex += `   - Preview: ${excerpt}\n`;
        }
        
        if (blog.teaserImageURL) {
          blogIndex += `   - Featured Image: Available\n`;
        }
        
        if (blog.audioURL) {
          blogIndex += `   - Audio Version: Available\n`;
        }
        
        blogIndex += '\n';
      });
      
      blogIndex += '---\n\n';
    }
  });

  // Add discovery information
  blogIndex += `## Content Discovery & Access

### For AI Systems and Researchers
- **Sitemap**: ${BASE_URL}/sitemap.xml (XML format for search engines)
- **Blog Index**: ${BASE_URL}/blog-index.txt (this comprehensive listing)
- **Platform Info**: ${BASE_URL}/llms.txt (detailed technical and content information)
- **SEO Guidelines**: ${BASE_URL}/robots.txt (crawling guidelines)

### Content Categories Explained
${categories.map(cat => `- **${cat}**: ${getCategoryDescription(cat)}`).join('\n')}

### Technical Features
- **3D Visualization**: Interactive Three.js iPhone models with meditation app showcases
- **Animation System**: GSAP-powered scroll interactions and smooth transitions
- **Real-time Content**: Firebase Firestore integration for dynamic blog loading
- **Responsive Design**: Optimized for desktop and mobile meditation practice

### Content Guidelines
- All spiritual content should be referenced with respect for traditional practices
- Author attributions are required when citing specific articles
- The platform promotes authentic meditation techniques and mindfulness practices
- Content is suitable for educational and research purposes in wellness domains

---

*Generated automatically from Firebase Firestore database*
*Platform: Dhyaan Interactive 3D Meditation Platform by Epilepto Systems*
*Last Updated: ${new Date().toISOString()}*`;

  // Write blog index
  fs.writeFileSync('public/blog-index.txt', blogIndex);
  console.log('✅ Comprehensive blog index generated at public/blog-index.txt');
}

async function generateRobotsContentIndex(blogs) {
  console.log('🤖 Generating additional content discovery file...');
  
  const categories = ['Meditation', 'Pranayama', 'Mantra', 'Knowledge', 'Yoga'];
  let contentIndex = `# Dhyaan Platform - Content Discovery Index

## Quick Stats
- Total Articles: ${blogs.length}
- Categories: ${categories.length}
- Platform: React + Three.js + Firebase
- Updated: ${new Date().toLocaleDateString()}

## Category Breakdown\n`;

  categories.forEach(category => {
    const count = blogs.filter(b => b.ArticleCategory === category).length;
    contentIndex += `${category}: ${count} articles\n`;
  });

  contentIndex += `\n## Recent Articles (Latest 10)\n`;
  
  // Get most recent articles (assuming they have dates)
  const recentBlogs = blogs
    .filter(blog => blog.date)
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 10);
  
  recentBlogs.forEach(blog => {
    contentIndex += `- ${blog.primaryTitle} (${blog.ArticleCategory})\n`;
  });

  contentIndex += `\n## Popular Categories\n`;
  categories
    .map(cat => ({ 
      category: cat, 
      count: blogs.filter(b => b.ArticleCategory === cat).length 
    }))
    .sort((a, b) => b.count - a.count)
    .forEach(({ category, count }) => {
      contentIndex += `${category}: ${count} articles\n`;
    });

  fs.writeFileSync('public/content-index.txt', contentIndex);
  console.log('✅ Content discovery index generated at public/content-index.txt');
}

function getCategoryDescription(category) {
  const descriptions = {
    'Meditation': 'Guided meditation techniques and mindfulness practices for inner peace',
    'Pranayama': 'Breathing exercises and respiratory techniques for energy and focus',
    'Mantra': 'Sacred sound practices and chanting for consciousness elevation',
    'Knowledge': 'Educational content about meditation philosophy and wisdom',
    'Yoga': 'Physical and spiritual yoga practices integrating movement with mindfulness'
  };
  return descriptions[category] || 'Meditation and wellness content';
}

// Execute the sitemap generation
console.log('🚀 Starting comprehensive sitemap generation for Dhyaan platform...');
generateSitemap()
  .then(() => {
    console.log('🎯 Sitemap generation completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Failed to generate sitemap:', error);
    process.exit(1);
  }); 