import type { CSSProperties, HTMLAttributes } from "react";
import { cn } from "../lib/cn";

export interface ExposureScoreCardProps extends HTMLAttributes<HTMLDivElement> {
  score: number;
  change?: number;
  benchmark?: number;
  accent?: "electric" | "purple" | "emerald";
}

function formatChange(change: number | undefined): string {
  if (change === undefined) {
    return "";
  }
  const formatted = Math.abs(change).toFixed(1);
  return change >= 0 ? `▲ ${formatted}` : `▼ ${formatted}`;
}

const accentPalette: Record<NonNullable<ExposureScoreCardProps["accent"]>, string> = {
  electric: "#38A0FF",
  purple: "#7E4DFF",
  emerald: "#2AD0A8",
};

function accentColor(accent: NonNullable<ExposureScoreCardProps["accent"]>): string {
  return accentPalette[accent];
}

export function ExposureScoreCard({
  score,
  change,
  benchmark,
  accent = "electric",
  className,
  ...props
}: ExposureScoreCardProps) {
  const normalized = Math.max(0, Math.min(score, 10));
  const gaugePercent = (normalized / 10) * 100;
  const changeLabel = formatChange(change);

  return (
    <div
      className={cn("coal-card px-6 py-5", className)}
      style={{ "--coal-accent-current": accentColor(accent) } as CSSProperties}
      {...props}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-body-sm uppercase tracking-[0.3em] text-coal-text-muted">
            Exposure score
          </p>
          <p className="mt-3 text-display font-semibold text-coal-text-primary">{normalized.toFixed(1)}</p>
        </div>
        <div className="relative h-20 w-20">
          <svg viewBox="0 0 36 36" className="h-full w-full">
            <path
              fill="none"
              strokeWidth="3"
              d="M18 2a16 16 0 1 1 0 32 16 16 0 1 1 0-32"
              strokeLinecap="round"
              strokeDasharray="100"
              strokeDashoffset="0"
              stroke="rgba(31,36,46,0.6)"
            />
            <path
              fill="none"
              strokeWidth="3.5"
              d="M18 2a16 16 0 1 1 0 32 16 16 0 1 1 0-32"
              strokeLinecap="round"
              strokeDasharray="100"
              strokeDashoffset={100 - gaugePercent}
              stroke="var(--coal-accent-current, #38A0FF)"
            />
          </svg>
          <span className="absolute inset-0 grid place-items-center text-body-sm font-semibold text-coal-text-primary">
            {gaugePercent.toFixed(0)}%
          </span>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-3 text-body-sm text-coal-text-muted">
        {change !== undefined && (
          <span
            className={cn(
              "font-semibold",
              change > 0 ? "text-status-critical" : change < 0 ? "text-status-safe" : "text-coal-text-secondary",
            )}
          >
            {changeLabel} vs last week
          </span>
        )}
        {benchmark !== undefined && (
          <span className="text-coal-text-secondary">Benchmark {benchmark.toFixed(1)}</span>
        )}
      </div>
    </div>
  );
}
