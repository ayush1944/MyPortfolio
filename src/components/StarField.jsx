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

    // ── Comets ────────────────────────────────────────────────────
    let comets = [];

    const spawnComet = () => {
      const edge  = Math.floor(Math.random() * 2);
      // Slower speed: 0.7–2.0
      const speed = Math.random() * 1.8 + 0.7;
      const angle = (Math.random() - 0.5) * 0.55;
      let x, y, vx, vy;

      if (edge === 0)      { x = Math.random() * W; y = -10;   vx = Math.sin(angle) * speed;  vy =  Math.cos(angle) * speed; }
      else if (edge === 1) { x = W + 10; y = Math.random() * H; vx = -Math.cos(angle) * speed; vy =  Math.sin(angle) * speed; }
      else if (edge === 2) { x = Math.random() * W; y = H + 10; vx = Math.sin(angle) * speed;  vy = -Math.cos(angle) * speed; }
      else                 { x = -10;  y = Math.random() * H;   vx =  Math.cos(angle) * speed; vy =  Math.sin(angle) * speed; }

      return {
        x, y, vx, vy,
        trail: [], maxTrail: Math.floor(Math.random() * 20) + 14,
        alpha: 1, diffusing: false, exploding: false,
        particles: [], dead: false, willDiffuse: Math.random() < 0.2,
      };
    };

    // Start with 3 comets
    for (let i = 0; i < 1; i++) comets.push(spawnComet());

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
    const cometColor = (a) => isDark ? `rgba(107,255,198,${a})` : `rgba(0,110,70,${a})`;
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

      // Spawn comet every 100 frames, cap at 8
      if (frame % 100 === 0 && comets.filter(c => !c.dead).length < 8) {
        comets.push(spawnComet());
      }

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

      // ─ Comets ─
      comets = comets.filter(c => !c.dead);

      for (const c of comets) {
        if (c.exploding) {
          c.particles = c.particles.filter(p => p.alpha > 0.02);
          for (const p of c.particles) {
            p.x  += p.vx; p.y += p.vy; p.vy += 0.03; p.alpha -= 0.02;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = cometColor(p.alpha);
            ctx.fill();
          }
          if (c.particles.length === 0) c.dead = true;
          continue;
        }

        if (c.diffusing) {
          c.vx *= 0.97; c.vy *= 0.97; c.alpha -= 0.012;
          if (c.alpha <= 0) { c.dead = true; continue; }
        }

        c.x += c.vx; c.y += c.vy;
        c.trail.push({ x: c.x, y: c.y });
        if (c.trail.length > c.maxTrail) c.trail.shift();

        const off = c.x < -40 || c.x > W + 40 || c.y < -40 || c.y > H + 40;
        if (off) {
          if (c.willDiffuse && !c.diffusing) c.diffusing = true;
          else c.dead = true;
          continue;
        }

        // Tail
        for (let i = 0; i < c.trail.length; i++) {
          const p = c.trail[i];
          const t = i / c.trail.length;
          ctx.beginPath();
          ctx.arc(p.x, p.y, Math.max(0.3, t * 2.6), 0, Math.PI * 2);
          ctx.fillStyle = cometColor(t * 0.55 * c.alpha);
          ctx.fill();
        }

        // Head
        const gHead = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, 8);
        gHead.addColorStop(0, isDark ? `rgba(255,255,255,${0.95 * c.alpha})` : `rgba(0,0,0,${0.8 * c.alpha})`);
        gHead.addColorStop(1, cometColor(0));
        ctx.beginPath();
        ctx.arc(c.x, c.y, 8, 0, Math.PI * 2);
        ctx.fillStyle = gHead;
        ctx.fill();

        // Glow
        const gGlow = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, 16);
        gGlow.addColorStop(0, cometColor(0.22 * c.alpha));
        gGlow.addColorStop(1, cometColor(0));
        ctx.beginPath();
        ctx.arc(c.x, c.y, 16, 0, Math.PI * 2);
        ctx.fillStyle = gGlow;
        ctx.fill();

        // Collision check
        for (const other of comets) {
          if (other === c || other.exploding || other.diffusing || other.dead) continue;
          const dx = c.x - other.x, dy = c.y - other.y;
          if (dx * dx + dy * dy < 22 * 22) {
            [c, other].forEach(cm => {
              if (cm.exploding) return;
              cm.exploding = true;
              cm.particles = Array.from({ length: 24 }, () => ({
                x: cm.x, y: cm.y,
                vx: (Math.random() - 0.5) * 5,
                vy: (Math.random() - 0.5) * 5,
                alpha: 1, r: Math.random() * 2 + 0.5,
              }));
            });
          }
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
