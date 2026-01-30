import React from "react";
import { motion } from "framer-motion";
import {
  fadeInUp,
  slideInLeft,
  slideInRight,
  useScrollAnimation,
} from "../utils/animations";

const About = () => {
  const scrollAnimation = useScrollAnimation();

  const highlights = [
    {
      icon: (
        <img
          src="/icons/cleanCode.png"
          className="w-12 object-cover group-hover:scale-110 transition-transform duration-500"
        />
      ),
      title: "Clean Code",
      description:
        "Maintainable, readable code with clear structure and separation of concerns.",
    },
    {
      icon: (
        <img
          src="/icons/problemSolver.png"
          className="w-12 object-cover group-hover:scale-110 transition-transform duration-500"
        />
      ),
      title: "Problem Solver",
      description:
        "Enjoy breaking down complex problems and turning ideas into working solutions.",
    },
    {
      icon: (
        <img
          src="/icons/goal.png"
          className="w-12 object-cover group-hover:scale-110 transition-transform duration-500"
        />
      ),
      title: "Continuous Learning",
      description:
        "Always improving through real projects, debugging, and exploring new tools.",
    },
    {
      icon: (
        <img
          src="/icons/learning.png"
          className="w-12 object-cover group-hover:scale-110 transition-transform duration-500"
        />
      ),
      title: "Goal Oriented",
      description:
        "Focused on delivering features that actually matter to users.",
    },
  ];

  return (
    <section id="about" className="section-padding bg-white dark:bg-gray-900">
      <div className="container-custom">
        <motion.div
          {...scrollAnimation}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            About Me
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Full-stack developer focused on building real, production-ready
            products.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            {...scrollAnimation}
            variants={slideInLeft}
            className="space-y-6"
          >
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                I’m a full-stack developer building end-to-end web applications
                using the MERN stack, Next.js, and TypeScript.
              </p>
              <br />
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                My journey into web development started with curiosity and
                quickly turned into learning by building e-commerce platforms,
                real-time collaboration tools, URL shorteners, and finance
                dashboards.
              </p>
              <br />
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                I care deeply about code quality, scalability, and user
                experience. I prefer writing simple, readable code and
                continuously refine my understanding of backend architecture,
                system design, and performance.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 pt-4">
              {["Remote Work", "Team Collaboration", "Open Source"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ),
              )}
            </div>
          </motion.div>

          {/* Right Column - Highlights Grid */}
          <motion.div
            {...scrollAnimation}
            variants={slideInRight}
            className="grid sm:grid-cols-2 gap-6"
          >
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
                className="card p-6 text-center hover:scale-105 transition-transform duration-300"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg mb-4">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
        {/* Stats Section */}
        <motion.div
          {...scrollAnimation}
          variants={fadeInUp}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { number: "1+", label: "Years of Hands-on Development" },
            { number: "5+", label: "Real-World Projects Built" },
            { number: "10+", label: "Technologies Used" },
            // { number: "100%", label: "Commitment to Learning & Growth" },
            { number: "Always", label: "Learning Through Real Projects" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={fadeInUp}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
