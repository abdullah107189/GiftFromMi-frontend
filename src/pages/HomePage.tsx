import hero from "@/assets/heros/hero.png";
import heroImage from "@/assets/heros/heroImage.png";
import ActionButton from "@/components/shared/button/ActionButton";
function HomePage() {
  return (
    <div className="max-width-main">
      <div
        className="min-h-225 w-full relative overflow-hidden"
        style={{
          backgroundImage: `url(${hero})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div className="relative max-w-container mx-auto h-full pt-41.25">
          <div className="flex flex-col items-center text-center">
            <span className="border border-[#DBB176] px-8 py-4 rounded-full text-foreground mb-6 text-2xl font-semibold">
              Perfect Gift Made Simple
            </span>

            <div className="flex items-center justify-between gap-12  w-full">
              <div className="w-1/2  flex flex-col items-start text-left">
                <h1 className="text-5xl lg:text-[72px] leading-[1.1] font-['Playfair_Display'] text-[#101828] mb-6">
                  Automated Gifting. <br /> Shipped All Year.
                </h1>

                <p className="text-lg text-[#364153] max-w-[520px] mb-10 leading-[1.6]">
                  Send one gift design to 1 or 100 clients, each to a different
                  address, on the dates you choose.
                </p>

                <div className="flex flex-wrap gap-4 mb-12">
                  <ActionButton className="h-[56px] px-8 rounded-[16px]">
                    Start Sending Gift
                  </ActionButton>
                  <ActionButton
                    variant="outline"
                    className="h-[56px] px-8 rounded-[16px] border-[#D0A15A] text-[#C57200]"
                  >
                    Book a Setup Call
                  </ActionButton>
                </div>

                <div className="flex flex-wrap gap-8 items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#D0A15A]" />
                    <span className="text-sm text-[#364153]">
                      500+ Happy Professionals
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#D0A15A]" />
                    <span className="text-sm text-[#364153]">
                      500+ Gift Delivered
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#D0A15A]" />
                    <span className="text-sm text-[#364153]">
                      98%+ Client Satisfaction
                    </span>
                  </div>
                </div>
              </div>

              {/* right side  */}
              <div className="relative  w-1/2 flex items-center justify-center lg:justify-end lg:w-1/2">
                <div
                  className="absolute left-25 -bottom-88 overflow-hidden "
                  style={{
                    width: "482.43px",
                    height: "640.394px",
                    borderRadius: "241px / 320px",
                    transform: "rotate(40.927deg)",
                    aspectRatio: "482.43 / 640.39",
                  }}
                >
                  <img
                    src={heroImage}
                    alt="Gifting Box"
                    className="absolute top-1/2 left-1/2 min-w-[155%]"
                    style={{
                      transform:
                        "translate(-50%, -50%) rotate(-40.927deg) scale(0.75)",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default HomePage;
