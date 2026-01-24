import AutomaticDeliverySection from "@/components/how-it-works/AutomaticDeliverySection";
import ChooseOccasionSection from "@/components/how-it-works/ChooseOccasionSection";
import CTASection from "@/components/how-it-works/CTASection";
import HowItWorkHero from "@/components/how-it-works/HowItWorkHero";
import UploadRecipientsSection from "@/components/how-it-works/UploadRecipientsSection.tsx";
import SEO from "@/components/shared/SEO";

function HowItWorksPage() {
  return (
    <div>
      <SEO
        title="How It Works"
        description="Learn how easy it is to send gifts with Gift From Mi."
      />
      <HowItWorkHero></HowItWorkHero>
      <ChooseOccasionSection></ChooseOccasionSection>
      <UploadRecipientsSection></UploadRecipientsSection>
      <AutomaticDeliverySection></AutomaticDeliverySection>
      <CTASection></CTASection>
    </div>
  );
}

export default HowItWorksPage;
