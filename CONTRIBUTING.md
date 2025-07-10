# Contributing to Dhyaan

Thank you for your interest in contributing to Dhyaan! This document provides guidelines and instructions for contributing to our meditation platform.

## 📋 Table of Contents

- [Code of Conduct](#-code-of-conduct)
- [Getting Started](#-getting-started)
- [Development Setup](#-development-setup)
- [Contribution Workflow](#-contribution-workflow)
- [Coding Standards](#-coding-standards)
- [Testing Guidelines](#-testing-guidelines)
- [Pull Request Process](#-pull-request-process)
- [Issue Guidelines](#-issue-guidelines)
- [Development Tips](#-development-tips)

## 🤝 Code of Conduct

We are committed to providing a welcoming and inclusive environment for all contributors. Please read and follow our [Code of Conduct](CODE_OF_CONDUCT.md).

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18+ with npm
- **Git** for version control
- **Modern browser** with WebGL support
- **Text editor** (VS Code recommended)

### Recommended VS Code Extensions

```json
{
  "recommendations": [
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-typescript-next",
    "bradlc.vscode-tailwindcss",
    "formulahendry.auto-rename-tag",
    "ms-vscode.vscode-json"
  ]
}
```

## 🛠 Development Setup

1. **Fork the repository**
```bash
# Fork on GitHub, then clone your fork
git clone https://github.com/yourusername/apple-3js-main.git
cd apple-3js-main
```

2. **Add upstream remote**
```bash
git remote add upstream https://github.com/originalowner/apple-3js-main.git
```

3. **Install dependencies**
```bash
npm install
```

4. **Set up environment variables**
```bash
cp .env.example .env.local
# Fill in your Firebase configuration
```

5. **Start development server**
```bash
npm run dev
```

## 🔄 Contribution Workflow

### 1. Stay Updated
```bash
git checkout main
git pull upstream main
```

### 2. Create Feature Branch
```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/bug-description
```

### 3. Make Changes
- Follow our [coding standards](#-coding-standards)
- Write clear, descriptive commit messages
- Test your changes thoroughly

### 4. Commit Changes
```bash
git add .
git commit -m "feat: add scroll-lock system to Features component"
```

### 5. Push and Create PR
```bash
git push origin feature/your-feature-name
# Create Pull Request on GitHub
```

## 📝 Coding Standards

### TypeScript Guidelines

```typescript
// ✅ Good: Proper type definitions
interface MeditationCategory {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

// ✅ Good: Function with JSDoc
/**
 * Handles scroll-lock functionality for meditation categories
 * @param isLocked - Whether scrolling should be locked
 * @param callback - Function to call when lock state changes
 */
const handleScrollLock = (isLocked: boolean, callback?: () => void): void => {
  // Implementation
};

// ❌ Avoid: Any types
const handleData = (data: any) => { /* ... */ };

// ✅ Better: Proper typing
const handleData = (data: BlogPost[]) => { /* ... */ };
```

### React Component Guidelines

```typescript
// ✅ Good: Functional component with proper props
interface FeatureCardProps {
  title: string;
  description: string;
  imageUrl: string;
  isActive?: boolean;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  title, 
  description, 
  imageUrl, 
  isActive = false 
}) => {
  return (
    <div className={`card ${isActive ? 'active' : ''}`}>
      {/* Component content */}
    </div>
  );
};

export default FeatureCard;
```

### GSAP Animation Guidelines

```typescript
// ✅ Good: Proper GSAP usage with cleanup
useEffect(() => {
  const tl = gsap.timeline();
  
  tl.to(ref.current, {
    duration: 1,
    opacity: 1,
    ease: "power2.out"
  });

  return () => {
    tl.kill(); // Always clean up animations
  };
}, []);
```

### Three.js Best Practices

```typescript
// ✅ Good: Resource cleanup
useEffect(() => {
  // Three.js setup
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial();
  const mesh = new THREE.Mesh(geometry, material);

  return () => {
    // Cleanup
    geometry.dispose();
    material.dispose();
  };
}, []);
```

### CSS/Tailwind Guidelines

```css
/* ✅ Good: Organized Tailwind classes */
<div className="
  flex flex-col items-center justify-center
  w-full h-screen
  bg-gradient-to-b from-blue-900 to-purple-900
  text-white text-center
">

/* ✅ Good: Custom CSS for complex animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

## 🧪 Testing Guidelines

### Manual Testing Checklist

Before submitting a PR, ensure:

- [ ] **Responsive Design**: Test on mobile, tablet, and desktop
- [ ] **3D Model**: Verify Three.js model loads and rotates correctly
- [ ] **Scroll Interactions**: Test Features component scroll-lock system
- [ ] **Firebase**: Verify blog posts load from Firestore
- [ ] **Performance**: Check for console errors and performance issues
- [ ] **Cross-Browser**: Test on Chrome, Firefox, Safari, Edge

### Component Testing

```typescript
// Example test structure (if implementing)
describe('FeatureCard', () => {
  it('renders with correct props', () => {
    // Test implementation
  });

  it('handles active state correctly', () => {
    // Test implementation
  });
});
```

## 📤 Pull Request Process

### PR Template

When creating a PR, include:

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tested on multiple devices
- [ ] Verified 3D model functionality
- [ ] Checked scroll interactions
- [ ] No console errors

## Screenshots/Videos
[If applicable, add screenshots or screen recordings]

## Additional Notes
[Any additional information for reviewers]
```

### Review Criteria

Your PR will be reviewed for:

1. **Code Quality**: Follows TypeScript and React best practices
2. **Performance**: No unnecessary re-renders or memory leaks
3. **Accessibility**: Proper ARIA labels and keyboard navigation
4. **Responsive Design**: Works on all device sizes
5. **Documentation**: Code is well-commented and self-documenting

## 🐛 Issue Guidelines

### Bug Reports

Use the bug report template:

```markdown
**Description**
Clear description of the bug

**Steps to Reproduce**
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

**Expected Behavior**
What should happen

**Screenshots**
If applicable, add screenshots

**Environment**
- OS: [e.g. iOS]
- Browser: [e.g. chrome, safari]
- Device: [e.g. iPhone X, Desktop]
```

### Feature Requests

Use the feature request template:

```markdown
**Feature Description**
Clear description of the requested feature

**Problem Solved**
What problem does this solve?

**Proposed Solution**
Describe your solution

**Alternatives Considered**
Other solutions you've considered

**Additional Context**
Any other context or screenshots
```

## 💡 Development Tips

### Performance Optimization

```typescript
// ✅ Memoize expensive calculations
const expensiveValue = useMemo(() => {
  return heavyCalculation(data);
}, [data]);

// ✅ Optimize re-renders
const MemoizedComponent = React.memo(Component);

// ✅ Lazy load components
const LazyComponent = React.lazy(() => import('./Component'));
```

### GSAP Performance

```typescript
// ✅ Use transform instead of position properties
gsap.to(element, {
  x: 100,        // ✅ Better performance
  y: 50,         // ✅ Better performance
  rotation: 45   // ✅ Better performance
});

// ❌ Avoid animating layout properties
gsap.to(element, {
  left: "100px",  // ❌ Causes layout thrashing
  top: "50px"     // ❌ Causes layout thrashing
});
```

### Firebase Best Practices

```typescript
// ✅ Use pagination for large datasets
const getBlogPosts = async (limit = 10, lastDoc?: DocumentSnapshot) => {
  let q = query(
    collection(firestore, 'articleFilesV1'),
    where('availableOnWebsite', '==', true),
    orderBy('createdAt', 'desc'),
    limitToFirst(limit)
  );

  if (lastDoc) {
    q = query(q, startAfter(lastDoc));
  }

  return await getDocs(q);
};
```

### Debugging Tips

```typescript
// ✅ Use console.group for organized logging
console.group('3D Model Debug');
console.log('Model loaded:', model);
console.log('Animations:', animations);
console.groupEnd();

// ✅ Use performance markers
performance.mark('3d-model-start');
// ... load model
performance.mark('3d-model-end');
performance.measure('3d-model-load', '3d-model-start', '3d-model-end');
```

## 📚 Additional Resources

- [React Documentation](https://reactjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Three.js Documentation](https://threejs.org/docs)
- [GSAP Documentation](https://greensock.com/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 🙋‍♀️ Getting Help

- **Documentation**: Check our [README](README.md) and [Architecture](ARCHITECTURE.md)
- **Discussions**: Use GitHub Discussions for questions
- **Issues**: Report bugs via GitHub Issues
- **Discord**: Join our community Discord (if available)

---

Thank you for contributing to Dhyaan! Your efforts help create a better meditation experience for everyone. 🧘‍♀️✨ 