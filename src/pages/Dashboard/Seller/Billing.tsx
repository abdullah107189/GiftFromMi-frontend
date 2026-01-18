import BillingHeader from "@/components/Dashboard/Seller/Billing/BillingHeader";
import { PlanCard } from "@/components/Dashboard/Seller/Billing/PlanCard";
import { PricingPlans } from "@/components/Dashboard/Seller/Billing/PricingPlans";

function Billing() {
  return (
    <div>
      <BillingHeader></BillingHeader>
      <PlanCard></PlanCard>
      <PricingPlans></PricingPlans>
    </div>
  );
}

export default Billing;
