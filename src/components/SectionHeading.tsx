import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
  as?: "h2" | "h3";
  id?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
  as: Tag = "h2",
  id,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex max-w-2xl flex-col gap-4",
        align === "center" ? "mx-auto items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow ? (
        <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.24em] text-candy uppercase">
          <span aria-hidden="true" className="size-1.5 rounded-full bg-candy" />
          {eyebrow}
        </span>
      ) : null}
      <Tag id={id} className="text-3xl font-bold text-balance sm:text-4xl md:text-5xl">
        {title}
      </Tag>
      {description ? (
        <p className="text-base leading-relaxed text-muted-foreground text-pretty sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
