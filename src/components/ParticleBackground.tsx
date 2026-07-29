import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

interface ParticleBackgroundProps {
  className?: string;
  /** Desktop particle count; mobile automatically uses roughly a third. */
  count?: number;
}

/**
 * Sparse glowing particles. Purely decorative: rendered client-side only,
 * hidden from assistive tech, disabled entirely under reduced-motion.
 */
export function ParticleBackground({ className, count = 28 }: ParticleBackgroundProps) {
  const [enabled, setEnabled] = useState(false);
  const [density, setDensity] = useState(count);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.matchMedia("(max-width: 768px)").matches;
    setDensity(small ? Math.round(count / 3) : count);
    setEnabled(!reduce);
  }, [count]);

  const particles = useMemo(
    () =>
      Array.from({ length: density }, (_, i) => ({
        id: i,
        left: (i * 37) % 100,
        size: 2 + ((i * 13) % 4),
        delay: (i * 0.83) % 12,
        duration: 12 + ((i * 7) % 10),
        opacity: 0.25 + ((i * 11) % 5) / 12,
      })),
    [density],
  );

  if (!enabled) return null;

  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute bottom-0 rounded-full bg-blush"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            boxShadow: "0 0 10px 2px oklch(0.86 0.07 350 / 45%)",
            animation: `particle-drift ${p.duration}s linear ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
