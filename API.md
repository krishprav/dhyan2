# API Documentation - Dhyaan

This document covers the backend services, Firebase integration, data structures, and API interactions for the Dhyaan meditation platform.

## 📋 Table of Contents

- [Overview](#-overview)
- [Firebase Configuration](#-firebase-configuration)
- [Firestore Database](#-firestore-database)
- [Data Models](#-data-models)
- [API Methods](#-api-methods)
- [Security Rules](#-security-rules)
- [Error Handling](#-error-handling)
- [Performance Optimization](#-performance-optimization)

## 🎯 Overview

Dhyaan uses Firebase as its backend-as-a-service platform, providing:

- **Firestore**: NoSQL document database for blog content
- **Storage**: Asset management for images and media
- **Hosting**: Static site deployment (optional)
- **Analytics**: User behavior tracking

### Architecture

```
Frontend (React) ←→ Firebase Services
                    ├── Firestore (Database)
                    ├── Storage (Assets)
                    └── Analytics (Tracking)
```

## 🔧 Firebase Configuration

### Environment Variables

```typescript
// src/firebase.ts
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const analytics = getAnalytics(app);
```

### Client-side Setup

```typescript
// Initialize Firebase services
import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Development emulator (optional)
if (process.env.NODE_ENV === 'development') {
  connectFirestoreEmulator(firestore, 'localhost', 8080);
}
```

## 🗄 Firestore Database

### Database Structure

```
dhyanapp-90de4 (Project)
└── articleFilesV1 (Collection)
    ├── {articleId} (Document)
    │   ├── primaryTitle: string
    │   ├── description: string
    │   ├── content: string
    │   ├── category: string
    │   ├── availableOnWebsite: boolean
    │   ├── createdAt: timestamp
    │   ├── updatedAt: timestamp
    │   ├── tags: string[]
    │   ├── imageUrl: string
    │   └── readingTime: number
    └── ... (other articles)
```

### Collection: `articleFilesV1`

Main collection storing meditation articles and blog posts.

#### Document Structure

```typescript
interface BlogPost {
  id: string;                    // Document ID
  primaryTitle: string;          // Article title
  description: string;           // Short description/excerpt
  content: string;              // Full article content (HTML/Markdown)
  category: MeditationCategory; // Article category
  availableOnWebsite: boolean;  // Publication status
  createdAt: Date;              // Creation timestamp
  updatedAt: Date;              // Last modification timestamp
  tags: string[];               // Article tags
  imageUrl?: string;            // Featured image URL
  readingTime?: number;         // Estimated reading time (minutes)
  author?: string;              // Author name
  slug?: string;                // URL-friendly identifier
  metaDescription?: string;     // SEO description
  featured?: boolean;           // Featured article flag
}
```

#### Meditation Categories

```typescript
type MeditationCategory = 
  | 'Meditation'     // Mindfulness practices
  | 'Pranayama'      // Breathing exercises
  | 'Mantra'         // Sacred sounds and chanting
  | 'Knowledge'      // Educational content
  | 'Yoga';          // Physical postures and movement
```

## 🔌 API Methods

### 1. Fetch Blog Posts

```typescript
// Get all published blog posts
export const getBlogPosts = async (
  limit: number = 50
): Promise<BlogPost[]> => {
  try {
    const q = query(
      collection(firestore, 'articleFilesV1'),
      where('availableOnWebsite', '==', true),
      limit(limit)
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
      updatedAt: doc.data().updatedAt?.toDate(),
    })) as BlogPost[];
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    throw new Error('Failed to fetch blog posts');
  }
};
```

### 2. Fetch Blog Posts by Category

```typescript
// Get blog posts filtered by category
export const getBlogPostsByCategory = async (
  category: MeditationCategory,
  limit: number = 20
): Promise<BlogPost[]> => {
  try {
    const q = query(
      collection(firestore, 'articleFilesV1'),
      where('availableOnWebsite', '==', true),
      where('category', '==', category),
      limit(limit)
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
      updatedAt: doc.data().updatedAt?.toDate(),
    })) as BlogPost[];
  } catch (error) {
    console.error(`Error fetching ${category} posts:`, error);
    throw new Error(`Failed to fetch ${category} posts`);
  }
};
```

### 3. Fetch Single Blog Post

```typescript
// Get a specific blog post by ID
export const getBlogPost = async (id: string): Promise<BlogPost | null> => {
  try {
    const docRef = doc(firestore, 'articleFilesV1', id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        ...data,
        createdAt: data.createdAt?.toDate(),
        updatedAt: data.updatedAt?.toDate(),
      } as BlogPost;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching blog post:', error);
    throw new Error('Failed to fetch blog post');
  }
};
```

### 4. Search Blog Posts

```typescript
// Search blog posts by title (client-side filtering)
export const searchBlogPosts = async (
  searchTerm: string,
  limit: number = 20
): Promise<BlogPost[]> => {
  try {
    // Note: Firestore doesn't support full-text search natively
    // This fetches all posts and filters client-side
    const allPosts = await getBlogPosts(100);
    
    const filteredPosts = allPosts
      .filter(post => 
        post.primaryTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
      .slice(0, limit);
    
    return filteredPosts;
  } catch (error) {
    console.error('Error searching blog posts:', error);
    throw new Error('Failed to search blog posts');
  }
};
```

### 5. Pagination Support

```typescript
// Paginated blog post fetching
export const getBlogPostsPaginated = async (
  pageSize: number = 10,
  lastDoc?: DocumentSnapshot
): Promise<{ posts: BlogPost[], lastDoc: DocumentSnapshot | null }> => {
  try {
    let q = query(
      collection(firestore, 'articleFilesV1'),
      where('availableOnWebsite', '==', true),
      orderBy('createdAt', 'desc'),
      limit(pageSize)
    );
    
    if (lastDoc) {
      q = query(q, startAfter(lastDoc));
    }
    
    const snapshot = await getDocs(q);
    const posts = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
      updatedAt: doc.data().updatedAt?.toDate(),
    })) as BlogPost[];
    
    const lastDocument = snapshot.docs[snapshot.docs.length - 1] || null;
    
    return { posts, lastDoc: lastDocument };
  } catch (error) {
    console.error('Error fetching paginated posts:', error);
    throw new Error('Failed to fetch paginated posts');
  }
};
```

### 6. Get Featured Posts

```typescript
// Get featured blog posts
export const getFeaturedPosts = async (limit: number = 5): Promise<BlogPost[]> => {
  try {
    const q = query(
      collection(firestore, 'articleFilesV1'),
      where('availableOnWebsite', '==', true),
      where('featured', '==', true),
      limit(limit)
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
      updatedAt: doc.data().updatedAt?.toDate(),
    })) as BlogPost[];
  } catch (error) {
    console.error('Error fetching featured posts:', error);
    throw new Error('Failed to fetch featured posts');
  }
};
```

## 🔒 Security Rules

### Firestore Security Rules

```javascript
// firestore.rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Blog posts - public read access for published content
    match /articleFilesV1/{articleId} {
      // Allow read access to published articles
      allow read: if resource.data.availableOnWebsite == true;
      
      // Allow write access only to authenticated admins
      allow write: if request.auth != null && 
                      request.auth.token.admin == true;
      
      // Allow create with proper validation
      allow create: if request.auth != null && 
                       request.auth.token.admin == true &&
                       validateBlogPost(request.resource.data);
    }
    
    // Admin-only collections
    match /{document=**} {
      allow read, write: if request.auth != null && 
                            request.auth.token.admin == true;
    }
  }
}

// Validation function for blog posts
function validateBlogPost(data) {
  return data.keys().hasAll(['primaryTitle', 'content', 'category', 'availableOnWebsite']) &&
         data.primaryTitle is string &&
         data.primaryTitle.size() > 0 &&
         data.content is string &&
         data.content.size() > 0 &&
         data.category in ['Meditation', 'Pranayama', 'Mantra', 'Knowledge', 'Yoga'] &&
         data.availableOnWebsite is bool;
}
```

### Rate Limiting

```typescript
// Client-side rate limiting helper
class RateLimiter {
  private requests: Map<string, number[]> = new Map();
  private limit: number;
  private windowMs: number;
  
  constructor(limit: number = 100, windowMs: number = 60000) {
    this.limit = limit;
    this.windowMs = windowMs;
  }
  
  canMakeRequest(identifier: string): boolean {
    const now = Date.now();
    const requests = this.requests.get(identifier) || [];
    
    // Remove old requests outside the window
    const validRequests = requests.filter(time => now - time < this.windowMs);
    
    if (validRequests.length >= this.limit) {
      return false;
    }
    
    validRequests.push(now);
    this.requests.set(identifier, validRequests);
    return true;
  }
}

const rateLimiter = new RateLimiter(50, 60000); // 50 requests per minute
```

## ❌ Error Handling

### Error Types

```typescript
// Custom error classes
export class FirestoreError extends Error {
  constructor(
    message: string,
    public code: string,
    public originalError?: any
  ) {
    super(message);
    this.name = 'FirestoreError';
  }
}

export class ValidationError extends Error {
  constructor(message: string, public field: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export class NotFoundError extends Error {
  constructor(resource: string, id: string) {
    super(`${resource} with ID ${id} not found`);
    this.name = 'NotFoundError';
  }
}
```

### Error Handling Wrapper

```typescript
// Generic error handling wrapper
export const withErrorHandling = async <T>(
  operation: () => Promise<T>,
  errorContext: string
): Promise<T> => {
  try {
    return await operation();
  } catch (error: any) {
    console.error(`Error in ${errorContext}:`, error);
    
    // Handle specific Firebase errors
    if (error.code) {
      switch (error.code) {
        case 'permission-denied':
          throw new FirestoreError(
            'Access denied. Please check permissions.',
            'permission-denied',
            error
          );
        case 'unavailable':
          throw new FirestoreError(
            'Service temporarily unavailable. Please try again.',
            'unavailable',
            error
          );
        case 'quota-exceeded':
          throw new FirestoreError(
            'Quota exceeded. Please try again later.',
            'quota-exceeded',
            error
          );
        default:
          throw new FirestoreError(
            `Firebase error: ${error.message}`,
            error.code,
            error
          );
      }
    }
    
    // Re-throw unknown errors
    throw error;
  }
};

// Usage example
export const getBlogPostsSafe = async (limit?: number): Promise<BlogPost[]> => {
  return withErrorHandling(
    () => getBlogPosts(limit),
    'getBlogPosts'
  );
};
```

### Retry Logic

```typescript
// Exponential backoff retry logic
export const withRetry = async <T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> => {
  let lastError: any;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error: any) {
      lastError = error;
      
      // Don't retry on certain errors
      if (error.code === 'permission-denied' || 
          error.code === 'invalid-argument') {
        throw error;
      }
      
      if (attempt === maxRetries) {
        break;
      }
      
      // Exponential backoff
      const delay = baseDelay * Math.pow(2, attempt);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw lastError;
};
```

## ⚡ Performance Optimization

### 1. Query Optimization

```typescript
// Optimize queries with proper indexing
export const getOptimizedBlogPosts = async (
  category?: MeditationCategory,
  limit: number = 20
): Promise<BlogPost[]> => {
  // Use composite indexes for complex queries
  let q = query(
    collection(firestore, 'articleFilesV1'),
    where('availableOnWebsite', '==', true)
  );
  
  if (category) {
    q = query(q, where('category', '==', category));
  }
  
  // Add ordering and limiting
  q = query(q, orderBy('createdAt', 'desc'), limit(limit));
  
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as BlogPost[];
};
```

### 2. Caching Strategy

```typescript
// Simple in-memory cache
class BlogPostCache {
  private cache = new Map<string, { data: BlogPost[], timestamp: number }>();
  private readonly TTL = 5 * 60 * 1000; // 5 minutes
  
  get(key: string): BlogPost[] | null {
    const cached = this.cache.get(key);
    if (!cached) return null;
    
    if (Date.now() - cached.timestamp > this.TTL) {
      this.cache.delete(key);
      return null;
    }
    
    return cached.data;
  }
  
  set(key: string, data: BlogPost[]): void {
    this.cache.set(key, { data, timestamp: Date.now() });
  }
  
  clear(): void {
    this.cache.clear();
  }
}

const blogCache = new BlogPostCache();

// Cached blog post fetching
export const getCachedBlogPosts = async (
  category?: MeditationCategory
): Promise<BlogPost[]> => {
  const cacheKey = category || 'all';
  
  // Try cache first
  const cached = blogCache.get(cacheKey);
  if (cached) {
    return cached;
  }
  
  // Fetch from Firestore
  const posts = category 
    ? await getBlogPostsByCategory(category)
    : await getBlogPosts();
  
  // Cache the results
  blogCache.set(cacheKey, posts);
  
  return posts;
};
```

### 3. Batch Operations

```typescript
// Batch read operations
export const getBlogPostsBatch = async (
  ids: string[]
): Promise<(BlogPost | null)[]> => {
  const batches: string[][] = [];
  const batchSize = 10; // Firestore limit
  
  // Split into batches
  for (let i = 0; i < ids.length; i += batchSize) {
    batches.push(ids.slice(i, i + batchSize));
  }
  
  const results: (BlogPost | null)[] = [];
  
  // Process each batch
  for (const batch of batches) {
    const docRefs = batch.map(id => doc(firestore, 'articleFilesV1', id));
    const docs = await Promise.all(docRefs.map(ref => getDoc(ref)));
    
    const batchResults = docs.map(docSnap => {
      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          ...docSnap.data()
        } as BlogPost;
      }
      return null;
    });
    
    results.push(...batchResults);
  }
  
  return results;
};
```

## 📊 Analytics Integration

### Event Tracking

```typescript
// Track blog post views
export const trackBlogPostView = (postId: string, title: string): void => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'blog_post_view', {
      event_category: 'Blog',
      event_label: title,
      custom_parameter_1: postId
    });
  }
};

// Track category selections
export const trackCategoryView = (category: MeditationCategory): void => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'category_view', {
      event_category: 'Navigation',
      event_label: category
    });
  }
};

// Track search queries
export const trackSearch = (query: string, resultCount: number): void => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'search', {
      search_term: query,
      event_category: 'Search',
      custom_parameter_1: resultCount
    });
  }
};
```

---

This API documentation provides a comprehensive guide to integrating with the Firebase backend services that power the Dhyaan meditation platform. 