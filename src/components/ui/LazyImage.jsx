import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import LoadingSpinner from './LoadingSpinner';

const LazyImage = ({
  src,
  alt,
  className = '',
  placeholder = null,
  fallback = null,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const { elementRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '50px',
  });

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
  };

  const showPlaceholder = !isIntersecting || (!isLoaded && !hasError);
  const showFallback = hasError && fallback;
  const showImage = isIntersecting && !hasError;

  return (
    <div ref={elementRef} className={`relative overflow-hidden ${className}`} {...props}>
      {/* Placeholder */}
      {showPlaceholder && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
          {placeholder || (
            <div className="flex flex-col items-center gap-2 text-gray-400">
              <LoadingSpinner size="md" color="gray" />
              <span className="text-sm">Loading...</span>
            </div>
          )}
        </div>
      )}

      {/* Error Fallback */}
      {showFallback && (
        <div className="absolute inset-0 bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
          {fallback}
        </div>
      )}

      {/* Actual Image */}
      {showImage && (
        <motion.img
          src={src}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      )}
    </div>
  );
};

export default LazyImage;
