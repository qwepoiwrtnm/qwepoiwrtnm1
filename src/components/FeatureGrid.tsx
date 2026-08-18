import { Link } from "@tanstack/react-router";
import { Download, Puzzle, Zap, Monitor, ArrowRight, type LucideIcon } from "lucide-react";
import { lunarFeatures } from "@/config/site";
import { cn } from "@/lib/utils";

const icons: Record<string, LucideIcon> = {
  Download,
  Puzzle,
  Zap,
  Monitor,
};

/** Four big feature cards. Flat surfaces, pink accent on hover. */
export function FeatureGrid({ className }: { className?: string }) {
  return (
    <div className={cn("grid gap-4 sm:grid-cols-2", className)}>
      {lunarFeatures.map((feature) => {
        const Icon = icons[feature.icon] ?? Download;
        return (
          <Link
            key={feature.title}
            to={feature.to}
            className="group relative isolate block overflow-hidden rounded-md border border-border bg-card p-6 transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-candy/50 sm:p-8"
          >
            <div className="flex h-full min-h-[180px] flex-col justify-between sm:min-h-[220px]">
              <div className="flex items-start justify-between">
                <span className="grid size-12 place-items-center rounded-md border border-border bg-secondary text-muted-foreground transition-colors duration-200 group-hover:border-candy/40 group-hover:text-candy sm:size-14">
                  <Icon className="size-6 sm:size-7" aria-hidden="true" />
                </span>
                <ArrowRight
                  className="size-5 -rotate-45 text-muted-foreground transition-transform duration-200 group-hover:rotate-0 group-hover:text-candy"
                  aria-hidden="true"
                />
              </div>
              <div className="mt-6">
                <p className="text-[11px] font-bold tracking-[0.18em] text-candy uppercase">
                  {feature.eyebrow}
                </p>
                <h3 className="mt-1 font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                  {feature.title}
                </h3>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
