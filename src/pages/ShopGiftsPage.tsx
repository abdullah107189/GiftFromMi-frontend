import GiftCategoriesSection from "@/components/shop-gifts/GiftCategoriesSection";
import GiftListingSection from "@/components/shop-gifts/GiftListingSection";
import ShopGiftsHero from "@/components/shop-gifts/ShopGiftsHero";
import SEO from "@/components/shared/SEO";
import { usePricingQueryQuery } from "@/redux/features/public/public.api";
import PageLoader from "@/components/shared/PageLoader";
import { useState } from "react";

function ShopGiftsPage() {
  const [selectedPrice, setSelectedPrice] = useState("");
  const {
    data: products,
    isLoading: isPricingLoading,
    isFetching,
  } = usePricingQueryQuery(selectedPrice);

  const handlePriceChange = (value: string) => {
    setSelectedPrice(value);
  };

  if (isPricingLoading) return <PageLoader />;

  const actions = {
    selectedPrice,
    handlePriceChange,
    isPricingLoading,
    isFetching,
  };
  return (
    <div>
      <SEO
        title="Shop Gifts"
        description="Browse our collection of personalized gifts."
      />
      <ShopGiftsHero></ShopGiftsHero>
      <GiftListingSection
        products={products}
        actions={actions}
      ></GiftListingSection>
      <GiftCategoriesSection categories={products}></GiftCategoriesSection>
    </div>
  );
}

export default ShopGiftsPage;
