// import { Star } from "lucide-react";
import { SectionHeader } from "../shared/headers/SectionHeader";
import quote from "@/assets/icons/quote.svg";
import Rating from "../shared/Rating";

// Testimonial data from your image
const testimonials = [
  {
    name: "Tina Morris",
    role: "Creative Director",
    image: "https://i.pravatar.cc/150?u=tina", // Use your local image path
    rating: 5.0,
    content:
      "GiftFromMi has transformed how I connect with my clients. The automatic delivery and personalized touches make my clients feel truly valued. My referral rate has increased by 40%!",
  },
  {
    name: "Amanda Reyes",
    role: "Business Owner",
    image: "https://i.pravatar.cc/150?u=amanda",
    rating: 5.0,
    content:
      "A small business, managing client gifts used to be stressful. GiftFromMi made it effortless. Their customization options and branding quality are truly premium.",
  },
  {
    name: "Sarah Thompson",
    role: "Real Estate Agent",
    image: "https://i.pravatar.cc/150?u=sarah",
    rating: 5.0,
    content:
      "GiftFromMi has completely transformed the way I follow up with clients. Birthdays, move-in anniversaries, and milestone gifts go out automatically beautifully packaged and on time. My clients LOVE it.",
  },
  {
    name: "Jonathan Lee",
    role: "Sales Team Leader",
    image: "https://i.pravatar.cc/150?u=jonathan",
    rating: 5.0,
    content:
      "My team doesn't have to manually send gifts anymore. The dashboard, tracking, and scheduling are so smooth. It feels like having an extra team member.",
  },
  {
    name: "Marcus Hill",
    role: "Repeat User",
    image: "https://i.pravatar.cc/150?u=marcus",
    rating: 5.0,
    content:
      "I tried multiple gifting platforms, but none come close to GiftFromMi simplicity and elegance. It truly elevates client experience.",
  },
  {
    name: "Tina Morris", // Duplicate in your image reference
    role: "Creative Director",
    image: "https://i.pravatar.cc/150?u=tina2",
    rating: 5.0,
    content:
      "As a small business owner, client retention is everything. GiftFromMi makes it effortless to maintain relationships with personalized gifts. The dashboard tracking is incredibly helpful.",
  },
];

const FeedbackSection = () => {
  return (
    <section className="pb-15">
      <SectionHeader
        title=" Loved by professionals"
        subtitle="Join hundreds of professionals who are building stronger client
            relationships"
      ></SectionHeader>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:gap-6 gap-3">
        {testimonials.map((item, index) => (
          <div
            key={index}
            className="bg-[radial-gradient(29.47%_53.61%_at_13.52%_10.21%,#FFFFFF_0%,#F8F8F8_100%)] xl:p-5 p-3 rounded-2xl border border-gray-200 relative flex flex-col "
          >
            {/* Profile and Quote Icon */}
            <div className="flex justify-between items-start mb-5">
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-lg font-medium text-gray-900">
                    {item.name}
                  </h4>
                  <p className="text-xs text-gray-600">{item.role}</p>
                </div>
              </div>

              <div className="bg-background p-2 w-14 h-14 flex items-center justify-center rounded-full">
                <img src={quote} alt="quote logo" />
              </div>
            </div>

            <Rating rating={5}></Rating>
            {/* Review Content */}
            <p className="text-gray-600 mt-5">"{item.content}"</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeedbackSection;
