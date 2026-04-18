import { useRef, useState } from "react";

const Marquee = ({ items, reverse = false, speed = 30 }) => {
  const [paused, setPaused] = useState(false);

  const animClass = reverse
    ? "animate-marquee-reverse"
    : "animate-marquee";

  return (
    <div
      className="marquee-track overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Two copies for seamless loop */}
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
            <div
              key={i}
              className="flex items-center gap-4 group"
            >
              {item.icon && (
                <img
                  src={item.icon}
                  alt={item.name}
                  className="w-5 h-5 object-contain opacity-50 group-hover:opacity-100 transition-opacity duration-200"
                />
              )}
              <span className="font-mono text-sm tracking-wide text-muted group-hover:text-accent whitespace-nowrap transition-colors duration-200">
                {item.name}
              </span>
              <span className="text-white/10 text-xs">—</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Marquee;
