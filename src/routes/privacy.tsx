import { createFileRoute } from "@tanstack/react-router";
import { LegalPageLayout } from "@/components/LegalPageLayout";
import { brand } from "@/config/site";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Cutie Client <3" },
      {
        name: "description",
        content:
          "How Cutie Client handles account information, email verification, server logs, cookies, retention, deletion and your privacy rights.",
      },
      { property: "og:title", content: "Privacy Policy — Cutie Client <3" },
      { property: "og:description", content: "How Cutie Client handles your data." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <LegalPageLayout
      title="Privacy Policy"
      intro="A plain-language summary of what we collect, why, and how long we keep it."
      sections={[
        {
          heading: "1. Information you provide",
          body: [
            "You can download and use Cutie Client without giving us any personal information. If you choose to create an optional account, we collect the email address you enter and, if you provide one, a display name.",
            "If you contact support, we receive the email address and message content you send us.",
          ],
        },
        {
          heading: "2. Account information",
          body: [
            "Account records store your email address, a hashed password, verification state, timestamps and your notification preferences. Passwords are stored only as salted hashes and are never readable by us.",
          ],
        },
        {
          heading: "3. Email verification",
          body: [
            "Verification and password-reset links contain a single-use token with a short expiry. Tokens are deleted once used or expired. We never include your password in email.",
          ],
        },
        {
          heading: "4. Server logs",
          body: [
            "Our hosting provider records standard request logs (IP address, timestamp, requested path, user agent) for security and abuse prevention. These logs are retained for a short period and are not used to build profiles.",
          ],
        },
        {
          heading: "5. Cookies and sessions",
          body: [
            "We set no advertising or tracking cookies. If you sign in to an optional account, a single HTTP-only session cookie keeps you signed in. Your platform preference for the download button is stored in your browser's local storage and never leaves your device.",
          ],
        },
        {
          heading: "6. Download analytics",
          body: [
            "No analytics are enabled by default. If aggregate, privacy-respecting download counting is ever enabled, it will be documented here before it ships, and it will not use tracking cookies or identify individual visitors.",
          ],
        },
        {
          heading: "7. Service providers",
          body: [
            "We use third parties for hosting, content delivery and transactional email. They process data only to deliver those services on our behalf. Configure the specific providers for your deployment in this section before publishing.",
          ],
        },
        {
          heading: "8. Data retention",
          body: [
            "Account data is kept while your account exists. Support messages are kept for up to 24 months. Verification and reset tokens are deleted on use or expiry.",
          ],
        },
        {
          heading: "9. Account deletion",
          body: [
            "You can request deletion at any time from the account page or by emailing us. We remove your account data within 30 days, except records we must keep for security or legal reasons.",
          ],
        },
        {
          heading: "10. Your rights",
          body: [
            "Depending on where you live, you may have the right to access, correct, export or delete your personal data, and to object to certain processing. Contact us and we will respond within the time your local law requires.",
          ],
        },
        {
          heading: "11. Children's privacy",
          body: [
            "Cutie Client is not directed to children under 13, and accounts are not intended for them. If we learn that a child under 13 created an account, we delete it.",
          ],
        },
        {
          heading: "12. Security",
          body: [
            "We use encryption in transit, hashed passwords, HTTP-only session cookies and least-privilege access to production systems. No system is perfectly secure, so please use a unique password.",
          ],
        },
        {
          heading: "13. Changes to this policy",
          body: [
            "If we make a material change we will update the review date above and, for account holders, send an email notice before the change takes effect.",
          ],
        },
        {
          heading: "14. Contact",
          body: [`Questions about this policy: ${brand.supportEmail}`],
        },
      ]}
    />
  );
}
