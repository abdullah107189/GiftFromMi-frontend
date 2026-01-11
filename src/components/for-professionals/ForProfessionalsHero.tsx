import { Button } from "../ui/button";

import sidbar1 from "@/assets/banner_and_background/sidebar1.png";
import sidbar2 from "@/assets/banner_and_background/sidebar2.png";
import bg2 from "@/assets/banner_and_background/bg2.png";
function ForProfessionalsHero() {
  return (
    <section className="relative max-w-main xl:mt-36 md:mt-30 mt-20 xl:py-15 md:py-10 py-5 overflow-hidden">
      {/* first bg group */}
      <div className="">
        <img
          className="absolute xl:w-[676.301px] xl:h-[347.417px] lg:w-125 md:w-100 w-50 h-40 rotate-[23.2deg] xl:-top-50 xl:-left-80 lg:-top-40 lg:-left-60 md:-top-32 -top-32 md:-left-40 -left-30 -z-10"
          src={sidbar1}
          alt=""
        />
        <img
          className="absolute xl:w-[676.301px] xl:h-[233.475px] lg:w-125 md:w-100 w-50 h-40 rotate-[23.2deg] xl:-bottom-17 xl:-left-70 lg:-bottom-10 lg:-left-50 md:-bottom-5 -bottom-5 md:-left-30 -left-30 -z-10"
          src={sidbar2}
          alt=""
        />
      </div>

      {/* second bg */}
      <div className="opacity-30 md:opacity-100">
        <img
          className="absolute xl:w-165.5 xl:h-112 lg:w-120 md:w-96 w-60 h-50 right-0 md:right-1/7 -top-10 md:-top-1/14 -z-1"
          src={bg2}
          alt="background image"
        />
      </div>
      <div className="max-w-container mx-auto px-3 flex flex-col items-center text-center">
        {/* Main Heading */}
        <h1 className="xl:text-[56px] lg:text-5xl md:text-4xl text-3xl font-semibold text-gray-900 leading-[1.1] md:max-w-[60%] mx-auto font-playfair">
          Client gifting made effortless for busy professionals.
        </h1>

        {/* Subtitle */}
        <p className="mt-4 xl:text-xl md:text-lg text-base text-gray-700 max-w-2xl leading-relaxed">
          Automate your client appreciation strategy and build lasting
          relationships without a hassle.
        </p>

        {/* Action Buttons */}
        <div className="xl:mt-17.5 lg:mt-13 md:mt-10 mt-8 flex flex-wrap items-center justify-center gap-4">
          {/* Primary Button: Create Free Account */}
          <Button showIcon={true}>Create Free Account</Button>

          {/* Secondary Button: Explore Gift Box */}
          <Button variant="outline">Explore Gift Box</Button>
        </div>
      </div>
    </section>
  );
}

export default ForProfessionalsHero;
