import { ArrowRight, CheckCircle2, Download } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { DownloadButton } from "@/components/DownloadButton";
import { PlatformSelector } from "@/components/PlatformSelector";
import { ScreenshotGallery } from "@/components/ScreenshotGallery";
import { heroContent, heroStats, media, platforms } from "@/config/site";

/**
 * Centered "command center" hero. Big gallery, bold headline,
 * platform-aware download bar, and a floating stats footer.
 */
export function Hero() {
  return (
    <section className="relative isolate overflow-hidden px-5 pt-28 pb-8 sm:px-8 sm:pt-32 lg:pt-40">
      {/* Background */}
      <div aria-hidden="true" className="absolute inset-0 -z-20">
        <img
          src={media.heroImage}
          alt=""
          width={1920}
          height={1088}
          fetchPriority="high"
          decoding="async"
          className="size-full object-cover opacity-45"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(100%_90%_at_50%_0%,transparent_0%,var(--background)_75%),linear-gradient(180deg,oklch(0.08_0_0_/_40%),var(--background))]"
      />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center text-center">
        {/* Status pill */}
        <span className="inline-flex items-center gap-2 rounded-full border border-candy/30 bg-candy/10 px-3 py-1.5 text-[11px] font-bold tracking-[0.14em] text-candy uppercase">
          <CheckCircle2 className="size-3.5" aria-hidden="true" />
          Latest build v{platforms.windows.version}
        </span>

        {/* Headline */}
        <h1 className="mt-6 max-w-4xl text-[clamp(2.75rem,7vw,5.5rem)] leading-[0.95] font-extrabold tracking-tight text-balance">
          {heroContent.headlineLead}{" "}
          <span className="text-candy">{heroContent.headlineAccent}</span>
        </h1>

        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg">
          {heroContent.supporting}
        </p>

        {/* Download command bar */}
        <div className="mt-8 flex w-full max-w-xl flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <DownloadButton />
          <Link
            to={heroContent.secondaryCta.to}
            className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-border bg-card px-6 py-3.5 text-base font-semibold text-foreground transition-colors hover:bg-secondary active:scale-[0.98] sm:w-auto"
          >
            {heroContent.secondaryCta.label}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>

        <PlatformSelector className="mt-4" />

        {/* Screenshot gallery */}
        <div className="mt-12 w-full max-w-5xl">
          <ScreenshotGallery />
        </div>

        {/* Stats bar */}
        <dl className="mt-10 grid w-full max-w-4xl grid-cols-3 gap-4 rounded-md border border-border bg-card/80 px-4 py-5 sm:px-8">
          {heroStats.map((stat) => (
            <div key={stat.label} className="text-center">
              <dt className="font-display text-2xl font-extrabold text-foreground sm:text-3xl">
                {stat.value}
              </dt>
              <dd className="mt-1 text-[10px] font-bold tracking-[0.12em] text-muted-foreground uppercase sm:text-[11px]">
                {stat.label}
              </dd>
            </div>
          ))}
        </dl>

        <p className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
          <Download className="size-3.5" aria-hidden="true" />
          {heroContent.availability}. No account, no bundled extras.
        </p>
      </div>
    </section>
  );
}
