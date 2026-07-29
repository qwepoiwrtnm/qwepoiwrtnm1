import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { SiteLayout, PageHero } from "@/components/SiteLayout";
import { AuthForm } from "@/components/AuthForm";
import { createAccount, signUpSchema } from "@/lib/auth.functions";
import { GlassPanel } from "@/components/GlassPanel";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Create an account — Cutie Client <3" },
      {
        name: "description",
        content:
          "Create an optional Cutie Client account for update notifications, synced preferences and early-access announcements. Downloading never requires one.",
      },
      { property: "og:title", content: "Create an account — Cutie Client <3" },
      {
        property: "og:description",
        content: "Optional accounts for update notifications and synced preferences.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SignUp,
});

const upcoming = [
  "Update notifications when a new build ships",
  "Synced preferences across your devices (upcoming)",
  "Early-access announcements",
  "Future cosmetics (upcoming)",
];

function SignUp() {
  const submit = useServerFn(createAccount);

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Account"
        title="Create an account"
        description="Completely optional — Cutie Client downloads and runs without one."
      />
      <section className="mx-auto grid max-w-4xl gap-6 px-5 pb-24 sm:px-8 lg:grid-cols-[1fr_0.8fr]">
        <AuthForm
          title="Make an account"
          description="We'll email a verification link. You can download and play before verifying."
          submitLabel="Create account"
          schema={signUpSchema}
          fields={[
            {
              name: "displayName",
              label: "Display name (optional)",
              type: "text",
              autoComplete: "nickname",
            },
            { name: "email", label: "Email", type: "email", autoComplete: "email" },
            {
              name: "password",
              label: "Password",
              type: "password",
              autoComplete: "new-password",
              hint: "At least 10 characters with upper case, lower case and a number.",
            },
          ]}
          action={(values) =>
            submit({
              data: {
                email: values.email,
                password: values.password,
                displayName: values.displayName || undefined,
              },
            })
          }
          footer={
            <span>
              Already have one?{" "}
              <Link to="/signin" className="text-blush underline underline-offset-4">
                Sign in
              </Link>
            </span>
          }
        />

        <GlassPanel className="h-fit p-7">
          <h2 className="font-display text-lg font-bold">What an account adds</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {upcoming.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
          <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
            Items marked “upcoming” are planned and not available yet. Nothing here is required to
            download or use the client.
          </p>
        </GlassPanel>
      </section>
    </SiteLayout>
  );
}
