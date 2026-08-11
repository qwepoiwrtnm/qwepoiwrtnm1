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
    className: "text-mint border-[oklch(0.83_0.14_165_/_35%)] bg-[oklch(0.83_0.14_165_/_10%)]",
  },
  degraded: {
    label: "Degraded performance",
    icon: AlertTriangle,
    className: "text-amber-status border-[oklch(0.83_0.15_80_/_35%)] bg-[oklch(0.83_0.15_80_/_10%)]",
  },
  outage: {
    label: "Outage",
    icon: XCircle,
    className: "text-destructive border-[oklch(0.62_0.21_20_/_40%)] bg-[oklch(0.62_0.21_20_/_12%)]",
  },
  maintenance: {
    label: "Maintenance",
    icon: Wrench,
    className: "text-lavender border-[oklch(0.78_0.09_305_/_35%)] bg-[oklch(0.78_0.09_305_/_10%)]",
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
