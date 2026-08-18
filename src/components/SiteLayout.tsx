import type { ReactNode } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { media } from "@/config/site";

/** Shared page chrome: skip link, nav, single <main>, footer. */
export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-dvh flex-col overflow-x-hidden">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-md focus:bg-primary focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-primary-foreground"
      >
        Skip to content
      </a>
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
    <section className="relative isolate overflow-hidden border-b border-border px-5 pt-32 pb-14 sm:px-8 sm:pt-40">
      <div aria-hidden="true" className="absolute inset-0 -z-20">
        <img
          src={media.heroImage}
          alt=""
          width={1920}
          height={1088}
          decoding="async"
          className="size-full object-cover object-[50%_30%] opacity-20"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,oklch(0.08_0_0_/_92%),oklch(0.08_0_0_/_88%)_55%,var(--background))]"
      />
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-5 text-center animate-rise-in">
        {eyebrow ? (
          <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.24em] text-candy uppercase">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-candy" />
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
