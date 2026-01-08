import React from "react";
import { SectionHeader } from "../shared/headers/SectionHeader";
import p1 from "@/assets/gallery/p1.png";
import p2 from "@/assets/gallery/p2.png";
import p3 from "@/assets/gallery/p3.png";
import p4 from "@/assets/gallery/p4.png";
const WhyProfessionalsLove: React.FC = () => {
  const WHY_LOVE_DATA = [
    {
      id: 1,
      title: "Save Time",
      description:
        "Automate your gifting workflow and focus on what matters most.",
      image: p1,
    },
    {
      id: 2,
      title: "Automated Gifting",
      description:
        "Set it and forget it with scheduled, recurring gift campaigns.",
      image: p2,
    },
    {
      id: 3,
      title: "Multi-Recipient Shipping",
      description:
        "One order, unlimited addresses. Ship to all your clients at once.",
      image: p3,
    },
    {
      id: 4,
      title: "CRM Integration",
      description:
        "Connect with your existing tools for seamless client management.",
      image: p4,
    },
  ];
  return (
    <section className="py-15">
      <div className="max-w-container mx-auto px-3">
        <SectionHeader
          title="Why Professionals Love GiftFromMi"
          subtitle="Everything you need to manage client gifting at scale."
        ></SectionHeader>
        {/* Info Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_LOVE_DATA.map((item) => (
            <div
              key={item.id}
              className="flex flex-col bg-background border border-primary-200 rounded-2xl overflow-hidden transition-all"
            >
              {/* Image Container */}
              <div className="w-full h-63.5 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Text Content */}
              <div className="py-6 px-4 flex flex-col gap-3">
                <h3 className="text-2xl font-bold text-gray-700">
                  {item.title}
                </h3>
                <p className="text-gray-500 leading-relaxed text-base">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyProfessionalsLove;
