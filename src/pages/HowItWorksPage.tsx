import ChooseOccasionSection from "@/components/how-it-works/ChooseOccasionSection";
import HowItWorkHero from "@/components/how-it-works/HowItWorkHero";
import UploadRecipientsSection from "@/components/how-it-works/UploadRecipientsSection.tsx";

function HowItWorksPage() {
  return (
    <div>
      <HowItWorkHero></HowItWorkHero>
      <ChooseOccasionSection></ChooseOccasionSection>
      <UploadRecipientsSection></UploadRecipientsSection>
    </div>
  );
}

export default HowItWorksPage;
