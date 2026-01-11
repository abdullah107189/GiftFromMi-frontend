import { Button } from "../ui/button";
import shopHeroImg from "@/assets/banner_and_background/b1.png";
import sidbar1 from "@/assets/banner_and_background/sidebar1.png";
import sidbar2 from "@/assets/banner_and_background/sidebar2.png";
const ShopGiftsHero = () => {
  return (
    <section className="relative max-w-main xl:mt-36 md:mt-30 mt-15 xl:py-15 md:py-10 py-5 overflow-hidden">
      <div>
        <img
          className="absolute w-[676.301px] h-[347.417px] rotate-[23.2deg] -top-50 -left-80"
          src={sidbar1}
          alt=""
        />
        <img
          className="absolute w-[676.301px] h-[233.475px] rotate-[23.2deg] -bottom-17 -left-70"
          src={sidbar2}
          alt=""
        />
      </div>

      <div className="max-w-container mx-auto px-3">
        <div className="xl:flex items-center justify-between md:gap-12 xl:gap-18 text-center xl:text-start">
          {/* Left Side: Content Area */}
          <div className="flex-1 flex flex-col xl:items-start items-center md:gap-4 gap-2 order-2 lg:order-1">
            <span className="text-gray-900 font-medium md:text-lg">
              Shop Gifts
            </span>

            <h1 className="font-playfair xl:text-[56px] lg:text-5xl md:text-4xl text-3xl font-bold text-gray-900 leading-[1.2]">
              Find the Perfect Gift for <br className="hidden md:block" /> Every
              Moment
            </h1>

            <p className="text-gray-700 xl:text-2xl lg:text-xlmd:text-lg text-base leading-relaxed max-w-xl">
              Browse thoughtfully curated gift categories made for every
              occasion, every milestone, and every special person in your life.
            </p>

            <div className="mt-4">
              <Button showIcon={true}>Start Gifting</Button>
            </div>
          </div>

          {/* Right Side: Illustration Area */}
          <div className="flex-1 hidden xl:flex w-full order-1 lg:order-2">
            <div className=" max-w-[600px] object-contain relative flex justify-center lg:justify-end">
              <img
                src={shopHeroImg}
                alt="Shop Gifts Illustration"
                className=" h-auto w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopGiftsHero;
