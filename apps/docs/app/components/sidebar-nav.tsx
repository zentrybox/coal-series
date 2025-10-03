"use client";

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { docNavLinks } from "../../nav-links";

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <aside className="hidden min-h-screen flex-col border-r border-coal-border bg-coal-bg-alt px-6 py-10 lg:flex">
      <div className="flex flex-col gap-1">
        <span className="text-body-sm uppercase tracking-[0.32em] text-coal-text-muted">
          Coal Series
        </span>
        <h1 className="text-h2 font-semibold text-coal-text-primary">Design system</h1>
        <p className="text-body-sm text-coal-text-secondary">
          Mission-critical UI guidance for security operations teams.
        </p>
      </div>

      <nav className="mt-8 flex flex-col gap-2">
        {docNavLinks.map((link) => {
          const active = pathname === link.href || pathname?.startsWith(`${link.href}/`);
          return (
            <Link
              key={link.href}
              href={link.href}
              className="coal-nav-item flex-col items-start"
              data-active={active ? "true" : undefined}
            >
              <span className="text-body-sm font-semibold text-coal-text-primary">
                {link.label}
              </span>
              <span className="text-[0.75rem] font-medium text-coal-text-muted">{link.kpi}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto space-y-2 rounded-base border border-coal-border bg-coal-surface px-4 py-3 text-body-sm text-coal-text-muted">
        <p>
          Maintained by <span className="text-coal-text-secondary">zentrybox</span>
        </p>
        <p>Coal Series version 0.1.0 · MIT license</p>
      </div>
    </aside>
  );
}
