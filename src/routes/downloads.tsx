import { createFileRoute, Link } from "@tanstack/react-router";
import { FileText, ShieldCheck, LifeBuoy } from "lucide-react";
import { SiteLayout, PageHero } from "@/components/SiteLayout";
import { GlassPanel } from "@/components/GlassPanel";
import { DownloadButton } from "@/components/DownloadButton";
import { PlatformIcon } from "@/components/PlatformIcon";
import { SectionHeading } from "@/components/SectionHeading";
import {
  downloadMeta,
  legal,
  platforms,
  releaseNotes,
  type PlatformId,
} from "@/config/site";

export const Route = createFileRoute("/downloads")({
  head: () => ({
    meta: [
      { title: "Download Cutie Client <3 for Windows & macOS" },
      {
        name: "description",
        content:
          "Free Cutie Client installers for Windows and macOS, with versions, file sizes, system requirements, checksums and installation steps.",
      },
      { property: "og:title", content: "Download Cutie Client <3" },
      {
        property: "og:description",
        content: "Installers for Windows and macOS with full version and verification details.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Downloads,
});

function PlatformCard({ id }: { id: PlatformId }) {
  const config = platforms[id];
  return (
    <GlassPanel as="article" className="flex flex-col gap-5 p-7 sm:p-8">
      <div className="flex items-center gap-3">
        <span className="grid size-11 place-items-center rounded-2xl border border-border bg-[oklch(1_0_0_/_6%)] text-blush">
          <PlatformIcon platform={id} />
        </span>
        <div className="min-w-0">
          <h2 className="font-display text-xl font-bold">{config.shortLabel}</h2>
          <p className="text-xs text-muted-foreground">{config.architectures.join(" · ")}</p>
        </div>
      </div>

      <dl className="grid grid-cols-3 gap-3 border-y border-border py-4 text-sm">
        <div>
          <dt className="text-xs text-muted-foreground">Version</dt>
          <dd className="font-semibold">v{config.version}</dd>
        </div>
        <div>
          <dt className="text-xs text-muted-foreground">Size</dt>
          <dd className="font-semibold">{config.fileSize}</dd>
        </div>
        <div>
          <dt className="text-xs text-muted-foreground">Updated</dt>
          <dd className="font-semibold">{downloadMeta.lastUpdated}</dd>
        </div>
      </dl>

      <div>
        <h3 className="text-sm font-semibold">Minimum requirements</h3>
        <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
          {config.requirements.map((req) => (
            <li key={req}>• {req}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-sm font-semibold">Installation</h3>
        <ol className="mt-2 space-y-1 text-sm text-muted-foreground">
          {config.install.map((step, i) => (
            <li key={step}>
              {i + 1}. {step}
            </li>
          ))}
        </ol>
      </div>

      {/* Checksums render only when configured — never invented. */}
      {config.sha256 ? (
        <div>
          <h3 className="text-sm font-semibold">SHA-256 checksum</h3>
          <code className="mt-2 block overflow-x-auto rounded-xl border border-border bg-[oklch(0_0_0_/_25%)] p-3 font-mono text-xs">
            {config.sha256}
          </code>
        </div>
      ) : null}

      <DownloadButton className="mt-auto" />
    </GlassPanel>
  );
}

function Downloads() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Downloads"
        title="Get Cutie Client"
        description="Free for Windows and macOS. No account, no bundled extras, no strings."
      />

      <section aria-label="Installers" className="px-5 pb-16 sm:px-8">
        <div className="mx-auto grid max-w-5xl gap-5 lg:grid-cols-2">
          <PlatformCard id="windows" />
          <PlatformCard id="macos" />
        </div>
      </section>

      <section id="release-notes" aria-labelledby="notes-heading" className="scroll-mt-28 px-5 pb-16 sm:px-8">
        <div className="mx-auto max-w-5xl">
          <SectionHeading
            id="notes-heading"
            align="left"
            eyebrow="Release notes"
            title="What changed"
            description="Every build is documented here. Preview data in this mock build."
          />
          <div className="mt-8 grid gap-4">
            {releaseNotes.map((release) => (
              <GlassPanel key={release.version} className="p-6">
                <div className="flex flex-wrap items-baseline gap-3">
                  <h3 className="font-display text-lg font-bold">v{release.version}</h3>
                  <time className="text-xs text-muted-foreground" dateTime={release.date}>
                    {release.date}
                  </time>
                </div>
                <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
                  {release.items.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </GlassPanel>
            ))}
            {downloadMeta.releaseNotesUrl ? (
              <a
                href={downloadMeta.releaseNotesUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="text-sm font-semibold text-blush underline underline-offset-4"
              >
                Full changelog
              </a>
            ) : null}
          </div>
        </div>
      </section>

      <section aria-labelledby="safety-heading" className="px-5 pb-24 sm:px-8">
        <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-3">
          <h2 id="safety-heading" className="sr-only">
            Security and transparency
          </h2>
          <GlassPanel className="p-6">
            <ShieldCheck className="size-5 text-mint" aria-hidden="true" />
            <h3 className="mt-3 font-display font-bold">Signed installers</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Windows builds are Authenticode-signed and macOS builds are notarized, so your system
              can show the publisher.
            </p>
          </GlassPanel>
          <GlassPanel className="p-6">
            <FileText className="size-5 text-blush" aria-hidden="true" />
            <h3 className="mt-3 font-display font-bold">Verify your file</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              When a checksum is published for a release it appears above. Compare it with{" "}
              <code className="font-mono text-xs">shasum -a 256</code> or{" "}
              <code className="font-mono text-xs">certutil -hashfile</code>.
            </p>
          </GlassPanel>
          <GlassPanel className="p-6">
            <LifeBuoy className="size-5 text-lavender" aria-hidden="true" />
            <h3 className="mt-3 font-display font-bold">Stuck installing?</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Our{" "}
              <Link to="/support" className="text-blush underline underline-offset-4">
                support page
              </Link>{" "}
              covers the common Windows SmartScreen and macOS Gatekeeper prompts.
            </p>
          </GlassPanel>
          <p className="text-xs leading-relaxed text-muted-foreground md:col-span-3">
            {legal.disclaimer}
          </p>
        </div>
      </section>
    </SiteLayout>
  );
}
