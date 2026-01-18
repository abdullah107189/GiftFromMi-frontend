import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Starter",
    price: "$0",
    period: "/Forever",
    desc: "Perfect for individual professionals",
    features: [
      "Up to 50 gifts/month",
      "Basic branding",
      "Email support",
      "CSV upload",
    ],
    button: "Get started",
    featured: false,
  },
  {
    name: "Professional",
    price: "$20",
    period: "/month/user when billed annually",
    desc: "For growing teams and agencies",
    features: [
      "Up to 200 gifts/month",
      "Full branding suite",
      "Priority support",
      "CRM integration",
      "Scheduled campaigns",
    ],
    button: "Get started",
    featured: true,
  },
  {
    name: "Custom",
    price: "Lets's talk!",
    period: "",
    desc: "For large organizations",
    features: [
      "Unlimited gifts",
      "Dedicated account manager",
      "Custom integrations",
      "Volume discounts",
      "White-label options",
    ],
    button: "Book a call",
    featured: false,
  },
];

export const PricingPlans = () => (
  <div className="md:p-6 p-4 bg-white md:mt-6 mt-4 rounded-3xl">
    <h1 className="mb-1">Available Plans</h1>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {plans.map((plan) => (
        <div
          key={plan.name}
          className={cn(
            "bg-white rounded-2xl xl:p-10 lg:p-8 md:p-6 p-4 border border-primary-300 flex flex-col gap-6 transition-all h-full",
            plan.featured
              ? "shadow-[0_0_32px_0_#CA8A32_inset]"
              : "border-primary-300",
          )}
        >
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-[20px] my-auto font-semibold">{plan.name}</h3>
              {plan.featured && (
                <span className="bg-primary-400 text-white px-5 py-2 rounded-xl text-[18px] font-medium">
                  Most Popular
                </span>
              )}
            </div>
            <p className="text-gray-500 text-xl">{plan.desc}</p>
          </div>

          <div className="flex items-center gap-1 xl:mt-10 md:mt-6 mt-4">
            <p className="flex items-baseline gap-1 text-5xl">
              {plan.name === "Starter" ? (
                <span className=" text-primary">{plan.price}</span>
              ) : (
                <span className="text-gray-900">{plan.price}</span>
              )}
            </p>
            <p className="text-gray-500">{plan.period}</p>
          </div>
          <hr className="xl:my-10! lg:my-8 md:my-6 my-4" />
          <div className="space-y-4 flex-1">
            {plan.features.map((f) => (
              <div
                key={f}
                className="flex items-center gap-3 text-sm font-medium text-gray-900"
              >
                <Check size={18} className="text-gray-900" /> {f}
              </div>
            ))}
          </div>

          {/* footer  */}

          <div className="mt-auto">
            <hr className="xl:my-10! lg:my-8 md:my-6 my-4" />
            <Button
              variant={"outline"}
              className={cn(
                "w-full py-4 cursor-pointer rounded-lg",
                plan.featured
                  ? "bg-[linear-gradient(96deg,#D0A15A_5.18%,#C57200_96.62%)] text-white"
                  : "bg-white border border-primary text-gray-900",
              )}
            >
              {plan.button}
            </Button>
          </div>
        </div>
      ))}
    </div>
  </div>
);
