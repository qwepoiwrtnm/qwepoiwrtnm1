import { CheckCircle2, AlertTriangle, XCircle, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";

export type ServiceStatus = "operational" | "degraded" | "outage" | "maintenance";

const meta: Record<
  ServiceStatus,
  { label: string; icon: typeof CheckCircle2; className: string }
> = {
  operational: {
    label: "Operational",
    icon: CheckCircle2,
    className: "text-candy border-candy/30 bg-candy/10",
  },
  degraded: {
    label: "Degraded performance",
    icon: AlertTriangle,
    className: "text-amber-status border-amber-status/30 bg-amber-status/10",
  },
  outage: {
    label: "Outage",
    icon: XCircle,
    className: "text-destructive border-destructive/30 bg-destructive/10",
  },
  maintenance: {
    label: "Maintenance",
    icon: Wrench,
    className: "text-muted-foreground border-border bg-secondary",
  },
};

/** Status is conveyed by icon + text, never by color alone. */
export function StatusBadge({
  status,
  className,
}: {
  status: ServiceStatus;
  className?: string;
}) {
  const { label, icon: Icon, className: tone } = meta[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold",
        tone,
        className,
      )}
    >
      <Icon className="size-3.5" aria-hidden="true" />
      {label}
    </span>
  );
}
