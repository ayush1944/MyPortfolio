import { useState } from "react";

const Marquee = ({ items, reverse = false, speed = 30 }) => {
  const [paused, setPaused] = useState(false);
  const animClass = reverse ? "animate-marquee-reverse" : "animate-marquee";

  return (
    <div
      className="marquee-track overflow-hidden"
      style={{
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        maskImage:
          "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {[0, 1].map((copy) => (
        <div
          key={copy}
          className={`flex shrink-0 items-center gap-10 ${animClass}`}
          style={{
            animationDuration: `${speed}s`,
            animationPlayState: paused ? "paused" : "running",
          }}
        >
          {items.map((item, i) => (
            <div key={i} className="flex items-center gap-3 group">
              {item.icon && (
                <img
                  src={item.icon}
                  alt={item.name}
                  className="w-7 h-7 object-contain opacity-60 group-hover:opacity-100 transition-opacity duration-200"
                />
              )}
              <span
                className="font-mono text-sm tracking-wide whitespace-nowrap transition-colors duration-200"
                style={{ color: "var(--color-muted)" }}
                onMouseOver={(e) => (e.currentTarget.style.color = "var(--color-accent)")}
                onMouseOut={(e)  => (e.currentTarget.style.color = "var(--color-muted)")}
              >
                {item.name}
              </span>
              <span className="text-xs select-none" style={{ color: "var(--color-border)" }}>
                ·
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Marquee;
