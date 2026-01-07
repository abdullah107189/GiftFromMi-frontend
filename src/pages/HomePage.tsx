import GiftCollection from "@/components/home/GiftCollection";
import HeroSection from "@/components/home/HeroSection";
import HowItWorks from "@/components/home/HowItWorks";
import OccasionGallery from "@/components/home/OccasionGallery";

function HomePage() {
  return (
    <div>
      <HeroSection></HeroSection>
      <div className="max-w-container mx-auto">
        <HowItWorks></HowItWorks>
        <GiftCollection></GiftCollection>
        <OccasionGallery></OccasionGallery>
      </div>
    </div>
  );
}
export default HomePage;
