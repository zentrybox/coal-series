# @coal-series/react

React primitives for the Coal Series cybersecurity design system. The package exposes accessible, Tailwind-ready components spanning core UI (buttons, cards, sidebar, table, modal, tabs, charts) and domain widgets tailored to vulnerability management.

## Installation

```bash
npm install @coal-series/react @coal-series/tailwind-preset
```

Add the Tailwind preset to your configuration and opt into the Coal Series fonts (IBM Plex Sans + IBM Plex Mono).

```ts
// tailwind.config.ts
import type { Config } from "tailwindcss";
import coalPreset from "@coal-series/tailwind-preset";

const config: Config = {
  presets: [coalPreset],
  content: ["./src/**/*.{ts,tsx,mdx}"],
};

export default config;
```

## Usage

```tsx
import { Button, Card, MetricCallout } from "@coal-series/react";

export function QuickStats() {
  return (
    <Card className="max-w-md">
      <MetricCallout value="218" label="Open vulnerabilities" trend="12 critical" accent="critical" />
      <Button className="mt-6" variant="primary">
        Launch new scan
      </Button>
    </Card>
  );
}
```

### Domain components

- `<VulnerabilityRadar>` animates asset hotspots with configurable severities.
- `<BlastRadiusHeatmap>` renders network segment risk as a heatmap.
- `<ExposureScoreCard>` visualises exposure score trends with built-in gauge.

These components render purely with SVG + Tailwind utilities—no heavyweight charting dependencies required.

## Scripts

- `npm run build` – bundle to CJS + ESM with type declarations.
- `npm run lint` – lint all TypeScript sources.
- `npm run test` – execute unit tests with Vitest (extendable for consumers).
- `npm run typecheck` – strict TypeScript validation.

## License

MIT © zentrybox
