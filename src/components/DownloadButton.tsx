import { useState } from "react";
import { Download, ChevronDown, AlertTriangle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PlatformIcon } from "@/components/PlatformIcon";
import { usePlatform } from "@/hooks/use-platform";
import { platforms, type PlatformId } from "@/config/site";
import { cn } from "@/lib/utils";
import { DownloadConfirmation } from "@/components/DownloadConfirmation";

interface DownloadButtonProps {
  size?: "lg" | "md";
  className?: string;
  /** Shows the confirmation panel after a successful click. */
  withConfirmation?: boolean;
}

export function DownloadButton({
  size = "lg",
  className,
  withConfirmation = true,
}: DownloadButtonProps) {
  const { active, choose, ready } = usePlatform();
  const [chooserOpen, setChooserOpen] = useState(false);
  const [confirmed, setConfirmed] = useState<PlatformId | null>(null);

  const known = active !== "unknown";
  const config = known ? platforms[active] : null;
  const missingUrl = Boolean(config && !config.url);

  function start(platform: PlatformId) {
    const target = platforms[platform];
    if (!target.url) return;
    // Explicit, trusted URL from configuration only.
    window.location.assign(target.url);
    if (withConfirmation) setConfirmed(platform);
  }

  function handleClick() {
    if (!known) {
      setChooserOpen(true);
      return;
    }
    if (missingUrl) return;
    start(active);
  }

  const label = config ? config.label : "Choose your download";

  return (
    <div className={cn("flex flex-col items-start gap-3", className)}>
      <button
        type="button"
        onClick={handleClick}
        aria-haspopup={known ? undefined : "dialog"}
        aria-disabled={missingUrl || undefined}
        className={cn(
          "group relative inline-flex w-full items-center justify-center gap-3 overflow-hidden rounded-full",
          "bg-[image:var(--gradient-candy)] font-semibold text-primary-foreground",
          "border border-[oklch(1_0_0_/_30%)] shadow-[var(--shadow-glow)]",
          "transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_70px_-16px_oklch(0.68_0.22_350_/_75%)]",
          "active:translate-y-0 active:scale-[0.98] active:brightness-95 sm:w-auto",
          missingUrl && "cursor-not-allowed opacity-70 hover:translate-y-0",
          size === "lg" ? "px-8 py-4 text-base sm:text-lg" : "px-6 py-3 text-sm",
        )}
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-[linear-gradient(90deg,transparent,oklch(1_0_0_/_35%),transparent)] opacity-0 group-hover:opacity-100 group-hover:[animation:shine_1.1s_ease-out]"
        />
        {known ? <PlatformIcon platform={active} className="size-5 shrink-0" /> : <Download className="size-5 shrink-0" />}
        <span className="truncate">{ready ? label : "Download Cutie Client"}</span>
        {config?.version ? (
          <span className="hidden shrink-0 rounded-full bg-[oklch(1_0_0_/_18%)] px-2 py-0.5 text-xs font-medium sm:inline">
            v{config.version}
          </span>
        ) : null}
        {!known ? <ChevronDown className="size-4 shrink-0" aria-hidden="true" /> : null}
      </button>

      {missingUrl ? (
        <p className="flex items-start gap-2 text-xs text-amber-status">
          <AlertTriangle className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
          <span>
            Development mode: no installer URL configured. Set{" "}
            <code className="font-mono">
              VITE_{active === "windows" ? "WINDOWS" : "MACOS"}_DOWNLOAD_URL
            </code>{" "}
            in your environment.
          </span>
        </p>
      ) : null}

      <Dialog open={chooserOpen} onOpenChange={setChooserOpen}>
        <DialogContent className="glass-strong max-w-md rounded-3xl">
          <DialogHeader>
            <DialogTitle>Choose your download</DialogTitle>
            <DialogDescription>
              We couldn't detect your operating system. Pick a platform — we'll remember it.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-3">
            {(Object.keys(platforms) as PlatformId[]).map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => {
                  choose(id);
                  setChooserOpen(false);
                  start(id);
                }}
                className="flex items-center gap-3 rounded-2xl border border-border bg-secondary/50 px-4 py-3 text-left transition-colors hover:bg-accent"
              >
                <PlatformIcon platform={id} className="size-5 text-blush" />
                <span className="flex-1">
                  <span className="block font-semibold">{platforms[id].shortLabel}</span>
                  <span className="block text-xs text-muted-foreground">
                    v{platforms[id].version} · {platforms[id].fileSize} ·{" "}
                    {platforms[id].architectures.join(" / ")}
                  </span>
                </span>
                <Download className="size-4 text-muted-foreground" aria-hidden="true" />
              </button>
            ))}
          </div>
          {(Object.keys(platforms) as PlatformId[]).some((id) => !platforms[id].url) ? (
            <p className="text-xs text-amber-status">
              Some installer URLs are not configured yet in this environment.
            </p>
          ) : null}
        </DialogContent>
      </Dialog>

      {confirmed ? (
        <DownloadConfirmation platform={confirmed} onClose={() => setConfirmed(null)} />
      ) : null}
    </div>
  );
}
