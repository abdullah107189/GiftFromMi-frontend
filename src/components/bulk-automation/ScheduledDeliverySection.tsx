import FeatureContent from "../shared/content/FeatureContent";
import scheduledImg from "@/assets/gallery/b2.png";

const ScheduledDeliverySection = () => {
  const features = [
    "Calendar-based scheduling",
    "Per-recipient date selection",
    "Automatic reminders",
    "Holiday campaign templates",
  ];

  return (
    <section className="xl:py-15 md:py-10 py-5 overflow-hidden">
      <div className="max-w-container mx-auto px-3">
        <div className="flex flex-col lg:flex-row items-center xl:gap-4 md:gap-3 gap-2">
          {/* Left Side: Image with Border Frame */}
          <div className="w-full  flex justify-center lg:justify-start order-2 lg:order-1 mt-8 lg:mt-0">
            {/* Image Container with the same border */}
            <div className="relative rounded-2xl xl:w-167.5 w-full xl:h-100 md:h-90 sm:h-70 h-60 overflow-hidden xl:border-4 md:border-3 border-2 border-primary-200">
              <img
                src={scheduledImg}
                alt="Scheduled Delivery Planning"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Side: Content */}
          <div className="w-full lg:w-full order-1 lg:order-2">
            {/* Top Label with Clock Icon */}
            <div className="flex items-center gap-2 xl:mb-8 md:mb-6 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <g clip-path="url(#clip0_845_26213)">
                  <path
                    d="M3 12C3 13.1819 3.23279 14.3522 3.68508 15.4442C4.13738 16.5361 4.80031 17.5282 5.63604 18.364C6.47177 19.1997 7.46392 19.8626 8.55585 20.3149C9.64778 20.7672 10.8181 21 12 21C13.1819 21 14.3522 20.7672 15.4442 20.3149C16.5361 19.8626 17.5282 19.1997 18.364 18.364C19.1997 17.5282 19.8626 16.5361 20.3149 15.4442C20.7672 14.3522 21 13.1819 21 12C21 10.8181 20.7672 9.64778 20.3149 8.55585C19.8626 7.46392 19.1997 6.47177 18.364 5.63604C17.5282 4.80031 16.5361 4.13738 15.4442 3.68508C14.3522 3.23279 13.1819 3 12 3C10.8181 3 9.64778 3.23279 8.55585 3.68508C7.46392 4.13738 6.47177 4.80031 5.63604 5.63604C4.80031 6.47177 4.13738 7.46392 3.68508 8.55585C3.23279 9.64778 3 10.8181 3 12Z"
                    stroke="#CA8A32"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12 12L10 15"
                    stroke="#CA8A32"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12 7V12"
                    stroke="#CA8A32"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_845_26213">
                    <rect width="24" height="24" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <span className="text-primary-500 xl:text-lg text-base font-semibold uppercase">
                Scheduled Delivery
              </span>
            </div>

            <FeatureContent
              title="Plan Campaigns Months Ahead"
              description="Set it and forget it. Schedule gifts to arrive at the perfect moment for each recipient. Perfect timing drives higher impact and deeper client appreciation."
              features={features}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScheduledDeliverySection;
