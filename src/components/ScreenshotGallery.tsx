import { useState } from "react";
import { media } from "@/config/site";
import { GlassPanel } from "@/components/GlassPanel";
import { cn } from "@/lib/utils";

/** Interface gallery. PLACEHOLDER captures — replace before production. */
export function ScreenshotGallery() {
  const [index, setIndex] = useState(0);
  const shots = media.gallery;
  const active = shots[index];

  return (
    <GlassPanel className="p-3 sm:p-4">
      <figure>
        <img
          src={active.src}
          alt={active.alt}
          width={1600}
          height={900}
          loading="lazy"
          decoding="async"
          className="aspect-16/9 w-full rounded-2xl border border-border object-cover"
        />
        <figcaption className="mt-3 px-1 text-sm text-muted-foreground">{active.alt}</figcaption>
      </figure>

      <div role="tablist" aria-label="Screenshot gallery" className="mt-3 flex flex-wrap gap-2">
        {shots.map((shot, i) => (
          <button
            key={shot.label}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-controls="gallery-image"
            onClick={() => setIndex(i)}
            className={cn(
              "min-h-11 rounded-full border px-4 text-sm font-medium transition-colors",
              i === index
                ? "border-primary bg-[image:var(--gradient-candy)] text-primary-foreground"
                : "border-border text-muted-foreground hover:text-foreground",
            )}
          >
            {shot.label}
          </button>
        ))}
      </div>
    </GlassPanel>
  );
}
