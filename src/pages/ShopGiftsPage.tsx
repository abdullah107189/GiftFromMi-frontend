import GiftCategoriesSection from "@/components/shop-gifts/GiftCategoriesSection";
import GiftListingSection from "@/components/shop-gifts/GiftListingSection";
import ShopGiftsHero from "@/components/shop-gifts/ShopGiftsHero";
import SEO from "@/components/shared/SEO";

function ShopGiftsPage() {
  return (
    <div>
      <SEO
        title="Shop Gifts"
        description="Browse our collection of personalized gifts."
      />
      <ShopGiftsHero></ShopGiftsHero>
      <GiftListingSection></GiftListingSection>
      <GiftCategoriesSection></GiftCategoriesSection>
    </div>
  );
}

export default ShopGiftsPage;
