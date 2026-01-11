// Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import say1 from "@/assets/gallery/say1.png";
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
      image: say1,
    },
    {
      id: 2,
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
      image: say1,
    },
  ];

  return (
    <section className="py-15">
      <div className="max-w-container mx-auto px-3">
        <h2 className="text-5xl font-semibold text-center mb-8 text-gray-900">
          What Professionals Say
        </h2>

        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          className="testimonial-swiper !pb-14"
        >
          {testimonials.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 bg-background p-4 md:p-6">
                {/* Image Section */}

                <div className="flex justify-end">
                  <div className="w-154 h-120 shadow-[0_7px_29px_0_rgba(100,100,111,0.20)] rounded-2xl border-4 border-solid border-background">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full rounded-2xl object-cover"
                    />
                  </div>
                </div>
                {/* Content Section */}
                <div
                  className="h-120 w-154 flex justify-start border shadow-[0_7px_29px_0_rgba(100,100,111,0.20)] rounded-2xl border-solid border-[rgba(27,29,30,0.10)];
  background: linear-gradient(136deg, #fff 0%, #eeedfd 139.71%);"
                  style={{
                    background:
                      "linear-gradient(136deg, #fff 0%, #eeedfd 139.71%)",
                  }}
                >
                  <div className="flex flex-col justify-center px-4 md:px-12 py-8">
                    <p className="text-lg md:text-2xl leading-relaxed text-slate-700 mb-25 italic">
                      "{item.text}"
                    </p>
                    <div>
                      <h4 className="text-2xl font-bold text-primary-400 mb-1">
                        {item.name}
                      </h4>
                      <p className="text-gray-500 text-[18px] ">{item.role}</p>
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
