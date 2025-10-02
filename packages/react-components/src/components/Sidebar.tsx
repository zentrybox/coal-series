import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../lib/cn";
import { Slot } from "@radix-ui/react-slot";

export interface SidebarProps extends HTMLAttributes<HTMLElement> {
  title?: string;
  caption?: string;
  statusIndicator?: ReactNode;
}

export function Sidebar({
  className,
  title,
  caption,
  statusIndicator,
  children,
  ...props
}: SidebarProps) {
  return (
    <aside
      className={cn(
        "flex h-full min-h-screen w-full flex-col gap-8 border-r border-coal-border bg-coal-bg-alt px-6 py-8",
        className,
      )}
      {...props}
    >
      {(title || caption || statusIndicator) && (
        <header className="flex items-start justify-between gap-3">
          <div className="flex flex-col gap-2">
            {caption && (
              <span className="text-body-sm uppercase tracking-[0.32em] text-coal-text-muted">
                {caption}
              </span>
            )}
            {title && (
              <h1 className="text-h2 font-semibold text-coal-text-primary">{title}</h1>
            )}
          </div>
          {statusIndicator ?? (
            <span
              className="mt-1 inline-flex h-2 w-2 animate-pulse rounded-full bg-status-safe"
              aria-label="System healthy"
            />
          )}
        </header>
      )}
      {children}
    </aside>
  );
}

export function SidebarSection({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex flex-col gap-2", className)} {...props} />
  );
}

export interface SidebarItemProps extends HTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  icon?: ReactNode;
  kpi?: ReactNode;
  asChild?: boolean;
}

export function SidebarItem({
  className,
  icon,
  kpi,
  active,
  asChild,
  children,
  ...props
}: SidebarItemProps) {
  const Component = asChild ? Slot : "button";

  return (
    <Component
      {...(asChild ? {} : { type: "button" as const })}
      data-active={active}
      className={cn("coal-nav-item text-left", className)}
      {...props}
    >
      {icon && (
        <span className="grid h-9 w-9 place-items-center rounded-base border border-coal-border bg-coal-surface text-body-sm text-coal-text-muted">
          {icon}
        </span>
      )}
      <span className="flex flex-1 flex-col justify-center text-left">
        <span className="text-body-sm font-semibold text-coal-text-primary">
          {children}
        </span>
        {kpi && (
          <span className="text-[0.75rem] font-medium text-coal-text-muted">{kpi}</span>
        )}
      </span>
    </Component>
  );
}
