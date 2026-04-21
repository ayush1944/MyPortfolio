import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { useTypingEffect } from '../hooks/useTypingEffect';
import { useTheme } from '../contexts/ThemeContext';
import { SOCIAL_LINKS, EMAIL } from '../data/social';

const ROLES = [
  'AI Automation Engineer',
  'Full-Stack Developer',
  'MERN · Next.js · TypeScript',
  'AI & SaaS Builder',
  'Backend & API Engineer',
];

const MouseScrollIcon = ({ isDark }) => {
  const dotRef = useRef(null);

  useEffect(() => {
    if (!dotRef.current) return;
    gsap.to(dotRef.current, {
      y: 10, repeat: -1, yoyo: true, duration: 1.1,
      ease: 'power1.inOut', delay: 1.8,
    });
  }, []);

  const stroke = isDark ? 'rgba(107,107,107,0.6)' : 'rgba(80,60,20,0.4)';
  const fill   = isDark ? '#6b6b6b' : '#907050';

  return (
    <div className="flex flex-col items-center gap-2">
      <div style={{ position: 'relative', width: 22, height: 34 }}>
        <svg width="22" height="34" viewBox="0 0 22 34" fill="none">
          <rect x="1" y="1" width="20" height="32" rx="10" stroke={stroke} strokeWidth="1.5" />
          <line x1="11" y1="1" x2="11" y2="17" stroke={stroke} strokeWidth="1" strokeOpacity="0.3" />
        </svg>
        <div
          ref={dotRef}
          style={{
            position: 'absolute', left: '50%', top: 7,
            width: 4, height: 4, borderRadius: '50%',
            background: fill, transform: 'translateX(-50%)',
          }}
        />
      </div>
      <span className="font-mono text-[10px] tracking-widest uppercase" style={{ color: 'var(--color-muted)' }}>
        Scroll
      </span>
    </div>
  );
};

const Hero = () => {
  const { isDark } = useTheme();
  const currentRole = useTypingEffect(ROLES, 80, 40, 2200);
  const labelRef = useRef(null);

  useEffect(() => {
    const el = labelRef.current;
    if (!el) return;
    const text = el.getAttribute('data-text') || '';
    el.innerHTML = text
      .split('')
      .map((ch) =>
        `<span style="display:inline-block;opacity:0;transform:translateY(10px)">${ch === ' ' ? '&nbsp;' : ch}</span>`
      )
      .join('');
    gsap.to(el.querySelectorAll('span'), {
      opacity: 1, y: 0, duration: 0.4, stagger: 0.022,
      ease: 'power3.out', delay: 0.35,
    });
  }, []);

  const scrollToProjects = () => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  const scrollToContact  = () => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });

  const gridLines = isDark
    ? `linear-gradient(rgba(255,255,255,0.014) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.014) 1px,transparent 1px)`
    : `linear-gradient(rgba(0,0,0,0.028) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.028) 1px,transparent 1px)`;

  return (
    <section
      id="home"
      className="min-h-screen relative flex flex-col justify-center"
      style={{ background: 'transparent', backgroundImage: gridLines, backgroundSize: '60px 60px' }}
    >
      <div className="container-custom w-full" style={{ position: 'relative', zIndex: 2 }}>

        {/* Section label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <span
            ref={labelRef}
            data-text="[ FULL-STACK DEVELOPER · AI AUTOMATION ENGINEER ]"
            className="section-label text-xs"
            aria-label="AI Automation · Full-Stack Developer"
          />
        </motion.div>

        {/* Name */}
        <div className="mt-6">
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.42 }}
            className="font-display font-extrabold tracking-tighter leading-none"
            style={{ fontSize: 'clamp(4rem, 13vw, 150px)', color: 'var(--color-ink)' }}
          >
            AYUSH
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.56 }}
            className="font-display font-extrabold tracking-tighter leading-none"
            style={{
              fontSize: 'clamp(4rem, 13vw, 150px)',
              color: 'var(--color-ink)',
              marginLeft: 'clamp(1.4rem, 0vw, 80px)',
            }}
          >
            PAL
          </motion.h1>
        </div>

        {/* Bottom row — badge + role on left, tagline + CTAs + socials on right */}
        <div className="mt-10 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">

          {/* Left: badge + typing role */}
          <div className="flex flex-col gap-3">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.74 }}
              className="flex items-center gap-2 w-fit"
            >
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--color-accent)' }} />
              <span
                className="font-mono text-xs tracking-wide px-3 py-1.5 rounded-full"
                style={{
                  color: 'var(--color-accent)',
                  border: '1px solid var(--color-accent)',
                  background: isDark ? 'rgba(107,255,198,0.06)' : 'rgba(0,107,63,0.07)',
                }}
              >
                Open to Work
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="font-mono text-sm h-6"
              style={{ color: 'var(--color-accent)' }}
            >
              {currentRole}<span className="animate-pulse">_</span>
            </motion.p>
          </div>

          {/* Right: tagline + CTAs + socials */}
          <div className="flex flex-col gap-5 lg:items-end lg:text-right max-w-sm">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.02 }}
              className="font-sans text-sm leading-relaxed"
              style={{ color: 'var(--color-muted)' }}
            >
              Building production-ready web apps &amp; AI automation pipelines — MERN, Next.js, TypeScript.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.14 }}
              className="flex flex-wrap gap-3 lg:justify-end"
            >
              <button onClick={scrollToProjects} className="btn-primary text-sm">View Work ↓</button>
              <button onClick={scrollToContact}  className="btn-outline text-sm">Get In Touch</button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.26 }}
              className="flex gap-5"
            >
              {[
                { label: 'GitHub ↗',   href: SOCIAL_LINKS[0].href },
                { label: 'LinkedIn ↗', href: SOCIAL_LINKS[1].href },
                { label: 'Email ↗',    href: `mailto:${EMAIL}` },
              ].map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target={l.href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="font-mono text-[11px] tracking-widest uppercase transition-colors duration-200"
                  style={{ color: 'var(--color-muted)' }}
                  onMouseOver={(e) => (e.currentTarget.style.color = 'var(--color-ink)')}
                  onMouseOut={(e)  => (e.currentTarget.style.color = 'var(--color-muted)')}
                >
                  {l.label}
                </a>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.7 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        style={{ zIndex: 3 }}
      >
        <MouseScrollIcon isDark={isDark} />
      </motion.div>
    </section>
  );
};

export default Hero;
