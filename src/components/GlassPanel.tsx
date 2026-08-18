import { cn } from "@/lib/utils";
import type { HTMLAttributes, ReactNode } from "react";

interface GlassPanelProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  className?: string;
  /** Kept for API compat — no longer renders a highlight. */
  highlight?: boolean;
  as?: "div" | "section" | "article" | "aside";
}

/**
 * Flat surface panel. Kept the `GlassPanel` name for import compatibility,
 * but it now renders a solid card with a thin border — no glass, no blur.
 */
export function GlassPanel({
  children,
  className,
  highlight = false,
  as: Tag = "div",
  ...rest
}: GlassPanelProps) {
  return (
    <Tag
      {...rest}
      className={cn("surface rounded-md", className)}
    >
      {children}
    </Tag>
  );
}
