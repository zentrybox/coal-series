"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sidebar, SidebarItem, SidebarSection } from "@coal-series/react";
import { docNavLinks } from "../../nav-links";

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <Sidebar
      className="hidden border-r border-coal-border bg-coal-bg-alt lg:flex"
      title="Coal Series"
      caption="Design system"
    >
      <SidebarSection className="mt-4">
        {docNavLinks.map((link) => {
          const active = pathname === link.href || pathname?.startsWith(`${link.href}/`);
          return (
            <SidebarItem key={link.href} asChild active={active}>
              <Link href={link.href} className="flex w-full flex-col text-left">
                <span className="text-body-sm font-semibold text-coal-text-primary">
                  {link.label}
                </span>
                <span className="text-[0.75rem] font-medium text-coal-text-muted">
                  {link.kpi}
                </span>
              </Link>
            </SidebarItem>
          );
        })}
      </SidebarSection>
      <div className="mt-auto text-body-sm text-coal-text-muted">
        <p>
          Maintained by <span className="text-coal-text-secondary">zentrybox</span> · MIT
        </p>
        <p>Coal Series version 0.1.0</p>
      </div>
    </Sidebar>
  );
}
