/* eslint-disable @typescript-eslint/no-explicit-any */
// import { Star } from "lucide-react";
import { SectionHeader } from "../shared/headers/SectionHeader";
import quote from "@/assets/icons/quote.svg";
import Rating from "../shared/Rating";

const FeedbackSection = ({
  isHomeLoading,
  reviews,
}: {
  isHomeLoading: boolean;
  reviews: any;
}) => {
  return (
    <section className="pt-15">
      <SectionHeader
        title=" Loved by professionals"
        subtitle="Join hundreds of professionals who are building stronger client relationships"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:gap-6 gap-3">
        {isHomeLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="bg-[radial-gradient(29.47%_53.61%_at_13.52%_10.21%,#FFFFFF_0%,#F8F8F8_100%)] xl:p-5 p-3 rounded-2xl border border-gray-200 flex flex-col animate-pulse"
              >
                {/* Profile skeleton */}
                <div className="flex justify-between items-start mb-5">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-full bg-gray-300" />
                    <div className="flex flex-col gap-1">
                      <div className="h-4 w-24 bg-gray-300 rounded" />
                      <div className="h-3 w-16 bg-gray-200 rounded" />
                    </div>
                  </div>

                  <div className="bg-background p-2 w-14 h-14 rounded-full" />
                </div>

                {/* Rating skeleton */}
                <div className="h-4 w-20 bg-gray-300 rounded mb-5" />

                {/* Review content skeleton */}
                <div className="space-y-2">
                  <div className="h-3 w-full bg-gray-200 rounded" />
                  <div className="h-3 w-5/6 bg-gray-200 rounded" />
                  <div className="h-3 w-3/4 bg-gray-200 rounded" />
                </div>
              </div>
            ))
          : reviews?.map((item: any, index: number) => (
              <div
                key={index}
                className="bg-[radial-gradient(29.47%_53.61%_at_13.52%_10.21%,#FFFFFF_0%,#F8F8F8_100%)] xl:p-5 p-3 rounded-2xl border border-gray-200 relative flex flex-col"
              >
                <div className="flex justify-between items-start mb-5">
                  <div className="flex items-center gap-4">
                    <img
                      src={item.avatar}
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

                <Rating rating={5} />
                <p className="text-gray-600 mt-5">{item.message}</p>
              </div>
            ))}
      </div>
    </section>
  );
};

export default FeedbackSection;
