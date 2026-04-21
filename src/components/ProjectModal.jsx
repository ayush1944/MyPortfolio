import { motion, AnimatePresence } from "framer-motion";
import { X, Github, ExternalLink } from "lucide-react";

const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          initial={{ y: 40, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 40, opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-3xl mx-4 overflow-hidden rounded-2xl shadow-2xl"
          style={{ background: 'var(--color-surface)' }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full transition-colors duration-200"
            style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-muted)',
            }}
            onMouseOver={(e) => { e.currentTarget.style.color = 'var(--color-ink)'; }}
            onMouseOut={(e)  => { e.currentTarget.style.color = 'var(--color-muted)'; }}
          >
            <X size={18} />
          </button>

          {/* Image header */}
          <div className="relative h-56 overflow-hidden" style={{ background: 'var(--color-bg)' }}>
            {project.image ? (
              <img
                src={project.image}
                alt={project.title}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            ) : (
              <div
                className="flex items-center justify-center h-full text-6xl"
                style={{ opacity: 0.3 }}
              >
                💻
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">

            {/* Category + featured row */}
            <div className="flex items-center gap-3 mb-3">
              <span
                className="font-mono text-[10px] tracking-widest uppercase"
                style={{ color: 'var(--color-muted)' }}
              >
                {project.category}
              </span>
              {project.featured && (
                <span
                  className="font-mono text-[10px] tracking-widest uppercase px-2 py-0.5 rounded"
                  style={{ color: 'var(--color-accent)', border: '1px solid var(--color-accent)', opacity: 0.8 }}
                >
                  ★ Featured
                </span>
              )}
              {project.year && (
                <span
                  className="font-mono text-[10px] tracking-widest"
                  style={{ color: 'var(--color-muted)', opacity: 0.6 }}
                >
                  {project.year}
                </span>
              )}
            </div>

            {/* Title */}
            <h2
              className="font-display font-bold text-2xl md:text-3xl mb-3"
              style={{ color: 'var(--color-ink)' }}
            >
              {project.title}
            </h2>

            {/* Description */}
            <p
              className="font-sans text-sm leading-relaxed mb-6"
              style={{ color: 'var(--color-muted)' }}
            >
              {project.description}
            </p>

            {/* Highlights */}
            {project.highlights?.length > 0 && (
              <>
                <div className="border-t mb-5" style={{ borderColor: 'var(--color-border)' }} />
                <div className="mb-5">
                  <p
                    className="font-mono text-[10px] tracking-widest uppercase mb-3"
                    style={{ color: 'var(--color-muted)' }}
                  >
                    Key Highlights
                  </p>
                  <ul className="space-y-2">
                    {project.highlights.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 font-sans text-sm" style={{ color: 'var(--color-muted)' }}>
                        <span className="font-mono text-xs shrink-0 mt-0.5" style={{ color: 'var(--color-accent)' }}>✦</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}

            {/* Tech stack */}
            <div className="border-t mb-6" style={{ borderColor: 'var(--color-border)' }} />
            <div className="flex flex-wrap gap-2 mb-8">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-[11px] font-mono tracking-wide rounded-full transition-colors duration-200"
                  style={{ border: '1px solid var(--color-border)', color: 'var(--color-muted)' }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.color = 'var(--color-accent)';
                    e.currentTarget.style.borderColor = 'var(--color-accent)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.color = 'var(--color-muted)';
                    e.currentTarget.style.borderColor = 'var(--color-border)';
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Action buttons */}
            <div className="flex gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-mono text-sm tracking-wide transition-colors duration-200"
                  style={{ border: '1px solid var(--color-border)', color: 'var(--color-ink)' }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-accent)';
                    e.currentTarget.style.color = 'var(--color-accent)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.borderColor = 'var(--color-border)';
                    e.currentTarget.style.color = 'var(--color-ink)';
                  }}
                >
                  <Github size={16} /> Code
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-mono text-sm tracking-wide transition-opacity duration-200 hover:opacity-85"
                  style={{ background: 'var(--color-accent)', color: '#050505' }}
                >
                  <ExternalLink size={16} /> Live Demo
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectModal;
