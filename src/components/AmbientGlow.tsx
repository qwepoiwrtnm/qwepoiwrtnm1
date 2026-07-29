import { cn } from "@/lib/utils";

interface AmbientGlowProps {
  className?: string;
}

/** Decorative slow-moving ambient gradient. Hidden from assistive tech. */
export function AmbientGlow({ className }: AmbientGlowProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 ambient-layer animate-ambient",
        className,
      )}
    />
  );
}
