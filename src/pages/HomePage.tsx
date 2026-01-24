import FAQ from "@/components/Home/FAQ";
import FeatureSection from "@/components/Home/FeatureSection";
import FeedbackSection from "@/components/Home/FeedbackSection";
import GiftCollection from "@/components/Home/GiftCollection";
import HeroSection from "@/components/Home/HeroSection";
import HowItWorks from "@/components/Home/HowItWorks";
import OccasionGallery from "@/components/Home/OccasionGallery";
import SEO from "@/components/shared/SEO";

function HomePage() {
  return (
    <div>
      <SEO
        title="Home"
        description="Personalized gifting platform for every occasion."
      />
      <HeroSection></HeroSection>
      <div className="max-w-container mx-auto px-3">
        <HowItWorks></HowItWorks>
        <GiftCollection></GiftCollection>
        <OccasionGallery></OccasionGallery>
        <FeatureSection></FeatureSection>
        <FeedbackSection></FeedbackSection>
      </div>
      <FAQ></FAQ>
    </div>
  );
}
export default HomePage;
