import React from 'react';

const SkipLink = ({ href = '#main-content', children = 'Skip to main content' }) => {
  return (
    <a
      href={href}
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 bg-primary-600 text-white px-4 py-2 rounded-md font-medium hover:bg-primary-700 transition-colors duration-200"
    >
      {children}
    </a>
  );
};

export default SkipLink;
