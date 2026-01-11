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
          className="relative w-full max-w-3xl mx-4 overflow-hidden rounded-2xl 
                     bg-white dark:bg-gray-900 shadow-2xl"
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full 
                       bg-black/50 text-white hover:bg-black/70 transition"
          >
            <X size={18} />
          </button>

          {/* Image */}
          <div className="relative h-56 bg-gray-100 dark:bg-gray-800">
            {project.image ? (
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-6xl opacity-40">
                💻
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {project.title}
            </h2>

            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              {project.description}
            </p>

            {/* Highlights */}
            {project.highlights?.length > 0 && (
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  Key Highlights
                </h4>
                <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  {project.highlights.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 mb-8">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-xs rounded-full 
                             bg-primary-100 dark:bg-primary-900/30
                             text-primary-600 dark:text-primary-400"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl
                             bg-gray-100 dark:bg-gray-800
                             text-gray-800 dark:text-gray-200
                             hover:scale-[1.03] transition"
                >
                  <Github size={18} /> Code
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl
                             bg-primary-600 text-white
                             hover:bg-primary-700 hover:scale-[1.03] transition"
                >
                  <ExternalLink size={18} /> Live Demo
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
