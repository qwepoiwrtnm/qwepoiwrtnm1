import { useEffect, useRef } from "react";

const GLYPHS = ["\u2665", "\u2726", "\u2665", "\u2727"]; // ♥ ✦ ♥ ✧
const COLORS = [
  "oklch(0.7 0.24 352)", // candy
  "oklch(0.86 0.07 350)", // blush
  "oklch(0.78 0.09 305)", // lavender
  "oklch(0.83 0.14 165)", // mint
];
const MAX_PARTICLES = 36;

/**
 * Tiny heart/sparkle burst wherever the user clicks. Purely decorative:
 * pointer-events-none overlay, hidden from assistive tech, disabled under
 * reduced-motion. Uses the Web Animations API so cleanup is automatic.
 */
export function ClickSparkles() {
  const layerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onPointerDown = (event: PointerEvent) => {
      if (event.button !== 0) return;
      if (layer.childElementCount > MAX_PARTICLES) return;

      const count = 6;
      for (let i = 0; i < count; i++) {
        const particle = document.createElement("span");
        particle.textContent = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        const size = 9 + Math.random() * 7;
        const color = COLORS[Math.floor(Math.random() * COLORS.length)];
        particle.style.cssText = `position:fixed;left:${event.clientX}px;top:${event.clientY}px;font-size:${size}px;color:${color};line-height:1;text-shadow:0 0 8px ${color};will-change:transform,opacity;`;
        layer.appendChild(particle);

        const angle = Math.random() * Math.PI * 2;
        const distance = 22 + Math.random() * 26;
        const dx = Math.cos(angle) * distance;
        const dy = Math.sin(angle) * distance - 16;
        const rotate = (Math.random() - 0.5) * 90;

        const animation = particle.animate(
          [
            { transform: "translate(-50%, -50%) scale(0.4) rotate(0deg)", opacity: 1 },
            {
              transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) scale(1) rotate(${rotate}deg)`,
              opacity: 0,
            },
          ],
          { duration: 520 + Math.random() * 220, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
        );
        animation.onfinish = () => particle.remove();
      }
    };

    window.addEventListener("pointerdown", onPointerDown);
    return () => window.removeEventListener("pointerdown", onPointerDown);
  }, []);

  return (
    <div
      ref={layerRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[80]"
    />
  );
}
