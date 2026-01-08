import ForProfessionalsHero from "@/components/for-professionals/ForProfessionalsHero";
import IndustryShowcase from "@/components/for-professionals/IndustryShowcase";
import WhyProfessionalsLove from "@/components/for-professionals/WhyProfessionalsLove";
import PricingSection from "@/components/shared/PricingSection";

function ForProfessionalsPage() {
  return (
    <div>
      <ForProfessionalsHero></ForProfessionalsHero>
      <WhyProfessionalsLove></WhyProfessionalsLove>
      <IndustryShowcase></IndustryShowcase>
      <PricingSection></PricingSection>
    </div>
  );
}

export default ForProfessionalsPage;
