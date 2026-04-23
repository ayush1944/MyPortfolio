import { motion } from "framer-motion";
import { Download, Eye } from "lucide-react";
import { fadeInUp, slideInLeft, slideInRight, staggerItem, useScrollAnimation } from "../utils/animations";

// Reverse-chronological order
const education = [
  {
    period:  "2022 —  2026",
    degree:  "B.Tech",
    school:  "JSSATE Noida",
    note:    null,
  },
  {
    period:  "2021",
    degree:  "Class 12th — CBSE",
    school:  "DAV Public School",
    note:    null,
  },
  {
    period:  "2019",
    degree:  "Class 10th — CBSE",
    school:  "Anil Saraswati Vidya Mandir",
    note:    null,
  },
];

const stagger = (delay = 0.1) => ({
  initial: {},
  animate: { transition: { staggerChildren: delay } },
});

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
    <section
      id="resume"
      className="section-padding"
      style={{
        background: "var(--color-surface)",
        borderTop: "2px solid var(--color-accent)",
        boxShadow: "0 -6px 40px color-mix(in srgb, var(--color-accent) 12%, transparent)",
      }}
    >
      <div className="container-custom">

        {/* Header */}
        <motion.span {...scrollAnimation} variants={fadeInUp} className="section-label">
          [ 04 — EDUCATION ]
        </motion.span>

        <motion.h2
          {...scrollAnimation}
          variants={fadeInUp}
          className="font-display font-bold text-3xl md:text-5xl mt-4 mb-16 max-w-lg leading-tight"
          style={{ color: "var(--color-ink)" }}
        >
          Academic Background
        </motion.h2>

        {/* Two-column: timeline left, CV right */}
        <div className="grid lg:grid-cols-[55fr_45fr] gap-16 lg:gap-24">

          {/* Left — Education timeline */}
          <motion.div {...scrollAnimation} variants={slideInLeft}>
            <p
              className="font-mono text-[10px] tracking-widest uppercase mb-8"
              style={{ color: "var(--color-muted)" }}
            >
              Education
            </p>

            <motion.div
              {...scrollAnimation}
              variants={stagger(0.12)}
              className="relative pl-5 space-y-10"
              style={{ borderLeft: "1px solid var(--color-accent)" }}
            >
              {education.map((edu) => (
                <motion.div key={edu.school} variants={staggerItem} className="relative">
                  {/* Glowing dot */}
                  <div
                    className="absolute w-2 h-2 rounded-full"
                    style={{
                      background: "var(--color-accent)",
                      left: "calc(-0.625rem - 0.5px)",
                      top: "0.35rem",
                      boxShadow: "0 0 6px var(--color-accent)",
                    }}
                  />

                  <div className="flex items-center gap-3 mb-1">
                    <p
                      className="font-mono text-[10px] tracking-widest uppercase"
                      style={{ color: "var(--color-muted)" }}
                    >
                      {edu.period}
                    </p>
                    {edu.note && (
                      <span
                        className="font-mono text-[9px] tracking-widest uppercase px-2 py-0.5 rounded"
                        style={{ color: "var(--color-accent)", border: "1px solid var(--color-accent)", opacity: 0.75 }}
                      >
                        {edu.note}
                      </span>
                    )}
                  </div>

                  <p
                    className="font-display font-bold text-lg leading-snug"
                    style={{ color: "var(--color-ink)" }}
                  >
                    {edu.degree}
                  </p>
                  <p
                    className="font-sans text-sm mt-0.5"
                    style={{ color: "var(--color-accent)" }}
                  >
                    {edu.school}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — CV download + availability */}
          <motion.div {...scrollAnimation} variants={slideInRight} className="space-y-10">

            <div>
              <p
                className="font-mono text-[10px] tracking-widest uppercase mb-6"
                style={{ color: "var(--color-muted)" }}
              >
                Résumé
              </p>

              <p
                className="font-sans text-sm leading-relaxed mb-8"
                style={{ color: "var(--color-muted)", maxWidth: "22rem" }}
              >
                Full CV available — includes project details, internship experience, and technical skills.
              </p>

              <div className="flex flex-col gap-3">
                <button onClick={handleDownload} className="btn-primary text-sm justify-center">
                  <Download size={16} />
                  Download CV
                </button>
                <button onClick={handleView} className="btn-outline text-sm justify-center">
                  <Eye size={16} />
                  View Online
                </button>
              </div>
            </div>

            {/* Availability badge */}
            <div
              className="p-5 rounded-xl space-y-3"
              style={{ border: "1px solid var(--color-border)" }}
            >
              <div className="flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{ background: "var(--color-accent)" }}
                />
                <span
                  className="font-mono text-[10px] tracking-widest uppercase"
                  style={{ color: "var(--color-accent)" }}
                >
                  Available
                </span>
              </div>
              <p
                className="font-display font-bold text-base"
                style={{ color: "var(--color-ink)" }}
              >
                Open to remote work &amp; freelance
              </p>
              <p
                className="font-sans text-xs leading-relaxed"
                style={{ color: "var(--color-muted)" }}
              >
                Full-stack development, AI integration, automation with n8n.
              </p>
            </div>

          </motion.div>
        </div>

        {/* CTA strip */}
        <motion.div
          {...scrollAnimation}
          variants={fadeInUp}
          className="mt-20 pt-12 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
          style={{ borderColor: "var(--color-border)" }}
        >
          <p className="font-sans text-sm" style={{ color: "var(--color-muted)" }}>
            Interested in working together?
          </p>
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
