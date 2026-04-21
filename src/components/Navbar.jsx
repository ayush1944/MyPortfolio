import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, User, Cpu, Code2, Briefcase, FileText, Sun, Moon } from 'lucide-react';
import { SOCIAL_LINKS } from '../data/social';
import { useTheme } from '../contexts/ThemeContext';
import { useScrollSpy } from '../hooks/useScrollSpy';

const NAV_ITEMS = [
  { id: 'home',     href: '#home',     icon: Home,      label: 'Home'       },
  { id: 'about',    href: '#about',    icon: User,      label: 'About'      },
  { id: 'skills',   href: '#skills',   icon: Cpu,       label: 'Stack'      },
  { id: 'projects', href: '#projects', icon: Code2,     label: 'Projects'   },
  { id: 'resume',   href: '#resume',   icon: Briefcase, label: 'Experience' },
  { id: 'contact',  href: '#contact',  icon: FileText,  label: 'Contact'    },
];


// ── Tooltip ───────────────────────────────────────────────────────
const Tooltip = ({ label }) => (
  <motion.div
    initial={{ opacity: 0, y: 4 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 4 }}
    transition={{ duration: 0.12 }}
    className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] tracking-widest uppercase px-2 py-1 rounded pointer-events-none"
    style={{
      background: 'var(--color-surface)',
      color: 'var(--color-muted)',
      border: '1px solid var(--color-border)',
    }}
  >
    {label}
  </motion.div>
);

const DockItem = ({ item, isActive, onClick }) => {
  const [hovered, setHovered] = useState(false);
  const Icon = item.icon;
  return (
    <div className="relative flex flex-col items-center">
      <AnimatePresence>{hovered && <Tooltip label={item.label} />}</AnimatePresence>
      <motion.button
        whileHover={{ scale: 1.2, y: -3 }}
        whileTap={{ scale: 0.88 }}
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="p-3 rounded-xl transition-all duration-200"
        style={{
          background: isActive ? 'var(--color-accent)' : 'transparent',
          color: isActive ? 'var(--color-bg)' : 'var(--color-muted)',
        }}
        aria-label={item.label}
      >
        <Icon size={21} />
      </motion.button>
      <AnimatePresence>
        {isActive && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="w-1 h-1 rounded-full mt-0.5"
            style={{ background: 'var(--color-accent)' }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

const SocialItem = ({ item }) => {
  const [hovered, setHovered] = useState(false);
  const Icon = item.icon;
  return (
    <div className="relative flex flex-col items-center">
      <AnimatePresence>{hovered && <Tooltip label={item.label} />}</AnimatePresence>
      <motion.a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.2, y: -3 }}
        whileTap={{ scale: 0.88 }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="p-3 rounded-xl transition-colors duration-200"
        style={{ color: 'var(--color-muted)' }}
        onMouseOver={(e) => (e.currentTarget.style.color = 'var(--color-ink)')}
        onMouseOut={(e) => (e.currentTarget.style.color = 'var(--color-muted)')}
        aria-label={item.label}
      >
        <Icon size={21} />
      </motion.a>
    </div>
  );
};

// ── Main ──────────────────────────────────────────────────────────
const Navbar = () => {
  const { isDark, toggleTheme } = useTheme();
  const activeSection = useScrollSpy(['home', 'about', 'skills', 'projects', 'resume', 'contact']);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 400);
    return () => clearTimeout(t);
  }, []);

  const scrollTo = (href) =>
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <>
      {/* ── Top-left: </Yusho> signature ── */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="fixed top-5 left-5 z-50"
      >
        <button
          onClick={() => scrollTo('#home')}
          className="font-mono text-sm font-bold tracking-tight transition-colors duration-200"
          style={{ color: 'var(--color-muted)' }}
          onMouseOver={(e) => (e.currentTarget.style.color = 'var(--color-accent)')}
          onMouseOut={(e) => (e.currentTarget.style.color = 'var(--color-muted)')}
        >
          &lt;/Yusho&gt;
        </button>
      </motion.div>

      {/* ── Top-right: Resume + theme toggle ── */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="fixed top-5 right-5 z-50 flex items-center gap-2"
      >
        {/* Resume button */}
        <motion.a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.93 }}
          className="h-11 px-5 rounded-full flex items-center font-mono text-[11px] tracking-widest uppercase transition-colors duration-200"
          style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            color: 'var(--color-muted)',
            backdropFilter: 'blur(12px)',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.color = 'var(--color-accent)';
            e.currentTarget.style.borderColor = 'var(--color-accent)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.color = 'var(--color-muted)';
            e.currentTarget.style.borderColor = 'var(--color-border)';
          }}
        >
          Resume ↗
        </motion.a>

        {/* Theme toggle */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={toggleTheme}
          className="w-11 h-11 rounded-full flex items-center justify-center"
          style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            color: 'var(--color-muted)',
            backdropFilter: 'blur(12px)',
          }}
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          <AnimatePresence mode="wait">
            {isDark ? (
              <motion.span key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}>
                <Sun size={17} />
              </motion.span>
            ) : (
              <motion.span key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}>
                <Moon size={17} />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </motion.div>

      {/* ── Floating bottom dock — uses x transform via framer to avoid conflict ── */}
      <AnimatePresence>
        {mounted && (
          <motion.div
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-5 z-50"
            style={{
              /* Centering via style avoids Tailwind translate conflicting with Framer's y animation */
              left: '50%',
              x: '-50%',
            }}
          >
            <div
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl"
              style={{
                background: isDark ? 'rgba(15,15,15,0.88)' : 'rgba(240,237,232,0.88)',
                border: '1px solid var(--color-border)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                boxShadow: isDark
                  ? '0 8px 40px rgba(0,0,0,0.6), 0 0 0 0.5px rgba(255,255,255,0.06)'
                  : '0 8px 40px rgba(0,0,0,0.1), 0 0 0 0.5px rgba(0,0,0,0.06)',
                whiteSpace: 'nowrap',
              }}
            >
              {NAV_ITEMS.map((item) => (
                <DockItem
                  key={item.id}
                  item={item}
                  isActive={activeSection === item.id}
                  onClick={() => scrollTo(item.href)}
                />
              ))}
              <div className="w-px h-5 mx-1" style={{ background: 'var(--color-border)' }} />
              {SOCIAL_LINKS.map((item) => (
                <SocialItem key={item.label} item={item} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
