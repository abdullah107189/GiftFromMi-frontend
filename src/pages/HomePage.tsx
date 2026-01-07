import GiftCollection from "@/components/home/GiftCollection";
import HeroSection from "@/components/home/HeroSection";
import HowItWorks from "@/components/home/HowItWorks";

function HomePage() {
  return (
    <div>
      <HeroSection></HeroSection>
      <div className="max-w-container">
        <HowItWorks></HowItWorks>
        <GiftCollection></GiftCollection>
      </div>
      
    </div>
  );
}
export default HomePage;
