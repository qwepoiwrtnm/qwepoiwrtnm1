import { Link } from "@tanstack/react-router";
import { X, CheckCircle2 } from "lucide-react";
import { platforms, type PlatformId } from "@/config/site";
import { GlassPanel } from "@/components/GlassPanel";

/** Lightweight panel shown after an intentional download click. */
export function DownloadConfirmation({
  platform,
  onClose,
}: {
  platform: PlatformId;
  onClose: () => void;
}) {
  const config = platforms[platform];
  const other = platform === "windows" ? platforms.macos : platforms.windows;

  return (
    <GlassPanel className="w-full max-w-md p-5" as="aside">
      <div className="flex items-start gap-3">
        <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-candy" aria-hidden="true" />
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-base font-bold">Download started</h3>
          <ol className="mt-2 space-y-1 text-sm text-muted-foreground">
            {config.install.map((step) => (
              <li key={step}>• {step}</li>
            ))}
          </ol>
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm">
            <Link to="/support" className="text-candy underline underline-offset-4">
              Troubleshooting
            </Link>
            <Link to="/downloads" className="text-candy underline underline-offset-4">
              Get the {other.shortLabel} build
            </Link>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Dismiss download confirmation"
          className="rounded-sm p-1 text-muted-foreground transition-colors hover:text-foreground"
        >
          <X className="size-4" aria-hidden="true" />
        </button>
      </div>
    </GlassPanel>
  );
}
