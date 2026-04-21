import { useEffect, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const StarField = () => {
  const canvasRef = useRef(null);
  const { isDark } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    // ── Stars (reduced count) ─────────────────────────────────────
    const STAR_COUNT = 110;
    const stars = Array.from({ length: STAR_COUNT }, () => ({
      x:     Math.random() * W,
      y:     Math.random() * H,
      r:     Math.random() * 1.5 + 0.2,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.016 + 0.004,
    }));

    // ── Click bursts ──────────────────────────────────────────────
    let bursts = [];

    const onClick = (e) => {
      // 35 star particles burst from click point
      const newParticles = Array.from({ length: 30 }, () => {
        const a = Math.random() * Math.PI * 2;
        const s = Math.random() * 5 + 1.5;
        return {
          x: e.clientX, y: e.clientY,
          vx: Math.cos(a) * s,
          vy: Math.sin(a) * s,
          alpha: 1,
          r: Math.random() * 2.5 + 0.8,
          isStar: Math.random() > 0.4,
        };
      });
      bursts.push(...newParticles);
    };

    window.addEventListener('click', onClick);

    // ── Color helpers ─────────────────────────────────────────────
    const starColor  = (a) => isDark ? `rgba(240,237,232,${a})` : `rgba(28,21,8,${a})`;
    const burstColor = (a, isStar) =>
      isDark
        ? isStar ? `rgba(240,237,232,${a})` : `rgba(107,255,198,${a})`
        : isStar ? `rgba(28,21,8,${a})`     : `rgba(0,110,70,${a})`;

    // ── Draw loop ─────────────────────────────────────────────────
    let raf;
    let frame = 0;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      frame++;

      // ─ Stars ─
      for (const s of stars) {
        const twinkle = 0.4 + 0.6 * Math.sin(frame * s.speed + s.phase);
        const alpha   = isDark ? twinkle * 0.88 : twinkle * 0.2;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = starColor(alpha);
        ctx.fill();

        // Faint glow on bigger stars in dark mode
        if (isDark && s.r > 1.1) {
          const g = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 4);
          g.addColorStop(0, `rgba(200,235,255,${twinkle * 0.12})`);
          g.addColorStop(1, 'rgba(200,235,255,0)');
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r * 4, 0, Math.PI * 2);
          ctx.fillStyle = g;
          ctx.fill();
        }
      }

      // ─ Click burst particles ─
      bursts = bursts.filter(p => p.alpha > 0.01);
      for (const p of bursts) {
        p.x  += p.vx;
        p.y  += p.vy;
        p.vx *= 0.94;
        p.vy *= 0.94;
        p.vy += 0.05; // micro-gravity
        p.alpha -= 0.025;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = burstColor(p.alpha, p.isStar);
        ctx.fill();

        // Glow for accent-colored burst particles
        if (!p.isStar && p.r > 1.2) {
          const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 3);
          g.addColorStop(0, burstColor(p.alpha * 0.4, false));
          g.addColorStop(1, burstColor(0, false));
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2);
          ctx.fillStyle = g;
          ctx.fill();
        }
      }

      raf = requestAnimationFrame(draw);
    };

    draw();

    const resize = () => {
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = W; canvas.height = H;
      stars.forEach(s => { s.x = Math.random() * W; s.y = Math.random() * H; });
    };
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('click', onClick);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}
    />
  );
};

export default StarField;
