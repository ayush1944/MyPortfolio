import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { projects, projectCategories } from "../data/projects";
import ProjectCard from "./ProjectCard";
import { fadeInUp, useScrollAnimation } from "../utils/animations";
import ProjectModal from './ProjectModal';


const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);

  const scrollAnimation = useScrollAnimation();

  const featuredProjects = useMemo(
    () => projects.filter((project) => project.featured),
    []
  );

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") return projects;
    return projects.filter((project) => project.category === activeCategory);
  }, [activeCategory]);

  return (
    <section
      id="projects"
      className="section-padding bg-white dark:bg-gray-900"
    >
      <div className="container-custom">
        {/* Header */}
        <motion.div
          {...scrollAnimation}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A selection of real-world projects I’ve built end-to-end
          </p>
        </motion.div>

        {/* Featured */}
        <motion.div {...scrollAnimation} variants={fadeInUp} className="mb-16">
          <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
            ⭐ Featured Work
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onClick={() => setSelectedProject(project)}
              />
            ))}
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          {...scrollAnimation}
          variants={fadeInUp}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {projectCategories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full font-medium transition-all ${
                activeCategory === category
                  ? "bg-primary-600 text-white shadow-lg"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* All Projects */}
        <motion.div
          {...scrollAnimation}
          variants={fadeInUp}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onClick={() => setSelectedProject(project)}
            />
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          {...scrollAnimation}
          variants={fadeInUp}
          className="text-center mt-16"
        >
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Want to explore more projects and code?
          </p>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="https://github.com/ayush1944"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
          >
            View All Projects on GitHub
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
