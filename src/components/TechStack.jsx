import { motion } from "framer-motion";
import { skills } from "../data/skills";
import { fadeInUp, useScrollAnimation } from "../utils/animations";
import Marquee from "./ui/Marquee";

// Split skills into two rows
const row1 = skills.slice(0, Math.ceil(skills.length / 2));
const row2 = skills.slice(Math.ceil(skills.length / 2));

const TechStack = () => {
  const scrollAnimation = useScrollAnimation();

  return (
    <section id="skills" className="section-padding overflow-hidden" style={{ background: 'var(--color-surface)' }}>
      <div className="container-custom mb-16">
        <motion.span
          {...scrollAnimation}
          variants={fadeInUp}
          className="section-label"
        >
          [ 02 — STACK ]
        </motion.span>

        <motion.h2
          {...scrollAnimation}
          variants={fadeInUp}
          className="font-display font-bold text-3xl md:text-5xl text-ink mt-4 max-w-lg leading-tight"
        >
          Technologies I Work With
        </motion.h2>
      </div>

      {/* Marquee rows — full bleed */}
      <div className="space-y-6">
        <Marquee items={row1} reverse={false} speed={35} />
        <Marquee items={row2} reverse={true} speed={28} />
      </div>

      {/* MERN highlight */}
      <div className="container-custom mt-20">
        <motion.div
          {...scrollAnimation}
          variants={fadeInUp}
          className="border-t border-white/[0.08] pt-12"
        >
          <p className="font-mono text-xs tracking-widest text-muted uppercase mb-8">
            Specialized in
          </p>
          <div className="flex flex-wrap gap-4">
            {['MongoDB', 'Express.js', 'React', 'Node.js', 'Next.js', 'TypeScript'].map((tech) => (
              <span
                key={tech}
                className="font-display font-bold text-2xl md:text-3xl text-ink/30 hover:text-accent transition-colors duration-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechStack;
