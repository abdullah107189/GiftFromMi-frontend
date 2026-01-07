import hero from "@/assets/heros/hero.png";
import heroImage from "@/assets/heros/heroImage.png";
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
        className="min-h-225 w-full relative overflow-hidden"
        style={{
          backgroundImage: `url(${hero})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div className="relative max-w-container mx-auto px-3 h-full pt-41.25">
          <div className="flex flex-col items-center text-center">
            <span className="border border-primary-300 text-gray-700  px-14 py-3 rounded-xl  mb-15 text-2xl font-semibold">
              Perfect Gift Made Simple
            </span>

            <div className="flex items-center justify-between gap-12  w-full">
              {/* left side  */}
              <div className="w-1/2  flex flex-col items-start text-left">
                <h1 className="text-5xl lg:text-[80px] leading-[1.2] font-playfair text-gray-800 font-bold mb-6">
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
              <div className="relative   flex items-center justify-center lg:justify-end lg:w-1/2">
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
