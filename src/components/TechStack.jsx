import { motion } from "framer-motion";
import { skills } from "../data/skills";
import { fadeInUp, slideInLeft, slideInRight, staggerItem, useScrollAnimation } from "../utils/animations";
import Marquee from "./ui/Marquee";

// ── Marquee rows ──────────────────────────────────────────────────
const row1 = skills.slice(0, Math.ceil(skills.length / 2));
const row2 = skills.slice(Math.ceil(skills.length / 2));

// ── Group skills by category ──────────────────────────────────────
const MERGED = { Tools: "Tools & DevOps", DevOps: "Tools & DevOps" };
const GROUP_ORDER = ["Frontend", "Backend", "Database", "Language", "Tools & DevOps", "Framework"];

const categoryGroups = (() => {
  const map = {};
  for (const skill of skills) {
    const key = MERGED[skill.category] || skill.category;
    if (!map[key]) map[key] = [];
    map[key].push(skill);
  }
  return GROUP_ORDER.filter((k) => map[k]).map((k) => ({ label: k, items: map[k] }));
})();

// ── Core stack (editorial right column) ───────────────────────────
const coreStack = [
  { name: "React",      tag: "Frontend"   },
  { name: "Next.js",    tag: "Framework"  },
  { name: "Node.js",    tag: "Backend"    },
  { name: "TypeScript", tag: "Language"   },
  { name: "MongoDB",    tag: "Database"   },
  { name: "n8n",        tag: "Automation" },
];

const stagger = (delay = 0.1) => ({
  initial: {},
  animate: { transition: { staggerChildren: delay } },
});

const TechStack = () => {
  const scrollAnimation = useScrollAnimation();

  return (
    <section
      id="skills"
      className="section-padding overflow-hidden"
      style={{ background: "var(--color-surface)" }}
    >
      {/* ── Block 1: header ──────────────────────────────────────── */}
      <div className="container-custom mb-16">
        <motion.span {...scrollAnimation} variants={fadeInUp} className="section-label">
          [ 02 — STACK ]
        </motion.span>

        <motion.h2
          {...scrollAnimation}
          variants={fadeInUp}
          className="font-display font-bold text-3xl md:text-5xl mt-4 max-w-lg leading-tight"
          style={{ color: "var(--color-ink)" }}
        >
          Technologies I Work With
        </motion.h2>
      </div>

      {/* ── Block 2: marquee rows ─────────────────────────────────── */}
      <div className="space-y-5">
        <Marquee items={row1} reverse={false} speed={38} />
        <Marquee items={row2} reverse={true}  speed={30} />
      </div>

      {/* ── Block 3: skills breakdown ────────────────────────────── */}
      <div className="container-custom mt-20">
        <div className="border-t pt-14" style={{ borderColor: "var(--color-border)" }}>
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">

            {/* Left — category pill groups */}
            <motion.div {...scrollAnimation} variants={slideInLeft} className="space-y-8">
              <p className="font-mono text-[10px] tracking-widest uppercase" style={{ color: "var(--color-muted)" }}>
                All Technologies
              </p>

              <motion.div {...scrollAnimation} variants={stagger(0.08)} className="space-y-6">
                {categoryGroups.map(({ label, items }) => (
                  <motion.div key={label} variants={staggerItem}>
                    <p
                      className="font-mono text-[10px] tracking-widest uppercase mb-3"
                      style={{ color: "var(--color-muted)", opacity: 0.55 }}
                    >
                      {label}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {items.map((skill) => (
                        <span
                          key={skill.name}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-mono text-[11px] tracking-wide transition-colors duration-200"
                          style={{ border: "1px solid var(--color-border)", color: "var(--color-muted)" }}
                          onMouseOver={(e) => {
                            e.currentTarget.style.color = "var(--color-accent)";
                            e.currentTarget.style.borderColor = "var(--color-accent)";
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.color = "var(--color-muted)";
                            e.currentTarget.style.borderColor = "var(--color-border)";
                          }}
                        >
                          {skill.icon && (
                            <img src={skill.icon} alt={skill.name} className="w-4 h-4 object-contain opacity-70" />
                          )}
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right — core stack editorial list */}
            <motion.div {...scrollAnimation} variants={slideInRight}>
              <p className="font-mono text-[10px] tracking-widest uppercase mb-8" style={{ color: "var(--color-muted)" }}>
                Core Stack
              </p>

              <motion.div {...scrollAnimation} variants={stagger(0.09)} className="space-y-0">
                {coreStack.map(({ name, tag }) => (
                  <motion.div
                    key={name}
                    variants={staggerItem}
                    className="flex items-center justify-between py-4 border-t group"
                    style={{ borderColor: "var(--color-border)" }}
                  >
                    <span
                      className="font-display font-bold transition-colors duration-200"
                      style={{ fontSize: "clamp(1.35rem, 2.8vw, 2rem)", color: "var(--color-ink)" }}
                      onMouseOver={(e) => (e.currentTarget.style.color = "var(--color-accent)")}
                      onMouseOut={(e)  => (e.currentTarget.style.color = "var(--color-ink)")}
                    >
                      {name}
                    </span>
                    <span
                      className="font-mono text-[10px] tracking-widest uppercase"
                      style={{ color: "var(--color-muted)" }}
                    >
                      {tag}
                    </span>
                  </motion.div>
                ))}
                <div className="border-t" style={{ borderColor: "var(--color-border)" }} />
              </motion.div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
