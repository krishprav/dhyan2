# Deployment Guide - Dhyaan

This guide covers deployment strategies, environment setup, and hosting configurations for the Dhyaan meditation platform.

## 📋 Table of Contents

- [Prerequisites](#-prerequisites)
- [Environment Setup](#-environment-setup)
- [Build Process](#-build-process)
- [Hosting Platforms](#-hosting-platforms)
- [CI/CD Pipeline](#-cicd-pipeline)
- [Domain Configuration](#-domain-configuration)
- [Post-Deployment](#-post-deployment)
- [Monitoring](#-monitoring)
- [Troubleshooting](#-troubleshooting)

## 🔧 Prerequisites

### System Requirements
- **Node.js** 18+ with npm
- **Git** for version control
- **Firebase CLI** for database management
- **Modern browser** with WebGL support

### Firebase Setup
1. Create Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable Firestore database
3. Configure hosting (optional)
4. Set up security rules

## 🌍 Environment Setup

### 1. Environment Variables

Create production environment file:

```bash
# Production .env.local
VITE_FIREBASE_API_KEY=your_production_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_production_auth_domain
VITE_FIREBASE_PROJECT_ID=your_production_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_production_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_production_messaging_sender_id
VITE_FIREBASE_APP_ID=your_production_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_production_measurement_id

# Server-side variables for sitemap generation
FIREBASE_PROJECT_ID=your_production_project_id
FIREBASE_API_KEY=your_production_api_key
```

### 2. Security Configuration

```javascript
// Firestore Security Rules (firestore.rules)
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Public read access for published articles
    match /articleFilesV1/{document} {
      allow read: if resource.data.availableOnWebsite == true;
      allow write: if request.auth != null && 
                      request.auth.token.admin == true;
    }
    
    // Admin-only access for other collections
    match /{document=**} {
      allow read, write: if request.auth != null && 
                            request.auth.token.admin == true;
    }
  }
}
```

## 🏗 Build Process

### 1. Production Build

```bash
# Install dependencies
npm ci

# Generate sitemap (optional)
npm run generate-sitemap

# Build for production
npm run build

# Preview build locally
npm run preview
```

### 2. Build Optimization

```typescript
// vite.config.ts - Production optimizations
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext',
    minify: 'terser',
    sourcemap: false, // Disable for production
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-three': ['three', '@react-three/fiber'],
          'vendor-gsap': ['gsap'],
          'vendor-firebase': ['firebase/app', 'firebase/firestore']
        }
      }
    }
  },
  define: {
    '__APP_VERSION__': JSON.stringify(process.env.npm_package_version)
  }
});
```

### 3. Asset Optimization

```bash
# Optimize images (if using build pipeline)
npx @squoosh/cli --webp auto public/assets/images/*.jpg

# Compress 3D models
npx gltf-pipeline -i public/models/scene.glb -o public/models/scene-optimized.glb --draco
```

## 🚀 Hosting Platforms

### 1. Vercel (Recommended)

#### Quick Deploy
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production deployment
vercel --prod
```

#### Vercel Configuration

```json
// vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "env": {
    "VITE_FIREBASE_API_KEY": "@firebase_api_key",
    "VITE_FIREBASE_AUTH_DOMAIN": "@firebase_auth_domain",
    "VITE_FIREBASE_PROJECT_ID": "@firebase_project_id",
    "VITE_FIREBASE_STORAGE_BUCKET": "@firebase_storage_bucket",
    "VITE_FIREBASE_MESSAGING_SENDER_ID": "@firebase_messaging_sender_id",
    "VITE_FIREBASE_APP_ID": "@firebase_app_id",
    "VITE_FIREBASE_MEASUREMENT_ID": "@firebase_measurement_id"
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    },
    {
      "source": "/models/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ],
  "rewrites": [
    {
      "source": "/((?!api/).*)",
      "destination": "/index.html"
    }
  ]
}
```

### 2. Netlify

#### Deploy with Git Integration
```bash
# Build command
npm run build

# Publish directory
dist

# Environment variables (set in Netlify dashboard)
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
# ... other Firebase config
```

#### Netlify Configuration

```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "18"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"

[[headers]]
  for = "/models/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### 3. Firebase Hosting

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize hosting
firebase init hosting

# Deploy
firebase deploy
```

#### Firebase Configuration

```json
// firebase.json
{
  "hosting": {
    "public": "dist",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ],
    "headers": [
      {
        "source": "/models/**",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "public, max-age=31536000, immutable"
          }
        ]
      }
    ]
  }
}
```

## 🔄 CI/CD Pipeline

### GitHub Actions

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v3
      
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Lint code
      run: npm run lint
      
    - name: Type check
      run: npx tsc --noEmit
      
    - name: Build project
      run: npm run build
      env:
        VITE_FIREBASE_API_KEY: ${{ secrets.VITE_FIREBASE_API_KEY }}
        VITE_FIREBASE_AUTH_DOMAIN: ${{ secrets.VITE_FIREBASE_AUTH_DOMAIN }}
        VITE_FIREBASE_PROJECT_ID: ${{ secrets.VITE_FIREBASE_PROJECT_ID }}
        VITE_FIREBASE_STORAGE_BUCKET: ${{ secrets.VITE_FIREBASE_STORAGE_BUCKET }}
        VITE_FIREBASE_MESSAGING_SENDER_ID: ${{ secrets.VITE_FIREBASE_MESSAGING_SENDER_ID }}
        VITE_FIREBASE_APP_ID: ${{ secrets.VITE_FIREBASE_APP_ID }}
        VITE_FIREBASE_MEASUREMENT_ID: ${{ secrets.VITE_FIREBASE_MEASUREMENT_ID }}
        
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v20
      if: github.ref == 'refs/heads/main'
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.ORG_ID }}
        vercel-project-id: ${{ secrets.PROJECT_ID }}
        vercel-args: '--prod'
```

### GitLab CI/CD

```yaml
# .gitlab-ci.yml
stages:
  - build
  - deploy

variables:
  NODE_VERSION: "18"

cache:
  paths:
    - node_modules/

build:
  stage: build
  image: node:18
  script:
    - npm ci
    - npm run lint
    - npm run build
  artifacts:
    paths:
      - dist/
    expire_in: 1 hour

deploy:
  stage: deploy
  image: node:18
  script:
    - npm install -g vercel
    - vercel --token $VERCEL_TOKEN --prod
  only:
    - main
```

## 🌐 Domain Configuration

### Custom Domain Setup

1. **Add Custom Domain**
```bash
# For Vercel
vercel domains add dhyanapp.epilepto.com

# For Netlify
netlify domains:create dhyanapp.epilepto.com
```

2. **DNS Configuration**
```dns
# DNS Records
Type    Name                Value
A       dhyanapp           76.76.19.61
CNAME   www.dhyanapp       dhyanapp.epilepto.com
```

3. **SSL Certificate**
Most platforms auto-provision SSL certificates. For manual setup:
```bash
# Let's Encrypt (if self-hosting)
certbot --nginx -d dhyanapp.epilepto.com -d www.dhyanapp.epilepto.com
```

## 📋 Post-Deployment

### 1. Sitemap Generation

```bash
# Generate sitemap after deployment
npm run generate-sitemap

# Upload sitemap files
# - public/sitemap.xml
# - public/robots.txt
# - public/blog-index.txt
# - public/content-index.txt
```

### 2. SEO Verification

```bash
# Test sitemap
curl https://dhyanapp.epilepto.com/sitemap.xml

# Check robots.txt
curl https://dhyanapp.epilepto.com/robots.txt

# Validate structured data
# Use Google's Rich Results Test tool
```

### 3. Performance Verification

```bash
# Lighthouse CI
npm install -g @lhci/cli
lhci autorun --upload.target=temporary-public-storage

# Core Web Vitals check
# Use PageSpeed Insights or Chrome DevTools
```

## 📊 Monitoring

### 1. Error Tracking

```typescript
// Error boundary for production
class ProductionErrorBoundary extends React.Component {
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Send to monitoring service (Sentry, LogRocket, etc.)
    console.error('Production error:', error, errorInfo);
    
    // Track to analytics
    if (window.gtag) {
      window.gtag('event', 'exception', {
        description: error.message,
        fatal: false
      });
    }
  }
}
```

### 2. Performance Monitoring

```typescript
// Performance tracking
const trackPerformance = () => {
  // Track Core Web Vitals
  import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
    getCLS(console.log);
    getFID(console.log);
    getFCP(console.log);
    getLCP(console.log);
    getTTFB(console.log);
  });
  
  // Track 3D model loading
  performance.mark('model-load-start');
  // ... model loading code
  performance.mark('model-load-end');
  performance.measure('model-load', 'model-load-start', 'model-load-end');
};
```

### 3. Analytics Setup

```typescript
// Google Analytics 4
declare global {
  interface Window {
    gtag: any;
  }
}

// Track page views
const trackPageView = (url: string) => {
  if (window.gtag) {
    window.gtag('config', 'GA_MEASUREMENT_ID', {
      page_path: url,
    });
  }
};

// Track custom events
const trackEvent = (action: string, category: string, label?: string) => {
  if (window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
    });
  }
};
```

## 🐛 Troubleshooting

### Common Deployment Issues

#### 1. Environment Variables Not Loading

```bash
# Check environment variables
console.log('Firebase config:', {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ? 'Set' : 'Missing',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ? 'Set' : 'Missing',
  // ... other variables
});

# Solutions:
# - Ensure variables are prefixed with VITE_
# - Check hosting platform environment variable settings
# - Verify .env.local is not committed to git
```

#### 2. 3D Models Not Loading

```typescript
// Debug model loading
const debugModelLoading = () => {
  console.log('Model path:', '/models/scene.glb');
  console.log('Base URL:', import.meta.url);
  
  // Check if file exists
  fetch('/models/scene.glb')
    .then(response => {
      console.log('Model fetch status:', response.status);
    })
    .catch(error => {
      console.error('Model fetch error:', error);
    });
};

// Solutions:
# - Verify model files are in public/models/
# - Check file permissions and MIME types
# - Ensure WebGL is supported in browser
```

#### 3. Scroll Interactions Not Working

```typescript
// Debug scroll system
const debugScrollSystem = () => {
  console.log('GSAP loaded:', typeof gsap !== 'undefined');
  console.log('ScrollTrigger loaded:', typeof ScrollTrigger !== 'undefined');
  console.log('Intersection Observer supported:', 'IntersectionObserver' in window);
};

// Solutions:
# - Check GSAP plugin registration
# - Verify intersection observer polyfills
# - Test on different devices/browsers
```

#### 4. Firebase Connection Issues

```typescript
// Debug Firebase connection
const testFirebaseConnection = async () => {
  try {
    const testQuery = query(
      collection(firestore, 'articleFilesV1'),
      where('availableOnWebsite', '==', true),
      limit(1)
    );
    
    const snapshot = await getDocs(testQuery);
    console.log('Firebase connected:', snapshot.size > 0);
  } catch (error) {
    console.error('Firebase error:', error);
  }
};

// Solutions:
# - Check Firebase project configuration
# - Verify Firestore security rules
# - Ensure network connectivity
```

### Performance Issues

```typescript
// Performance debugging
const debugPerformance = () => {
  // Check bundle sizes
  console.log('Bundle analysis available at: npm run build -- --analyze');
  
  // Monitor memory usage
  if (performance.memory) {
    console.log('Memory usage:', {
      used: performance.memory.usedJSHeapSize,
      total: performance.memory.totalJSHeapSize,
      limit: performance.memory.jsHeapSizeLimit
    });
  }
  
  // Check for memory leaks
  let memoryLeakCheck = setInterval(() => {
    if (performance.memory) {
      console.log('Memory check:', performance.memory.usedJSHeapSize);
    }
  }, 10000);
  
  // Clear interval after testing
  setTimeout(() => clearInterval(memoryLeakCheck), 60000);
};
```

---

This deployment guide ensures a smooth, secure, and optimized deployment of the Dhyaan meditation platform across various hosting environments. 