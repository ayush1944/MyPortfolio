import { useEffect, useRef } from 'react';
import gsap from 'gsap';

// Enhanced scroll trigger hook
export const useScrollTrigger = (options = {}) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const {
      start = 'top 80%',
      end = 'bottom 20%',
      animation = 'fadeInUp',
      duration = 1,
      delay = 0,
      ease = 'power2.out',
      stagger = 0,
    } = options;

    // Define animation presets
    const animations = {
      fadeInUp: {
        from: { opacity: 0, y: 60 },
        to: { opacity: 1, y: 0 },
      },
      fadeInDown: {
        from: { opacity: 0, y: -60 },
        to: { opacity: 1, y: 0 },
      },
      fadeInLeft: {
        from: { opacity: 0, x: -60 },
        to: { opacity: 1, x: 0 },
      },
      fadeInRight: {
        from: { opacity: 0, x: 60 },
        to: { opacity: 1, x: 0 },
      },
      scaleIn: {
        from: { opacity: 0, scale: 0.8 },
        to: { opacity: 1, scale: 1 },
      },
      slideInUp: {
        from: { y: '100%' },
        to: { y: '0%' },
      },
      rotateIn: {
        from: { opacity: 0, rotation: -180 },
        to: { opacity: 1, rotation: 0 },
      },
    };

    const selectedAnimation = animations[animation] || animations.fadeInUp;

    // Set initial state
    gsap.set(element, selectedAnimation.from);

    // Create intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate in
            gsap.to(element, {
              ...selectedAnimation.to,
              duration,
              delay,
              ease,
              stagger: stagger > 0 ? { amount: stagger } : 0,
            });
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [options]);

  return elementRef;
};

// Parallax scroll effect
export const useParallax = (speed = 0.5, direction = 'vertical') => {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -speed;

      if (direction === 'vertical') {
        gsap.set(element, { y: rate });
      } else {
        gsap.set(element, { x: rate });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed, direction]);

  return elementRef;
};

// Scroll progress indicator
export const useScrollProgress = (callback) => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      
      callback?.(scrollPercent);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [callback]);
};

// Magnetic scroll effect
export const useMagneticScroll = (strength = 0.1) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleMouseMove = (e) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(element, {
        x: x * strength,
        y: y * strength,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)',
      });
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength]);

  return elementRef;
};

// Text animation on scroll
export const useTextAnimation = (type = 'typewriter') => {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const text = element.textContent;
    element.innerHTML = '';

    if (type === 'typewriter') {
      // Typewriter effect
      const chars = text.split('');
      chars.forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.opacity = '0';
        element.appendChild(span);
      });

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const spans = element.querySelectorAll('span');
              gsap.to(spans, {
                opacity: 1,
                duration: 0.05,
                stagger: 0.05,
                ease: 'none',
              });
            }
          });
        },
        { threshold: 0.5 }
      );

      observer.observe(element);

      return () => observer.unobserve(element);
    } else if (type === 'reveal') {
      // Reveal effect
      const words = text.split(' ');
      words.forEach((word, index) => {
        const span = document.createElement('span');
        span.textContent = word;
        span.style.display = 'inline-block';
        span.style.overflow = 'hidden';
        span.style.marginRight = '0.25em';
        
        const inner = document.createElement('span');
        inner.textContent = word;
        inner.style.display = 'inline-block';
        inner.style.transform = 'translateY(100%)';
        
        span.appendChild(inner);
        element.appendChild(span);
      });

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const inners = element.querySelectorAll('span span');
              gsap.to(inners, {
                y: 0,
                duration: 0.6,
                stagger: 0.1,
                ease: 'power2.out',
              });
            }
          });
        },
        { threshold: 0.5 }
      );

      observer.observe(element);

      return () => observer.unobserve(element);
    }
  }, [type]);

  return elementRef;
};

// Smooth scroll to element
export const smoothScrollTo = (target, duration = 1) => {
  const element = typeof target === 'string' ? document.querySelector(target) : target;
  if (!element) return;

  const targetPosition = element.offsetTop;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;

  gsap.to(window, {
    scrollTo: { y: targetPosition, autoKill: false },
    duration,
    ease: 'power2.inOut',
  });
};
