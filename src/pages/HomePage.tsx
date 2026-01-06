import hero from "@/assets/heros/hero.png";
function HomePage() {
  return (
    <div className="max-width-main">
      <div
        className="min-h-[900px] w-full relative overflow-hidden"
        style={{
          backgroundImage: `url(${hero})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        {/* ব্যাকগ্রাউন্ড গ্রিড লাইন (Fix: mx-auto এবং left-right 0) */}
        {/* <div
          className="absolute inset-y-0 left-[11%] right-[10%] max-width-container mx-auto z-0 pointer-events-none border-x border-[#D0A15A]/10"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(208, 161, 90, 0.1) 1px, transparent 1px)`,
            backgroundSize: "80px 100%",
            backgroundPosition: "center", // লাইনগুলো মাঝখান থেকে শুরু হবে
          }}
        /> */}

        {/* মেইন কন্টেন্ট কন্টেইনার */}
        <div className="relative z-10 max-width-container h-full pt-40">
          {" "}
          {/* pt-40 দিলাম কারণ নেভবার এখন absolute */}
          <div className="flex flex-col items-center text-center">
            <span className="border border-[#D0A15A] px-4 py-1 rounded-full text-[#C57200] text-sm mb-6 bg-white/50">
              Perfect Gift Made Simple
            </span>
            <h1 className="text-6xl font-serif text-[#101828] leading-[1.2]">
              Automated Gifting. <br /> Shipped All Year.
            </h1>
            <p className="text-[#364153] mt-6 max-w-[600px] text-lg">
              Send one gift design to 1 or 100 clients, each to a different
              address, on the dates you choose.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default HomePage;
