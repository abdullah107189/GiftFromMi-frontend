import ForProfessionalsHero from "@/components/for-professionals/ForProfessionalsHero";
import IndustryShowcase from "@/components/for-professionals/IndustryShowcase";
import TestimonialSlider from "@/components/for-professionals/TestimonialSlider";
import WhyProfessionalsLove from "@/components/for-professionals/WhyProfessionalsLove";
import PricingSection from "@/components/shop-gifts/PricingSection";

function ForProfessionalsPage() {
  return (
    <div>
      <ForProfessionalsHero></ForProfessionalsHero>
      <WhyProfessionalsLove></WhyProfessionalsLove>
      <IndustryShowcase></IndustryShowcase>
      <PricingSection></PricingSection>
      {/* <WhatSay></WhatSay> */}
      <TestimonialSlider></TestimonialSlider>
    </div>
  );
}

export default ForProfessionalsPage;
