import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { useTheme } from '../../contexts/ThemeContext';

const FloatingElements = ({ count = 15, interactive = true }) => {
  const containerRef = useRef(null);
  const elementsRef = useRef([]);
  const { isDark } = useTheme();

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear existing elements
    elementsRef.current = [];
    containerRef.current.innerHTML = '';

    // Create floating elements
    for (let i = 0; i < count; i++) {
      const element = document.createElement('div');
      const size = Math.random() * 60 + 20; // 20-80px
      const shape = Math.random() > 0.5 ? 'circle' : 'square';
      
      element.className = `floating-element ${shape}`;
      element.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: ${getRandomGradient(isDark)};
        border-radius: ${shape === 'circle' ? '50%' : '20%'};
        opacity: ${Math.random() * 0.3 + 0.1};
        backdrop-filter: blur(1px);
        pointer-events: ${interactive ? 'auto' : 'none'};
        cursor: pointer;
        transition: all 0.3s ease;
      `;

      // Random position
      const x = Math.random() * (window.innerWidth - size);
      const y = Math.random() * (window.innerHeight - size);
      
      gsap.set(element, { x, y });
      
      containerRef.current.appendChild(element);
      elementsRef.current.push(element);

      // Floating animation
      gsap.to(element, {
        y: y + (Math.random() - 0.5) * 200,
        x: x + (Math.random() - 0.5) * 100,
        rotation: Math.random() * 360,
        duration: Math.random() * 10 + 10,
        ease: 'none',
        repeat: -1,
        yoyo: true,
      });

      // Breathing effect
      gsap.to(element, {
        scale: Math.random() * 0.5 + 0.8,
        duration: Math.random() * 3 + 2,
        ease: 'power2.inOut',
        repeat: -1,
        yoyo: true,
      });

      // Interactive hover effect
      if (interactive) {
        element.addEventListener('mouseenter', () => {
          gsap.to(element, {
            scale: 1.5,
            opacity: 0.6,
            duration: 0.3,
            ease: 'power2.out',
          });
        });

        element.addEventListener('mouseleave', () => {
          gsap.to(element, {
            scale: 1,
            opacity: Math.random() * 0.3 + 0.1,
            duration: 0.3,
            ease: 'power2.out',
          });
        });
      }
    }

    // Mouse follow effect for some elements
    if (interactive) {
      const handleMouseMove = (e) => {
        elementsRef.current.slice(0, 3).forEach((element, index) => {
          const speed = (index + 1) * 0.02;
          const x = e.clientX * speed;
          const y = e.clientY * speed;
          
          gsap.to(element, {
            x: x - 50,
            y: y - 50,
            duration: 1 + index * 0.2,
            ease: 'power2.out',
          });
        });
      };

      window.addEventListener('mousemove', handleMouseMove);
      
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }
  }, [count, interactive, isDark]);

  const getRandomGradient = (isDark) => {
    const colors = isDark 
      ? [
          'linear-gradient(45deg, rgba(59, 130, 246, 0.3), rgba(147, 51, 234, 0.3))',
          'linear-gradient(45deg, rgba(34, 197, 94, 0.3), rgba(59, 130, 246, 0.3))',
          'linear-gradient(45deg, rgba(168, 85, 247, 0.3), rgba(236, 72, 153, 0.3))',
          'linear-gradient(45deg, rgba(251, 191, 36, 0.3), rgba(245, 101, 101, 0.3))',
        ]
      : [
          'linear-gradient(45deg, rgba(59, 130, 246, 0.2), rgba(147, 51, 234, 0.2))',
          'linear-gradient(45deg, rgba(34, 197, 94, 0.2), rgba(59, 130, 246, 0.2))',
          'linear-gradient(45deg, rgba(168, 85, 247, 0.2), rgba(236, 72, 153, 0.2))',
          'linear-gradient(45deg, rgba(251, 191, 36, 0.2), rgba(245, 101, 101, 0.2))',
        ];
    
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: -1 }}
    >
      <style jsx>{`
        .floating-element {
          will-change: transform;
        }
        .floating-element:hover {
          filter: brightness(1.2);
        }
      `}</style>
    </div>
  );
};

export default FloatingElements;
