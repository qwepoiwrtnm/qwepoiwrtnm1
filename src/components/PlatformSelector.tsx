import { PlatformIcon } from "@/components/PlatformIcon";
import { usePlatform } from "@/hooks/use-platform";
import { platforms, type PlatformId } from "@/config/site";
import { cn } from "@/lib/utils";

/** Always-visible manual platform switcher. */
export function PlatformSelector({ className }: { className?: string }) {
  const { active, manual, choose } = usePlatform();

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div
        role="group"
        aria-label="Choose your platform"
        className="inline-flex w-fit gap-1 rounded-md border border-border bg-card p-1"
      >
        {(Object.keys(platforms) as PlatformId[]).map((id) => {
          const selected = active === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => choose(id)}
              aria-pressed={selected}
              className={cn(
                "inline-flex items-center gap-2 rounded-sm px-4 py-2 text-sm font-medium transition-colors",
                selected
                  ? "bg-candy text-black"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <PlatformIcon platform={id} className="size-4" />
              {platforms[id].shortLabel}
            </button>
          );
        })}
      </div>
      <p className="text-xs text-muted-foreground">
        {manual
          ? "Manual selection saved on this device."
          : "Auto-detected from your browser — switch any time."}
      </p>
    </div>
  );
}
