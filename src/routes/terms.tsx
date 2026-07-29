import { createFileRoute } from "@tanstack/react-router";
import { LegalPageLayout } from "@/components/LegalPageLayout";
import { brand } from "@/config/site";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — Cutie Client <3" },
      {
        name: "description",
        content:
          "The terms that apply when you download or use Cutie Client, including licence, acceptable use, disclaimers and liability.",
      },
      { property: "og:title", content: "Terms of Service — Cutie Client <3" },
      { property: "og:description", content: "Terms that apply to Cutie Client." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Terms,
});

function Terms() {
  return (
    <LegalPageLayout
      title="Terms of Service"
      intro="The agreement between you and Cutie Client when you download or use the software."
      sections={[
        {
          heading: "1. Acceptance",
          body: [
            "By downloading, installing or using Cutie Client, you agree to these terms. If you do not agree, do not use the software.",
          ],
        },
        {
          heading: "2. Eligibility",
          body: [
            "You must be at least 13 years old to use Cutie Client, and old enough to form a binding contract where you live. Optional accounts are limited to the same age requirement.",
          ],
        },
        {
          heading: "3. Software licence",
          body: [
            "We grant you a personal, non-exclusive, non-transferable, revocable licence to install and use Cutie Client for your own gameplay. You may not sell, sublicense, rent or redistribute the software, or remove its notices.",
          ],
        },
        {
          heading: "4. Acceptable use",
          body: [
            "Do not use Cutie Client to break the rules of any server you join, to harass others, to bypass server protections, or to reverse engineer the software except where that right cannot be excluded by law. Servers may set their own client policies, and following them is your responsibility.",
          ],
        },
        {
          heading: "5. Account responsibilities",
          body: [
            "If you create an optional account, keep your password confidential and tell us promptly about unauthorized use. You are responsible for activity under your account.",
          ],
        },
        {
          heading: "6. Downloads and updates",
          body: [
            "Download installers only from this website. The client may check for and install updates with your confirmation. We may change, suspend or discontinue features at any time.",
          ],
        },
        {
          heading: "7. Intellectual property",
          body: [
            "Cutie Client, its name, logo and interface are owned by us or our licensors. Minecraft and related marks belong to Mojang Studios and Microsoft. Cutie Client is an independent project and is not affiliated with, endorsed by or sponsored by Mojang Studios or Microsoft.",
          ],
        },
        {
          heading: "8. Third-party services",
          body: [
            "The software may interact with third-party services such as Minecraft authentication or mod repositories. Those services have their own terms, and we are not responsible for them.",
          ],
        },
        {
          heading: "9. Disclaimers",
          body: [
            "Cutie Client is provided “as is” and “as available”, without warranties of any kind, whether express or implied, including merchantability, fitness for a particular purpose and non-infringement. We do not warrant uninterrupted or error-free operation.",
          ],
        },
        {
          heading: "10. Limitation of liability",
          body: [
            "To the maximum extent permitted by law, we are not liable for indirect, incidental, special, consequential or punitive damages, or for lost data, profits or goodwill arising from your use of the software. Some jurisdictions do not allow these limits, so they may not apply to you.",
          ],
        },
        {
          heading: "11. Termination",
          body: [
            "You may stop using Cutie Client at any time and delete your optional account. We may suspend or terminate access if you breach these terms or if required for security or legal reasons.",
          ],
        },
        {
          heading: "12. Changes to these terms",
          body: [
            "We may update these terms. Material changes are announced on this page with an updated review date, and where you hold an account, by email.",
          ],
        },
        {
          heading: "13. Contact",
          body: [`Questions about these terms: ${brand.supportEmail}`],
        },
      ]}
    />
  );
}
