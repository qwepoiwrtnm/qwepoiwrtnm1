import { useEffect, useState } from "react";
import { GlassPanel } from "@/components/GlassPanel";
import { brand, media, platforms, previewBenefits } from "@/config/site";

/**
 * Desktop-app style preview card. Flat surface, no float animation.
 */
export function ProductPreview({ id }: { id?: string }) {
  const [reducedMotion, setReducedMotion] = useState<boolean | null>(null);

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const showFootage = Boolean(media.previewVideo) && reducedMotion !== null;

  return (
    <GlassPanel className="p-3 sm:p-4" as="section">
      <div className="flex items-center gap-2 px-2 pt-1 pb-3">
        <span aria-hidden="true" className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-muted-foreground/40" />
          <span className="size-2.5 rounded-full bg-muted-foreground/40" />
          <span className="size-2.5 rounded-full bg-candy/60" />
        </span>
        <p className="ml-auto truncate text-[11px] text-muted-foreground">
          {brand.fullName} • v{platforms.windows.version} • Blossom theme
        </p>
      </div>

      <figure className="relative overflow-hidden rounded-md border border-border">
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
        <figcaption className="absolute bottom-3 left-3 rounded-sm bg-black/80 px-3 py-1.5 text-[11px] text-foreground">
          {media.previewCaption}
        </figcaption>
      </figure>

      <ul className="mt-3 grid gap-2 sm:grid-cols-3">
        {previewBenefits.map((benefit) => (
          <li
            key={benefit.title}
            className="rounded-md border border-border bg-secondary px-3.5 py-3"
          >
            <p className="text-sm font-semibold">{benefit.title}</p>
            <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{benefit.body}</p>
          </li>
        ))}
      </ul>
    </GlassPanel>
  );
}
