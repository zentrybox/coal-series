import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../lib/cn";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
}

export function Card({ interactive = true, className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "coal-card",
        interactive ? "transition-transform duration-200" : "",
        className,
      )}
      {...props}
    />
  );
}

export function CardHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex items-start justify-between gap-4 border-b border-coal-border px-6 py-4",
        className,
      )}
      {...props}
    />
  );
}

export function CardTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("text-h3 font-semibold text-coal-text-primary", className)}
      {...props}
    />
  );
}

export function CardDescription({
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-body-sm text-coal-text-muted", className)} {...props} />
  );
}

export function CardContent({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("px-6 py-5", className)} {...props} />
  );
}

export function CardFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "mt-auto flex items-center justify-end gap-3 border-t border-coal-border px-6 py-4",
        className,
      )}
      {...props}
    />
  );
}

export interface MetricCalloutProps extends HTMLAttributes<HTMLDivElement> {
  value: ReactNode;
  label: ReactNode;
  trend?: ReactNode;
  accent?: "electric" | "purple" | "emerald" | "critical" | "warning" | "safe" | "info";
}

const trendAccent: Record<NonNullable<MetricCalloutProps["accent"]>, string> = {
  electric: "text-coal-accent-electric",
  purple: "text-coal-accent-purple",
  emerald: "text-coal-accent-emerald",
  critical: "text-status-critical",
  warning: "text-status-warning",
  safe: "text-status-safe",
  info: "text-status-info",
};

export function MetricCallout({
  value,
  label,
  trend,
  accent = "electric",
  className,
  ...props
}: MetricCalloutProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)} {...props}>
      <span className="text-body-sm uppercase tracking-[0.3em] text-coal-text-muted">
        {label}
      </span>
      <span className="text-display font-semibold text-coal-text-primary">
        {value}
      </span>
      {trend && (
        <span className={cn("text-body-sm font-medium", trendAccent[accent])}>
          {trend}
        </span>
      )}
    </div>
  );
}
