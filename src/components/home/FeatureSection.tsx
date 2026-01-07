import dashboardImg from "@/assets/feature-gift.png"; // Use your dashboard preview image
import { IconCheckbox } from "@tabler/icons-react";

const FeatureSection = () => {
  const features = [
    "Send one gift to 1 or 100 clients",
    "Multi-address shipping with custom branding",
    "CSV bulk upload for unlimited recipients",
    "Schedule gift dates automatically",
    "Keep your brand top of mind",
  ];

  return (
    <section className="py-15">
      <div className="max-w-container mx-auto px-4 lg:px-0">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-18">
          {/* Left Side: Dashboard Preview Image */}
          <div className="flex-1 w-full order-2 lg:order-1">
            <img
              src={dashboardImg}
              alt="Dashboard Preview"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Right Side: Content Area */}
          <div className="flex-1 flex flex-col items-start gap-6 order-1 lg:order-2">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-700 leading-[1.1] tracking-tight">
              Build For Busy Professional
            </h2>

            <p className="text-gray-500 text-lg font-medium ">
              Never forget a closing, anniversary, or VIP client again.
            </p>

            {/* Feature List */}
            <div className="flex flex-col gap-4 w-full">
              {features.map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="text-primary-400">
                    <IconCheckbox stroke={1.5} size={32} />
                  </div>
                  <span className="text-gray-600 text-lg font-medium">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
