import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Calendar, ExternalLink, Newspaper } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { Hero } from "@/components/Hero";
import { SectionHeading } from "@/components/SectionHeading";
import { FeatureGrid } from "@/components/FeatureGrid";
import { InstallationSteps } from "@/components/InstallationSteps";
import { TrustSection } from "@/components/TrustSection";
import { FAQAccordion } from "@/components/FAQAccordion";
import { StatusDashboard } from "@/components/StatusDashboard";
import { DownloadButton } from "@/components/DownloadButton";
import { GlassPanel } from "@/components/GlassPanel";
import { Reveal } from "@/components/Reveal";
import { brand, heroContent, releaseNotes } from "@/config/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${brand.fullName} — ${brand.tagline}` },
      {
        name: "description",
        content:
          "A fast, polished Minecraft client for Windows, macOS, and Linux. Free download, no account required, custom HUDs, mods and big FPS gains.",
      },
      { property: "og:title", content: `${brand.fullName} — ${brand.tagline}` },
      {
        property: "og:description",
        content:
          "Download Cutie Client free for Windows, macOS and Linux. Faster frames, a customizable HUD and a complete modpack in one install.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  const [latestNote, ...olderNotes] = releaseNotes;

  return (
    <SiteLayout>
      <Hero />

      <section aria-labelledby="features-heading" className="relative px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <SectionHeading
              id="features-heading"
              eyebrow="OUR FEATURES"
              title="Everything you want, nothing you don't"
              description="Built for players who care how the game runs and how it looks. Each feature is opt-in and tuned to stay out of your way."
            />
          </Reveal>
          <Reveal delay={120} className="mt-12">
            <FeatureGrid />
          </Reveal>
        </div>
      </section>

      {/* Partnership banner */}
      <section aria-labelledby="partner-heading" className="px-5 pb-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <GlassPanel className="relative overflow-hidden p-6 sm:p-8">
              <div className="relative z-10 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
                <div className="max-w-2xl">
                  <p className="text-[11px] font-bold tracking-[0.18em] text-candy uppercase">
                    Official Hosting Partner
                  </p>
                  <h2
                    id="partner-heading"
                    className="mt-1 font-display text-xl font-bold tracking-tight sm:text-2xl"
                  >
                    Apex Hosting x {brand.name}
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">
                      Apex Hosting is the Official Hosting Partner of {brand.name}.
                    </span>{" "}
                    Create your own server and get 25% off your first purchase by using our link.
                  </p>
                </div>
                <a
                  href="https://apexminecrafthosting.com/"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex shrink-0 items-center gap-2 rounded-md bg-candy px-5 py-2.5 text-sm font-bold text-black transition-transform hover:-translate-y-0.5 active:scale-95"
                >
                  Visit Apex
                  <ExternalLink className="size-4" aria-hidden="true" />
                </a>
              </div>
            </GlassPanel>
          </Reveal>
        </div>
      </section>

      {/* Client news */}
      <section aria-labelledby="news-heading" className="px-5 pb-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <SectionHeading
              id="news-heading"
              eyebrow="Client News"
              title="Latest Updates"
              description="New releases, partnerships, and everything happening with the client."
            />
          </Reveal>
          <Reveal delay={120} className="mt-12">
            <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
              {latestNote ? (
                <GlassPanel className="group relative flex flex-col justify-between p-6 sm:p-8">
                  <div>
                    <span className="mb-3 inline-flex items-center gap-1.5 rounded-sm bg-candy/15 px-2 py-1 text-[11px] font-bold tracking-wide text-candy">
                      <Newspaper className="size-3.5" aria-hidden="true" />
                      Latest
                    </span>
                    <h3 className="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
                      Version {latestNote.version}
                    </h3>
                    <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="size-3.5" aria-hidden="true" />
                      {latestNote.date}
                    </div>
                    <ul className="mt-4 list-disc space-y-1.5 pl-4 text-sm text-muted-foreground">
                      {latestNote.items.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <Link
                    to="/downloads"
                    hash="release-notes"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-candy hover:underline"
                  >
                    Read release notes
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </GlassPanel>
              ) : null}

              <div className="flex flex-col gap-4">
                {olderNotes.slice(0, 3).map((note) => (
                  <GlassPanel
                    key={note.version}
                    className="group flex flex-col justify-between p-5 transition-[transform] hover:-translate-y-0.5"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-3">
                        <h4 className="font-display text-lg font-bold">Version {note.version}</h4>
                        <span className="whitespace-nowrap text-xs text-muted-foreground">
                          {note.date}
                        </span>
                      </div>
                      <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                        {note.items[0]}
                      </p>
                    </div>
                  </GlassPanel>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="trust-heading" className="px-5 pb-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <SectionHeading
              id="trust-heading"
              eyebrow="Trust & safety"
              title="Signed, documented, and yours to verify"
              description="No bundled extras, no hidden trackers, and a published record of every release."
            />
          </Reveal>
          <Reveal delay={120} className="mt-12">
            <TrustSection />
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="install-heading" className="px-5 pb-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <SectionHeading
              id="install-heading"
              eyebrow="Installation"
              title="Three steps to a cuter game"
              description="No config files, no launcher surgery, no account."
            />
          </Reveal>
          <Reveal delay={120} className="mt-12">
            <InstallationSteps />
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="faq-heading" className="px-5 pb-20 sm:px-8">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <SectionHeading
              id="faq-heading"
              align="left"
              eyebrow="FAQ"
              title="Questions, answered"
              description="The short version. The full list lives on the FAQ page."
            />
          </Reveal>
          <Reveal delay={120}>
            <FAQAccordion limit={4} />
            <Link
              to="/faq"
              className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-candy underline underline-offset-4"
            >
              Read all questions
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="status-heading" className="px-5 pb-20 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <SectionHeading
              id="status-heading"
              eyebrow="Status"
              title="Live service health"
              description="Downloads, accounts and client services — checked continuously."
            />
          </Reveal>
          <Reveal delay={120} className="mt-12">
            <StatusDashboard compact />
            <Link
              to="/status"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-candy underline underline-offset-4"
            >
              Open the full status page
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="cta-heading" className="relative px-5 pb-28 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <div className="relative overflow-hidden rounded-md border border-border bg-card p-8 text-center sm:p-12 lg:p-16">
              <div className="relative z-10 flex flex-col items-center gap-6">
                <h2
                  id="cta-heading"
                  className="max-w-2xl text-2xl font-extrabold text-balance sm:text-4xl lg:text-5xl"
                >
                  Boosted frames, all the popular mods, multi OS support, and did we mention it's{" "}
                  <span className="text-candy">completely free</span>? So what are you waiting for?
                </h2>
                <p className="max-w-xl text-muted-foreground text-pretty">
                  {heroContent.availability}. Free, no account required, and it never touches your
                  vanilla profile.
                </p>
                <DownloadButton />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </SiteLayout>
  );
}
