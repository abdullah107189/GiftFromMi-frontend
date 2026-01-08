import { Button } from "../ui/button";
import shopHeroImg from "@/assets/banner_and_background/b1.png";
import sidbar1 from "@/assets/banner_and_background/sidebar1.png";
import sidbar2 from "@/assets/banner_and_background/sidebar2.png";
const ShopGiftsHero = () => {
  return (
    <section className="relative max-w-main md:mt-36 py-15    overflow-hidden">
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
        <div className="flex items-center justify-between gap-12 lg:gap-18">
          {/* Left Side: Content Area */}
          <div className="flex-1 flex flex-col items-start gap-4 order-2 lg:order-1">
            <span className="text-gray-900 font-medium text-lg">
              Shop Gifts
            </span>

            <h1 className="text-5xl font-playfair md:text-[56px] font-bold text-gray-900 leading-[1.2]">
              Find the Perfect Gift for <br className="hidden md:block" /> Every
              Moment
            </h1>

            <p className="text-gray-700 text-lg md:text-2xl leading-relaxed max-w-xl">
              Browse thoughtfully curated gift categories made for every
              occasion, every milestone, and every special person in your life.
            </p>

            <div className="mt-4">
              <Button showIcon={true}>Start Gifting</Button>
            </div>
          </div>

          {/* Right Side: Illustration Area */}
          <div className="flex-1 w-full order-1 lg:order-2">
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
