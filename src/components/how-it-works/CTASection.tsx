import { Button } from "../ui/button";
import ctaBg from "@/assets/banner_and_background/bg1.png";

const CTASection = () => {
  return (
    <section
      className="xl:py-15 md:py-10 py-5 overflow-hidden bg-cover bg-center bg-no-repeat "
      style={{ backgroundImage: `url(${ctaBg})` }}
    >
      <div className="max-w-container mx-auto px-3">
        <div className="relative rounded-2xl ">
          <div className="relative z-10 flex flex-col items-center text-center px-6">
            <h2 className=" text-3xl md:text-4xl xl:text-5xl font-semibold text-white xl:mb-6 mb-3 leading-[1.1]">
              Ready to Send the <br className="hidden md:block" /> Perfect Gift?
            </h2>

            <p className="text-gray-300 xl:text-xl md:text-lg text-base max-w-xl mb-10 leading-relaxed">
              Discover a smooth, effortless gifting experience designed to
              impress from start to finish.
            </p>
            <Button showIcon={true}>Start Gifting</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
