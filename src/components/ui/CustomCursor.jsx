import { useEffect, useRef } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

// Space targeting-reticle cursor:
//   • tiny dot at exact cursor position
//   • corner-bracket ring that lerps behind the cursor
//   • ring slowly rotates
//   • click → ripple burst
const CustomCursor = () => {
  const { isDark } = useTheme();
  const isDarkRef = useRef(isDark);
  useEffect(() => { isDarkRef.current = isDark; }, [isDark]);

  const canvasRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    // Cursor positions
    let mouseX = W / 2, mouseY = H / 2;
    let ringX  = W / 2, ringY  = H / 2;

    // Ripple bursts on click
    let ripples = [];

    // Ring rotation angle
    let angle = 0;

    let raf;

    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width  = W;
      canvas.height = H;
    };

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const onClick = (e) => {
      ripples.push({ x: e.clientX, y: e.clientY, r: 0, alpha: 0.7 });
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('click', onClick);

    // ── Draw a corner-bracket style reticle ring ──
    const drawReticle = (cx, cy, radius, rot, dark) => {
      const accent = dark ? 'rgba(107,255,198,' : 'rgba(28,21,8,';
      const dim    = dark ? 'rgba(107,255,198,' : 'rgba(28,21,8,';

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rot);

      // 4 corner arcs (each covers ~60° of the ring)
      const arcSpan = Math.PI * 0.38;
      const offsets = [0, Math.PI / 2, Math.PI, Math.PI * 1.5];

      ctx.lineWidth = 1;
      ctx.strokeStyle = accent + '0.85)';
      ctx.lineCap = 'round';

      for (const off of offsets) {
        ctx.beginPath();
        ctx.arc(0, 0, radius, off - arcSpan / 2, off + arcSpan / 2);
        ctx.stroke();
      }

      // Tiny tick marks pointing inward at ring center
      const tickLen = 5;
      ctx.strokeStyle = dim + '0.45)';
      ctx.lineWidth = 0.8;
      for (const off of offsets) {
        const cos = Math.cos(off);
        const sin = Math.sin(off);
        ctx.beginPath();
        ctx.moveTo(cos * (radius - tickLen - 2), sin * (radius - tickLen - 2));
        ctx.lineTo(cos * (radius - 2),           sin * (radius - 2));
        ctx.stroke();
      }

      ctx.restore();
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      const dark   = isDarkRef.current;
      const accent = dark ? [107, 255, 198] : [28, 21, 8];

      // Lerp ring to mouse
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;

      // Rotate ring slowly
      angle += 0.008;

      // ── Ring reticle ──
      drawReticle(ringX, ringY, 18, angle, dark);

      // ── Outer faint ring ──
      ctx.beginPath();
      ctx.arc(ringX, ringY, 18, 0, Math.PI * 2);
      ctx.strokeStyle = dark ? 'rgba(107,255,198,0.1)' : 'rgba(28,21,8,0.1)';
      ctx.lineWidth = 0.5;
      ctx.stroke();

      // ── Center dot (exact cursor pos) ──
      ctx.beginPath();
      ctx.arc(mouseX, mouseY, 2.2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${accent.join(',')},0.95)`;
      ctx.fill();

      // Tiny glow behind dot
      const dotGlow = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 10);
      dotGlow.addColorStop(0, `rgba(${accent.join(',')},0.25)`);
      dotGlow.addColorStop(1, `rgba(${accent.join(',')},0)`);
      ctx.beginPath();
      ctx.arc(mouseX, mouseY, 10, 0, Math.PI * 2);
      ctx.fillStyle = dotGlow;
      ctx.fill();

      // ── Ripple bursts ──
      ripples = ripples.filter(r => r.alpha > 0.01);
      for (const r of ripples) {
        r.r     += 2.8;
        r.alpha *= 0.88;
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${accent.join(',')},${r.alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Second inner ripple
        if (r.r > 10) {
          ctx.beginPath();
          ctx.arc(r.x, r.y, r.r * 0.5, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${accent.join(',')},${r.alpha * 0.5})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      }

      raf = requestAnimationFrame(draw);
    };

    // Hide default cursor on the page
    document.body.style.cursor = 'none';
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('click', onClick);
      cancelAnimationFrame(raf);
      document.body.style.cursor = '';
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    />
  );
};

export const useMagneticHover = () => ({ current: null });
export default CustomCursor;
