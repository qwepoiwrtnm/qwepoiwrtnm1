import { useCallback, useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";
import { GlassPanel } from "@/components/GlassPanel";
import { StatusBadge, type ServiceStatus } from "@/components/StatusBadge";
import { downloadMeta, incidents, statusServices } from "@/config/site";

interface ServiceState {
  id: string;
  name: string;
  description: string;
  status: ServiceStatus;
}

/**
 * Reads live data from `downloadMeta.statusApiUrl` when configured.
 * Falls back to the MOCK configuration so the page always renders.
 */
export function StatusDashboard({ compact = false }: { compact?: boolean }) {
  const [services, setServices] = useState<ServiceState[]>(
    statusServices.map((s) => ({ ...s, status: "operational" as ServiceStatus })),
  );
  const [checkedAt, setCheckedAt] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      if (downloadMeta.statusApiUrl) {
        const res = await fetch(downloadMeta.statusApiUrl, { headers: { accept: "application/json" } });
        if (!res.ok) throw new Error("Status endpoint unavailable");
        const data = (await res.json()) as { services?: ServiceState[] };
        if (Array.isArray(data.services)) setServices(data.services);
      }
      setCheckedAt(new Date().toLocaleTimeString());
    } catch {
      setError("Couldn't reach the status service. Showing the last known state.");
      setCheckedAt(new Date().toLocaleTimeString());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const allGood = services.every((s) => s.status === "operational");
  const shown = compact ? services.slice(0, 3) : services;

  return (
    <GlassPanel className="p-6 sm:p-8">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:flex sm:justify-between">
        <div className="min-w-0">
          <h3 className="font-display text-xl font-bold">
            {allGood ? "All systems operational" : "Some systems need attention"}
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">
            Last checked: <span aria-live="polite">{checkedAt ?? "checking…"}</span>
            {downloadMeta.statusApiUrl ? "" : " · preview data (no status endpoint configured)"}
          </p>
        </div>
        <button
          type="button"
          onClick={() => void refresh()}
          className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border border-border px-4 text-sm font-medium transition-colors hover:bg-secondary"
        >
          <RefreshCw className={loading ? "size-4 animate-spin" : "size-4"} aria-hidden="true" />
          Refresh
        </button>
      </div>

      {error ? (
        <p role="status" className="mt-4 text-xs text-amber-status">
          {error}
        </p>
      ) : null}

      <ul className="mt-6 divide-y divide-border">
        {shown.map((service) => (
          <li
            key={service.id}
            className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 py-4"
          >
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">{service.name}</p>
              <p className="truncate text-xs text-muted-foreground">{service.description}</p>
            </div>
            <StatusBadge status={service.status} />
          </li>
        ))}
      </ul>

      {!compact ? (
        <section className="mt-8 border-t border-border pt-6">
          <h3 className="font-display text-lg font-bold">Incident history</h3>
          <ul className="mt-4 space-y-4">
            {incidents.map((incident) => (
              <li key={incident.title} className="rounded-2xl border border-border p-4">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <h4 className="font-semibold">{incident.title}</h4>
                  <span className="rounded-full border border-border px-2 py-0.5 text-[11px] text-muted-foreground">
                    {incident.status}
                  </span>
                  <time className="ml-auto text-xs text-muted-foreground" dateTime={incident.date}>
                    {incident.date}
                  </time>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{incident.body}</p>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[11px] text-muted-foreground">
            Incident history shown is preview data for this mock build.
          </p>
        </section>
      ) : null}
    </GlassPanel>
  );
}
