// Debounce function for performance optimization
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Throttle function for scroll events
export const throttle = (func, limit) => {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Preload images for better performance
export const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};

// Preload multiple images
export const preloadImages = (srcArray) => {
  return Promise.all(srcArray.map(preloadImage));
};

// Check if user prefers reduced motion
export const prefersReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Optimize animation based on user preference
export const getAnimationConfig = (animation) => {
  if (prefersReducedMotion()) {
    return {
      ...animation,
      transition: { duration: 0 },
    };
  }
  return animation;
};

// Lazy load component with intersection observer
export const createLazyComponent = (importFunc, fallback = null) => {
  return React.lazy(() => {
    return new Promise((resolve) => {
      // Add artificial delay in development for testing
      const delay = process.env.NODE_ENV === 'development' ? 1000 : 0;
      
      setTimeout(() => {
        resolve(importFunc());
      }, delay);
    });
  });
};

// Memory usage monitoring (development only)
export const logMemoryUsage = () => {
  if (process.env.NODE_ENV === 'development' && 'memory' in performance) {
    const memory = performance.memory;
    console.log('Memory Usage:', {
      used: `${Math.round(memory.usedJSHeapSize / 1048576)} MB`,
      total: `${Math.round(memory.totalJSHeapSize / 1048576)} MB`,
      limit: `${Math.round(memory.jsHeapSizeLimit / 1048576)} MB`,
    });
  }
};
