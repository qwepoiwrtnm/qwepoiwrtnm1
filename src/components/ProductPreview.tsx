import { useEffect, useState } from "react";
import { GlassPanel } from "@/components/GlassPanel";
import { brand, media, platforms, previewBenefits } from "@/config/site";

/**
 * Premium desktop-app style preview card.
 * Media comes from `media.previewImage` / `media.previewVideo` in the central
 * config. The video renders client-side only and is skipped under
 * reduced-motion, so the image remains the SSR and accessibility fallback.
 */
export function ProductPreview({ id }: { id?: string }) {
  /** null until hydrated — the image is the SSR fallback. */
  const [reducedMotion, setReducedMotion] = useState<boolean | null>(null);

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const showFootage = Boolean(media.previewVideo) && reducedMotion !== null;

  return (
    <GlassPanel className="p-3 sm:p-4" as="section">
      <div className="flex items-center gap-2 px-2 pt-1 pb-3">
        <span aria-hidden="true" className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-rose" />
          <span className="size-2.5 rounded-full bg-amber-status" />
          <span className="size-2.5 rounded-full bg-mint" />
        </span>
        <p className="ml-auto truncate text-[11px] text-muted-foreground">
          {brand.fullName} • v{platforms.windows.version} • Blossom theme
        </p>
      </div>

      <figure className="relative overflow-hidden rounded-2xl border border-border">
        {showFootage ? (
          <video
            id={id}
            src={media.previewVideo}
            poster={media.previewImage}
            autoPlay={!reducedMotion}
            controls={reducedMotion === true}
            muted
            loop
            playsInline
            aria-label="Cutie Client running in Minecraft with a pastel HUD, minimap and chat overlay"
            className="aspect-16/9 w-full object-cover"
          />
        ) : (
          <img
            id={id}
            src={media.previewImage}
            alt="Cutie Client running in Minecraft with a pastel HUD, minimap and chat overlay"
            width={1600}
            height={912}
            loading="lazy"
            decoding="async"
            className="aspect-16/9 w-full object-cover"
          />
        )}
        <figcaption className="absolute bottom-3 left-3 rounded-full bg-[oklch(0.12_0.03_315_/_80%)] px-3 py-1.5 text-[11px] text-foreground backdrop-blur-md">
          {media.previewCaption}
        </figcaption>
      </figure>

      <ul className="mt-3 grid gap-2 sm:grid-cols-3">
        {previewBenefits.map((benefit) => (
          <li
            key={benefit.title}
            className="rounded-2xl border border-border bg-[oklch(1_0_0_/_4%)] px-3.5 py-3"
          >
            <p className="text-sm font-semibold">{benefit.title}</p>
            <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{benefit.body}</p>
          </li>
        ))}
      </ul>
    </GlassPanel>
  );
}
