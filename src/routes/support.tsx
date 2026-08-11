import { useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Mail, MessageSquare, BookOpen, Loader2 } from "lucide-react";
import { SiteLayout, PageHero } from "@/components/SiteLayout";
import { GlassPanel } from "@/components/GlassPanel";
import { brand } from "@/config/site";
import { contactSchema, submitSupportRequest, type AuthResult } from "@/lib/auth.functions";

export const Route = createFileRoute("/support")({
  head: () => ({
    meta: [
      { title: "Support & contact — Cutie Client <3" },
      {
        name: "description",
        content:
          "Get help installing or running Cutie Client, report a bug, or contact the team about your account.",
      },
      { property: "og:title", content: "Support & contact — Cutie Client <3" },
      { property: "og:description", content: "Installation help, bug reports and contact options." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Support,
});

const topics = [
  { value: "install", label: "Installation" },
  { value: "performance", label: "Performance" },
  { value: "account", label: "Account" },
  { value: "billing", label: "Billing" },
  { value: "other", label: "Something else" },
] as const;

function Support() {
  const submit = useServerFn(submitSupportRequest);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [result, setResult] = useState<AuthResult | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = Object.fromEntries(
      Array.from(new FormData(event.currentTarget).entries()).map(([k, v]) => [k, String(v)]),
    );
    const parsed = contactSchema.safeParse(data);
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
      setResult(await submit({ data: parsed.data }));
    } catch {
      setResult({ ok: false, code: "invalid", message: "Something went wrong. Try again shortly." });
    } finally {
      setPending(false);
    }
  }

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Support"
        title="We're happy to help"
        description="Most install questions are answered in the FAQ. For anything else, send us a message."
      />

      <section className="mx-auto grid max-w-5xl gap-5 px-5 pb-24 sm:px-8 lg:grid-cols-[1.1fr_0.9fr]">
        <GlassPanel className="p-7 sm:p-8">
          <h2 className="font-display text-xl font-bold">Contact the team</h2>
          <form onSubmit={onSubmit} noValidate className="mt-5 flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-sm font-medium">
                Your email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                aria-invalid={errors.email ? true : undefined}
                aria-describedby={errors.email ? "email-error" : undefined}
                className="min-h-12 rounded-2xl border border-input bg-[oklch(1_0_0_/_5%)] px-4 text-base"
              />
              {errors.email ? (
                <p id="email-error" className="text-xs text-destructive">
                  {errors.email}
                </p>
              ) : null}
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="topic" className="text-sm font-medium">
                Topic
              </label>
              <select
                id="topic"
                name="topic"
                defaultValue="install"
                className="min-h-12 rounded-2xl border border-input bg-[oklch(1_0_0_/_5%)] px-4 text-base text-foreground"
              >
                {topics.map((topic) => (
                  <option key={topic.value} value={topic.value} className="bg-card">
                    {topic.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="message" className="text-sm font-medium">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                aria-invalid={errors.message ? true : undefined}
                aria-describedby={errors.message ? "message-error" : "message-hint"}
                className="rounded-2xl border border-input bg-[oklch(1_0_0_/_5%)] p-4 text-base"
              />
              <p id="message-hint" className="text-xs text-muted-foreground">
                Include your platform, client version and what you were doing.
              </p>
              {errors.message ? (
                <p id="message-error" className="text-xs text-destructive">
                  {errors.message}
                </p>
              ) : null}
            </div>

            <button
              type="submit"
              disabled={pending}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[image:var(--gradient-candy)] px-6 font-semibold text-primary-foreground shadow-[var(--shadow-glow)] transition-transform duration-300 hover:-translate-y-0.5 disabled:opacity-70"
            >
              {pending ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : null}
              {pending ? "Sending…" : "Send message"}
            </button>
          </form>

          {result ? (
            <div role="status" className="mt-5 rounded-2xl border border-border p-4 text-sm">
              <p className={result.ok ? "text-mint" : "text-amber-status"}>{result.message}</p>
              {result.setup ? (
                <ul className="mt-2 space-y-1 text-xs text-muted-foreground">
                  {result.setup.map((s) => (
                    <li key={s}>• {s}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          ) : null}
        </GlassPanel>

        <div className="grid gap-5">
          <GlassPanel className="p-7">
            <Mail className="size-5 text-blush" aria-hidden="true" />
            <h2 className="mt-3 font-display text-lg font-bold">Email us</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              <a
                href={`mailto:${brand.supportEmail}`}
                className="text-blush underline underline-offset-4"
              >
                {brand.supportEmail}
              </a>
              <br />
              Typical reply time: 1–2 business days.
            </p>
          </GlassPanel>

          <GlassPanel className="p-7">
            <BookOpen className="size-5 text-lavender" aria-hidden="true" />
            <h2 className="mt-3 font-display text-lg font-bold">Common fixes</h2>
            <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
              <li>
                <strong className="text-foreground">Windows SmartScreen:</strong> choose “More info”
                then “Run anyway” — the publisher name should read Cutie Client.
              </li>
              <li>
                <strong className="text-foreground">macOS Gatekeeper:</strong> right-click the app
                and choose Open on first launch.
              </li>
              <li>
                <strong className="text-foreground">Low frames:</strong> lower render distance to 12
                and disable shader packs while testing.
              </li>
            </ul>
          </GlassPanel>

          <GlassPanel className="p-7">
            <MessageSquare className="size-5 text-mint" aria-hidden="true" />
            <h2 className="mt-3 font-display text-lg font-bold">Community</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Join the community server linked in the footer, or browse the{" "}
              <Link to="/faq" className="text-blush underline underline-offset-4">
                FAQ
              </Link>
              .
            </p>
          </GlassPanel>
        </div>
      </section>
    </SiteLayout>
  );
}
