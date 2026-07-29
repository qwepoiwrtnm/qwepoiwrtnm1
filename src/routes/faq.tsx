import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/SiteLayout";
import { FAQAccordion } from "@/components/FAQAccordion";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Cutie Client <3" },
      {
        name: "description",
        content:
          "Answers about installing Cutie Client, supported systems, accounts, updates, verification and support.",
      },
      { property: "og:title", content: "FAQ — Cutie Client <3" },
      {
        property: "og:description",
        content: "Common questions about downloading, installing and updating Cutie Client.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Faq,
});

function Faq() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="FAQ"
        title="Frequently asked questions"
        description="Everything people ask before their first install. Still stuck? The support page is one click away."
      />
      <section className="mx-auto max-w-3xl px-5 pb-24 sm:px-8">
        <FAQAccordion />
        <p className="mt-8 text-sm text-muted-foreground">
          Didn't find your answer?{" "}
          <Link to="/support" className="text-blush underline underline-offset-4">
            Contact support
          </Link>
          .
        </p>
      </section>
    </SiteLayout>
  );
}
