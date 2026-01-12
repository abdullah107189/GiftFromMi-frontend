import BulkAutomationHero from "@/components/bulk-automation/BulkAutomationHero";
import BulkOperationsSection from "@/components/bulk-automation/BulkOperationsSection";
import ScheduledDeliverySection from "@/components/bulk-automation/ScheduledDeliverySection";

function BulkAutomationPage() {
  return (
    <div>
      <BulkAutomationHero></BulkAutomationHero>
      <BulkOperationsSection></BulkOperationsSection>
      <ScheduledDeliverySection></ScheduledDeliverySection>
    </div>
  );
}

export default BulkAutomationPage;
