import BillingHeader from "@/components/Dashboard/Seller/Billing/BillingHeader";
import { PlanCard } from "@/components/Dashboard/Seller/Billing/PlanCard";
import { PricingPlans } from "@/components/Dashboard/Seller/Billing/PricingPlans";
import SEO from "@/components/shared/SEO";

function Billing() {
  return (
    <div>
      <SEO
        title="Billing & Invoices"
        description="Review your transaction history and manage payments."
      />
      <BillingHeader></BillingHeader>
      <PlanCard></PlanCard>
      <PricingPlans></PricingPlans>
    </div>
  );
}

export default Billing;
