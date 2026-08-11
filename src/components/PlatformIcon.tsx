import type { PlatformId } from "@/config/site";
import { cn } from "@/lib/utils";

export function PlatformIcon({
  platform,
  className,
}: {
  platform: PlatformId;
  className?: string;
}) {
  if (platform === "windows") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" role="presentation" aria-hidden="true" className={cn("size-5", className)}>
        <path d="M3 5.6 10.3 4.6v6.7H3Zm0 12.8 7.3 1v-6.6H3ZM11.4 4.4 21 3v8.3h-9.6Zm0 15.2L21 21v-8.3h-9.6Z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" role="presentation" aria-hidden="true" className={cn("size-5", className)}>
      <path d="M16.4 12.6c0-2.2 1.8-3.3 1.9-3.4-1-1.5-2.6-1.7-3.2-1.7-1.4-.1-2.7.8-3.3.8-.7 0-1.7-.8-2.8-.8-1.5 0-2.8.8-3.5 2.1-1.5 2.6-.4 6.5 1.1 8.6.7 1 1.6 2.2 2.7 2.1 1.1 0 1.5-.7 2.8-.7s1.6.7 2.8.7c1.2 0 1.9-1 2.6-2a9 9 0 0 0 1.2-2.4c-.1 0-2.3-.9-2.3-3.3ZM14.3 5.5c.6-.7 1-1.7.9-2.7-.9 0-2 .6-2.6 1.3-.6.6-1.1 1.7-.9 2.7 1 .1 2-.5 2.6-1.3Z" />
    </svg>
  );
}
