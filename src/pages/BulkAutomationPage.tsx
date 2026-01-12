import AnalyticsReportingSection from "@/components/bulk-automation/AnalyticsReportingSection";
import BulkAutomationHero from "@/components/bulk-automation/BulkAutomationHero";
import BulkOperationsSection from "@/components/bulk-automation/BulkOperationsSection";
import GiftingWorkflowSection from "@/components/bulk-automation/GiftingWorkflowSection";
import ScheduledDeliverySection from "@/components/bulk-automation/ScheduledDeliverySection";

function BulkAutomationPage() {
  return (
    <div>
      <BulkAutomationHero></BulkAutomationHero>
      <BulkOperationsSection></BulkOperationsSection>
      <ScheduledDeliverySection></ScheduledDeliverySection>
      <GiftingWorkflowSection></GiftingWorkflowSection>
      <AnalyticsReportingSection></AnalyticsReportingSection>
    </div>
  );
}

export default BulkAutomationPage;
