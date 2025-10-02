import type { CSSProperties, HTMLAttributes } from "react";
import { cn } from "../lib/cn";

export interface BlastRadiusHeatmapProps extends HTMLAttributes<HTMLDivElement> {
  matrix: number[][];
  legend?: string[];
}

function valueToColor(value: number): string {
  if (value > 0.75) {
    return "rgba(255,59,78,0.35)";
  }
  if (value > 0.5) {
    return "rgba(255,159,45,0.26)";
  }
  if (value > 0.25) {
    return "rgba(77,192,255,0.22)";
  }
  return "rgba(54,210,126,0.2)";
}

export function BlastRadiusHeatmap({
  matrix,
  legend,
  className,
  ...props
}: BlastRadiusHeatmapProps) {
  return (
    <div className={cn("coal-card p-6", className)} {...props}>
      <div className="flex items-center justify-between">
        <h3 className="text-h3 font-semibold text-coal-text-primary">Blast radius heatmap</h3>
        {legend && <span className="text-body-sm text-coal-text-muted">{legend.join(" · ")}</span>}
      </div>
      <div className="mt-5 grid grid-cols-6 gap-2">
        {matrix.flatMap((row, rowIndex) =>
          row.map((value, columnIndex) => {
            const heatColor = valueToColor(value);
            const style: CSSProperties = {
              backgroundColor: heatColor,
            };
            return (
              <div
                key={`${rowIndex}-${columnIndex}`}
                className="heatmap-cell aspect-square"
                style={style}
                aria-label={`Risk level ${(value * 100).toFixed(0)} percent`}
              />
            );
          }),
        )}
      </div>
      <p className="mt-4 text-body-sm text-coal-text-muted">
        Cells convey lateral movement risk between network segments. Hot zones trigger automated remediations.
      </p>
    </div>
  );
}
