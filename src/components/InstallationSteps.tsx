import { installSteps } from "@/config/site";
import { GlassPanel } from "@/components/GlassPanel";

export function InstallationSteps() {
  return (
    <ol className="grid gap-4 md:grid-cols-3">
      {installSteps.map((step, i) => (
        <li key={step.title}>
          <GlassPanel className="h-full p-6">
            <span
              aria-hidden="true"
              className="font-display text-4xl font-extrabold text-[oklch(0.7_0.24_352_/_45%)]"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-2 font-display text-lg font-bold">{step.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
          </GlassPanel>
        </li>
      ))}
    </ol>
  );
}
