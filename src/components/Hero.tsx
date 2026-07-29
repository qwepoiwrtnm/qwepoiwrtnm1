import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Users } from "lucide-react";
import { DownloadButton } from "@/components/DownloadButton";
import { PlatformSelector } from "@/components/PlatformSelector";
import { ParticleBackground } from "@/components/ParticleBackground";
import { ProductPreview } from "@/components/ProductPreview";
import { heroContent, media, mockStats } from "@/config/site";

/** MOCK live player counter — preview only, replace with a real endpoint. */
function useMockOnline(base = 2418) {
  const [online, setOnline] = useState(base);
  useEffect(() => {
    const id = window.setInterval(() => {
      setOnline((v) => {
        const drift = Math.round((Math.random() - 0.45) * 26);
        return Math.min(base + 340, Math.max(base - 260, v + drift));
      });
    }, 4200);
    return () => window.clearInterval(id);
  }, [base]);
  return online;
}

export function Hero() {
  const online = useMockOnline();
  const sectionRef = useRef<HTMLElement | null>(null);
  const [pointer, setPointer] = useState({ x: 50, y: 40 });

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      setPointer({
        x: ((event.clientX - rect.left) / rect.width) * 100,
        y: ((event.clientY - rect.top) / rect.height) * 100,
      });
    };
    el.addEventListener("pointermove", onMove);
    return () => el.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <section ref={sectionRef} className="relative isolate overflow-hidden">
      {/* Background media — low-bandwidth friendly image, optional video overlay */}
      <div aria-hidden="true" className="absolute inset-0 -z-20">
        <img
          src={media.heroImage}
          alt=""
          width={1920}
          height={1088}
          fetchPriority="high"
          decoding="async"
          className="size-full object-cover"
        />
        {media.heroVideo ? (
          <video
            className="absolute inset-0 size-full object-cover"
            src={media.heroVideo}
            poster={media.heroImage}
            autoPlay
            muted
            loop
            playsInline
          />
        ) : null}
      </div>

      {/* Cinematic plum + pink overlay and vignette */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,oklch(0.11_0.03_315_/_88%),oklch(0.13_0.04_320_/_78%)_45%,var(--background))]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 transition-[background] duration-500"
        style={{
          background: `radial-gradient(45% 50% at ${pointer.x}% ${pointer.y}%, oklch(0.72 0.24 352 / 22%), transparent 70%)`,
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(120%_90%_at_50%_10%,transparent_35%,oklch(0.08_0.02_315_/_85%))]"
      />
      <ParticleBackground className="-z-10" />

      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 pt-32 pb-20 sm:px-8 sm:pt-40 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14 lg:pb-28">
        <div className="flex min-w-0 flex-col items-start gap-6 animate-rise-in">
          <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-semibold tracking-[0.24em] text-blush uppercase">
            <span aria-hidden="true" className="size-1.5 rounded-full bg-candy" />
            {heroContent.eyebrow}
          </span>

          <h1 className="text-5xl leading-[0.95] font-extrabold text-balance sm:text-6xl lg:text-7xl">
            {heroContent.headlineLead}{" "}
            <span className="text-gradient-candy">{heroContent.headlineAccent}</span>
          </h1>

          <p className="max-w-lg text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg">
            {heroContent.supporting}
          </p>

          <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-start">
            <DownloadButton />
            <Link
              to={heroContent.secondaryCta.to}
              className="glass inline-flex items-center justify-center gap-2 rounded-full px-6 py-4 text-base font-semibold transition-colors hover:bg-[oklch(1_0_0_/_10%)]"
            >
              {heroContent.secondaryCta.label}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>

          <PlatformSelector />

          <p className="text-xs text-muted-foreground">{heroContent.availability}</p>

          <dl className="mt-2 grid w-full grid-cols-3 gap-4 border-t border-border pt-6">
            {mockStats.map((stat) => (
              <div key={stat.label} className="min-w-0">
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-display text-xl font-extrabold sm:text-2xl">{stat.value}</dd>
                <p className="truncate text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
                  {stat.label}
                </p>
              </div>
            ))}
          </dl>

          <p className="inline-flex items-center gap-2 text-xs text-muted-foreground">
            <Users className="size-3.5 text-mint" aria-hidden="true" />
            <span aria-live="polite">
              {online.toLocaleString()} players using Cutie Client right now
            </span>
          </p>
        </div>

        <div className="min-w-0 animate-rise-in [animation-delay:120ms]">
          <ProductPreview />
        </div>
      </div>
    </section>
  );
}
