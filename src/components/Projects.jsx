import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "../data/projects";
import { fadeInUp, useScrollAnimation } from "../utils/animations";
import ProjectModal from "./ProjectModal";

const ProjectRow = ({ project, index, onClick }) => {
  const [hovered, setHovered] = useState(false);

  const num = String(index + 1).padStart(2, "0");
  const year = project.liveUrl ? "2024" : "2023";

  return (
    <motion.div
      variants={fadeInUp}
      transition={{ delay: index * 0.06 }}
      className="group relative border-t border-white/[0.08] cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      <div
        className="flex items-center gap-6 py-6 px-4 rounded-xl transition-colors duration-300"
        style={{ background: hovered ? 'var(--color-surface)' : 'transparent' }}
      >
        {/* Number */}
        <span className="font-display font-bold text-4xl md:text-5xl text-white/10 group-hover:text-white/20 transition-colors duration-300 w-14 shrink-0 select-none">
          {num}
        </span>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-baseline gap-3 mb-2">
            <h3 className="font-display font-bold text-xl md:text-2xl text-ink group-hover:text-accent transition-colors duration-200">
              {project.title}
            </h3>
            {project.featured && (
              <span className="font-mono text-[10px] tracking-widest text-accent border border-accent/40 rounded px-2 py-0.5 uppercase">
                ★ Featured
              </span>
            )}
            <span className="font-mono text-xs text-muted">{year}</span>
          </div>

          {/* Tech pills */}
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="font-mono text-[11px] tracking-wide text-muted border border-white/[0.08] rounded px-2 py-0.5"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Arrow + image peek */}
        <div className="flex items-center gap-4 shrink-0">
          {/* Thumbnail peek on hover */}
          <AnimatePresence>
            {hovered && project.image && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9, x: 20 }}
                transition={{ duration: 0.2 }}
                className="hidden md:block w-28 h-16 rounded-lg overflow-hidden border border-white/[0.1] shrink-0"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            )}
          </AnimatePresence>

          <span className="font-mono text-muted group-hover:text-accent transition-colors duration-200 text-lg">
            ↗
          </span>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const scrollAnimation = useScrollAnimation();

  return (
    <section id="projects" className="section-padding" style={{ background: 'var(--color-bg)' }}>
      <div className="container-custom">

        {/* Header */}
        <motion.span
          {...scrollAnimation}
          variants={fadeInUp}
          className="section-label"
        >
          [ 03 — WORK ]
        </motion.span>

        <motion.h2
          {...scrollAnimation}
          variants={fadeInUp}
          className="font-display font-bold text-3xl md:text-5xl text-ink mt-4 mb-16 max-w-lg leading-tight"
        >
          Selected Projects
        </motion.h2>

        {/* Project rows */}
        <motion.div {...scrollAnimation} variants={fadeInUp}>
          {projects.map((project, index) => (
            <ProjectRow
              key={project.id}
              project={project}
              index={index}
              onClick={() => setSelectedProject(project)}
            />
          ))}
          {/* Bottom border */}
          <div className="border-t border-white/[0.08]" />
        </motion.div>

        {/* GitHub CTA */}
        <motion.div
          {...scrollAnimation}
          variants={fadeInUp}
          className="mt-16 flex items-center justify-between"
        >
          <p className="font-sans text-muted text-sm">
            More projects on GitHub
          </p>
          <motion.a
            whileHover={{ x: 4 }}
            href="https://github.com/ayush1944"
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
