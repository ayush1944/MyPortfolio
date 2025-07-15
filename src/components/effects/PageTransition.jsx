import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';

const PageTransition = ({ isTransitioning, onComplete }) => {
  const overlayRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    if (isTransitioning) {
      createTransitionEffect();
    }
  }, [isTransitioning]);

  const createTransitionEffect = () => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    // Create particles
    const particleCount = 50;
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'transition-particle';
      particle.style.cssText = `
        position: absolute;
        width: 4px;
        height: 4px;
        background: linear-gradient(45deg, #3b82f6, #8b5cf6);
        border-radius: 50%;
        pointer-events: none;
        left: ${Math.random() * window.innerWidth}px;
        top: ${Math.random() * window.innerHeight}px;
      `;
      
      overlay.appendChild(particle);
      particles.push(particle);
    }

    particlesRef.current = particles;

    // Animate particles
    particles.forEach((particle, index) => {
      gsap.fromTo(particle, 
        {
          scale: 0,
          opacity: 0,
        },
        {
          scale: Math.random() * 2 + 1,
          opacity: 1,
          duration: 0.5,
          delay: index * 0.01,
          ease: 'power2.out',
          onComplete: () => {
            gsap.to(particle, {
              scale: 0,
              opacity: 0,
              duration: 0.3,
              delay: 0.5,
              ease: 'power2.in',
            });
          }
        }
      );
    });

    // Complete transition after animation
    setTimeout(() => {
      particles.forEach(particle => {
        if (overlay.contains(particle)) {
          overlay.removeChild(particle);
        }
      });
      onComplete?.();
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          ref={overlayRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, rgba(139,92,246,0.1) 100%)',
          }}
        />
      )}
    </AnimatePresence>
  );
};

// Hook for smooth section transitions
export const useSmoothTransition = () => {
  const [isTransitioning, setIsTransitioning] = React.useState(false);

  const triggerTransition = (callback) => {
    setIsTransitioning(true);
    
    setTimeout(() => {
      callback?.();
      setIsTransitioning(false);
    }, 800);
  };

  return { isTransitioning, triggerTransition };
};

export default PageTransition;
