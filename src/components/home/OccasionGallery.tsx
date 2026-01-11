import React from "react";

import { Button } from "../ui/button";

import img1 from "@/assets/gallery/g1.png";
import img2 from "@/assets/gallery/g2.png";
import img3 from "@/assets/gallery/g3.png";
import img4 from "@/assets/gallery/g4.png";
import img5 from "@/assets/gallery/g5.png";
import img6 from "@/assets/gallery/g6.png";

const OccasionGallery: React.FC = () => {
  const galleryItems1 = [
    {
      id: 1,
      image: img1,
      tag: "Party Gift",
      className: "col-span-2",
    },
    {
      id: 2,
      image: img2,
      tag: "Tech Gift",
      className: "col-span-1 md:col-span-7",
    },
    { id: 3, image: img3, tag: "Premium", className: "col-span-3" },
  ];
  const galleryItems2 = [
    {
      id: 4,
      image: img4,
      tag: "Teddy Box",
      className: "col-span-3",
    },
    {
      id: 5,
      image: img5,
      tag: "Anniversary Gift",
      className: "col-span-3",
    },
    {
      id: 6,
      image: img6,
      tag: "Christmas",
      className: "col-span-1 md:col-span-6",
    },
  ];

  return (
    <section className=" pb-5 md:pb-10 xl:pb-15">
      <div className="max-w-container mx-auto px-3 ">
        {/* Title Section */}
        <div className="lg:my-10 xl:my-12 text-center">
          <h2 className="text-2xl md:text-4xl xl:text-5xl font-semibold text-gray-900 tracking-tight md:mb-4 xl:mb-6">
            Celebrate Every <span className="text-primary">Occasion</span>{" "}
            <br />
            with the Right Gift.
          </h2>
          <p className="md:text-lg xl:text-xl text-gray-700 w-[90%] mx-auto leading-relaxed mb-4 lg:mb-0">
            Life is full of moments worth celebrating. That's why we've curated
            thoughtful gifts for every occasion birthdays, holidays,
            anniversaries, housewarmings, and more. Choose your moment and make
            every celebration truly special.
          </p>
        </div>

        {/* Masonry-style Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6">
          {galleryItems1.map((item) => (
            <div
              key={item.id}
              className={`relative overflow-hidden rounded-2xl group ${
                // Mobile: col-span-1 (full width)
                // Desktop: follows your specific span logic
                item.id === 1
                  ? "md:col-span-2"
                  : item.id === 2
                  ? "md:col-span-7"
                  : "md:col-span-3"
              } h-70 md:h-50 xl:h-54.5`}
            >
              {/* Badge/Tag */}
              <div className="absolute top-2 md:top-4 right-2 md:right-4 z-10">
                <span className="bg-primary-100/80 backdrop-blur-sm text-gray-700 text-[10px] md:text-xs font-medium px-3 py-1 rounded-lg">
                  {item.tag}
                </span>
              </div>

              {/* Image */}
              <img
                src={item.image}
                alt={item.tag}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Subtle Overlay on Hover */}
              <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-300" />
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 mt-4 md:mt-6">
          {galleryItems2.map((item) => (
            <div
              key={item.id}
              className={`relative overflow-hidden rounded-2xl group ${
                // Mobile: col-span-1 (full width)
                // Desktop: follows your specific span logic
                item.id === 4
                  ? "md:col-span-3"
                  : item.id === 5
                  ? "md:col-span-3"
                  : "md:col-span-6"
              } h-70 md:h-45 xl:h-50`}
            >
              {/* Badge/Tag */}
              <div className="absolute top-2 md:top-4 right-2 md:right-4 z-10">
                <span className="bg-primary-100/80 backdrop-blur-sm text-gray-700 text-[10px] md:text-xs font-medium px-3 py-1 rounded-lg">
                  {item.tag}
                </span>
              </div>

              {/* Image */}
              <img
                src={item.image}
                alt={item.tag}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Subtle Overlay on Hover */}
              <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-300" />
            </div>
          ))}
        </div>

        {/* Browse Gift Button */}
        <div className="flex justify-center mt-8">
          <Button showIcon={true}>Browse Gift</Button>
        </div>
      </div>
    </section>
  );
};

export default OccasionGallery;
