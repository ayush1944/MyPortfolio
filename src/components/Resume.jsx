import React from 'react';
import { motion } from 'framer-motion';
import { Download, Eye, FileText, Briefcase, GraduationCap, Award } from 'lucide-react';
import { fadeInUp, slideInLeft, slideInRight, useScrollAnimation } from '../utils/animations';

const Resume = () => {
  const scrollAnimation = useScrollAnimation();

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf'; 
    link.download = 'Ayush_Resume.pdf';
    link.click();
  };

  const handleView = () => {
    // In a real application, this would open the resume in a new tab
    window.open('/resume.pdf', '_blank');
  };

  const experience = [
    {
      title: "Full Stack Developer",
      company: "Tech Startup Inc.",
      period: "2023 - Present",
      description: "Developing scalable web applications using MERN stack, implementing CI/CD pipelines, and collaborating with cross-functional teams."
    },
    {
      title: "Frontend Developer",
      company: "Digital Agency",
      period: "2022 - 2023",
      description: "Built responsive web applications with React, optimized performance, and worked closely with designers to implement pixel-perfect UIs."
    },
    {
      title: "Junior Developer",
      company: "Software Solutions",
      period: "2021 - 2022",
      description: "Contributed to various projects using JavaScript, learned best practices, and gained experience in agile development methodologies."
    }
  ];

  const education = [
    {
      degree: "Bachelor of Technology",
      Branch: "Electronics and communications",
      school: "JSSATE Noida",
      period: "2022 - 2026",
      description: ""
    }
  ];

  const certifications = [
    "AWS Certified Developer Associate",
    "MongoDB Certified Developer",
    "React Developer Certification",
    "Node.js Application Developer"
  ];

  return (
    <section id="resume" className="section-padding bg-white dark:bg-gray-900">
      <div className="container-custom">
        <motion.div
          {...scrollAnimation}
          variants={fadeInUp}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Resume
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
            Download my resume or view my professional experience and qualifications
          </p>

          {/* Resume Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDownload}
              className="btn-primary"
            >
              <Download size={20} />
              Download Resume
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleView}
              className="btn-outline"
            >
              <Eye size={20} />
              View Online
            </motion.button>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left Column - Experience & Education */}
          <div className="space-y-12">
            {/* Experience */}
            {/* <motion.div
              {...scrollAnimation}
              variants={slideInLeft}
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
                  <Briefcase className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Experience
                </h3>
              </div>

              <div className="space-y-6">
                {experience.map((job, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    transition={{ delay: index * 0.1 }}
                    className="relative pl-6 border-l-2 border-primary-200 dark:border-primary-800"
                  >
                    <div className="absolute -left-2 top-0 w-4 h-4 bg-primary-600 rounded-full"></div>
                    <div className="card p-6">
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                        {job.title}
                      </h4>
                      <p className="text-primary-600 dark:text-primary-400 font-medium mb-2">
                        {job.company}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                        {job.period}
                      </p>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        {job.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div> */}

            {/* Education */}
            <motion.div
              {...scrollAnimation}
              variants={slideInLeft}
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
                  <GraduationCap className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Education
                </h3>
              </div>

              <div className="space-y-6">
                {education.map((edu, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    className="card p-6"
                  >
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      {edu.degree}
                    </h4>
                    <p className="text-primary-600 dark:text-primary-400 font-medium mb-2">
                      {edu.school}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                      {edu.period}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {edu.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Skills & Certifications */}
          <div className="space-y-12">
            {/* Key Skills */}
            <motion.div
              {...scrollAnimation}
              variants={slideInRight}
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
                  <FileText className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Key Skills
                </h3>
              </div>

              <div className="card p-6">
                <div className="grid grid-cols-2 gap-4">
                  {[
                    'JavaScript (ES6+)',
                    'React.js',
                    'Node.js',
                    'Express.js',
                    'MongoDB',
                    'PostgreSQL',
                    'Git & GitHub',
                    'REST APIs',
                    'Docker',
                    'AWS',
                  ].map((skill, index) => (
                    <motion.div
                      key={skill}
                      variants={fadeInUp}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center gap-2"
                    >
                      <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                      <span className="text-gray-700 dark:text-gray-300 text-sm">
                        {skill}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Certifications */}
            {/* <motion.div
              {...scrollAnimation}
              variants={slideInRight}
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
                  <Award className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Certifications
                </h3>
              </div>

              <div className="card p-6">
                <div className="space-y-3">
                  {certifications.map((cert, index) => (
                    <motion.div
                      key={cert}
                      variants={fadeInUp}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                    >
                      <Award className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                      <span className="text-gray-700 dark:text-gray-300 text-sm">
                        {cert}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div> */}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          {...scrollAnimation}
          variants={fadeInUp}
          className="text-center mt-16"
        >
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Interested in working together?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-primary"
          >
            Let's Connect
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Resume;
