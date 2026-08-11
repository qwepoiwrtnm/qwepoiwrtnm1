import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal } from "@/components/Reveal";
import { faqs } from "@/config/site";

export function FAQAccordion({ limit }: { limit?: number }) {
  const items = limit ? faqs.slice(0, limit) : faqs;

  return (
    <Accordion type="single" collapsible className="w-full">
      {items.map((item, i) => (
        <Reveal key={item.q} delay={Math.min(i, 5) * 60}>
          <AccordionItem
            value={`faq-${i}`}
            className="glass mb-3 rounded-2xl border-b-0 px-5"
          >
            <AccordionTrigger className="py-5 text-left font-display text-base font-bold hover:no-underline">
              {item.q}
            </AccordionTrigger>
            <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground">
              {item.a}
            </AccordionContent>
          </AccordionItem>
        </Reveal>
      ))}
    </Accordion>
  );
}
