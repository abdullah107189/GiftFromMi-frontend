import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeader } from "../shared/headers/SectionHeader";

const faqData = [
  {
    question: "What is GiftFromMi?",
    answer:
      "GiftFromMi is a smart, automated gifting platform that helps businesses and individuals send beautifully curated gift boxes effortlessly, on time, and even to multiple recipients at once.",
  },
  {
    question: 'How does the "One order, many recipients" feature work?',
    answer:
      "Our system allows you to upload a list of recipients via CSV or manual entry. You can then place a single order, and we will handle the logistics of sending individual gifts to each person on your list.",
  },
  {
    question: "Can I fully customize the gift boxes?",
    answer:
      "Yes! You can choose the contents, branding, and include personalized notes to ensure each gift perfectly represents your sentiment or brand.",
  },
  {
    question: "Can my business logo be added to each gift?",
    answer:
      "Absolutely. We offer premium branding options where your logo can be featured on the box, ribbons, or custom inserts.",
  },
  {
    question: "Can I upload multiple recipients at once?",
    answer:
      "Yes, our bulk upload feature via CSV makes it incredibly fast to add hundreds of recipients in just a few clicks.",
  },
  {
    question: "Do you offer nationwide shipping?",
    answer:
      "Yes, we ship across the entire country with reliable tracking so you know exactly when your gift arrives.",
  },
  {
    question: "How does the automated gifting system work?",
    answer:
      "Set your important dates—birthdays, anniversaries, onboarding, milestones—and GiftFromMi automatically handles the delivery for you on those specific dates.",
  },
  {
    question: "Do you accept custom or theme based gift requests?",
    answer:
      "Yes, we love creative projects! Contact our team for bespoke themed gift boxes tailored for special events or corporate campaigns.",
  },
];

const FAQ = () => {
  return (
    <section className="pb-15 bg-primary-50">
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
            {faqData.slice(0, 4).map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-background border-none px-4"
              >
                <AccordionTrigger className="text-gray-700 font-medium text-lg hover:no-underline py-5 text-left">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-500 text-base leading-relaxed pb-5">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <Accordion
            type="single"
            collapsible
            className="w-full flex flex-col gap-4 mt-4 md:mt-0"
          >
            {faqData.slice(4).map((item, index) => (
              <AccordionItem
                key={index + 4}
                value={`item-${index + 4}`}
                className="bg-background border-none px-4"
              >
                <AccordionTrigger className="text-gray-700 font-semibold text-lg hover:no-underline py-5 text-left">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-500 text-base leading-relaxed pb-5">
                  {item.answer}
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
