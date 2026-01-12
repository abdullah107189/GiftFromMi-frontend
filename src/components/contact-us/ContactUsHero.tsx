import blukBg from "@/assets/banner_and_background/contactBg.jpg";
const ContactUsHero = () => {
  return (
    <section
      className={
        "relative w-full xl:h-112.5 md:h-90 h-50 max-w-main xl:mt-36 md:mt-30 mt-20 "
      }
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={blukBg} // Replace with your actual image path
          alt="Bulk and Automation Background"
          className="w-full h-full object-cover"
        />
        {/* Dark Overlay as per specification background: #1C1C1C */}
        <div className="absolute inset-0 bg-[#1C1C1C] opacity-50"></div>
      </div>

      {/* Content Container */}
      <div className="relative flex items-center  justify-center xl:h-112.5 md:h-90 h-50 z-10 max-w-container mx-auto px-3 text-center text-white">
        <div>
          {/* Main Heading */}
          <h1 className="xl:text-[56px] lg:text-5xl md:text-4xl text-3xl font-playfair font-semibold xl:mb-8 md:mb-6 mb-3">
            Contact Us
          </h1>
        </div>
      </div>
    </section>
  );
};

export default ContactUsHero;
