import AutomaticDeliverySection from "@/components/how-it-works/AutomaticDeliverySection";
import ChooseOccasionSection from "@/components/how-it-works/ChooseOccasionSection";
import CTASection from "@/components/how-it-works/CTASection";
import HowItWorkHero from "@/components/how-it-works/HowItWorkHero";
import UploadRecipientsSection from "@/components/how-it-works/UploadRecipientsSection.tsx";

function HowItWorksPage() {
  return (
    <div>
      <HowItWorkHero></HowItWorkHero>
      <ChooseOccasionSection></ChooseOccasionSection>
      <UploadRecipientsSection></UploadRecipientsSection>
      <AutomaticDeliverySection></AutomaticDeliverySection>
      <CTASection></CTASection>
    </div>
  );
}

export default HowItWorksPage;
