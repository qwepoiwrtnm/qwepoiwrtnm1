import { useCallback, useEffect, useState } from "react";
import type { PlatformId } from "@/config/site";

const STORAGE_KEY = "cutie-client:platform";

export type DetectedPlatform = PlatformId | "unknown";

/** Real client-side OS detection with a safe SSR-stable fallback. */
function detect(): DetectedPlatform {
  if (typeof navigator === "undefined") return "unknown";

  // Modern, high-entropy hint where available.
  const uaData = (navigator as Navigator & { userAgentData?: { platform?: string } })
    .userAgentData;
  const raw = (uaData?.platform || navigator.platform || navigator.userAgent || "").toLowerCase();

  if (raw.includes("win")) return "windows";
  if (raw.includes("mac") || raw.includes("darwin")) return "macos";
  // iPadOS reports as Mac with touch points; treat as unknown desktop target.
  if (raw.includes("iphone") || raw.includes("ipad") || raw.includes("android")) return "unknown";
  return "unknown";
}

export function usePlatform() {
  // Always start "unknown" so server and first client render match (no hydration mismatch).
  const [detected, setDetected] = useState<DetectedPlatform>("unknown");
  const [manual, setManual] = useState<PlatformId | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = window.localStorage.getItem(STORAGE_KEY);
    } catch {
      stored = null;
    }
    if (stored === "windows" || stored === "macos") setManual(stored);
    setDetected(detect());
    setReady(true);
  }, []);

  const choose = useCallback((platform: PlatformId) => {
    setManual(platform);
    try {
      window.localStorage.setItem(STORAGE_KEY, platform);
    } catch {
      /* storage unavailable — selection stays in memory */
    }
  }, []);

  // A manual selection always overrides automatic detection.
  const active: DetectedPlatform = manual ?? detected;

  return { active, detected, manual, choose, ready };
}
