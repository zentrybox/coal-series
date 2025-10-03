import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

export const coalColors = {
  coal: {
    bg: "#0B0D10",
    "bg-alt": "#11141A",
    surface: "#161B24",
    "surface-alt": "#1A202B",
    border: "#1F242E",
    "border-strong": "#272E3A",
    text: {
      primary: "#F8FAFC",
      secondary: "#C2C7D3",
      muted: "#8893A8",
      inverse: "#0B0D10",
    },
    accent: {
      electric: "#38A0FF",
      purple: "#7E4DFF",
      emerald: "#2AD0A8",
    },
  },
  status: {
    critical: "#FF3B4E",
    warning: "#FF9F2D",
    safe: "#36D27E",
    info: "#4DC0FF",
    neutral: "#8893A8",
  },
} as const;

type FontSizeTuple = [string, Record<string, string>];

export const coalFontFamily: Record<string, string[]> = {
  sans: [
    "var(--font-plex-sans)",
    "IBM Plex Sans",
    "Helvetica Neue",
    "Arial",
    "sans-serif",
  ],
  mono: [
    "var(--font-plex-mono)",
    "IBM Plex Mono",
    "SFMono-Regular",
    "Menlo",
    "monospace",
  ],
  display: [
    "var(--font-plex-sans)",
    "IBM Plex Sans",
    "Helvetica Neue",
    "Arial",
    "sans-serif",
  ],
};

export const coalFontSize: Record<string, FontSizeTuple> = {
  display: ["3.5rem", { lineHeight: "1.1", letterSpacing: "-0.01em" }],
  h1: ["2.25rem", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
  h2: ["1.75rem", { lineHeight: "1.25" }],
  h3: ["1.375rem", { lineHeight: "1.3" }],
  "body-lg": ["1.125rem", { lineHeight: "1.5" }],
  body: ["1rem", { lineHeight: "1.5" }],
  "body-sm": ["0.875rem", { lineHeight: "1.45", letterSpacing: "0.01em" }],
  mono: ["1rem", { lineHeight: "1.45", fontFamily: coalFontFamily.mono.join(",") }],
  "mono-sm": [
    "0.8125rem",
    { lineHeight: "1.4", fontFamily: coalFontFamily.mono.join(",") },
  ],
};

export const coalSpacing = {
  3: "0.75rem",
  4: "1rem",
  5: "1.25rem",
  6: "1.5rem",
  8: "2rem",
  10: "2.5rem",
  12: "3rem",
  16: "4rem",
  20: "5rem",
} as const;

export const coalRadii = {
  none: "0",
  sm: "0.375rem",
  base: "0.5rem",
  lg: "0.75rem",
  xl: "1rem",
  pill: "999px",
} as const;

export const coalShadows = {
  "coal-sm": "0 6px 18px -12px rgba(8, 12, 20, 0.45)",
  "coal-md": "0 12px 32px -24px rgba(8, 12, 20, 0.55)",
  "coal-elevated": "0 24px 48px -32px rgba(0, 0, 0, 0.45), 0 8px 12px -6px rgba(8, 12, 20, 0.35)",
} as const;

const gridline =
  "linear-gradient(90deg, var(--coal-gridline-color, rgba(255,255,255,0.06)) 1px, transparent 1px), linear-gradient(var(--coal-gridline-color, rgba(255,255,255,0.06)) 1px, transparent 1px)";

export const coalPreset = {
  darkMode: "class",
  theme: {
    extend: {
      colors: coalColors,
      fontFamily: coalFontFamily,
      fontSize: coalFontSize,
      spacing: coalSpacing,
      borderRadius: coalRadii,
      boxShadow: coalShadows,
      backgroundImage: {
        "coal-grid": gridline,
      },
      keyframes: {
        "coal-scan": {
          "0%": { opacity: "0.4", transform: "scale(0.75)" },
          "70%": { opacity: "0" },
          "100%": { opacity: "0", transform: "scale(1.5)" },
        },
        "coal-radar": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "coal-scan": "coal-scan 3s ease-out infinite",
        "coal-radar": "coal-radar 8s linear infinite",
      },
    },
  },
  plugins: [
    plugin(({ addComponents, addUtilities, theme }) => {
      addComponents({
        ".coal-card": {
          borderRadius: theme("borderRadius.base"),
          border: `1px solid ${theme("colors.coal.border")}`,
          backgroundColor: theme("colors.coal.surface"),
          boxShadow: theme("boxShadow.coal-md"),
          transitionProperty: "transform, box-shadow",
          transitionDuration: "200ms",
          transitionTimingFunction: "ease",
        },
        ".coal-card:hover": {
          transform: "translateY(-4px)",
          boxShadow: theme("boxShadow.coal-elevated"),
        },
        ".coal-status-chip": {
          display: "inline-flex",
          alignItems: "center",
          gap: "0.35rem",
          borderRadius: theme("borderRadius.pill"),
          padding: "0.25rem 0.75rem",
          fontSize: theme("fontSize['body-sm'][0]"),
          fontWeight: "600",
        },
        ".coal-nav-item": {
          position: "relative",
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          borderRadius: theme("borderRadius.base"),
          padding: "0.75rem 1rem",
          fontSize: theme("fontSize['body-sm'][0]"),
          fontWeight: "600",
          color: theme("colors.coal.text.secondary"),
          transitionProperty: "color, background-color",
          transitionDuration: "200ms",
          transitionTimingFunction: "ease",
        },
        ".coal-nav-item:hover": {
          color: theme("colors.coal.text.primary"),
          backgroundColor: "rgba(255, 255, 255, 0.08)",
        },
        ".coal-nav-item[data-active='true']": {
          color: theme("colors.coal.text.primary"),
          backgroundColor: "rgba(255, 255, 255, 0.08)",
        },
        ".coal-nav-item[data-active='true']::before": {
          content: "''",
          position: "absolute",
          insetInlineStart: "0",
          top: "50%",
          transform: "translateY(-50%)",
          width: "4px",
          height: "60%",
          borderRadius: theme("borderRadius.pill"),
          backgroundColor: theme("colors.coal.accent.electric"),
        },
      });

      addUtilities({
        ".coal-gridlines": {
          backgroundImage: gridline,
          backgroundSize: "80px 80px",
        },
        ".coal-scan-pulse": {
          position: "relative",
          isolation: "isolate",
        },
        ".coal-scan-pulse::after": {
          content: "''",
          position: "absolute",
          inset: "0",
          borderRadius: "inherit",
          background: "radial-gradient(circle, rgba(56, 160, 255, 0.35), rgba(56, 160, 255, 0))",
          animation: theme("animation['coal-scan']"),
          zIndex: "-1",
        },
        ".coal-radar-sweep": {
          position: "relative",
          overflow: "hidden",
        },
        ".coal-radar-sweep::before": {
          content: "''",
          position: "absolute",
          inset: "0",
          borderRadius: "999px",
          background: "conic-gradient(from 90deg, rgba(56,160,255,0), rgba(56,160,255,0.6), rgba(56,160,255,0))",
          animation: theme("animation['coal-radar']"),
          mixBlendMode: "screen",
        },
      });
    }),
  ],
} satisfies Partial<Config>;

export default coalPreset;
