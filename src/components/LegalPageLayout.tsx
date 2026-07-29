import type { ReactNode } from "react";
import { SiteLayout, PageHero } from "@/components/SiteLayout";
import { GlassPanel } from "@/components/GlassPanel";
import { legal } from "@/config/site";

export interface LegalSection {
  heading: string;
  body: string[];
}

export function LegalPageLayout({
  title,
  intro,
  sections,
  children,
}: {
  title: string;
  intro: string;
  sections: LegalSection[];
  children?: ReactNode;
}) {
  return (
    <SiteLayout>
      <PageHero eyebrow="Legal" title={title} description={intro} />
      <div className="mx-auto max-w-3xl px-5 pb-24 sm:px-8">
        <GlassPanel className="p-7 sm:p-10">
          <p className="text-xs text-muted-foreground">Last reviewed: {legal.lastReviewed}</p>
          <div className="mt-6 flex flex-col gap-8">
            {sections.map((section) => (
              <section key={section.heading}>
                <h2 className="font-display text-xl font-bold">{section.heading}</h2>
                {section.body.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 40)}
                    className="mt-3 text-sm leading-relaxed text-muted-foreground"
                  >
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}
          </div>
          {children}
          <p className="mt-10 border-t border-border pt-6 text-xs leading-relaxed text-muted-foreground">
            {legal.disclaimer}
          </p>
        </GlassPanel>
      </div>
    </SiteLayout>
  );
}
