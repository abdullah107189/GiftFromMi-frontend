import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeader } from "../shared/headers/SectionHeader";
import { parseDescriptionToText } from "@/utils/converter/parseDescriptionToText";

const FAQ = ({ faqs }: { faqs: { title: string; description: string }[] }) => {
  return (
    <section className="pb-15 mt-15 bg-primary-50" id="faqSection">
      <div className="max-w-container mx-auto px-3">
        {/* Using your custom SectionHeader */}
        <SectionHeader
          title="Frequently Asked Questions"
          subtitle="Find answers to common queries about our product, features, and services."
        />

        {/* FAQ Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-0">
          <Accordion
            type="single"
            collapsible
            className="w-full flex flex-col gap-4"
          >
            {faqs?.slice(0, 4).map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-background border-none px-4"
              >
                <AccordionTrigger className="text-gray-700 font-medium text-lg hover:no-underline py-5 text-left">
                  {item.title}
                </AccordionTrigger>
                <AccordionContent className="text-gray-500 text-base leading-relaxed pb-5">
                  {parseDescriptionToText(item.description)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <Accordion
            type="single"
            collapsible
            className="w-full flex flex-col gap-4 mt-4 md:mt-0"
          >
            {faqs?.slice(4).map((item, index) => (
              <AccordionItem
                key={index + 4}
                value={`item-${index + 4}`}
                className="bg-background border-none px-4"
              >
                <AccordionTrigger className="text-gray-700 font-medium text-lg hover:no-underline py-5 text-left">
                  {item.title}
                </AccordionTrigger>
                <AccordionContent className="text-gray-500 text-base leading-relaxed pb-5">
                  {parseDescriptionToText(item.description)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
