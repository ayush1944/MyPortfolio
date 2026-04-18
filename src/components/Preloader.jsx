import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Characters used for scramble effect
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*!?';
const TARGET_LINES = ['AYUSH', 'PAL'];
const FULL_TARGET = TARGET_LINES.join('');

const randomChar = () => CHARS[Math.floor(Math.random() * CHARS.length)];

const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [line1, setLine1] = useState(() => Array.from({ length: 5 }, randomChar).join(''));
  const [line2, setLine2] = useState(() => Array.from({ length: 3 }, randomChar).join(''));
  const [tagline, setTagline] = useState('');
  const [done, setDone] = useState(false);
  const [exiting, setExiting] = useState(false);
  const rafRef = useRef(null);
  const startRef = useRef(null);

  useEffect(() => {
    startRef.current = performance.now();
    const DURATION = 3500; // total preloader duration ms

    const tick = (now) => {
      const elapsed = now - startRef.current;
      const p = Math.min(elapsed / DURATION, 1);

      // Ease: fast start, slow end
      const eased = 1 - Math.pow(1 - p, 2.4);
      const pct = Math.round(eased * 100);
      setProgress(pct);

      // Scramble → resolve line 1 (AYUSH)
      const revealed1 = Math.floor(eased * TARGET_LINES[0].length);
      setLine1(
        TARGET_LINES[0]
          .split('')
          .map((ch, i) => (i < revealed1 ? ch : randomChar()))
          .join('')
      );

      // Scramble → resolve line 2 (PAL) — starts at 40%
      const p2 = Math.max(0, (eased - 0.4) / 0.6);
      const revealed2 = Math.floor(p2 * TARGET_LINES[1].length);
      setLine2(
        TARGET_LINES[1]
          .split('')
          .map((ch, i) => (i < revealed2 ? ch : randomChar()))
          .join('')
      );

      // Tagline fades in at 70%
      if (eased > 0.7) {
        setTagline('Full-Stack · AI Automation');
      }

      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        // Fully resolved — wait a beat then exit
        setLine1('AYUSH');
        setLine2('PAL');
        setDone(true);
        setTimeout(() => {
          setExiting(true);
          setTimeout(onComplete, 700);
        }, 400);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.65, ease: 'easeInOut' }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            background: '#050505',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Scrambling name */}
          <div style={{ textAlign: 'center', lineHeight: 1, marginBottom: 32 }}>
            <div
              style={{
                fontFamily: 'Syne, sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(3.5rem, 13vw, 120px)',
                color: '#f0ede8',
                letterSpacing: '-0.04em',
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {line1}
            </div>
            <div
              style={{
                fontFamily: 'Syne, sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(3.5rem, 13vw, 120px)',
                color: done ? '#6bffc6' : '#f0ede8',
                letterSpacing: '-0.04em',
                transition: 'color 0.3s ease',
                marginLeft: 'clamp(1rem, 4vw, 3rem)',
              }}
            >
              {line2}
            </div>
          </div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: tagline ? 1 : 0, y: tagline ? 0 : 8 }}
            transition={{ duration: 0.4 }}
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.7rem',
              letterSpacing: '0.2em',
              color: '#6bffc6',
              textTransform: 'uppercase',
              marginBottom: 48,
            }}
          >
            {tagline}
          </motion.p>

          {/* Progress counter + bar */}
          <div
            style={{
              position: 'absolute',
              bottom: 48,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 'min(360px, 80vw)',
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
              alignItems: 'center',
            }}
          >
            {/* Numeric counter */}
            <span
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.65rem',
                color: 'rgba(240,237,232,0.35)',
                letterSpacing: '0.1em',
                alignSelf: 'flex-end',
              }}
            >
              {String(progress).padStart(3, '0')}%
            </span>

            {/* Progress bar track */}
            <div
              style={{
                width: '100%',
                height: 1,
                background: 'rgba(255,255,255,0.07)',
                borderRadius: 1,
                overflow: 'hidden',
              }}
            >
              <motion.div
                animate={{ width: `${progress}%` }}
                transition={{ ease: 'linear', duration: 0.05 }}
                style={{
                  height: '100%',
                  background: 'linear-gradient(90deg, #6bffc6, #b0fff0)',
                  borderRadius: 1,
                  boxShadow: '0 0 8px rgba(107,255,198,0.6)',
                }}
              />
            </div>
          </div>

          {/* Subtle scanline overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              background:
                'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.04) 2px,rgba(0,0,0,0.04) 4px)',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
