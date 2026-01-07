import dashboardImg from "@/assets/feature-gift.png"; // Use your dashboard preview image

import FeatureContent from "../shared/content/FeatureContent";

const FeatureSection = () => {
  const features = [
    "Send one gift to 1 or 100 clients",
    "Multi-address shipping with custom branding",
    "CSV bulk upload for unlimited recipients",
    "Schedule gift dates automatically",
    "Keep your brand top of mind",
  ];

  return (
    <section className="pb-15">
      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-18">
        {/* Left Side: Dashboard Preview Image */}
        <div className="w-full">
          <img
            src={dashboardImg}
            alt="Dashboard Preview"
            className="w-full h-auto object-cover"
          />
        </div>

        <FeatureContent
          title=" Build For Busy Professional"
          description="Never forget a closing, anniversary, or VIP client again."
          features={features}
        ></FeatureContent>
      </div>
    </section>
  );
};

export default FeatureSection;
