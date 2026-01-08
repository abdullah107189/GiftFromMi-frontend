import h1 from "@/assets/gallery/h1.jpg";
import { Button } from "../ui/button";

const HowItWorkHero = () => {
  return (
    <section className="mt-37.5 py-15 bg-gray-100">
      <div className="max-w-container mx-auto px-3">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-18">
          {/* Left Side: Content Area */}
          <div className="flex-1 flex flex-col items-start gap-4">
            <h1 className="text-5xl font-playfair md:text-[56px]  font-bold text-gray-900 leading-[1.2]">
              How Its Work
            </h1>

            <p className="text-gray-600  md:text-2xl leading-relaxed">
              Sending the perfect gift doesn&apos;t have to be complicated.
              We&apos;ve made the entire process simple, fast, and beautifully
              seamless from selecting your gift to delivery. Just follow a few
              easy steps and let us take care of the rest.
            </p>

            <div className="mt-4">
              {/* Using your button with the showIcon prop logic */}
              <Button showIcon={true} className="px-8 py-6 text-lg rounded-2xl">
                Start Gifting
              </Button>
            </div>
          </div>

          {/* Right Side: Image Area */}
          <div className="flex-1 w-full">
            <div className="relative rounded-2xl h-94.75 overflow-hidden shadow-sm">
              <img
                src={h1}
                alt="Person working on laptop"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorkHero;
