import AnalyticsReportingSection from "@/components/bulk-automation/AnalyticsReportingSection";
import BulkAutomationHero from "@/components/bulk-automation/BulkAutomationHero";
import BulkOperationsSection from "@/components/bulk-automation/BulkOperationsSection";
import GiftingWorkflowSection from "@/components/bulk-automation/GiftingWorkflowSection";
import ScheduledDeliverySection from "@/components/bulk-automation/ScheduledDeliverySection";
import SEO from "@/components/shared/SEO";

function BulkAutomationPage() {
  return (
    <section>
      <SEO
        title="Bulk Automation"
        description="Automate your gift gifting with our bulk automation features."
      />
      <BulkAutomationHero></BulkAutomationHero>
      <BulkOperationsSection></BulkOperationsSection>
      <ScheduledDeliverySection></ScheduledDeliverySection>
      <GiftingWorkflowSection></GiftingWorkflowSection>
      <AnalyticsReportingSection></AnalyticsReportingSection>
    </section>
  );
}

export default BulkAutomationPage;
