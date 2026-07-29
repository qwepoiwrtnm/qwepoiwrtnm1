import type { ReactNode } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AmbientGlow } from "@/components/AmbientGlow";

/** Shared page chrome: skip link, nav, single <main>, footer. */
export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-dvh flex-col overflow-x-hidden">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-full focus:bg-primary focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <AmbientGlow className="fixed" />
      <Navbar />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}

/** Standard inner page header used by every non-home route. */
export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative px-5 pt-32 pb-12 sm:px-8 sm:pt-40">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-5 text-center">
        {eyebrow ? (
          <span className="glass rounded-full px-4 py-1.5 text-xs font-semibold tracking-[0.24em] text-blush uppercase">
            {eyebrow}
          </span>
        ) : null}
        <h1 className="text-4xl font-extrabold text-balance sm:text-5xl md:text-6xl">{title}</h1>
        {description ? (
          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg">
            {description}
          </p>
        ) : null}
        {children}
      </div>
    </section>
  );
}
