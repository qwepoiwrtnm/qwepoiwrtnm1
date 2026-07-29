import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { SiteLayout, PageHero } from "@/components/SiteLayout";
import { EmailVerificationNotice } from "@/components/EmailVerificationNotice";
import { AuthForm } from "@/components/AuthForm";
import { emailOnlySchema, resendVerification } from "@/lib/auth.functions";

export const Route = createFileRoute("/verify-email")({
  head: () => ({
    meta: [
      { title: "Verify your email — Cutie Client <3" },
      {
        name: "description",
        content:
          "Finish verifying your optional Cutie Client account, or request a new verification link.",
      },
      { property: "og:title", content: "Verify your email — Cutie Client <3" },
      {
        property: "og:description",
        content: "Request a new verification link for your Cutie Client account.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: VerifyEmail,
});

function VerifyEmail() {
  const submit = useServerFn(resendVerification);
  const [sent, setSent] = useState<string | null>(null);

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Account"
        title="Verify your email"
        description="Verification links expire after 60 minutes. You can keep using the client either way."
      />
      <section className="mx-auto flex max-w-md flex-col items-center gap-6 px-5 pb-24 sm:px-8">
        {sent ? <EmailVerificationNotice email={sent} /> : null}
        <AuthForm
          title="Resend verification link"
          description="Enter the email you signed up with and we'll send a fresh link."
          submitLabel="Send new link"
          schema={emailOnlySchema}
          fields={[{ name: "email", label: "Email", type: "email", autoComplete: "email" }]}
          action={async (values) => {
            const result = await submit({ data: { email: values.email } });
            if (result.ok) setSent(values.email);
            return result;
          }}
        />
      </section>
    </SiteLayout>
  );
}
