import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/SiteLayout";
import { FeatureGrid } from "@/components/FeatureGrid";
import { ScreenshotGallery } from "@/components/ScreenshotGallery";
import { SectionHeading } from "@/components/SectionHeading";
import { GlassPanel } from "@/components/GlassPanel";
import { DownloadButton } from "@/components/DownloadButton";
import { Reveal } from "@/components/Reveal";
import { previewBenefits } from "@/config/site";

export const Route = createFileRoute("/features")({
  head: () => ({
    meta: [
      { title: "Features — Cutie Client <3" },
      {
        name: "description",
        content:
          "Performance gains, a drag-and-drop HUD, theme presets, mod support and fair-play design. Everything Cutie Client adds to Minecraft.",
      },
      { property: "og:title", content: "Features — Cutie Client <3" },
      {
        property: "og:description",
        content: "A closer look at performance, customization and setup in Cutie Client.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Features,
});

function Features() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Features"
        title="Made for how you actually play"
        description="Faster frames, a HUD you control, and a look that matches your world — without breaking vanilla."
      />

      <section aria-label="Feature overview" className="px-5 pb-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <FeatureGrid />
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="compare-heading" className="px-5 pb-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <SectionHeading
              id="compare-heading"
              eyebrow="Before & after"
              title="Same hardware, different session"
              description="Reference numbers from an internal test rig. Your results depend on your setup."
            />
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <Reveal delay={100}>
              <GlassPanel className="h-full p-7 opacity-80 transition-opacity hover:opacity-100">
                <h3 className="font-display text-lg font-bold text-muted-foreground">
                  Vanilla launcher
                </h3>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li>• 62 FPS average in a busy hub</li>
                  <li>• Frame hitches when loading chunks</li>
                  <li>• Fixed HUD, no layout control</li>
                  <li>• Manual Java and mod setup</li>
                </ul>
              </GlassPanel>
            </Reveal>
            <Reveal delay={220}>
              <GlassPanel className="h-full border-candy/30 p-7">
                <h3 className="font-display text-lg font-bold text-candy">Cutie Client</h3>
                <ul className="mt-4 space-y-2 text-sm">
                  <li>• 174 FPS average in the same hub</li>
                  <li>• Smoothed frame pacing during chunk loads</li>
                  <li>• Draggable, per-world HUD layouts</li>
                  <li>• Java 17 bundled, mods one click away</li>
                </ul>
              </GlassPanel>
            </Reveal>
          </div>
        </div>
      </section>

      <section aria-labelledby="gallery-heading" className="px-5 pb-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <SectionHeading
              id="gallery-heading"
              eyebrow="Interface"
              title="Themes and layouts"
              description="Three of the presets that ship with the client."
            />
          </Reveal>
          <Reveal delay={120} className="mt-10">
            <ScreenshotGallery />
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="benefits-heading" className="px-5 pb-24 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 id="benefits-heading" className="sr-only">
            Product benefits
          </h2>
          <Reveal>
            <GlassPanel className="flex flex-col gap-8 p-8 sm:p-12">
              <ul className="grid gap-6 sm:grid-cols-3">
                {previewBenefits.map((b) => (
                  <li key={b.title}>
                    <h3 className="font-display text-lg font-bold">{b.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{b.body}</p>
                  </li>
                ))}
              </ul>
              <DownloadButton />
            </GlassPanel>
          </Reveal>
        </div>
      </section>
    </SiteLayout>
  );
}
