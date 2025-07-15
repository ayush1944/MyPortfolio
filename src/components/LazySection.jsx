import React, { Suspense } from 'react';
import { LoadingCard } from './ui/LoadingSpinner';
import ErrorBoundary from './ErrorBoundary';

const LazySection = ({ 
  children, 
  fallback = <LoadingCard />, 
  errorFallback = null 
}) => {
  return (
    <ErrorBoundary fallback={errorFallback}>
      <Suspense fallback={fallback}>
        {children}
      </Suspense>
    </ErrorBoundary>
  );
};

export default LazySection;
