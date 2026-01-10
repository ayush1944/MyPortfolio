import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorVariant, setCursorVariant] = useState('default');
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = (e) => {
      const target = e.target;
      if (target instanceof Element && target.matches('button, a, [role="button"], .cursor-pointer, [onclick]')) {
        setIsHovering(true);
        setCursorVariant("pointer");
      } else if (target instanceof Element && target.matches("input, textarea, select")) {
        setIsHovering(true);
        setCursorVariant("input");
      } else if (target instanceof Element && target.matches("h1, h2, h3, h4, h5, h6")) {
        setIsHovering(true);
        setCursorVariant("text");
      } else {
        setIsHovering(false);
        setCursorVariant("default");
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      setCursorVariant('default');
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  // Smooth cursor movement with GSAP
  useEffect(() => {
    if (cursorRef.current) {
      gsap.to(cursorRef.current, {
        x: mousePosition.x,
        y: mousePosition.y,
        duration: 0.15,
        ease: 'power2.out',
      });
    }

    if (cursorDotRef.current) {
      gsap.to(cursorDotRef.current, {
        x: mousePosition.x,
        y: mousePosition.y,
        duration: 0.05,
        ease: 'power2.out',
      });
    }
  }, [mousePosition]);

  const cursorVariants = {
    default: {
      scale: 1,
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      border: '2px solid rgb(59, 130, 246)',
    },
    pointer: {
      scale: 1.5,
      backgroundColor: 'rgba(59, 130, 246, 0.2)',
      border: '2px solid rgb(59, 130, 246)',
      cursor: 'pointer',
    },
    input: {
      scale: 1.2,
      backgroundColor: 'rgba(34, 197, 94, 0.1)',
      border: '2px solid rgb(34, 197, 94)',
    },
    text: {
      scale: 2,
      backgroundColor: 'rgba(168, 85, 247, 0.1)',
      border: '2px solid rgb(168, 85, 247)',
    },
  };

  return (
    <>
      {/* Main Cursor Ring */}
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-[9999] w-8 h-8 rounded-full transition-all duration-300 ease-out mix-blend-difference flex items-center justify-center"
        style={{
          transform: 'translate(-50%, -50%)',
          ...cursorVariants[cursorVariant],
          opacity: isClicking ? 0.5 : 1, // Adjust opacity when clicking
        }}
      >
        {/* Pointer Icon for clickable elements */}
        {cursorVariant === 'pointer' && (
          <div className="w-3 h-3 border-l-2 border-b-2 border-primary-600 transform rotate-45 -translate-x-0.5 -translate-y-0.5"></div>
        )}
      </div>

      {/* Cursor Dot - hide when showing pointer */}
      {cursorVariant !== 'pointer' && (
        <div
          ref={cursorDotRef}
          className="fixed pointer-events-none z-[9999] w-1 h-1 bg-primary-600 rounded-full"
          style={{
            transform: 'translate(-50%, -50%)',
            opacity: isClicking ? 0.8 : 1, // Adjust opacity when clicking
          }}
        />
      )}

      {/* Global cursor styles */}
      <style jsx global>{`
        * {
          cursor: none !important;
        }

        /* Ensure all clickable elements are detected */
        a, button, [role="button"], .cursor-pointer, [onclick],
        input[type="submit"], input[type="button"], input[type="reset"] {
          cursor: none !important;
        }

        .cursor-hover {
          transition: transform 0.3s cubic-bezier(0.23, 1, 0.320, 1);
        }

        .cursor-hover:hover {
          transform: scale(1.05);
        }

        /* Add pointer class for manual cursor control */
        .cursor-pointer {
          cursor: none !important;
        }
      `}</style>
    </>
  );
};

// Hook for magnetic hover effect
export const useMagneticHover = (strength = 0.3) => {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(element, {
        x: x * strength,
        y: y * strength,
        duration: 0.4,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.4)',
      });
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);
    element.classList.add('cursor-hover');

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
      element.classList.remove('cursor-hover');
    };
  }, [strength]);

  return ref;
};

export default CustomCursor;