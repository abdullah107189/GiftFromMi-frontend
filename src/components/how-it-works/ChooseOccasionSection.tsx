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
        <div className="flex items-center justify-between  gap-12 lg:gap-24">
          {/* Left Side: Content Block */}
          <div className="w-1/2">
            <FeatureContent
              title="Choose Your Occasion / Gift"
              description="Browse by occasion or category and select the perfect gift box that fits your moment birthday, holiday, appreciation, or any special milestone."
              features={features}
              className="w-150!"
            />
          </div>

          {/* Right Side: Overlapping Images */}
          <div className="flex-1 w-1/2 relative">
            <div className="relative">
              {/* Main Large Image */}
              <div className="rounded-2xl overflow-hidden w-149 h-127">
                <img
                  src={mainImage}
                  alt="Couple with gift"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Overlapping Small Image */}
              <div className="absolute -bottom-10 -left-40 w-1/2 ">
                <div className="rounded-2xl w-57 h-50.5 overflow-hidden">
                  <img
                    src={secondaryImage}
                    alt="Event setting"
                    className="w-full h-full object-cover"
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
