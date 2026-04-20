import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro Display",
          "Segoe UI",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      colors: {
        ink: {
          50:  "#f7f7f8",
          100: "#ececee",
          200: "#d9d9de",
          300: "#b8b8c0",
          400: "#8a8a94",
          500: "#5f5f6a",
          600: "#3f3f48",
          700: "#2a2a32",
          800: "#1a1a20",
          900: "#0e0e12",
          950: "#07070a",
        },
        // Dark surface layers — page → raised → overlay → float
        surface: {
          base:    "#0c0c0f",
          raised:  "#111116",
          overlay: "#17171b",
          float:   "#1d1d22",
        },
        // Semantic text tokens
        hi:   "#e8e8ed",   // primary text
        mid:  "#9696a0",   // secondary / body
        lo:   "#5a5a68",   // tertiary / labels
        edge: "#2a2a32",   // very dim lines
      },
      letterSpacing: {
        tightest: "-0.04em",
        tighter:  "-0.03em",
        tight:    "-0.02em",
      },
      lineHeight: {
        display: "1.04",
      },
      boxShadow: {
        xs:            "0 1px 2px rgba(0,0,0,0.35)",
        soft:          "0 1px 3px rgba(0,0,0,0.35), 0 8px 24px rgba(0,0,0,0.30)",
        md:            "0 2px 8px rgba(0,0,0,0.55), 0 16px 48px rgba(0,0,0,0.40)",
        lg:            "0 4px 12px rgba(0,0,0,0.65), 0 24px 64px rgba(0,0,0,0.50)",
        button:        "0 1px 2px rgba(0,0,0,0.30), inset 0 1px 0 rgba(255,255,255,0.12)",
        ring:          "0 0 0 1px rgba(255,255,255,0.07), 0 1px 2px rgba(0,0,0,0.35)",
        "inner-sm":    "inset 0 1px 2px rgba(0,0,0,0.25)",
        glow:          "0 0 0 1px rgba(255,255,255,0.07), 0 8px 32px rgba(0,0,0,0.60)",
        "glow-accent": "0 0 32px rgba(79,123,255,0.22)",
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.175, 0.885, 0.32, 1.1)",
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
};

export default config;
