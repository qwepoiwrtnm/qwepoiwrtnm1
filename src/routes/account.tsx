import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/SiteLayout";
import { GlassPanel } from "@/components/GlassPanel";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "Your account — Cutie Client <3" },
      {
        name: "description",
        content:
          "Manage your optional Cutie Client account: notification preferences, email verification and account deletion.",
      },
      { property: "og:title", content: "Your account — Cutie Client <3" },
      { property: "og:description", content: "Manage your optional Cutie Client account." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Account,
});

function Account() {
  return (
    <SiteLayout>
      <PageHero
        eyebrow="Account"
        title="Your account"
        description="An account is not required to download or use Cutie Client."
      />
      <section className="mx-auto grid max-w-3xl gap-5 px-5 pb-24 sm:px-8">
        <GlassPanel className="p-7">
          <h2 className="font-display text-lg font-bold">You're signed out</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Optional accounts aren't enabled in this environment. When they are, this page shows
            your email, verification state and notification preferences.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              to="/signin"
              className="inline-flex min-h-11 items-center rounded-full bg-[image:var(--gradient-candy)] px-5 text-sm font-semibold text-primary-foreground"
            >
              Sign in
            </Link>
            <Link
              to="/signup"
              className="inline-flex min-h-11 items-center rounded-full border border-border px-5 text-sm font-medium transition-colors hover:bg-secondary"
            >
              Create account
            </Link>
          </div>
        </GlassPanel>

        <GlassPanel className="p-7">
          <h2 className="font-display text-lg font-bold">Notification preferences</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>• Release notifications — email me when a new build ships</li>
            <li>• Early-access announcements — occasional product news</li>
            <li>• Security notices — always on for account holders</li>
          </ul>
          <p className="mt-3 text-xs text-muted-foreground">
            Preferences become editable once the account system is configured.
          </p>
        </GlassPanel>

        <GlassPanel className="p-7">
          <h2 className="font-display text-lg font-bold">Delete your account</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Deletion removes your email, verification records and preferences within 30 days. It
            does not affect any copy of Cutie Client you've already installed. Send a deletion
            request from the{" "}
            <Link to="/support" className="text-blush underline underline-offset-4">
              support page
            </Link>{" "}
            using the address on your account.
          </p>
        </GlassPanel>
      </section>
    </SiteLayout>
  );
}
