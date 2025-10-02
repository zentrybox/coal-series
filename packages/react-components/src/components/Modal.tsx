import type { HTMLAttributes, ReactNode } from "react";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { cn } from "../lib/cn";

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onClose?: () => void;
  heading?: ReactNode;
  description?: ReactNode;
  footer?: ReactNode;
}

export function Modal({
  open,
  onClose,
  heading,
  description,
  footer,
  className,
  children,
  ...props
}: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => {
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div
      role="presentation"
      aria-hidden={!open}
      className="fixed inset-0 z-50 grid place-items-center bg-black/70 backdrop-blur"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose?.();
        }
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal
  aria-labelledby={heading ? "coal-modal-title" : undefined}
        aria-describedby={description ? "coal-modal-description" : undefined}
        className={cn(
          "coal-card w-full max-w-xl border border-coal-border bg-coal-surface shadow-coal-elevated",
          className,
        )}
        {...props}
      >
        <div className="px-6 py-5">
          {heading && (
            <h2 id="coal-modal-title" className="text-h2 font-semibold text-coal-text-primary">
              {heading}
            </h2>
          )}
          {description && (
            <p id="coal-modal-description" className="mt-2 text-body text-coal-text-secondary">
              {description}
            </p>
          )}
          <div className="mt-6 text-body text-coal-text-primary">{children}</div>
        </div>
        {footer && (
          <div className="flex items-center justify-end gap-3 border-t border-coal-border px-6 py-4">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}
