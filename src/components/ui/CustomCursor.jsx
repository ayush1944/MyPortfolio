import { useEffect, useRef } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

/**
 * Space targeting-reticle cursor
 *  • Tiny dot at exact cursor pos
 *  • Corner-bracket ring lerps behind cursor
 *  • Ring expands + brightens when hovering interactive elements
 *  • Click → ripple burst
 *  • cursor:none applied globally (including buttons/links)
 */
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

    let mouseX = W / 2, mouseY = H / 2;
    let ringX  = W / 2, ringY  = H / 2;
    let ringR  = 18;          // current ring radius (lerped)
    let angle  = 0;
    let isHovering = false;   // over interactive element?

    let ripples = [];
    let raf;

    const resize = () => {
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = W; canvas.height = H;
    };

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Detect interactive element under cursor
      // (canvas is pointer-events:none so elementFromPoint looks through it)
      const el = document.elementFromPoint(mouseX, mouseY);
      isHovering = !!(el && el.closest('a, button, [role="button"], input, select, textarea, label'));
    };

    const onClick = (e) => {
      ripples.push({ x: e.clientX, y: e.clientY, r: 0, alpha: 0.75 });
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('click', onClick);

    // ── Draw corner-bracket arcs ──────────────────────────────────
    const drawReticle = (cx, cy, radius, rot, dark, hovering) => {
      const baseAlpha = hovering ? 1.0 : 0.82;
      const color = dark ? `rgba(107,255,198,${baseAlpha})` : `rgba(28,21,8,${baseAlpha})`;
      const dimColor = dark ? `rgba(107,255,198,${baseAlpha * 0.4})` : `rgba(28,21,8,${baseAlpha * 0.35})`;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rot);

      const arcSpan = hovering ? Math.PI * 0.32 : Math.PI * 0.36;
      const offsets = [0, Math.PI / 2, Math.PI, Math.PI * 1.5];

      // Corner arcs
      ctx.lineWidth = hovering ? 1.4 : 1;
      ctx.strokeStyle = color;
      ctx.lineCap = 'round';
      for (const off of offsets) {
        ctx.beginPath();
        ctx.arc(0, 0, radius, off - arcSpan / 2, off + arcSpan / 2);
        ctx.stroke();
      }

      // Inward tick marks
      const tickLen = hovering ? 7 : 5;
      ctx.strokeStyle = dimColor;
      ctx.lineWidth = 0.8;
      for (const off of offsets) {
        const cos = Math.cos(off), sin = Math.sin(off);
        ctx.beginPath();
        ctx.moveTo(cos * (radius - tickLen - 2), sin * (radius - tickLen - 2));
        ctx.lineTo(cos * (radius - 2),           sin * (radius - 2));
        ctx.stroke();
      }

      ctx.restore();
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);

      const dark     = isDarkRef.current;
      const accent   = dark ? [107, 255, 198] : [28, 21, 8];
      const targetR  = isHovering ? 26 : 18;

      // Lerp ring position + radius
      ringX += (mouseX - ringX) * 0.13;
      ringY += (mouseY - ringY) * 0.13;
      ringR += (targetR - ringR) * 0.18;

      // Rotate (slower when hovering for a "lock-on" feel)
      angle += isHovering ? 0.004 : 0.009;

      // ── Reticle ring ──
      drawReticle(ringX, ringY, ringR, angle, dark, isHovering);

      // ── Outer ghost ring (very faint) ──
      ctx.beginPath();
      ctx.arc(ringX, ringY, ringR, 0, Math.PI * 2);
      ctx.strokeStyle = dark
        ? `rgba(107,255,198,${isHovering ? 0.15 : 0.08})`
        : `rgba(28,21,8,${isHovering ? 0.12 : 0.07})`;
      ctx.lineWidth = 0.5;
      ctx.stroke();

      // ── Center dot ──
      const dotR = isHovering ? 3 : 2.2;
      ctx.beginPath();
      ctx.arc(mouseX, mouseY, dotR, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${accent.join(',')},0.95)`;
      ctx.fill();

      // Dot glow
      const dg = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, isHovering ? 14 : 10);
      dg.addColorStop(0, `rgba(${accent.join(',')},${isHovering ? 0.35 : 0.22})`);
      dg.addColorStop(1, `rgba(${accent.join(',')},0)`);
      ctx.beginPath();
      ctx.arc(mouseX, mouseY, isHovering ? 14 : 10, 0, Math.PI * 2);
      ctx.fillStyle = dg;
      ctx.fill();

      // ── Ripple bursts ──
      ripples = ripples.filter(r => r.alpha > 0.01);
      for (const r of ripples) {
        r.r     += 3;
        r.alpha *= 0.86;

        // Outer ring
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${accent.join(',')},${r.alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Inner ring
        if (r.r > 12) {
          ctx.beginPath();
          ctx.arc(r.x, r.y, r.r * 0.48, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${accent.join(',')},${r.alpha * 0.5})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      }

      raf = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('click', onClick);
      cancelAnimationFrame(raf);
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

export default CustomCursor;
