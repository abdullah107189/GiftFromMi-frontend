import React from "react";
import { Upload } from "lucide-react";
import { SectionHeader } from "../shared/headers/SectionHeader";
import type { Step } from "@/types";
import StepCard from "../shared/cards/StepCard";
import { IconEdit, IconTrolley } from "@tabler/icons-react";
const STEPS_DATA: Step[] = [
  {
    id: 1,
    number: "1",
    title: "Upload Recipients",
    icon: <Upload size={32} strokeWidth={1.5} />,
    description:
      "Add your clients via CSV or manually enter their information. Include personalized notes for each recipient.",
  },
  {
    id: 2,
    number: "2",
    title: "Customize Gift",
    icon: <IconEdit size={32} stroke={1.5} />,
    description:
      "Choose from our curated collection of luxury gifts. Add your branding, custom messages, and select delivery dates.",
  },
  {
    id: 3,
    number: "3",
    title: "Automatic Delivery",
    icon: <IconTrolley size={32} stroke={1.5} />,
    description:
      "We handle everything-from packaging to scheduled delivery. Track shipments in your dashboard and delight your clients.",
  },
];

const HowItWorks: React.FC = () => {
  return (
    <section className="py-15">
      <div className="max-w-container mx-auto px-4 lg:px-0">
        <SectionHeader
          title="How It Works"
          subtitle="Three simple steps to start delighting your clients with unforgettable gifts."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {STEPS_DATA.map((step) => (
            <StepCard key={step.id} step={step} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
