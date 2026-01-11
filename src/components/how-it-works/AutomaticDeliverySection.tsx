import FeatureContent from "../shared/content/FeatureContent";
import deliveryImage from "@/assets/gallery/h7.jpg"; // The delivery person image

const AutomaticDeliverySection = () => {
  const features = [
    "Real-time shipment tracking",
    "Automated delivery notifications",
    "Dashboard campaign management",
    "Delivery confirmation and receipts",
  ];

  return (
    <section className="xl:py-15 md:py-10 py-5 overflow-hidden">
      <div className="max-w-container mx-auto px-3">
        <div className="flex flex-col xl:flex-row items-center justify-between gap-12 xl:gap-24">
          {/* Left Side: Content Block */}
          <div className="w-full xl:w-1/2">
            <FeatureContent
              title="Automatic Delivery"
              description="We handle everything from packaging to shipping. Track all deliveries in your dashboard, receive notifications, and manage your campaigns effortlessly."
              features={features}
              className="w-full lg:w-150!"
            />
          </div>

          {/* Right Side: Featured Image */}
          <div className="flex-1 w-full xl:w-1/2">
            <div className="rounded-2xl overflow-hidden 2xl:w-[747.644px] xl:h-118.75 w-full h-auto">
              <img
                src={deliveryImage}
                alt="Delivery person with packages"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AutomaticDeliverySection;
