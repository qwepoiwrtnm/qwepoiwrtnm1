import {
  Gauge,
  LayoutDashboard,
  Palette,
  Wand2,
  Sparkles,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { features, highlights } from "@/config/site";
import { GlassPanel } from "@/components/GlassPanel";
import { cn } from "@/lib/utils";

const icons: Record<string, LucideIcon> = {
  Gauge,
  LayoutDashboard,
  Palette,
  Wand2,
  Sparkles,
  ShieldCheck,
};

/** Bento grid: one wide spotlight card plus varied supporting cards. */
export function FeatureGrid({ className }: { className?: string }) {
  return (
    <div className={cn("grid gap-4 md:grid-cols-2 lg:grid-cols-3", className)}>
      {features.map((feature, index) => {
        const Icon = icons[feature.icon] ?? Sparkles;
        const wide = feature.span === "wide";
        return (
          <GlassPanel
            key={feature.title}
            as="article"
            className={cn(
              "group flex flex-col gap-3 p-6 transition-transform duration-300 hover:-translate-y-1",
              wide && "md:col-span-2 lg:col-span-2 lg:row-span-1",
            )}
          >
            {wide ? (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-24 -right-16 size-64 rounded-full bg-[radial-gradient(circle,oklch(0.7_0.24_352_/_28%),transparent_70%)]"
              />
            ) : null}
            <span className="grid size-11 place-items-center rounded-2xl border border-border bg-[oklch(1_0_0_/_6%)] text-blush">
              <Icon className="size-5" aria-hidden="true" />
            </span>
            <h3
              className={cn(
                "font-display font-bold",
                wide ? "text-2xl sm:text-3xl" : "text-lg",
              )}
            >
              {feature.title}
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
            {feature.metric ? (
              <span className="mt-auto w-fit rounded-full border border-border bg-[oklch(1_0_0_/_5%)] px-3 py-1 text-xs font-semibold text-blush">
                {feature.metric}
              </span>
            ) : null}
            {index === 0 ? (
              <dl className="mt-2 grid grid-cols-3 gap-3 border-t border-border pt-4">
                {highlights.map((h) => (
                  <div key={h.label} className="min-w-0">
                    <dt className="sr-only">{h.label}</dt>
                    <dd className="font-display text-lg font-extrabold text-foreground">{h.value}</dd>
                    <p className="truncate text-[11px] text-muted-foreground">{h.label}</p>
                  </div>
                ))}
              </dl>
            ) : null}
          </GlassPanel>
        );
      })}
    </div>
  );
}
