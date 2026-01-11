import hero from "@/assets/banner_and_background/HomeHeroBg.png";
import bgStar from "@/assets/banner_and_background/heroStar.png";
import heroImage from "@/assets/gallery/heroImage.png";
import { Button } from "../ui/button";
function HeroSection() {
  const statsData = [
    { id: 1, label: "500+ Happy Professionals" },
    { id: 2, label: "500+ Gift Delivered" },
    { id: 3, label: "98%+ Client Satisfaction" },
  ];

  return (
    <div className=" pb-15">
      <div
        className="md:min-h-225 w-full relative overflow-hidden"
        style={{
          backgroundImage: `url(${hero})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div className="relative max-w-container mx-auto px-3 h-full pt-21 md:pt-41.25">
          <div className="flex flex-col items-center text-center">
            <span className="border border-primary-300 text-gray-700  px-5 md:px-10 xl:px-14 py-1 md:py-3 rounded-xl mb-5 md:mb-10 xl:mb-15 xl:text-2xl md:text-lg font-semibold">
              Perfect Gift Made Simple
            </span>

            <div className="xl:flex items-center justify-between md:gap-10 xl:gap-12 w-full">
              {/* left side  */}
              <div className="xl:w-1/2 flex flex-col xl:items-start [1440px]:bg-red-600 items-center xl:text-left">
                <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-[80px] leading-[1.2] font-playfair text-gray-800 font-bold mb-6">
                  Automated Gifting. <br /> Shipped All Year.
                </h1>

                <p
                  className="mb-10 font-['Inter'] w-5/6"
                  style={{
                    color: "#6A7282",
                    fontSize: "24px",
                    fontWeight: "400",
                    lineHeight: "150%",
                    fontFeatureSettings: "'liga' off, 'clig' off",
                  }}
                >
                  Send one gift design to 1 or 100 clients, each to a different
                  address, on the dates you choose.
                </p>

                <div className="flex flex-wrap gap-4 mb-12">
                  <Button>Start Sending Gift</Button>
                  <Button variant="outline" className="">
                    Book a Setup Call
                  </Button>
                </div>

                <div className="flex flex-wrap gap-8 ml-4 items-center">
                  {statsData.map((stat) => (
                    <div key={stat.id} className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-primary" />
                      <span className="text-gray-700">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* right side  */}
              <div className="hidden xl:flex relative items-center justify-center lg:justify-end lg:w-1/2">
                <div
                  className="absolute -right-4 -bottom-55"
                  style={{
                    width: "782.43px",
                    height: "640.394px",
                  }}
                >
                  <img src={bgStar} alt="Gifting Box" className="absolute" />
                </div>
                <div
                  className="absolute left-23 -bottom-73 overflow-hidden "
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
export default HeroSection;
