import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = ({ size = 'md', color = 'primary', className = '' }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  };

  const colors = {
    primary: 'border-primary-600',
    white: 'border-white',
    gray: 'border-gray-600',
  };

  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      className={`${sizes[size]} border-2 ${colors[color]} border-t-transparent rounded-full ${className}`}
    />
  );
};

export const LoadingSkeleton = ({ className = '', width = 'w-full', height = 'h-4' }) => {
  return (
    <div className={`${width} ${height} bg-gray-200 dark:bg-gray-700 rounded animate-pulse ${className}`} />
  );
};

export const LoadingCard = () => {
  return (
    <div className="card p-6 animate-pulse">
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
        <div className="flex-1 space-y-2">
          <LoadingSkeleton height="h-4" width="w-3/4" />
          <LoadingSkeleton height="h-3" width="w-1/2" />
        </div>
      </div>
      <div className="space-y-2">
        <LoadingSkeleton height="h-3" />
        <LoadingSkeleton height="h-3" />
        <LoadingSkeleton height="h-3" width="w-5/6" />
      </div>
    </div>
  );
};

export default LoadingSpinner;
