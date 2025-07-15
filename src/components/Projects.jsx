import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { projects, projectCategories } from '../data/projects';
import ProjectCard from './ProjectCard';
import { fadeInUp, useScrollAnimation } from '../utils/animations';

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const scrollAnimation = useScrollAnimation();

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  const featuredProjects = projects.filter(project => project.featured);

  return (
    <section id="projects" className="section-padding bg-white dark:bg-gray-900">
      <div className="container-custom">
        <motion.div
          {...scrollAnimation}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A showcase of my recent work and personal projects
          </p>
        </motion.div>

        {/* Featured Projects */}
        <motion.div
          {...scrollAnimation}
          variants={fadeInUp}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            ⭐ Featured Work
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </motion.div>

        {/* Category Filter */}
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
              className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                activeCategory === category
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* All Projects Grid */}
        <motion.div
          {...scrollAnimation}
          variants={fadeInUp}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          {...scrollAnimation}
          variants={fadeInUp}
          className="text-center mt-16"
        >
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Want to see more of my work?
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
    </section>
  );
};

export default Projects;
