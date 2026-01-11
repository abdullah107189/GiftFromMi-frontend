import { useState } from "react";
import { Button } from "../ui/button";

const PricingSection = () => {
  const PRICING_DATA = {
    monthly: [
      {
        plan: "Starter",
        description: "Individual gifting occasionally",
        price: "0",
        priceNote: "/Forever",
        buttonText: "Get started",
        footerText: "Send unlimited gifts in the U.S. and Canada",
        features: [
          "Send to 1,000+ recipients at once",
          "On-demand branded swag with no minimums",
          "Send via email, text message, or custom link",
          "Curate custom Collections of gifts and swag",
        ],
      },
      {
        plan: "Pro",
        description: "Individual gifting at scale",
        price: "25",
        priceNote: "/month/user",
        buttonText: "Get started",
        footerText: "Everything in starter, plus.",
        features: [
          "Add digital branding and custom colors to gift notifications and Collections",
          "Send gift cards from hundreds of brands",
          "International gifts and swag to 140+ countries",
          "Integrate Calendly to book meetings and increase show rates",
          "Create custom cards",
          "Gift tracking & reporting",
        ],
      },
      {
        plan: "Team",
        description: "HR, Sales & Marketing teams",
        chatNote: "Chat with us",
        buttonText: "Book A Setup Call",
        footerText:
          "Book meetings, accelerate deals, and automate employee gifts.",
        features: [
          "Everything in Pro, plus.",
          "Unlimited seats for your entire company",
          "Send gift cards from hundreds of brands",
          "Set and manage budgets for your team",
          "Integrate Salesforce and gift directly from your CRM",
          "HR integrations with 30+ leading platforms",
          "Automate employee gifts for birthdays, work anniversaries & onboarding.",
          "Create Smart Links that capture recipients' lead info",
          "Gift tracking & reporting",
        ],
      },
    ],
    annual: [
      {
        plan: "Starter",
        description: "Individual gifting occasionally",
        price: "0",
        priceNote: "/Forever",
        buttonText: "Get started",
        footerText: "Send unlimited gifts in the U.S. and Canada",
        features: [
          "Send to 1,000+ recipients at once",
          "On-demand branded swag with no minimums",
          "Send via email, text message, or custom link",
          "Curate custom Collections of gifts and swag",
          "Create a workspace and invite workspace members",
          "View thank you notes in one place",
          "Schedule gifts",
          "Gift tracking & reporting",
        ],
      },
      {
        plan: "Pro",
        description: "Individual gifting at scale",
        price: "20",
        priceNote: "/month/user when billed annually",
        buttonText: "Get started",
        footerText: "Everything in starter, plus.",
        features: [
          "Add digital branding and custom colors to gift notifications and Collections",
          "Send gift cards from hundreds of brands",
          "International gifts and swag to 140+ countries",
          "Integrate Calendly to book meetings and increase show rates",
          "Create custom cards",
          "Send from your own Gmail account",
          "Advanced reporting & analytics",
          "Gift tracking & reporting",
        ],
      },
      {
        plan: "Team",
        description: "HR, Sales & Marketing teams",
        chatNote: "Chat with us",
        buttonText: "Book A Setup Call",
        footerText:
          "Book meetings, accelerate deals, and automate employee gifts.",
        features: [
          "Everything in Pro, plus.",
          "Unlimited seats for your entire company",
          "Send gift cards from hundreds of brands",
          "Set and manage budgets for your team",
          "Integrate Salesforce and gift directly from your CRM",
          "HR integrations with 30+ leading platforms",
          "Automate employee gifts for birthdays, work anniversaries & onboarding.",
          "Create Smart Links that capture recipients' lead info",
          "Gift tracking & reporting",
          "Everything in Pro, plus.",
          "Unlimited seats for your entire company",
        ],
      },
    ],
  };

  const [isAnnual, setIsAnnual] = useState(true);

  // Switching data based on toggle
  const currentPlans = isAnnual ? PRICING_DATA.annual : PRICING_DATA.monthly;

  return (
    <section className="xl:py-15 md:py-10 py-5">
      <div className="max-w-container mx-auto px-3">
        {/* Toggle UI Implementation */}
        <div className="flex items-center justify-center xl:gap-6 md:gap-4 gap-3 mb-8">
          <span className="text-gray-900">Monthly billing</span>

          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className="flex w-30 h-14 items-center p-1 bg-primary rounded-full transition-all duration-300 hover:opacity-90 shadow-inner"
          >
            <div
              className={`w-12 h-12 bg-background rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${
                isAnnual ? "translate-x-16" : "translate-x-0"
              }`}
            />
          </button>

          <span className="text-gray-900">Annual billing</span>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:gap-8 lg:gap-6 md:gap-4 gap-3 items-stretch">
          {currentPlans.map((item, index) => (
            <div>
              <div
                key={index}
                className="group border border-primary-100 rounded-2xl xl:p-10 lg:p-8 md:p-6 p-4 flex flex-col bg-background "
              >
                <div className="xl:mb-10 lg:mb-8 md:mb-6 mb-4">
                  <h3 className="md:text-xl text-lg font-bold text-gray-900 xl:mb-4 mb-2">
                    {item.plan}
                  </h3>
                  <p className="text-gray-600 md:text-xl text-base leading-relaxed mb-6">
                    {item.description}
                  </p>

                  {item.price ? (
                    <div className="flex gap-1 items-center">
                      <span className="xl:text-5xl md:text-4xl text-3xl font-extrabold text-primary-400">
                        ${item.price}
                      </span>
                      <span className="md:text-lg text-base text-gray-500  tracking-tight">
                        {item.priceNote}
                      </span>
                    </div>
                  ) : (
                    <div className="text-lg font-bold text-gray-900 py-3">
                      {item.chatNote}
                    </div>
                  )}
                </div>

                {/* Action Button */}
                <Button className="rounded-full">{item.buttonText}</Button>

                <hr className="xl:my-8 md:my-6 my-4  text-gray-200" />

                <p className="text-base font-semibold text-gray-900 xl:mb-8 lg:mb-6 md:mb-4 mb-3">
                  {item.footerText}
                </p>

                {/* Feature List */}
                <div className="flex flex-col gap-4">
                  <span className="text-lg font-black text-primary-500 uppercase tracking-widest">
                    Features
                  </span>
                  <ul className="space-y-4">
                    {item.features.map((feature, i) => (
                      <li key={i} className="flex items-start md:gap-3 gap-2">
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <g clip-path="url(#clip0_845_25912)">
                              <path
                                d="M5 12L10 17L20 7"
                                stroke="#101828"
                                stroke-width="2"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_845_25912">
                                <rect width="24" height="24" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        </div>
                        <span className="text-lg text-gray-900">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
