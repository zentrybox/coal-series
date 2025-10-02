import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { SidebarNav } from "./components/sidebar-nav";
import { docNavLinks } from "../nav-links";

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-plex-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-plex-mono",
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Coal Series Design System",
  description:
    "Coal Series is a cybersecurity-focused design system by zentrybox, inspired by IBM's Carbon principles.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${plexSans.variable} ${plexMono.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-coal-bg text-coal-text-primary">
        <div className="grid min-h-screen lg:grid-cols-[320px_minmax(0,1fr)]">
          <SidebarNav />
          <div className="flex flex-col">
            <header className="sticky top-0 z-40 border-b border-coal-border bg-coal-bg/80 backdrop-blur lg:hidden">
              <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-4">
                <div>
                  <p className="text-body-sm uppercase tracking-[0.32em] text-coal-text-muted">
                    Coal Series
                  </p>
                  <h1 className="text-h3 font-semibold text-coal-text-primary">Design System</h1>
                </div>
                <Link
                  href="https://github.com/zentrybox/coal-series"
                  className="text-body-sm text-coal-accent-electric hover:underline"
                >
                  GitHub
                </Link>
              </div>
              <nav className="mx-auto flex w-full max-w-5xl gap-2 overflow-x-auto px-6 pb-4">
                {docNavLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-base border border-transparent px-4 py-2 text-body-sm text-coal-text-secondary transition-colors hover:border-coal-border hover:text-coal-text-primary"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </header>
            <main>{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
