/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["DM Sans", "system-ui", "sans-serif"],
        display: ["Syne", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      colors: {
        // CSS-var-backed semantic tokens (work for both themes)
        background: "var(--color-bg)",
        surface: "var(--color-surface)",
        ink: "var(--color-ink)",
        muted: "var(--color-muted)",
        accent: "var(--color-accent)",
        // Static accent shades for Three.js / hardcoded uses
        "accent-dark":  "#6bffc6",
        "accent-light": "#00875a",
        // Legacy primary kept for any residual refs
        primary: {
          50:  "#f0fff9",
          100: "#c6ffe9",
          200: "#6bffc6",
          300: "#4dfdb8",
          400: "#2ffaaa",
          500: "#6bffc6",
          600: "#6bffc6",
          700: "#00d68f",
          800: "#00a86b",
          900: "#007a4d",
        },
      },
      animation: {
        "fade-in":         "fadeIn 0.5s ease-in-out",
        "slide-up":        "slideUp 0.5s ease-out",
        marquee:           "marquee 30s linear infinite",
        "marquee-reverse": "marqueeReverse 30s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%":   { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)",    opacity: "1" },
        },
        marquee: {
          "0%":   { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        marqueeReverse: {
          "0%":   { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
    },
  },
  plugins: [],
};
