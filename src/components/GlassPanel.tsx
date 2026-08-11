import { cn } from "@/lib/utils";
import type { HTMLAttributes, ReactNode } from "react";

interface GlassPanelProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  className?: string;
  /** Adds the soft inner top highlight used across the liquid-glass surfaces. */
  highlight?: boolean;
  as?: "div" | "section" | "article" | "aside";
}

export function GlassPanel({
  children,
  className,
  highlight = true,
  as: Tag = "div",
  ...rest
}: GlassPanelProps) {
  return (
    <Tag
      {...rest}
      className={cn(
        "glass relative overflow-hidden rounded-3xl",
        highlight &&
          "before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-24 before:bg-[image:var(--glass-highlight)]",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
