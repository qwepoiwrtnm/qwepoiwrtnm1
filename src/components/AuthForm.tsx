import { useState, type FormEvent, type ReactNode } from "react";
import { Loader2, Info } from "lucide-react";
import { z } from "zod";
import { GlassPanel } from "@/components/GlassPanel";
import type { AuthResult } from "@/lib/auth.functions";

export interface AuthField {
  name: string;
  label: string;
  type: "email" | "password" | "text";
  autoComplete?: string;
  hint?: string;
}

interface AuthFormProps {
  title: string;
  description: string;
  fields: AuthField[];
  submitLabel: string;
  schema: z.ZodTypeAny;
  action: (values: Record<string, string>) => Promise<AuthResult>;
  footer?: ReactNode;
}

export function AuthForm({
  title,
  description,
  fields,
  submitLabel,
  schema,
  action,
  footer,
}: AuthFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [result, setResult] = useState<AuthResult | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setResult(null);
    const formData = new FormData(event.currentTarget);
    const values = Object.fromEntries(
      Array.from(formData.entries()).map(([k, v]) => [k, String(v)]),
    );

    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0] ?? "form");
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }
    setErrors({});
    setPending(true);
    try {
      setResult(await action(values));
    } catch {
      setResult({
        ok: false,
        code: "invalid",
        message: "Something went wrong. Please try again in a moment.",
      });
    } finally {
      setPending(false);
    }
  }

  return (
    <GlassPanel className="w-full max-w-md p-7 sm:p-8">
      <h1 className="font-display text-2xl font-extrabold">{title}</h1>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>

      <form onSubmit={onSubmit} noValidate className="mt-6 flex flex-col gap-4">
        {fields.map((field) => {
          const errorId = `${field.name}-error`;
          const hintId = `${field.name}-hint`;
          const error = errors[field.name];
          return (
            <div key={field.name} className="flex flex-col gap-1.5">
              <label htmlFor={field.name} className="text-sm font-medium">
                {field.label}
              </label>
              <input
                id={field.name}
                name={field.name}
                type={field.type}
                autoComplete={field.autoComplete}
                aria-invalid={error ? true : undefined}
                aria-describedby={[error ? errorId : null, field.hint ? hintId : null]
                  .filter(Boolean)
                  .join(" ")
                  .trim() || undefined}
                className="min-h-12 rounded-2xl border border-input bg-[oklch(1_0_0_/_5%)] px-4 text-base text-foreground placeholder:text-muted-foreground"
              />
              {field.hint ? (
                <p id={hintId} className="text-xs text-muted-foreground">
                  {field.hint}
                </p>
              ) : null}
              {error ? (
                <p id={errorId} className="text-xs text-destructive">
                  {error}
                </p>
              ) : null}
            </div>
          );
        })}

        <button
          type="submit"
          disabled={pending}
          className="mt-2 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[image:var(--gradient-candy)] px-6 font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform duration-300 hover:-translate-y-0.5 disabled:opacity-70"
        >
          {pending ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : null}
          {pending ? "Working…" : submitLabel}
        </button>
      </form>

      {result ? (
        <div
          role="status"
          className="mt-5 rounded-2xl border border-border bg-[oklch(1_0_0_/_4%)] p-4 text-sm"
        >
          <p className={result.ok ? "text-mint" : "text-amber-status"}>{result.message}</p>
          {result.setup ? (
            <div className="mt-3 border-t border-border pt-3">
              <p className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                <Info className="size-3.5" aria-hidden="true" />
                Setup required for this feature
              </p>
              <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
                {result.setup.map((step) => (
                  <li key={step}>• {step}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      ) : null}

      {footer ? <div className="mt-6 text-sm text-muted-foreground">{footer}</div> : null}
    </GlassPanel>
  );
}
