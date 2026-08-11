import type { MouseEvent } from "react";

/**
 * Tracks the cursor inside a card so a CSS radial highlight can follow it.
 * Pair with an overlay using:
 * `radial-gradient(220px circle at var(--mx, 50%) var(--my, 50%), ...)`
 */
export function trackGlow(event: MouseEvent<HTMLElement>) {
  const el = event.currentTarget;
  const rect = el.getBoundingClientRect();
  el.style.setProperty("--mx", `${event.clientX - rect.left}px`);
  el.style.setProperty("--my", `${event.clientY - rect.top}px`);
}
