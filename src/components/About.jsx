import React from "react";
import { motion } from "framer-motion";
import { fadeInUp, slideInLeft, slideInRight, useScrollAnimation } from "../utils/animations";

const stats = [
  { number: "1+", label: "Years building" },
  { number: "5+", label: "Projects shipped" },
  { number: "10+", label: "Technologies" },
  { number: "∞", label: "Still learning" },
];

const tags = ["Remote Work", "Team Collaboration", "Clean Code", "Open Source"];

const About = () => {
  const scrollAnimation = useScrollAnimation();

  return (
    <section id="about" className="section-padding" style={{ background: 'var(--color-bg)' }}>
      <div className="container-custom">

        {/* Section label */}
        <motion.span
          {...scrollAnimation}
          variants={fadeInUp}
          className="section-label"
        >
          [ 01 — ABOUT ]
        </motion.span>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 mt-4">

          {/* Left — pull quote + bio */}
          <motion.div {...scrollAnimation} variants={slideInLeft} className="space-y-8">
            <h2 className="font-display font-bold text-3xl md:text-4xl text-ink leading-snug">
              I build full-stack products people actually use — not just demos.
            </h2>

            <p className="font-sans text-muted text-base leading-relaxed">
              I'm a full-stack developer building end-to-end web applications using the MERN stack, Next.js, and TypeScript.
              My journey started with curiosity and quickly turned into shipping e-commerce platforms, real-time collaboration tools, URL shorteners, and AI-powered SaaS apps.
            </p>

            <p className="font-sans text-muted text-base leading-relaxed">
              I care about code quality, scalability, and user experience. I prefer simple, readable code and continuously refine my understanding of backend architecture, system design, and performance.
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 pt-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-xs tracking-wider text-muted border border-white/[0.1] rounded-full px-3 py-1 hover:border-accent hover:text-accent transition-colors duration-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right — stats vertical stack */}
          <motion.div {...scrollAnimation} variants={slideInRight} className="space-y-0">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={fadeInUp}
                transition={{ delay: i * 0.1 }}
                className="py-6 border-t border-white/[0.08] flex items-baseline justify-between"
              >
                <span className="font-display font-bold text-5xl md:text-6xl text-ink">
                  {stat.number}
                </span>
                <span className="font-mono text-xs tracking-widest text-muted uppercase">
                  {stat.label}
                </span>
              </motion.div>
            ))}
            {/* last border */}
            <div className="border-t border-white/[0.08]" />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default About;
