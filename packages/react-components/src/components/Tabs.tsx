import type { HTMLAttributes, ReactNode } from "react";
import { createContext, useContext, useId, useMemo } from "react";
import { cn } from "../lib/cn";

type TabsOrientation = "horizontal" | "vertical";

type TabsContextValue = {
  selected: string;
  setSelected: (value: string) => void;
  idPrefix: string;
  orientation: TabsOrientation;
};

const TabsContext = createContext<TabsContextValue | null>(null);

export interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
  onValueChange: (value: string) => void;
  orientation?: TabsOrientation;
}

export function Tabs({
  value,
  onValueChange,
  orientation = "horizontal",
  className,
  children,
  ...props
}: TabsProps) {
  const idPrefix = useId();
  const context = useMemo<TabsContextValue>(
    () => ({ selected: value, setSelected: onValueChange, idPrefix, orientation }),
    [idPrefix, value, onValueChange, orientation],
  );

  return (
    <TabsContext.Provider value={context}>
      <div
        role="tablist"
        aria-orientation={orientation}
        className={cn(
          "flex gap-2 rounded-base border border-coal-border bg-coal-bg-alt p-1",
          orientation === "vertical" ? "flex-col" : "flex-row",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
}

export interface TabTriggerProps extends HTMLAttributes<HTMLButtonElement> {
  value: string;
  icon?: ReactNode;
}

export function TabTrigger({ value, icon, className, children, ...props }: TabTriggerProps) {
  const context = useTabsContext();
  const selected = context.selected === value;
  const tabId = `${context.idPrefix}-${value}`;
  const panelId = `${context.idPrefix}-${value}-panel`;

  return (
    <button
      type="button"
      id={tabId}
      role="tab"
      aria-selected={selected}
      aria-controls={panelId}
      data-state={selected ? "active" : "inactive"}
      className={cn(
        "flex flex-1 items-center justify-center gap-2 rounded-base px-4 py-2 text-body-sm font-semibold transition-all duration-200",
        selected
          ? "bg-coal-surface text-coal-text-primary shadow-[inset_0_0_0_1px_rgba(56,160,255,0.45)]"
          : "text-coal-text-muted hover:text-coal-text-primary",
        className,
      )}
      onClick={() => context.setSelected(value)}
      {...props}
    >
      {icon && <span aria-hidden>{icon}</span>}
      {children}
    </button>
  );
}

export interface TabPanelProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
}

export function TabPanel({ value, className, children, ...props }: TabPanelProps) {
  const context = useTabsContext();
  const selected = context.selected === value;
  const tabId = `${context.idPrefix}-${value}`;
  const panelId = `${context.idPrefix}-${value}-panel`;

  return (
    <div
      role="tabpanel"
      id={panelId}
      aria-labelledby={tabId}
      hidden={!selected}
      className={cn("mt-4 rounded-base border border-coal-border bg-coal-surface p-6", className)}
      {...props}
    >
      {children}
    </div>
  );
}

function useTabsContext(): TabsContextValue {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("Tab components must be used within <Tabs>");
  }
  return context;
}
