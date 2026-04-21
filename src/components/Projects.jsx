import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import { projects } from "../data/projects";
import { GITHUB_URL } from "../data/social";
import { fadeInUp, useScrollAnimation } from "../utils/animations";
import ProjectModal from "./ProjectModal";

const IMG_W = 220;
const IMG_H = 138;

/* Rendered via portal so position:fixed is relative to the viewport,
   not a Framer Motion–transformed ancestor row element.             */
const FloatingThumb = ({ project, hovered, x, y, tiltMV }) => {
  if (typeof document === "undefined") return null;
  return createPortal(
    <AnimatePresence>
      {hovered && project.image && (
        <motion.div
          key={`thumb-${project.id}`}
          initial={{ opacity: 0, scale: 0.82 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.82 }}
          transition={{ duration: 0.16, ease: "easeOut" }}
          style={{
            position: "fixed",
            left: x,
            top: y,
            width: IMG_W,
            height: IMG_H,
            rotate: tiltMV,
            zIndex: 9998,
            pointerEvents: "none",
            borderRadius: "1rem",
            overflow: "hidden",
          }}
          className="hidden md:block"
        >
          {/* Accent glow behind */}
          <div style={{
            position: "absolute", inset: -16,
            background: "radial-gradient(ellipse at center, var(--color-accent), transparent 65%)",
            opacity: 0.18, zIndex: -1,
          }} />

          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            style={{ width: "100%", height: "100%", objectFit: "cover", transform: "scale(1.05)" }}
          />

          {/* Vignette */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(135deg, rgba(0,0,0,0.12) 0%, transparent 55%)",
          }} />

          {/* Border */}
          <div style={{
            position: "absolute", inset: 0,
            borderRadius: "1rem",
            border: "1px solid var(--color-border)",
          }} />
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

const ProjectRow = ({ project, index, onClick }) => {
  const [hovered, setHovered] = useState(false);
  const num = String(index + 1).padStart(2, "0");

  const x      = useMotionValue(-9999);
  const y      = useMotionValue(-9999);
  const tiltMV = useMotionValue(0);
  const targetRef = useRef({ x: 0, y: 0 });
  const rafRef    = useRef(null);

  useEffect(() => {
    if (!hovered) {
      cancelAnimationFrame(rafRef.current);
      return;
    }
    let cx = x.get(), cy = y.get(), tilt = 0;
    const loop = () => {
      const dx = targetRef.current.x - cx;
      const dy = targetRef.current.y - cy;
      cx += dx * 0.13;
      cy += dy * 0.13;
      const targetTilt = Math.max(-14, Math.min(14, dx * 0.35));
      tilt += (targetTilt - tilt) * 0.09;
      x.set(cx); y.set(cy); tiltMV.set(tilt);
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [hovered]); // eslint-disable-line react-hooks/exhaustive-deps

  const onMouseEnter = (e) => {
    const nx = e.clientX - IMG_W / 2;
    const ny = e.clientY - IMG_H / 2;
    targetRef.current = { x: nx, y: ny };
    x.set(nx); y.set(ny); tiltMV.set(0);
    setHovered(true);
  };

  return (
    <motion.div
      variants={fadeInUp}
      transition={{ delay: index * 0.06 }}
      className="group relative cursor-pointer border-t"
      style={{ borderColor: "var(--color-border)" }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => { targetRef.current = { x: e.clientX - IMG_W / 2, y: e.clientY - IMG_H / 2 }; }}
      onClick={onClick}
    >
      <div
        className="flex items-center gap-6 py-6 px-4 rounded-xl transition-colors duration-300"
        style={{ background: hovered ? "var(--color-surface)" : "transparent" }}
      >
        {/* Number */}
        <span
          className="font-display font-bold text-4xl md:text-5xl w-14 shrink-0 select-none"
          style={{ color: "var(--color-ink)", opacity: hovered ? 0.25 : 0.1 }}
        >
          {num}
        </span>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-baseline gap-3 mb-1">
            <h3
              className="font-display font-bold text-xl md:text-2xl transition-colors duration-200"
              style={{ color: hovered ? "var(--color-accent)" : "var(--color-ink)" }}
            >
              {project.title}
            </h3>
            {project.featured && (
              <span
                className="font-mono text-[10px] tracking-widest rounded px-2 py-0.5 uppercase"
                style={{ color: "var(--color-accent)", border: "1px solid var(--color-accent)", opacity: 0.8 }}
              >
                ★ Featured
              </span>
            )}
            <span className="font-mono text-xs" style={{ color: "var(--color-muted)" }}>
              {project.year}
            </span>
          </div>

          <p className="font-sans text-sm truncate mb-2" style={{ color: "var(--color-muted)" }}>
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="font-mono text-[11px] tracking-wide rounded px-2 py-0.5"
                style={{ border: "1px solid var(--color-border)", color: "var(--color-muted)" }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Arrow */}
        <span
          className="font-mono text-lg shrink-0 transition-colors duration-200"
          style={{ color: hovered ? "var(--color-accent)" : "var(--color-muted)" }}
        >
          ↗
        </span>
      </div>

      <FloatingThumb project={project} hovered={hovered} x={x} y={y} tiltMV={tiltMV} />
    </motion.div>
  );
};

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const scrollAnimation = useScrollAnimation();

  return (
    <section id="projects" className="section-padding" style={{ background: "var(--color-bg)" }}>
      <div className="container-custom">

        <motion.span {...scrollAnimation} variants={fadeInUp} className="section-label">
          [ 03 — WORK ]
        </motion.span>

        <motion.h2
          {...scrollAnimation}
          variants={fadeInUp}
          className="font-display font-bold text-3xl md:text-5xl mt-4 mb-16 max-w-lg leading-tight"
          style={{ color: "var(--color-ink)" }}
        >
          Selected Projects
        </motion.h2>

        {/* Propagation wrapper — triggers variant cascade at amount:0.1 so
            the tall list doesn't wait for 30 % to scroll into view         */}
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.1 }}
        >
          {projects.map((project, index) => (
            <ProjectRow
              key={project.id}
              project={project}
              index={index}
              onClick={() => setSelectedProject(project)}
            />
          ))}
          <div className="border-t" style={{ borderColor: "var(--color-border)" }} />
        </motion.div>

        <motion.div
          {...scrollAnimation}
          variants={fadeInUp}
          className="mt-16 flex items-center justify-between"
        >
          <p className="font-sans text-sm" style={{ color: "var(--color-muted)" }}>
            More projects on GitHub
          </p>
          <motion.a
            whileHover={{ x: 4 }}
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline text-sm"
          >
            View All ↗
          </motion.a>
        </motion.div>
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};

export default Projects;
