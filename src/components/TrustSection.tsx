import { Link } from "@tanstack/react-router";
import { BadgeCheck, Quote } from "lucide-react";
import { GlassPanel } from "@/components/GlassPanel";
import { downloadMeta, legal, platforms, testimonials, trustBadges } from "@/config/site";

export function TrustSection() {
  return (
    <div className="grid gap-4 lg:grid-cols-[1.1fr_1fr]">
      <GlassPanel className="p-6 sm:p-8">
        <h3 className="font-display text-xl font-bold">Built to be verifiable</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Every release is documented, signed and published here first. Download only from this
          site.
        </p>

        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {trustBadges.map((badge) => (
            <li key={badge.label} className="flex items-start gap-2.5">
              <BadgeCheck className="mt-0.5 size-4 shrink-0 text-candy" aria-hidden="true" />
              <span className="min-w-0">
                <span className="block text-sm font-semibold">{badge.label}</span>
                <span className="block text-xs text-muted-foreground">{badge.detail}</span>
              </span>
            </li>
          ))}
        </ul>

        <dl className="mt-6 grid gap-3 border-t border-border pt-5 text-sm sm:grid-cols-3">
          <div>
            <dt className="text-xs text-muted-foreground">Current version</dt>
            <dd className="font-semibold">v{platforms.windows.version}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground">Last updated</dt>
            <dd className="font-semibold">{downloadMeta.lastUpdated}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground">Platforms</dt>
            <dd className="font-semibold">Windows · macOS</dd>
          </div>
        </dl>

        <p className="mt-5 text-xs leading-relaxed text-muted-foreground">{legal.disclaimer}</p>

        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
          <Link to="/privacy" className="text-candy underline underline-offset-4">
            Privacy Policy
          </Link>
          <Link to="/terms" className="text-candy underline underline-offset-4">
            Terms of Service
          </Link>
          <Link to="/status" className="text-candy underline underline-offset-4">
            System status
          </Link>
        </div>
      </GlassPanel>

      <ul className="grid gap-4">
        {testimonials.map((t) => (
          <li key={t.author}>
            <GlassPanel className="h-full p-6">
              <Quote className="size-5 text-candy" aria-hidden="true" />
              <blockquote className="mt-3 text-sm leading-relaxed text-foreground">
                "{t.quote}"
              </blockquote>
              <p className="mt-3 text-xs text-muted-foreground">
                {t.author} · {t.role}
              </p>
            </GlassPanel>
          </li>
        ))}
        <li className="text-[11px] text-muted-foreground">
          Testimonials shown are illustrative examples for this preview build.
        </li>
      </ul>
    </div>
  );
}
