import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "tgs-bg": "#0e0e0e",
        "tgs-surface": "#161616",
        "tgs-surface2": "#1f1f1f",
        "tgs-border": "#2a2a2a",
        "tgs-borderh": "#3f3f3f",
        "tgs-text": "#e8e8e8",
        "tgs-body": "#a8a8a8",
        "tgs-muted": "#6b6b6b",
        "tgs-dim": "#3d3d3d",
        "tgs-accent": "#d4d4d4",
      },
      fontFamily: {
        sans: ["var(--font-syne)", "sans-serif"],
        mono: ["var(--font-ibm-plex-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
