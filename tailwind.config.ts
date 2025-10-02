import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        coal: {
          bg: "var(--coal-bg)",
          "bg-alt": "var(--coal-bg-alt)",
          surface: "var(--coal-surface)",
          "surface-alt": "var(--coal-surface-alt)",
          border: "var(--coal-border)",
          "border-strong": "var(--coal-border-strong)",
          text: {
            primary: "var(--coal-text-primary)",
            secondary: "var(--coal-text-secondary)",
            muted: "var(--coal-text-muted)",
            inverse: "var(--coal-text-inverse)",
          },
          accent: {
            electric: "var(--coal-accent)",
            purple: "var(--coal-accent-purple)",
            emerald: "var(--coal-accent-emerald)",
          },
        },
        status: {
          critical: "var(--status-critical)",
          warning: "var(--status-warning)",
          safe: "var(--status-safe)",
          info: "var(--status-info)",
          neutral: "var(--status-neutral)",
        },
      },
      fontFamily: {
        sans: ["var(--font-plex-sans)", "IBM Plex Sans", "Helvetica Neue", "Arial", "sans-serif"],
        mono: ["var(--font-plex-mono)", "IBM Plex Mono", "SFMono-Regular", "Menlo", "monospace"],
        display: ["var(--font-plex-sans)", "IBM Plex Sans", "Helvetica Neue", "Arial", "sans-serif"],
      },
      fontSize: {
        display: ["3.5rem", { lineHeight: "1.1", letterSpacing: "-0.01em" }],
        h1: ["2.25rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        h2: ["1.75rem", { lineHeight: "1.25" }],
        h3: ["1.375rem", { lineHeight: "1.3" }],
        "body-lg": ["1.125rem", { lineHeight: "1.5" }],
        body: ["1rem", { lineHeight: "1.5" }],
        "body-sm": ["0.875rem", { lineHeight: "1.45", letterSpacing: "0.01em" }],
        mono: ["1rem", { lineHeight: "1.45", fontFamily: "var(--font-plex-mono)" }],
        "mono-sm": ["0.8125rem", { lineHeight: "1.4", fontFamily: "var(--font-plex-mono)" }],
      },
      spacing: {
        3: "0.75rem",
        4: "1rem",
        5: "1.25rem",
        6: "1.5rem",
        8: "2rem",
        10: "2.5rem",
        12: "3rem",
        16: "4rem",
        20: "5rem",
      },
      borderRadius: {
        base: "0.5rem",
        pill: "999px",
      },
      boxShadow: {
        "coal-elevated": "0 24px 48px -32px rgba(0, 0, 0, 0.45), 0 8px 12px -6px rgba(8, 12, 20, 0.35)",
      },
      backgroundImage: {
        "coal-grid": "linear-gradient(90deg, var(--gridline-color) 1px, transparent 1px), linear-gradient(var(--gridline-color) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};

export default config;
