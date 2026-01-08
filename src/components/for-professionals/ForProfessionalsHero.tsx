import { Button } from "../ui/button";

import sidbar1 from "@/assets/banner_and_background/sidebar1.png";
import sidbar2 from "@/assets/banner_and_background/sidebar2.png";
function ForProfessionalsHero() {
  return (
    <section className="relative max-w-main md:mt-36 py-15 overflow-hidden">
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
      <div className="max-w-container mx-auto px-3 flex flex-col items-center text-center">
        {/* Main Heading */}
        <h1 className="text-[56px] font-semibold text-gray-900 leading-[1.1] max-w-[60%] mx-auto font-playfair">
          Client gifting made effortless for busy professionals.
        </h1>

        {/* Subtitle */}
        <p className="mt-4 text-xl text-gray-700 max-w-2xl leading-relaxed">
          Automate your client appreciation strategy and build lasting
          relationships without a hassle.
        </p>

        {/* Action Buttons */}
        <div className="mt-17.5 flex flex-wrap items-center justify-center gap-4">
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
