import { Link } from "@tanstack/react-router";
import { brand } from "@/config/site";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  /** Renders as a plain block (no link) when false. */
  asLink?: boolean;
}

export function Logo({ className, asLink = true }: LogoProps) {
  const content = (
    <span className={cn("group inline-flex items-center gap-2.5", className)}>
      {/* Shape kept; colors inverted: black mark on pink badge, pink heart */}
      <span
        aria-hidden="true"
        className="grid size-9 shrink-0 place-items-center rounded-md bg-candy text-black transition-transform duration-200 group-hover:scale-105"
      >
        <svg viewBox="0 0 24 24" className="size-5" fill="currentColor" role="presentation">
          <path d="M12 20.5s-7.5-4.6-7.5-9.6A4.4 4.4 0 0 1 12 8.1a4.4 4.4 0 0 1 7.5 2.8c0 5-7.5 9.6-7.5 9.6Z" />
          <path d="M4.4 3.5 7 7.2 3.2 7 ZM19.6 3.5 17 7.2 20.8 7 Z" />
        </svg>
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-lg font-extrabold tracking-tight">
          {brand.name} <span className="text-candy">{brand.nameSuffix}</span>
        </span>
        <span className="text-[10px] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
          Minecraft client
        </span>
      </span>
    </span>
  );

  if (!asLink) return content;

  return (
    <Link to="/" aria-label={`${brand.fullName} — home`} className="rounded-md">
      {content}
    </Link>
  );
}
