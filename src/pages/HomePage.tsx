import FAQ from "@/components/home/FAQ";
import FeatureSection from "@/components/home/FeatureSection";
import FeedbackSection from "@/components/home/FeedbackSection";
import GiftCollection from "@/components/home/GiftCollection";
import HeroSection from "@/components/home/HeroSection";
import HowItWorks from "@/components/home/HowItWorks";
import OccasionGallery from "@/components/home/OccasionGallery";

function HomePage() {
  return (
    <div>
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
