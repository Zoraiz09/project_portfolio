import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        paper: "#FAFAF7",
        surface: "#FFFFFF",
        subtle: "#F2F1EC",
        line: "#E7E5E0",
        ink: "#16161A",
        muted: "#6B6B70",
        faint: "#A3A29D",
        accent: {
          DEFAULT: "#2F4BFF",
          soft: "#EEF0FF",
          deep: "#1F35D6",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-inter)", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.045em",
      },
      maxWidth: {
        site: "1240px",
      },
      boxShadow: {
        card: "0 1px 2px rgba(22,22,26,0.04), 0 8px 24px -12px rgba(22,22,26,0.10)",
        lift: "0 2px 4px rgba(22,22,26,0.04), 0 24px 48px -20px rgba(22,22,26,0.18)",
      },
      transitionTimingFunction: {
        out: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        caret: {
          "0%, 49%": { opacity: "1" },
          "50%, 100%": { opacity: "0" },
        },
        pulseDot: {
          "0%": { boxShadow: "0 0 0 0 rgba(34,197,94,0.45)" },
          "70%": { boxShadow: "0 0 0 8px rgba(34,197,94,0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(34,197,94,0)" },
        },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        caret: "caret 1s steps(1) infinite",
        pulseDot: "pulseDot 2s ease-out infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
