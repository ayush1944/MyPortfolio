import React from 'react';
import { motion } from 'framer-motion';
import { Code, Coffee, Lightbulb, Target } from 'lucide-react';
import { fadeInUp, slideInLeft, slideInRight, useScrollAnimation } from '../utils/animations';

const About = () => {
  const scrollAnimation = useScrollAnimation();

  const highlights = [
    {
      icon: <Code className="w-6 h-6" />,
      title: "Clean Code",
      description: "Writing maintainable, scalable, and well-documented code"
    },
    {
      icon: <Coffee className="w-6 h-6" />,
      title: "Problem Solver",
      description: "Passionate about tackling complex challenges with creative solutions"
    },
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: "Continuous Learning",
      description: "Always exploring new technologies and best practices"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Goal Oriented",
      description: "Focused on delivering results and exceeding expectations"
    }
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
            Passionate developer with a love for creating digital solutions that make a difference
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            {...scrollAnimation}
            variants={slideInLeft}
            className="space-y-6"
          >
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Hello! I'm a passionate Full Stack Developer with a strong foundation in the MERN stack 
                and a deep love for JavaScript. My journey in web development started with curiosity about 
                how websites work, and it has evolved into a career focused on creating meaningful digital experiences.
              </p>
              
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                I specialize in building modern, responsive web applications using React, Node.js, Express, 
                and MongoDB. My approach combines clean, efficient code with user-centered design principles 
                to deliver solutions that are both functional and delightful to use.
              </p>
              
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Currently, I'm actively seeking remote opportunities where I can contribute to innovative 
                projects, collaborate with talented teams, and continue growing as a developer. I'm particularly 
                interested in roles that challenge me to learn new technologies and work on impactful solutions.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 pt-4">
              {['Remote Work', 'Team Collaboration', 'Open Source'].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
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
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-lg mb-4">
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
            { number: '1+', label: 'Years Experience' },
            { number: '5+', label: 'Projects Completed' },
            { number: '10+', label: 'Technologies Known' },
            { number: '100%', label: 'Commitment to Learning' }
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
