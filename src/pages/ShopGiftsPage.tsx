import GiftCategoriesSection from "@/components/shop-gifts/GiftCategoriesSection";
import GiftListingSection from "@/components/shop-gifts/GiftListingSection";
import ShopGiftsHero from "@/components/shop-gifts/ShopGiftsHero";

function ShopGiftsPage() {
  return (
    <div>
      <ShopGiftsHero></ShopGiftsHero>
      <GiftListingSection></GiftListingSection>
      <GiftCategoriesSection></GiftCategoriesSection>
    </div>
  );
}

export default ShopGiftsPage;
  