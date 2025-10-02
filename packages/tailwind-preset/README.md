# @coal-series/tailwind-preset

Coal Series Tailwind preset encapsulates the design tokens, utilities, and component recipes that power the zentrybox cybersecurity design language. It layers on top of Tailwind CSS so product teams can reference a single source of truth for color, typography, spacing, and interaction patterns.

## Installation

```bash
npm install @coal-series/tailwind-preset tailwindcss
```

## Usage

Create a Tailwind config that consumes the preset:

```ts
// tailwind.config.ts
import type { Config } from "tailwindcss";
import coalPreset from "@coal-series/tailwind-preset";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,js,jsx,mdx}"],
  presets: [coalPreset],
};

export default config;
```

The preset exposes helper utilities:

- `.coal-card` for elevated surfaces
- `.coal-status-chip` for risk-status badges
- `.coal-nav-item` for sidebar navigation rows
- `.coal-gridlines`, `.coal-scan-pulse`, `.coal-radar-sweep` motion utilities

You can also extend or cherry-pick tokens:

```ts
import { coalColors, coalFontFamily } from "@coal-series/tailwind-preset";

export const brandAccent = coalColors.coal.accent.electric;
```

## Scripts

- `npm run build` – bundle the preset for publication (CJS + ESM + d.ts)
- `npm run dev` – watch mode for rapid tweaks
- `npm run lint` – lint the source files
- `npm run typecheck` – strict TypeScript validation

## License

MIT © zentrybox
