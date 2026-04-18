import { motion } from "framer-motion";
import { fadeInUp, slideInLeft, slideInRight, staggerItem, useScrollAnimation } from "../utils/animations";

const stats = [
  { number: "1+",  label: "Years Exp" },
  { number: "5+",  label: "Projects Shipped" },
  { number: "10+", label: "Technologies" },
  { number: "∞",   label: "Still Learning" },
];

const timeline = [
  { period: "Dec 2025 – Jan 2026", role: "AI Development Intern",  company: "ImpulseAI" },
  { period: "Oct – Nov 2025",      role: "Web Developer Intern",   company: "Varnika Energy Pvt. Ltd." },
  { period: "2023 – Present",      role: "Full Stack Developer",   company: "Freelance / Self-Initiated" },
];

const traits = [
  "Clean, scalable code",
  "AI & automation thinking",
  "Full product ownership",
  "Remote-first collaboration",
  "Open source mindset",
  "Continuous learning",
];

const tags = ["Remote Work", "Clean Code", "Team Collaboration", "Open Source"];

// Stagger wrapper variant
const stagger = (delay = 0.1) => ({
  initial: {},
  animate: { transition: { staggerChildren: delay } },
});

const About = () => {
  const scrollAnimation = useScrollAnimation();

  return (
    <section id="about" className="section-padding" style={{ background: 'var(--color-bg)' }}>

      {/* ── Block 1: label + pull-quote ───────────────────────────── */}
      <div className="container-custom">
        <motion.span {...scrollAnimation} variants={fadeInUp} className="section-label">
          [ 01 — ABOUT ]
        </motion.span>

        <motion.div
          {...scrollAnimation}
          variants={fadeInUp}
          className="mt-6 mb-16 flex items-start gap-3 lg:gap-5"
        >
          {/* Decorative open-quote */}
          <span
            className="font-display font-bold select-none shrink-0"
            style={{
              fontSize: 'clamp(5rem, 9vw, 8rem)',
              lineHeight: 0.75,
              color: 'var(--color-accent)',
              marginTop: '0.05em',
            }}
          >
            ❝
          </span>

          <h2
            className="font-display font-bold leading-tight"
            style={{
              fontSize: 'clamp(1.75rem, 3.8vw, 3.2rem)',
              color: 'var(--color-ink)',
              maxWidth: '44rem',
            }}
          >
            I build AI-powered, production-ready web apps and automated systems using n8n.
          </h2>
        </motion.div>
      </div>

      {/* ── Block 2: stats strip — full-bleed ─────────────────────── */}
      <motion.div
        {...scrollAnimation}
        variants={stagger(0.1)}
        style={{
          background: 'var(--color-surface)',
          borderTop:    '1px solid var(--color-border)',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                variants={staggerItem}
                className="flex flex-col items-center justify-center py-10 text-center"
                style={{
                  borderRight: i < stats.length - 1
                    ? '1px solid var(--color-border)'
                    : 'none',
                }}
              >
                <span
                  className="font-display font-bold"
                  style={{ fontSize: 'clamp(2.5rem, 4.5vw, 4rem)', color: 'var(--color-ink)' }}
                >
                  {stat.number}
                </span>
                <span
                  className="font-mono text-[10px] tracking-widest uppercase mt-2"
                  style={{ color: 'var(--color-muted)' }}
                >
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── Block 3: two-column body ──────────────────────────────── */}
      <div className="container-custom mt-20">
        <div className="grid lg:grid-cols-[55fr_45fr] gap-16 lg:gap-24">

          {/* Left — bio + timeline */}
          <motion.div {...scrollAnimation} variants={slideInLeft} className="space-y-10">

            {/* Bio */}
            <p
              className="font-sans text-base leading-relaxed"
              style={{ color: 'var(--color-muted)', maxWidth: '38rem' }}
            >
              I'm a full-stack developer and AI automation builder based in India. I've built
              e-commerce platforms, real-time tools, AI apps, and automation pipelines — all from scratch.
            </p>

            {/* Experience timeline */}
            <div>
              <p
                className="font-mono text-[10px] tracking-widest uppercase mb-8"
                style={{ color: 'var(--color-muted)' }}
              >
                Experience
              </p>

              <motion.div
                {...scrollAnimation}
                variants={stagger(0.12)}
                className="relative pl-5 space-y-8"
                style={{ borderLeft: '1px solid var(--color-accent)' }}
              >
                {timeline.map((entry) => (
                  <motion.div key={entry.company} variants={staggerItem} className="relative">
                    {/* Dot on the accent line */}
                    <div
                      className="absolute w-2 h-2 rounded-full"
                      style={{
                        background: 'var(--color-accent)',
                        left: 'calc(-0.625rem - 0.5px)',
                        top: '0.3rem',
                        boxShadow: '0 0 6px var(--color-accent)',
                      }}
                    />
                    <p className="font-mono text-[10px] tracking-widest uppercase mb-1" style={{ color: 'var(--color-muted)' }}>
                      {entry.period}
                    </p>
                    <p className="font-display font-bold text-base" style={{ color: 'var(--color-ink)' }}>
                      {entry.role}
                    </p>
                    <p className="font-sans text-sm" style={{ color: 'var(--color-accent)' }}>
                      {entry.company}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          {/* Right — traits + tags */}
          <motion.div {...scrollAnimation} variants={slideInRight} className="space-y-10">

            {/* Traits list */}
            <div>
              <p
                className="font-mono text-[10px] tracking-widest uppercase mb-6"
                style={{ color: 'var(--color-muted)' }}
              >
                What I Bring
              </p>

              <motion.div
                {...scrollAnimation}
                variants={stagger(0.08)}
                className="space-y-0"
              >
                {traits.map((trait) => (
                  <motion.div
                    key={trait}
                    variants={staggerItem}
                    className="flex items-center gap-3 py-3.5 border-t group"
                    style={{ borderColor: 'var(--color-border)' }}
                  >
                    <span
                      className="font-mono text-xs shrink-0"
                      style={{ color: 'var(--color-accent)' }}
                    >
                      ✦
                    </span>
                    <span
                      className="font-sans text-sm transition-colors duration-200 group-hover:text-ink"
                      style={{ color: 'var(--color-muted)' }}
                    >
                      {trait}
                    </span>
                  </motion.div>
                ))}
                <div className="border-t" style={{ borderColor: 'var(--color-border)' }} />
              </motion.div>
            </div>

            {/* Pill tags */}
            <motion.div {...scrollAnimation} variants={fadeInUp} className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[11px] tracking-wider px-3 py-1.5 rounded-full transition-colors duration-200"
                  style={{
                    color: 'var(--color-muted)',
                    border: '1px solid var(--color-border)',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.color = 'var(--color-accent)';
                    e.currentTarget.style.borderColor = 'var(--color-accent)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.color = 'var(--color-muted)';
                    e.currentTarget.style.borderColor = 'var(--color-border)';
                  }}
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
