import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/SiteLayout";
import { StatusDashboard } from "@/components/StatusDashboard";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/status")({
  head: () => ({
    meta: [
      { title: "System status — Cutie Client <3" },
      {
        name: "description",
        content:
          "Live status for the Cutie Client website, downloads, authentication, email delivery and client services, plus incident history.",
      },
      { property: "og:title", content: "System status — Cutie Client <3" },
      {
        property: "og:description",
        content: "Current service health and incident history for Cutie Client.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Status,
});

function Status() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Status"
        title="System status"
        description="Service health for downloads, accounts, email and the client itself."
      />
      <section className="mx-auto max-w-4xl px-5 pb-24 sm:px-8">
        <Reveal>
          <StatusDashboard />
        </Reveal>
      </section>
    </SiteLayout>
  );
}
