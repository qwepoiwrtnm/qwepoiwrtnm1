import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { Hero } from "@/components/Hero";
import { SectionHeading } from "@/components/SectionHeading";
import { FeatureGrid } from "@/components/FeatureGrid";
import { ScreenshotGallery } from "@/components/ScreenshotGallery";
import { InstallationSteps } from "@/components/InstallationSteps";
import { TrustSection } from "@/components/TrustSection";
import { FAQAccordion } from "@/components/FAQAccordion";
import { StatusDashboard } from "@/components/StatusDashboard";
import { DownloadButton } from "@/components/DownloadButton";
import { GlassPanel } from "@/components/GlassPanel";
import { brand, heroContent, highlights } from "@/config/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Cutie Client <3 — Minecraft, but cuter" },
      {
        name: "description",
        content:
          "A fast, polished Minecraft client for Windows and macOS. Free download, no account required, custom HUDs, themes and big FPS gains.",
      },
      { property: "og:title", content: "Cutie Client <3 — Minecraft, but cuter" },
      {
        property: "og:description",
        content:
          "Download Cutie Client free for Windows and macOS. Faster frames, a customizable HUD and themes that make every session yours.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <SiteLayout>
      <Hero />

      <section aria-labelledby="features-heading" className="px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            id="features-heading"
            eyebrow="Why Cutie Client"
            title="Everything you want, nothing you don't"
            description="Built for players who care how the game runs and how it looks. Each feature is opt-in and tuned to stay out of your way."
          />
          <FeatureGrid className="mt-12" />
        </div>
      </section>

      <section aria-labelledby="highlights-heading" className="px-5 pb-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 id="highlights-heading" className="sr-only">
            Performance highlights
          </h2>
          <GlassPanel className="grid gap-6 p-8 sm:grid-cols-3 sm:p-10">
            {highlights.map((item) => (
              <div key={item.label} className="min-w-0">
                <p className="font-display text-4xl font-extrabold text-gradient-candy">
                  {item.value}
                </p>
                <p className="mt-1 text-sm font-semibold">{item.label}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{item.note}</p>
              </div>
            ))}
          </GlassPanel>
        </div>
      </section>

      <section id="preview" aria-labelledby="gallery-heading" className="scroll-mt-28 px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            id="gallery-heading"
            eyebrow="Preview"
            title="See it before you install it"
            description="Real interface layouts from the client. Swap themes, rearrange modules, and keep the vanilla feel when you want it."
          />
          <div className="mt-12">
            <ScreenshotGallery />
          </div>
        </div>
      </section>

      <section aria-labelledby="trust-heading" className="px-5 pb-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            id="trust-heading"
            eyebrow="Trust & safety"
            title="Signed, documented, and yours to verify"
            description="No bundled extras, no hidden trackers, and a published record of every release."
          />
          <div className="mt-12">
            <TrustSection />
          </div>
        </div>
      </section>

      <section aria-labelledby="install-heading" className="px-5 pb-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            id="install-heading"
            eyebrow="Installation"
            title="Three steps to a cuter game"
            description="No config files, no launcher surgery, no account."
          />
          <div className="mt-12">
            <InstallationSteps />
          </div>
        </div>
      </section>

      <section aria-labelledby="faq-heading" className="px-5 pb-20 sm:px-8">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading
            id="faq-heading"
            align="left"
            eyebrow="FAQ"
            title="Questions, answered"
            description="The short version. The full list lives on the FAQ page."
          />
          <div>
            <FAQAccordion limit={4} />
            <Link
              to="/faq"
              className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-blush underline underline-offset-4"
            >
              Read all questions
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="status-heading" className="px-5 pb-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            id="status-heading"
            eyebrow="Status"
            title="Live service health"
            description="Downloads, accounts and client services — checked continuously."
          />
          <div className="mt-12">
            <StatusDashboard compact />
            <Link
              to="/status"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-blush underline underline-offset-4"
            >
              Open the full status page
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="cta-heading" className="relative px-5 pb-28 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <GlassPanel className="flex flex-col items-center gap-6 p-10 text-center sm:p-16">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 -bottom-24 h-64 bg-[radial-gradient(circle_at_50%_0%,oklch(0.7_0.24_352_/_30%),transparent_70%)]"
            />
            <h2 id="cta-heading" className="text-3xl font-extrabold text-balance sm:text-5xl">
              Ready to make {brand.name} yours?
            </h2>
            <p className="max-w-xl text-muted-foreground text-pretty">
              {heroContent.availability}. Free, no account required, and it never touches your
              vanilla profile.
            </p>
            <div className="flex flex-col items-center gap-4">
              <DownloadButton />
            </div>
          </GlassPanel>
        </div>
      </section>
    </SiteLayout>
  );
}
