import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "chisoku-cyan": {
          DEFAULT: "#00B0D0",
          50: "#E0F7FB",
          100: "#B3EDF5",
          500: "#00B0D0",
          600: "#009BB8",
          900: "#005A6E",
        },
        "chisoku-navy": {
          DEFAULT: "#0A1929",
          500: "#0A1929",
          800: "#040A11",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        "source-sans": ["var(--font-source-sans)", "sans-serif"],
        serif: ["var(--font-merriweather)", "Georgia", "serif"],
      },
      spacing: {
        section: "120px",
        "section-mobile": "80px",
      },
      boxShadow: {
        zen: "0 4px 6px -1px rgba(0, 176, 208, 0.1), 0 2px 4px -1px rgba(0, 176, 208, 0.06)",
        "zen-lg": "0 10px 15px -3px rgba(0, 176, 208, 0.1), 0 4px 6px -2px rgba(0, 176, 208, 0.05)",
      },
      animation: {
        "fade-in-up": "fadeInUp 0.6s ease-out",
        breathe: "breathe 3s ease-in-out infinite",
      },
      keyframes: {
        fadeInUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        breathe: {
          "0%, 100%": {
            transform: "scale(1)",
          },
          "50%": {
            transform: "scale(1.05)",
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;

