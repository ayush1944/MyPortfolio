import React, { useState } from "react";
import { motion } from "framer-motion";
import { skills, skillCategories } from "../data/skills";
import {
  fadeInUp,
  staggerContainer,
  staggerItem,
  useScrollAnimation,
} from "../utils/animations";
import RevealAnimation, {
  StaggerContainer,
  StaggerItem,
} from "./animations/RevealAnimation";
// import { useMagneticHover } from "./ui/CustomCursor";

const TechStack = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const scrollAnimation = useScrollAnimation();

  const filteredSkills =
    activeCategory === "All"
      ? skills
      : skills.filter((skill) => skill.category === activeCategory);

  return (
    <section
      id="skills"
      className="section-padding bg-gray-50 dark:bg-gray-800"
    >
      <div className="container-custom">
        <motion.div
          {...scrollAnimation}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Tech Stack
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
        </motion.div>

        {/* Category Filter */}
        {/* <RevealAnimation direction="up" delay={0.2}>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {skillCategories.map((category) => (
              console.log(category),
              <motion.button
                key={category}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-200 cursor-hover ${
                  activeCategory === category
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </RevealAnimation> */}

        {/* Skills Grid */}
        <StaggerContainer
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          staggerDelay={0.1}
        >
          {filteredSkills.map((skill, index) => {
            // const magneticRef = useMagneticHover(0.1);

            return (
              <StaggerItem key={index}>
                <motion.div
                  // ref={magneticRef}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="card p-6 text-center group cursor-hover"
                >
                  <div className="text-4xl mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 flex justify-center align-items-center ">
                    {/* {skill.icon} */}
                    <img
                      src={skill.icon}
                      className="w-12 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {skill.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                    {skill.category}
                  </p>

                  {/* Skill Level Bar */}
                  {/* <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1.2, delay: index * 0.1, ease: "easeOut" }}
                      className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full relative"
                    >
                      <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                    </motion.div>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 font-medium">
                    {skill.level}%
                  </p> */}
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* MERN Stack Highlight */}
        <motion.div
          {...scrollAnimation}
          variants={fadeInUp}
          className="mt-20 text-center"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            Specialized in MERN Stack
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {[
              {
                name: "MongoDB",
                icon: "/skills/mongodb.png",
                color: "text-green-600",
              },
              {
                name: "Express.js",
                icon: "/skills/expressjs.png",
                color: "text-yellow-600",
              },
              {
                name: "React",
                icon: "/skills/react.png",
                color: "text-blue-600",
              },
              {
                name: "Node.js",
                icon: "/skills/nodejs.png",
                color: "text-green-500",
              },
            ].map(
              (tech, index) => (
                console.log(tech),
                (
                  <motion.div
                    key={index}
                    variants={staggerItem}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="flex flex-col items-center group"
                  >
                    <div className="text-6xl mb-3 group-hover:scale-110 transition-transform duration-300">
                      {/* {tech.icon} */}
                      <img
                        src={tech.icon}
                        className="w-12 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <h4
                      className={`text-lg font-semibold ${tech.color} group-hover:text-primary-600 transition-colors duration-300`}
                    >
                      {tech.name}
                    </h4>
                  </motion.div>
                )
              )
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechStack;
