import React from "react";
import { motion } from "framer-motion";
import { ArrowDown, Mail } from "lucide-react";
import { fadeInUp, slideInLeft, slideInRight } from "../utils/animations";
import { useTypingEffect } from "../hooks/useTypingEffect";
import RevealAnimation, { TextReveal } from "./animations/RevealAnimation";

const Hero = () => {
  const roles = [
    "Full-Stack Developer (MERN • Next.js)",
    "JavaScript Enthusiast",
    "Open Source Contributor",
    "Problem Solver",
  ];
  const currentRole = useTypingEffect(roles, 100, 50, 2000);

  const scrollToProjects = () => {
    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
    >
      <div className="container-custom relative z-10">
        <div className="text-center">
          <motion.div {...slideInLeft} className="mb-6">
            <span className="inline-block px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full text-sm font-medium">
              👋 Hello, I'm
            </span>
          </motion.div>

          {/* Name */}
          <RevealAnimation direction="up" delay={0.2}>
            <TextReveal className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
              Ayush
            </TextReveal>
          </RevealAnimation>

          {/* Tagline with Typing Effect */}
          <motion.p
            {...fadeInUp}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto h-16 flex items-center justify-center"
          >
            <span className="text-gradient font-semibold">
              {currentRole}
              <span className="animate-pulse">|</span>
            </span>
          </motion.p>

          {/* Description */}
          <motion.p
            {...fadeInUp}
            transition={{ delay: 0.6 }}
            className="text-lg text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Full-stack developer specializing in MERN & Next.js. I build
            scalable web apps with real users, real auth, real payments, and
            clean backend architecture. Currently looking for remote roles where
            I can ship fast, learn deeply, and grow with a strong engineering
            team.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToProjects}
              className="btn-primary cursor-hover group"
            >
              <span className="group-hover:translate-x-1 transition-transform duration-200">
                View My Work
              </span>
              <ArrowDown
                size={20}
                className="group-hover:translate-y-1 transition-transform duration-200"
              />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToContact}
              className="btn-outline cursor-hover group"
            >
              <span className="group-hover:translate-x-1 transition-transform duration-200">
                Get In Touch
              </span>
              <Mail
                size={20}
                className="group-hover:rotate-12 transition-transform duration-200"
              />
            </motion.button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            {...slideInRight}
            transition={{ delay: 1.0 }}
            className="flex justify-center space-x-6"
          >
            <motion.a
              whileHover={{ scale: 1.2, y: -2 }}
              href="https://github.com/ayush1944"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
            >
              <img
                src="/icons/github.png"
                className="w-8 object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.2, y: -2 }}
              href="https://www.linkedin.com/in/ayush-pal-25b628255/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
            >
              <img
                src="/icons/linkedIn.png"
                className="w-8 object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.2, y: -2 }}
              href="mailto:palayush930592@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
            >
              <img
                src="/icons/message.png"
                className="w-8 object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-gray-400 dark:bg-gray-600 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
