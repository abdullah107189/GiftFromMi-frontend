import { Button } from "../ui/button";
import ctaBg from "@/assets/banner_and_background/bg1.png";

const CTASection = () => {
  return (
    <section
      className="py-15 overflow-hidden bg-cover bg-center bg-no-repeat "
      style={{ backgroundImage: `url(${ctaBg})` }}
    >
      <div className="max-w-container mx-auto px-3">
        <div className="relative rounded-2xl ">
          <div className="relative z-10 flex flex-col items-center text-center px-6">
            <h2 className="text-4xl md:text-5xl font-semibold text-white mb-6 leading-[1.1]">
              Ready to Send the <br className="hidden md:block" /> Perfect Gift?
            </h2>

            <p className="text-gray-300 text-lg md:text-xl max-w-xl mb-10 leading-relaxed">
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
