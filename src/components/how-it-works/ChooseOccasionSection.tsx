import mainImage from "@/assets/gallery/h2.jpg"; // The main image of couple
import secondaryImage from "@/assets/beach-wedding.png"; // The smaller overlapping image
import FeatureContent from "../shared/content/FeatureContent";

const ChooseOccasionSection = () => {
  const features = [
    "Curated luxury gift collections",
    "Custom branding and logo placement",
    "Personalized message cards",
    "Gift wrapping and presentation options",
    "Keep your brand top of mind",
  ];

  return (
    <section className="py-15 bg-white overflow-hidden">
      <div className="max-w-container mx-auto px-4 lg:px-0">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          {/* Left Side: Content Block */}
          <div className="flex-1">
            <FeatureContent
              title="Choose Your Occasion / Gift"
              description="Browse by occasion or category and select the perfect gift box that fits your moment birthday, holiday, appreciation, or any special milestone."
              features={features}
            />
          </div>

          {/* Right Side: Overlapping Images */}
          <div className="flex-1 w-full relative">
            <div className="relative">
              {/* Main Large Image */}
              <div className="rounded-[32px] overflow-hidden shadow-sm">
                <img
                  src={mainImage}
                  alt="Couple with gift"
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Overlapping Small Image */}
              <div className="absolute -bottom-10 -left-10 w-1/2 hidden md:block">
                <div className="rounded-[24px] overflow-hidden border-8 border-white shadow-xl">
                  <img
                    src={secondaryImage}
                    alt="Event setting"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChooseOccasionSection;
