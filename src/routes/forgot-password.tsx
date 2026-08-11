import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { SiteLayout, PageHero } from "@/components/SiteLayout";
import { AuthForm } from "@/components/AuthForm";
import { emailOnlySchema, requestPasswordReset } from "@/lib/auth.functions";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [
      { title: "Reset your password — Cutie Client <3" },
      {
        name: "description",
        content: "Request a password reset link for your optional Cutie Client account.",
      },
      { property: "og:title", content: "Reset your password — Cutie Client <3" },
      { property: "og:description", content: "Request a Cutie Client password reset link." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ForgotPassword,
});

function ForgotPassword() {
  const submit = useServerFn(requestPasswordReset);

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Account"
        title="Forgot your password?"
        description="We'll email a reset link that expires in 30 minutes."
      />
      <section className="mx-auto flex max-w-md flex-col items-center px-5 pb-24 sm:px-8">
        <AuthForm
          title="Send a reset link"
          description="For your security we show the same confirmation whether or not an account exists."
          submitLabel="Send reset link"
          schema={emailOnlySchema}
          fields={[{ name: "email", label: "Email", type: "email", autoComplete: "email" }]}
          action={(values) => submit({ data: { email: values.email } })}
          footer={
            <Link to="/signin" className="text-blush underline underline-offset-4">
              Back to sign in
            </Link>
          }
        />
      </section>
    </SiteLayout>
  );
}
