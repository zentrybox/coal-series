import type { SVGAttributes } from "react";
import { cn } from "../lib/cn";

export interface TrendChartProps
  extends Omit<SVGAttributes<SVGSVGElement>, "values"> {
  values: number[];
  strokeColor?: string;
  criticalZones?: { start: number; end: number }[];
}

export function TrendChart({
  values,
  strokeColor = "currentColor",
  className,
  criticalZones = [],
  ...props
}: TrendChartProps) {
  if (values.length === 0) {
    return null;
  }

  const width = 320;
  const height = 120;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const yRange = Math.max(max - min, 1);

  const points = values
    .map((value, index) => {
      const x = (index / Math.max(values.length - 1, 1)) * width;
      const y = height - ((value - min) / yRange) * height;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={cn("w-full", className)}
      role="presentation"
      {...props}
    >
      <defs>
        <linearGradient id="coal-trend-fill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={strokeColor} stopOpacity="0.35" />
          <stop offset="100%" stopColor={strokeColor} stopOpacity="0" />
        </linearGradient>
      </defs>
      {criticalZones.map((zone) => (
        <rect
          key={`${zone.start}-${zone.end}`}
          x={(zone.start / Math.max(values.length - 1, 1)) * width}
          y={0}
          width={Math.max(((zone.end - zone.start) / Math.max(values.length - 1, 1)) * width, 1)}
          height={height}
          fill="rgba(255,59,78,0.08)"
        />
      ))}
      <polyline
        points={points}
        fill="url(#coal-trend-fill)"
        stroke={strokeColor}
        strokeWidth={2}
        strokeLinejoin="round"
      />
    </svg>
  );
}
