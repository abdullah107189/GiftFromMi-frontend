import FAQ from "@/components/Home/FAQ";
import FeatureSection from "@/components/Home/FeatureSection";
import FeedbackSection from "@/components/Home/FeedbackSection";
import GiftCollection from "@/components/Home/GiftCollection";
import HeroSection from "@/components/Home/HeroSection";
import HowItWorks from "@/components/Home/HowItWorks";
import OccasionGallery from "@/components/Home/OccasionGallery";
import SEO from "@/components/shared/SEO";
import { useLangdingApiQuery } from "@/redux/features/public/public.api";
// import PageLoader from "@/components/shared/PageLoader";

function HomePage() {
  const { data: data, isLoading: isHomeLoading } =
    useLangdingApiQuery(undefined);
  // if (isHomeLoading) return <PageLoader></PageLoader>;

  return (
    <div>
      <SEO
        title="Home"
        description="Personalized gifting platform for every occasion."
      />
      <HeroSection></HeroSection>
      <div className="max-w-container mx-auto px-3">
        <HowItWorks></HowItWorks>
        <GiftCollection
          isHomeLoading={isHomeLoading}
          PRODUCTS={data?.products}
        ></GiftCollection>
        <OccasionGallery></OccasionGallery>
        <FeatureSection></FeatureSection>
        <FeedbackSection isHomeLoading={isHomeLoading} reviews={data?.reviews}></FeedbackSection>
      </div>
      <FAQ faqs={data?.faq}></FAQ>
    </div>
  );
}
export default HomePage;
