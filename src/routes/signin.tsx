import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { SiteLayout, PageHero } from "@/components/SiteLayout";
import { AuthForm } from "@/components/AuthForm";
import { signIn, signInSchema } from "@/lib/auth.functions";

export const Route = createFileRoute("/signin")({
  head: () => ({
    meta: [
      { title: "Sign in — Cutie Client <3" },
      {
        name: "description",
        content:
          "Sign in to your optional Cutie Client account for update notifications and synced preferences. An account is never required to download.",
      },
      { property: "og:title", content: "Sign in — Cutie Client <3" },
      {
        property: "og:description",
        content: "Optional account sign-in for Cutie Client.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SignIn,
});

function SignIn() {
  const submit = useServerFn(signIn);

  return (
    <SiteLayout>
      <PageHero
        eyebrow="Account"
        title="Sign in"
        description="Accounts are optional. You never need one to download or use Cutie Client."
      />
      <section className="mx-auto flex max-w-md flex-col items-center px-5 pb-24 sm:px-8">
        <AuthForm
          title="Welcome back"
          description="Sign in for update notifications and synced preferences."
          submitLabel="Sign in"
          schema={signInSchema}
          fields={[
            { name: "email", label: "Email", type: "email", autoComplete: "email" },
            {
              name: "password",
              label: "Password",
              type: "password",
              autoComplete: "current-password",
            },
          ]}
          action={(values) =>
            submit({ data: { email: values.email, password: values.password } })
          }
          footer={
            <div className="flex flex-col gap-2">
              <Link to="/forgot-password" className="text-blush underline underline-offset-4">
                Forgot your password?
              </Link>
              <span>
                No account yet?{" "}
                <Link to="/signup" className="text-blush underline underline-offset-4">
                  Create one
                </Link>
              </span>
            </div>
          }
        />
      </section>
    </SiteLayout>
  );
}
