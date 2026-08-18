import { useRef, useState, type KeyboardEvent } from "react";
import { media } from "@/config/site";
import { GlassPanel } from "@/components/GlassPanel";
import { cn } from "@/lib/utils";

/** Interface gallery. Flat frame, pink active border. */
export function ScreenshotGallery() {
  const shots = media.gallery;
  const [index, setIndex] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const select = (i: number) => {
    const next = (i + shots.length) % shots.length;
    setIndex(next);
    tabRefs.current[next]?.focus();
  };

  const onTablistKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const handlers: Record<string, () => void> = {
      ArrowRight: () => select(index + 1),
      ArrowLeft: () => select(index - 1),
      Home: () => select(0),
      End: () => select(shots.length - 1),
    };
    const handler = handlers[event.key];
    if (handler) {
      event.preventDefault();
      handler();
    }
  };

  return (
    <GlassPanel className="p-3 sm:p-4">
      <figure>
        <div
          id="gallery-image"
          role="tabpanel"
          aria-label={shots[index].label}
          className="relative aspect-16/9 w-full overflow-hidden rounded-md border border-border"
        >
          {shots.map((shot, i) => (
            <img
              key={shot.label}
              src={shot.src}
              alt={i === index ? shot.alt : ""}
              width={1600}
              height={900}
              loading={i === 0 ? "eager" : "lazy"}
              decoding="async"
              aria-hidden={i !== index}
              className={cn(
                "absolute inset-0 size-full object-cover transition-opacity duration-300",
                i === index ? "opacity-100" : "opacity-0",
              )}
            />
          ))}
        </div>
        <figcaption className="mt-3 flex items-baseline justify-between gap-3 px-1 text-sm text-muted-foreground">
          <span>{shots[index].alt}</span>
          <span className="shrink-0 font-mono text-xs tabular-nums">
            {index + 1} / {shots.length}
          </span>
        </figcaption>
      </figure>

      <div
        role="tablist"
        aria-label="Screenshot gallery"
        onKeyDown={onTablistKeyDown}
        className="mt-3 grid grid-cols-3 gap-2 sm:gap-3"
      >
        {shots.map((shot, i) => (
          <button
            key={shot.label}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-controls="gallery-image"
            aria-label={`Show screenshot: ${shot.label}`}
            tabIndex={i === index ? 0 : -1}
            onClick={() => setIndex(i)}
            className={cn(
              "group relative overflow-hidden rounded-md border transition-all duration-200 active:scale-[0.97]",
              i === index
                ? "border-candy"
                : "border-border opacity-60 hover:opacity-100 focus-visible:opacity-100",
            )}
          >
            <img
              src={shot.src}
              alt=""
              width={480}
              height={270}
              loading="lazy"
              decoding="async"
              className="aspect-16/9 w-full object-cover transition-transform duration-200 group-hover:scale-[1.03]"
            />
            <span
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 flex items-center gap-1.5 bg-[linear-gradient(0deg,oklch(0.08_0_0_/_85%),transparent)] px-2.5 pt-8 pb-2 text-left text-xs font-semibold text-foreground"
            >
              <span
                className={cn(
                  "size-1.5 shrink-0 rounded-full",
                  i === index ? "bg-candy" : "bg-muted-foreground",
                )}
              />
              {shot.label}
            </span>
          </button>
        ))}
      </div>
    </GlassPanel>
  );
}
