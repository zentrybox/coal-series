import type { ButtonHTMLAttributes, ForwardedRef, ReactNode } from "react";
import { forwardRef } from "react";
import { cn } from "../lib/cn";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type AccentTone = "electric" | "purple" | "emerald";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  accent?: AccentTone;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  loading?: boolean;
}

const accentClassMap: Record<AccentTone, string> = {
  electric: "bg-coal-accent-electric text-coal-text-inverse focus-visible:ring-coal-accent-electric/40",
  purple: "bg-coal-accent-purple text-coal-text-inverse focus-visible:ring-coal-accent-purple/40",
  emerald: "bg-coal-accent-emerald text-coal-text-inverse focus-visible:ring-coal-accent-emerald/40",
};

const variantClassMap: Record<ButtonVariant, string> = {
  primary:
    "font-semibold inline-flex items-center justify-center gap-2 rounded-base px-5 py-2.5 shadow-[0_12px_32px_-18px_rgba(56,160,255,0.65)] transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60",
  secondary:
    "font-semibold inline-flex items-center justify-center gap-2 rounded-base border border-coal-border bg-coal-surface px-5 py-2.5 text-coal-text-secondary transition duration-200 hover:text-coal-text-primary hover:bg-coal-surface-alt focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coal-accent-electric/30 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60",
  ghost:
    "font-semibold inline-flex items-center justify-center gap-2 rounded-pill px-4 py-2 text-coal-text-secondary transition duration-200 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coal-accent-electric/20 disabled:cursor-not-allowed disabled:opacity-60",
  danger:
    "font-semibold inline-flex items-center justify-center gap-2 rounded-base px-5 py-2.5 text-coal-text-inverse bg-status-critical transition duration-200 hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-status-critical/40 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60",
};

function buttonContent(
  props: ButtonProps,
  ref: ForwardedRef<HTMLButtonElement>,
) {
  const {
    className,
    variant = "primary",
    accent = "electric",
    leadingIcon,
    trailingIcon,
    loading,
    children,
    disabled,
    ...rest
  } = props;

  const isPrimary = variant === "primary";

  return (
    <button
      ref={ref}
      className={cn(
        variantClassMap[variant],
        isPrimary ? accentClassMap[accent] : null,
        loading ? "cursor-wait" : null,
        className,
      )}
      disabled={disabled ?? loading}
      data-variant={variant}
      data-accent={accent}
      {...rest}
    >
      {leadingIcon && (
        <span aria-hidden className="grid place-items-center text-current">
          {leadingIcon}
        </span>
      )}
      <span className="flex items-center gap-2 text-inherit">
        {children}
        {loading && (
          <span
            aria-hidden
            className="inline-flex h-3 w-3 animate-spin rounded-full border-2 border-current border-r-transparent"
          />
        )}
      </span>
      {trailingIcon && !loading && (
        <span aria-hidden className="grid place-items-center text-current">
          {trailingIcon}
        </span>
      )}
    </button>
  );
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(buttonContent);
Button.displayName = "Button";
