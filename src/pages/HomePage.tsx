import FAQ from "@/components/Home/FAQ";
import FeatureSection from "@/components/Home/FeatureSection";
import FeedbackSection from "@/components/Home/FeedbackSection";
import GiftCollection from "@/components/Home/GiftCollection";
import HeroSection from "@/components/Home/HeroSection";
import HowItWorks from "@/components/Home/HowItWorks";
import OccasionGallery from "@/components/Home/OccasionGallery";
import SEO from "@/components/shared/SEO";
import Loading from "@/components/shared/PageLoader";
import { useLangdingApiQuery } from "@/redux/features/public/langding.api";

function HomePage() {
  const { data, isLoading } = useLangdingApiQuery(undefined);
  if (isLoading) return <Loading variant="page"></Loading>;
  console.log(data.products);
  return (
    <div>
      <SEO
        title="Home"
        description="Personalized gifting platform for every occasion."
      />
      <HeroSection></HeroSection>
      <div className="max-w-container mx-auto px-3">
        <HowItWorks></HowItWorks>
        <GiftCollection PRODUCTS={data?.products}></GiftCollection>
        <OccasionGallery></OccasionGallery>
        <FeatureSection></FeatureSection>
        <FeedbackSection reviews={data?.reviews}></FeedbackSection>
      </div>
      <FAQ faqs={data?.faq}></FAQ>
    </div>
  );
}
export default HomePage;
