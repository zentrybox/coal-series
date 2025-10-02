export interface DocNavLink {
  href: string;
  label: string;
  kpi: string;
}

export const docNavLinks: DocNavLink[] = [
  { href: "/overview", label: "Overview", kpi: "Mission & principles" },
  { href: "/guidelines", label: "Guidelines", kpi: "Tokens & motion" },
  { href: "/components", label: "Components", kpi: "UI library" },
  { href: "/patterns", label: "Patterns", kpi: "Workflows" },
  { href: "/get-started", label: "Get Started", kpi: "Install & contribute" }
];
