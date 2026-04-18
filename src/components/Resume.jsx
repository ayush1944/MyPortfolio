import { motion } from "framer-motion";
import { Download, Eye } from "lucide-react";
import { fadeInUp, slideInLeft, slideInRight, useScrollAnimation } from "../utils/animations";

const education = [
  {
    degree: "B.Tech — Electronics & Communications",
    school: "JSSATE Noida",
    period: "2022 — 2026",
  },
];

const keySkills = [
  "JavaScript (ES6+)", "TypeScript", "React.js", "Next.js",
  "Node.js", "Express.js", "MongoDB", "PostgreSQL",
  "REST APIs", "Git & GitHub",
];

const Resume = () => {
  const scrollAnimation = useScrollAnimation();

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.download = "Ayush_Resume.pdf";
    link.click();
  };

  const handleView = () => window.open("/resume.pdf", "_blank");

  return (
    <section id="resume" className="section-padding" style={{ background: 'var(--color-surface)' }}>
      <div className="container-custom">

        {/* Label */}
        <motion.span
          {...scrollAnimation}
          variants={fadeInUp}
          className="section-label"
        >
          [ 04 — EXPERIENCE ]
        </motion.span>

        <motion.h2
          {...scrollAnimation}
          variants={fadeInUp}
          className="font-display font-bold text-3xl md:text-5xl text-ink mt-4 mb-16 max-w-lg leading-tight"
        >
          Education & Skills
        </motion.h2>

        <div className="grid lg:grid-cols-2 gap-16">

          {/* Left — Education + Download */}
          <motion.div {...scrollAnimation} variants={slideInLeft} className="space-y-10">
            <div>
              <p className="font-mono text-xs tracking-widest text-muted uppercase mb-6">Education</p>
              {education.map((edu, i) => (
                <div
                  key={i}
                  className="border border-white/[0.08] rounded-xl p-6 space-y-2 hover:border-accent/30 transition-colors duration-300"
                >
                  <h3 className="font-display font-bold text-lg text-ink">{edu.degree}</h3>
                  <p className="font-sans text-accent text-sm">{edu.school}</p>
                  <p className="font-mono text-xs text-muted">{edu.period}</p>
                </div>
              ))}
            </div>

            {/* Download / View buttons */}
            <div className="flex gap-4 pt-4">
              <button onClick={handleDownload} className="btn-primary text-sm">
                <Download size={16} />
                Download CV
              </button>
              <button onClick={handleView} className="btn-outline text-sm">
                <Eye size={16} />
                View Online
              </button>
            </div>
          </motion.div>

          {/* Right — Key Skills */}
          <motion.div {...scrollAnimation} variants={slideInRight}>
            <p className="font-mono text-xs tracking-widest text-muted uppercase mb-6">Key Skills</p>
            <div className="space-y-0">
              {keySkills.map((skill, i) => (
                <motion.div
                  key={skill}
                  variants={fadeInUp}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center justify-between py-4 border-t border-white/[0.08] group"
                >
                  <span className="font-sans text-muted group-hover:text-ink transition-colors duration-200">
                    {skill}
                  </span>
                  <span className="font-mono text-xs text-white/10 group-hover:text-accent transition-colors duration-200">
                    ✦
                  </span>
                </motion.div>
              ))}
              <div className="border-t border-white/[0.08]" />
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          {...scrollAnimation}
          variants={fadeInUp}
          className="mt-20 pt-12 border-t border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
        >
          <p className="font-sans text-muted">Interested in working together?</p>
          <button
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            className="btn-primary text-sm"
          >
            Let's Connect ↓
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Resume;
