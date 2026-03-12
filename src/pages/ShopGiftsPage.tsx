import GiftCategoriesSection from "@/components/shop-gifts/GiftCategoriesSection";
import GiftListingSection from "@/components/shop-gifts/GiftListingSection";
import ShopGiftsHero from "@/components/shop-gifts/ShopGiftsHero";
import SEO from "@/components/shared/SEO";
import { useCategorizedProductQuery } from "@/redux/features/public/public.api";
import PageLoader from "@/components/shared/PageLoader";

function ShopGiftsPage() {
  const { data, isLoading: categorizedProductLoading } =
    useCategorizedProductQuery(undefined);
  if (categorizedProductLoading) return <PageLoader />;
  console.log("data", data);

  return (
    <div>
      <SEO
        title="Shop Gifts"
        description="Browse our collection of personalized gifts."
      />
      <ShopGiftsHero></ShopGiftsHero>
      <GiftListingSection products={data}></GiftListingSection>
      <GiftCategoriesSection categories={data}></GiftCategoriesSection>
    </div>
  );
}

export default ShopGiftsPage;
