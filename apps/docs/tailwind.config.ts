import type { Config } from "tailwindcss";
import coalPreset from "@coal-series/tailwind-preset";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./mdx-components.tsx",
    "../../packages/react-components/src/**/*.{ts,tsx}",
  ],
  presets: [coalPreset],
};

export default config;
