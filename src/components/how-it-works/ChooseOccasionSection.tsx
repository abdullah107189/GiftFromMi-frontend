import mainImage from "@/assets/gallery/h2.jpg"; // The main image of couple
import secondaryImage from "@/assets/gallery/h3.png"; // The smaller overlapping image
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
    <section className="py-15 overflow-hidden">
      <div className="max-w-container mx-auto px-3">
        <div className="xl:flex items-center justify-between  gap-12 lg:gap-24">
          {/* Left Side: Content Block */}
          <div className="xl:w-1/2">
            <FeatureContent
              title="Choose Your Occasion / Gift"
              description="Browse by occasion or category and select the perfect gift box that fits your moment birthday, holiday, appreciation, or any special milestone."
              features={features}
              className="xl:w-150!"
            />
          </div>

          {/* Right Side: Overlapping Images */}
          <div className="flex-1 xl:w-1/2 my-12 xl:mt-0">
            <div className="relative w-full xl:max-w-200 ml-auto">
              <div className="rounded-2xl overflow-hidden w-[85%] md:w-[75%] xl:w-149 xl:h-127 ml-auto aspect-596/508 shadow-lg relative z-0">
                <img
                  src={mainImage}
                  alt="Couple with gift"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="absolute -bottom-[10%] xl:-bottom-[5%] -left-[1%] md:left-[10%] xl:-left-[10%] w-[35%] md:w-[30%] xl:w-57 xl:h-50.5! z-10">
                <div className=" overflow-hidden aspect-square">
                  <img
                    src={secondaryImage}
                    alt="Event setting"
                    className="w-full h-full object-cover rounded-xl"
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
