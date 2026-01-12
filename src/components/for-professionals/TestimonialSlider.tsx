// Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import say1 from "@/assets/gallery/say1.png";
import say2 from "@/assets/gallery/g1.png";
const TestimonialSlider = () => {
  const testimonials = [
    {
      id: 1,
      name: "Jennifer Adams",
      role: "HR Director, Tech Solutions Inc.",
      text: "Employee appreciation has never been easier. Our team morale has improved significantly. GiftFromMi has transformed how I thank my clients. The automation saves me hours every week!",
      image: say1,
    },

    {
      id: 2,
      name: "Jennifer Adams",
      role: "HR Director, Tech Solutions Inc.",
      text: "Employee appreciation has never been easier. Our team morale has improved significantly. GiftFromMi has transformed how I thank my clients. The automation saves me hours every week!",
      image: say2,
    },
    {
      id: 3,
      name: "Jennifer Adams",
      role: "HR Director, Tech Solutions Inc.",
      text: "Employee appreciation has never been easier. Our team morale has improved significantly. GiftFromMi has transformed how I thank my clients. The automation saves me hours every week!",
      image: say1,
    },
    {
      id: 4,
      name: "Jennifer Adams",
      role: "HR Director, Tech Solutions Inc.",
      text: "Employee appreciation has never been easier. Our team morale has improved significantly. GiftFromMi has transformed how I thank my clients. The automation saves me hours every week!",
      image: say1,
    },
  ];

  return (
    <section className="xl:py-15 md:py-10 py-5">
      <div className="max-w-container mx-auto px-3">
        <h2 className="xl:text-5xl md:text-4xl text-3xl font-semibold text-center xl:mb-8 md:mb-6 mb-4 text-gray-900">
          What Professionals Say
        </h2>

        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          className="testimonial-swiper xl:pb-14! md:pb-10! !pb-8 hover:cursor-grab"
        >
          {testimonials.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="xl:grid grid-cols-1 md:grid-cols-2 items-center gap-8 bg-background p-4 md:p-6">
                {/* Image Section */}

                <div className="flex justify-end">
                  <div className="xl:w-154 xl:h-120 hidden xl:flex shadow-[0_7px_29px_0_rgba(100,100,111,0.20)] rounded-2xl border-4 border-solid border-background">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full rounded-2xl object-cover"
                    />
                  </div>
                </div>
                {/* Content Section */}
                <div
                  className="xl:h-120 xl:w-154 flex justify-start border shadow-[0_7px_29px_0_rgba(100,100,111,0.20)] rounded-2xl border-solid border-[rgba(27,29,30,0.10)];
  background: linear-gradient(136deg, #fff 0%, #eeedfd 139.71%); relative overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(136deg, #fff 0%, #eeedfd 139.71%)",
                  }}
                >
                  <div className="xl:hidden absolute opacity-60 w-full h-full">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full rounded-2xl object-cover"
                    />
                  </div>

                  <div className="xl:hidden absolute inset-0 bg-black opacity-50"></div>
                  <div className="flex flex-col justify-center px-4 md:px-12 py-8 z-10">
                    <p className="text-lg md:text-2xl leading-relaxed xl:text-slate-700 text-white mb-25 italic">
                      "{item.text}"
                    </p>
                    <div>
                      <h4 className="text-2xl font-bold text-primary-400 mb-1">
                        {item.name}
                      </h4>
                      <p className="xl:text-gray-500 text-white text-[18px] ">
                        {item.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Custom CSS for Pagination Dots */}
      <style>{`
        .testimonial-swiper .swiper-pagination {
          bottom: 0 !important;
        }
        .testimonial-swiper .swiper-pagination-bullet {
          width: 20px;
height: 6px;
          border-radius: 99999px;
          background: #E2E8F0;
          opacity: 1;
          transition: all 0.3s ease;
        }
        .testimonial-swiper .swiper-pagination-bullet-active {
          width: 56px;
height: 6px;
          background: #C88628 !important;
        }
      `}</style>
    </section>
  );
};

export default TestimonialSlider;
