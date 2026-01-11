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
    <section className="overflow-hidden">
      <div className="max-w-container mx-auto px-3 overflow-hidden py-35">
        <div className="flex lg:flex-col-reverse flex-col items-center gap-15 md:gap-20 xl:gap-24">
          {/* Left Side: Overlapping Images Area */}
          <div className="flex-1 relative order-2 lg:order-1">
            <div className="relative flex justify-end">
              {/* Main Image (Envelope) */}
              <div className="rounded-2xl overflow-hidden xl:w-[499.825px] xl:h-[460.474px] md:w-140 md:h-80 w-65 h-62 ">
                <img
                  src={mainImage}
                  alt="Envelope with card"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Top Overlapping Image (Mailbox Icon) */}
              <div className="absolute xl:-top-30 xl:-right-15 -top-15 -right-10 ">
                <div className="overflow-hidden w-37.5 xl:w-55">
                  <img
                    src={secondaryImage}
                    alt="Mailbox icon"
                    className="w-full h-full object-contain  xl:rounded-2xl rounded-xl "
                  />
                </div>
              </div>

              {/* Bottom Overlapping Image (Hands/Lists) */}
              <div className="absolute xl:-bottom-20 -bottom-10 xl:left-0 -left-10 w-35 xl:w-57 ">
                <div className=" overflow-hidden xl:h-50 h-35">
                  <img
                    src={mailboxIcon}
                    alt="Managing lists"
                    className="w-full h-full object-cover xl:rounded-2xl rounded-xl"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Content Block */}
          <div className="w-full xl:w-1/2 order-1 xl:flex justify-end  lg:order-2 ">
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
