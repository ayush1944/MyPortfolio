import { SOCIAL_LINKS } from '../data/social';

const navLinks = [
  { label: "About",   href: "#about"   },
  { label: "Work",    href: "#projects" },
  { label: "Stack",   href: "#skills"  },
  { label: "Contact", href: "#contact" },
];


const Footer = () => {
  const year = new Date().getFullYear();

  const scrollTo = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer style={{ background: "var(--color-bg)", borderTop: "1px solid var(--color-border)" }}>
      <div className="container-custom">

        {/* Top row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 py-10">

          {/* Brand */}
          <div>
            <p
              className="font-display font-bold text-2xl leading-none"
              style={{ color: "var(--color-ink)" }}
            >
              AYUSH PAL
            </p>
            <p
              className="font-mono text-[10px] tracking-widest uppercase mt-1.5"
              style={{ color: "var(--color-muted)" }}
            >
              Full-Stack Developer &amp; AI Autimation Engineer
            </p>
          </div>

          {/* Nav links */}
          <nav className="flex items-center gap-6">
            {navLinks.map(({ label, href }) => (
              <button
                key={label}
                onClick={() => scrollTo(href)}
                className="font-mono text-xs tracking-wide transition-colors duration-200"
                style={{ color: "var(--color-muted)" }}
                onMouseOver={(e) => (e.currentTarget.style.color = "var(--color-accent)")}
                onMouseOut={(e)  => (e.currentTarget.style.color = "var(--color-muted)")}
              >
                {label}
              </button>
            ))}
          </nav>
        </div>

        {/* Divider */}
        <div style={{ borderTop: "1px solid var(--color-border)" }} />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-6">
          <p
            className="font-mono text-[10px] tracking-wide"
            style={{ color: "var(--color-muted)" }}
          >
            Ayush Pal © {year}
          </p>

          <div className="flex items-center gap-5">
            {SOCIAL_LINKS.map(({ label, href }, i) => (
              <span key={label} className="flex items-center gap-5">
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[10px] tracking-wide transition-colors duration-200"
                  style={{ color: "var(--color-muted)" }}
                  onMouseOver={(e) => (e.currentTarget.style.color = "var(--color-ink)")}
                  onMouseOut={(e)  => (e.currentTarget.style.color = "var(--color-muted)")}
                >
                  {label}
                </a>
                {i < SOCIAL_LINKS.length - 1 && (
                  <span style={{ color: "var(--color-border)" }}>·</span>
                )}
              </span>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
