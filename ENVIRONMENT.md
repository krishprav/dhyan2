# Environment Variables Setup - Dhyaan

This document provides a comprehensive guide to setting up environment variables for the Dhyaan meditation platform.

## 📋 Table of Contents

- [Quick Start](#-quick-start)
- [Environment Variables](#-environment-variables)
- [Firebase Setup](#-firebase-setup)
- [Security Considerations](#-security-considerations)
- [Platform-Specific Setup](#-platform-specific-setup)

## 🚀 Quick Start

1. **Copy the example below to `.env.local`**
2. **Fill in your Firebase configuration values**
3. **Never commit `.env.local` to version control**

## 🔧 Environment Variables

Create a `.env.local` file in your project root with the following content:

```bash
# Dhyaan - Environment Variables
# Copy these variables and fill in your actual values
# Never commit .env.local to version control!

# ====================================
# Firebase Configuration (Client-side)
# ====================================
# Get these values from your Firebase Console:
# https://console.firebase.google.com/project/your-project/settings/general

# Firebase API Key (Public - safe to expose in client)
VITE_FIREBASE_API_KEY=your_firebase_api_key_here

# Firebase Auth Domain
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com

# Firebase Project ID
VITE_FIREBASE_PROJECT_ID=your_project_id_here

# Firebase Storage Bucket
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com

# Firebase Messaging Sender ID
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id_here

# Firebase App ID
VITE_FIREBASE_APP_ID=your_firebase_app_id_here

# Firebase Measurement ID (for Analytics)
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX

# ====================================
# Firebase Configuration (Server-side)
# ====================================
# Used for sitemap generation and server-side operations
# These should NOT be prefixed with VITE_ to keep them server-only

# Firebase Project ID (Server-side)
FIREBASE_PROJECT_ID=your_project_id_here

# Firebase API Key (Server-side)
FIREBASE_API_KEY=your_firebase_api_key_here

# ====================================
# Application Configuration
# ====================================

# Application Environment
NODE_ENV=development

# Base URL for the application
VITE_BASE_URL=http://localhost:5173

# Domain for sitemap generation
VITE_DOMAIN=dhyanapp.epilepto.com
```

## 🔥 Firebase Setup

### Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Create a project" or select existing project
3. Follow the setup wizard

### Step 2: Add Web App

1. In your Firebase project, click the web app icon `</>`
2. Enter app nickname (e.g., "Dhyaan Web App")
3. Check "Also set up Firebase Hosting" if desired
4. Click "Register app"

### Step 3: Get Configuration

Copy the configuration object from Firebase Console:

```javascript
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456789",
  measurementId: "G-XXXXXXXXXX"
};
```

### Step 4: Enable Firestore

1. Go to Firestore Database in Firebase Console
2. Click "Create database"
3. Choose "Start in test mode" for development
4. Select a location for your database

### Step 5: Configure Security Rules

```javascript
// firestore.rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Public read access for published articles
    match /articleFilesV1/{articleId} {
      allow read: if resource.data.availableOnWebsite == true;
      allow write: if false; // Disable write access from client
    }
  }
}
```

## 🔒 Security Considerations

### Environment Variable Types

| Variable Type | Description | Example |
|---------------|-------------|---------|
| `VITE_*` | Client-side variables (exposed to browser) | `VITE_FIREBASE_API_KEY` |
| Regular | Server-side only (not exposed to browser) | `FIREBASE_PROJECT_ID` |

### Important Security Notes

1. **Firebase API Keys are Public**: Firebase API keys are not secrets and are safe to expose in client-side code
2. **Security via Rules**: Firebase security is enforced through Firestore security rules, not API keys
3. **Never Commit Secrets**: Don't commit `.env.local` or any file containing credentials
4. **Use Platform Variables**: In production, use your hosting platform's environment variable system

### What's Safe to Expose

✅ **Safe to expose (client-side)**:
- Firebase API Key
- Firebase Auth Domain
- Firebase Project ID
- Firebase Storage Bucket
- Firebase Messaging Sender ID
- Firebase App ID
- Firebase Measurement ID

❌ **Keep server-side only**:
- Service account keys
- Admin SDK credentials
- Database passwords
- Third-party API secrets

## 🌐 Platform-Specific Setup

### Vercel

1. Go to your project dashboard
2. Navigate to Settings → Environment Variables
3. Add each variable:

```bash
VITE_FIREBASE_API_KEY=your_value_here
VITE_FIREBASE_AUTH_DOMAIN=your_value_here
# ... add all VITE_ prefixed variables
```

### Netlify

1. Go to Site settings → Build & deploy → Environment variables
2. Add each variable:

```bash
VITE_FIREBASE_API_KEY=your_value_here
VITE_FIREBASE_AUTH_DOMAIN=your_value_here
# ... add all VITE_ prefixed variables
```

### Firebase Hosting

Create `.env.production` (not committed):

```bash
# Production environment variables
VITE_FIREBASE_API_KEY=your_production_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_production_auth_domain
# ... other production values
```

### GitHub Actions

Add secrets in repository settings:

```yaml
# .github/workflows/deploy.yml
env:
  VITE_FIREBASE_API_KEY: ${{ secrets.VITE_FIREBASE_API_KEY }}
  VITE_FIREBASE_AUTH_DOMAIN: ${{ secrets.VITE_FIREBASE_AUTH_DOMAIN }}
  # ... other secrets
```

## 🧪 Development vs Production

### Development Environment

```bash
# .env.local (development)
VITE_FIREBASE_API_KEY=your_dev_api_key
VITE_FIREBASE_PROJECT_ID=your_dev_project_id
VITE_BASE_URL=http://localhost:5173
NODE_ENV=development
```

### Production Environment

```bash
# Production environment variables
VITE_FIREBASE_API_KEY=your_prod_api_key
VITE_FIREBASE_PROJECT_ID=your_prod_project_id
VITE_BASE_URL=https://dhyanapp.epilepto.com
NODE_ENV=production
```

## 🔧 Optional Variables

### Analytics

```bash
# Google Analytics 4
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Google Tag Manager
VITE_GTM_ID=GTM-XXXXXXX
```

### Error Tracking

```bash
# Sentry (Error Tracking)
VITE_SENTRY_DSN=https://your-sentry-dsn@sentry.io/project-id

# LogRocket (Session Replay)
VITE_LOGROCKET_APP_ID=your-logrocket-app-id
```

### Development Tools

```bash
# Firebase Emulator (development only)
VITE_USE_FIREBASE_EMULATOR=true
VITE_FIREBASE_EMULATOR_HOST=localhost
VITE_FIREBASE_EMULATOR_PORT=8080
```

## 🐛 Troubleshooting

### Common Issues

#### 1. Environment Variables Not Loading

```bash
# Check if variables are loaded
console.log('Environment check:', {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ? 'Set' : 'Missing',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ? 'Set' : 'Missing'
});
```

**Solutions:**
- Ensure variables are prefixed with `VITE_`
- Restart development server after adding variables
- Check file name is exactly `.env.local`

#### 2. Firebase Connection Issues

```bash
# Test Firebase connection
import { connectFirestoreEmulator } from 'firebase/firestore';

// Check if emulator should be used
if (import.meta.env.VITE_USE_FIREBASE_EMULATOR === 'true') {
  connectFirestoreEmulator(firestore, 'localhost', 8080);
}
```

**Solutions:**
- Verify Firebase project configuration
- Check network connectivity
- Ensure Firestore is enabled in Firebase Console

#### 3. Build Errors

```bash
# Check for undefined environment variables
if (!import.meta.env.VITE_FIREBASE_API_KEY) {
  throw new Error('Missing VITE_FIREBASE_API_KEY environment variable');
}
```

**Solutions:**
- Verify all required variables are set
- Check for typos in variable names
- Ensure production environment variables are configured

## 📚 Reference

### Required Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_FIREBASE_API_KEY` | ✅ | Firebase API key |
| `VITE_FIREBASE_AUTH_DOMAIN` | ✅ | Firebase auth domain |
| `VITE_FIREBASE_PROJECT_ID` | ✅ | Firebase project ID |
| `VITE_FIREBASE_STORAGE_BUCKET` | ✅ | Firebase storage bucket |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | ✅ | Firebase messaging sender ID |
| `VITE_FIREBASE_APP_ID` | ✅ | Firebase app ID |
| `FIREBASE_PROJECT_ID` | ✅ | Server-side project ID (for sitemap) |
| `FIREBASE_API_KEY` | ✅ | Server-side API key (for sitemap) |

### Optional Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_FIREBASE_MEASUREMENT_ID` | ⚠️ | Firebase Analytics measurement ID |
| `VITE_GA_MEASUREMENT_ID` | ❌ | Google Analytics 4 measurement ID |
| `VITE_BASE_URL` | ❌ | Application base URL |
| `VITE_DOMAIN` | ❌ | Domain for sitemap generation |

---

Following this guide ensures secure and proper environment variable setup for the Dhyaan meditation platform across all deployment environments. 