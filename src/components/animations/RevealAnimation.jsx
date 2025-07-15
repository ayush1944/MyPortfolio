import React from 'react';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

const RevealAnimation = ({ 
  children, 
  direction = 'up', 
  delay = 0, 
  duration = 0.6,
  distance = 60,
  className = '',
  once = true 
}) => {
  const { elementRef, isIntersecting, hasIntersected } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  });

  const shouldAnimate = once ? hasIntersected : isIntersecting;

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? distance : direction === 'down' ? -distance : 0,
      x: direction === 'left' ? distance : direction === 'right' ? -distance : 0,
      scale: direction === 'scale' ? 0.8 : 1,
      rotateY: direction === 'rotateY' ? 90 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      rotateY: 0,
      transition: {
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94], // Custom easing
      },
    },
  };

  return (
    <motion.div
      ref={elementRef}
      initial="hidden"
      animate={shouldAnimate ? 'visible' : 'hidden'}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Stagger children animation
export const StaggerContainer = ({ children, staggerDelay = 0.1, className = '' }) => {
  const { elementRef, isIntersecting, hasIntersected } = useIntersectionObserver({
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <motion.div
      ref={elementRef}
      initial="hidden"
      animate={hasIntersected ? 'visible' : 'hidden'}
      variants={containerVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Individual stagger item
export const StaggerItem = ({ children, className = '' }) => {
  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
};

// Text reveal animation
export const TextReveal = ({ children, className = '', delay = 0 }) => {
  const { elementRef, hasIntersected } = useIntersectionObserver({
    threshold: 0.5,
  });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
        delayChildren: delay,
      },
    },
  };

  const letterVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      rotateX: -90,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const words = children.split(' ');

  return (
    <motion.div
      ref={elementRef}
      initial="hidden"
      animate={hasIntersected ? 'visible' : 'hidden'}
      variants={containerVariants}
      className={className}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block mr-2">
          {word.split('').map((letter, letterIndex) => (
            <motion.span
              key={letterIndex}
              variants={letterVariants}
              className="inline-block"
              style={{ transformOrigin: '50% 100%' }}
            >
              {letter}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.div>
  );
};

// Morphing shape animation
export const MorphingShape = ({ className = '' }) => {
  const pathVariants = {
    initial: {
      d: "M20,20 Q50,10 80,20 Q90,50 80,80 Q50,90 20,80 Q10,50 20,20",
    },
    animate: {
      d: [
        "M20,20 Q50,10 80,20 Q90,50 80,80 Q50,90 20,80 Q10,50 20,20",
        "M25,15 Q55,5 85,25 Q95,55 75,85 Q45,95 15,75 Q5,45 25,15",
        "M15,25 Q45,15 75,25 Q85,55 75,85 Q45,95 15,85 Q5,55 15,25",
        "M20,20 Q50,10 80,20 Q90,50 80,80 Q50,90 20,80 Q10,50 20,20",
      ],
      transition: {
        duration: 4,
        ease: "easeInOut",
        repeat: Infinity,
      },
    },
  };

  return (
    <motion.svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      className={className}
      initial="initial"
      animate="animate"
    >
      <motion.path
        variants={pathVariants}
        fill="url(#gradient)"
        stroke="none"
      />
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(59, 130, 246, 0.3)" />
          <stop offset="100%" stopColor="rgba(147, 51, 234, 0.3)" />
        </linearGradient>
      </defs>
    </motion.svg>
  );
};

export default RevealAnimation;
