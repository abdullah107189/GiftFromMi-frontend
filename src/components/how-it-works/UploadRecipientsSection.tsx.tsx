import FeatureContent from "../shared/content/FeatureContent";
import mainImage from "@/assets/gallery/h4.jpg"; // The central envelope image
import secondaryImage from "@/assets/gallery/h5.jpg"; // The bottom-left hands image
import mailboxIcon from "@/assets/gallery/h6.png"; // The top mailbox 3D icon

const UploadRecipientsSection = () => {
  const features = [
    "CSV bulk upload for hundreds of recipients",
    "Individual recipient management",
    "Custom notes for each person",
    "Schedule different delivery dates",
  ];

  return (
    <section className=" overflow-hidden">
      <div className="max-w-container mx-auto px-3 overflow-hidden py-35">
        <div className="flex flex-col lg:flex-row items-center   gap-12 lg:gap-24">
          {/* Left Side: Overlapping Images Area */}
          <div className="flex-1  relative order-2 lg:order-1">
            <div className="relative flex justify-end">
              {/* Main Image (Envelope) */}
              <div className="rounded-2xl overflow-hidden w-[499.825px] h-[460.474px]">
                <img
                  src={mainImage}
                  alt="Envelope with card"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Top Overlapping Image (Mailbox Icon) */}
              <div className="absolute -top-12 right-0 lg:-top-30 lg:-right-15">
                <div className="overflow-hidden w-37.5 lg:w-55">
                  <img
                    src={secondaryImage}
                    alt="Mailbox icon"
                    className="w-full h-full object-contain rounded-2xl "
                  />
                </div>
              </div>

              {/* Bottom Overlapping Image (Hands/Lists) */}
              <div className="absolute -bottom-10 left-0 lg:-bottom-20 lg:left-0 w-45 lg:w-57 ">
                <div className="rounded-2xl overflow-hidden h-50">
                  <img
                    src={mailboxIcon}
                    alt="Managing lists"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Content Block */}
          <div className="w-full lg:w-1/2 order-1 flex justify-end  lg:order-2 ">
            <FeatureContent
              title="Upload Your Recipients"
              description="Import your client list via CSV or add recipients manually. Include personalized notes, preferred delivery dates, and any special instructions for each recipient."
              features={features}
              className="w-full lg:w-150!"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default UploadRecipientsSection;
