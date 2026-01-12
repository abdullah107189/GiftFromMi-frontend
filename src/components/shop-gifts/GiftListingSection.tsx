import p1 from "@/assets/products/p1.png";
import p2 from "@/assets/products/p2.png";
import p3 from "@/assets/products/p3.png";
import GiftBoxCard from "../shared/cards/GiftBoxCard";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import type { IProduct } from "@/types";
const GiftListingSection = () => {
  const PRODUCTS: IProduct[] = [
    {
      id: 1,
      image: [p1], // Array structure as per IProduct interface
      title: "Chocolate With Premium Box",
      description: "Experience the Taste of True Luxury",
      price: 20,
      oldPrice: 30,
      rating: 5,
      reviewsCount: 124, // Changed from "5/5" string to number
      stockCount: 15,
      inStock: true,
    },
    {
      id: 2,
      image: [p2],
      title: "Tech Accessories Pack",
      description: "Premium Wireless Charger, Phone Stand",
      price: 220,
      oldPrice: 300,
      rating: 5,
      reviewsCount: 85,
      stockCount: 12,
      inStock: true,
    },
    {
      id: 3,
      image: [p3],
      title: "Perfume box",
      description: "Experience the Premium Perfume",
      price: 20,
      oldPrice: 30,
      rating: 5,
      reviewsCount: 210,
      stockCount: 8,
      inStock: true,
    },
  ];
  const menu = [
    "All Gifts",
    "Gift Boxes",
    "Custom Item",
    "New Homeowner",
    "Holidays",
    "Birthday",
  ];
  const priceRanges = [
    "Under $50",
    "$50-$100",
    "$100-$150",
    "$150-$200",
    "$200-$250",
    "$250+",
  ];

  return (
    <section className="xl:py-15 md:py-10 py-5">
      <div className="max-w-container mx-auto px-3">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Side: Sidebar */}
          <aside className="w-full lg:w-1/4 flex flex-col xl:gap-8 md:gap-5 gap-4">
            {/* Categories Card */}
            <div className="border border-gray-200 rounded-2xl xl:px-8 md:px-5 p-4 py-4  ">
              <div className="flex items-center gap-2 mb-6 p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <g clip-path="url(#clip0_845_25274)">
                    <path
                      d="M20.7375 23.25H15.6375C14.25 23.25 13.125 22.125 13.125 20.7375V13.875C13.125 13.4625 13.4625 13.125 13.875 13.125H20.7375C22.125 13.125 23.25 14.25 23.25 15.6375V20.7375C23.25 22.125 22.125 23.25 20.7375 23.25ZM14.625 14.625V20.7375C14.625 21.3 15.075 21.75 15.6375 21.75H20.7375C21.3 21.75 21.75 21.3 21.75 20.7375V15.6375C21.75 15.075 21.3 14.625 20.7375 14.625H14.625ZM8.3625 23.25H3.2625C1.875 23.25 0.75 22.125 0.75 20.7375V15.6375C0.75 14.25 1.875 13.125 3.2625 13.125H10.125C10.5375 13.125 10.875 13.4625 10.875 13.875V20.7375C10.875 22.125 9.75 23.25 8.3625 23.25ZM3.2625 14.625C2.7 14.625 2.25 15.075 2.25 15.6375V20.7375C2.25 21.3 2.7 21.75 3.2625 21.75H8.3625C8.925 21.75 9.375 21.3 9.375 20.7375V14.625H3.2625ZM20.7375 10.875H13.875C13.4625 10.875 13.125 10.5375 13.125 10.125V3.2625C13.125 1.875 14.25 0.75 15.6375 0.75H20.7375C22.125 0.75 23.25 1.875 23.25 3.2625V8.3625C23.25 9.75 22.125 10.875 20.7375 10.875ZM14.625 9.375H20.7375C21.3 9.375 21.75 8.925 21.75 8.3625V3.2625C21.75 2.7 21.3 2.25 20.7375 2.25H15.6375C15.075 2.25 14.625 2.7 14.625 3.2625V9.375ZM10.125 10.875H3.2625C1.875 10.875 0.75 9.75 0.75 8.3625V3.2625C0.75 1.875 1.875 0.75 3.2625 0.75H8.3625C9.75 0.75 10.875 1.875 10.875 3.2625V10.125C10.875 10.5375 10.5375 10.875 10.125 10.875ZM3.2625 2.25C2.7 2.25 2.25 2.7 2.25 3.2625V8.3625C2.25 8.925 2.7 9.375 3.2625 9.375H9.375V3.2625C9.375 2.7 8.925 2.25 8.3625 2.25H3.2625Z"
                      fill="#CA8A32"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_845_25274">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>

                <h3 className="md:text-xl text-lg font-bold text-gray-700">
                  Categories
                </h3>
              </div>
              <ul className="flex flex-col xl:gap-4 gap-2">
                {menu?.map((cat, idx) => (
                  <li
                    key={idx}
                    className="flex justify-between items-center text-gray-600 hover:text-primary cursor-pointer transition-colors p-2"
                  >
                    <span>{cat}</span>
                    <span className="text-[16px]">102</span>
                  </li>
                ))}
              </ul>

              {/* Price Range Card */}
              <hr className="xl:my-6 md:my-4 my-2 text-gray-200" />
              <h3 className="text-xl font-bold text-gray-700 mb-6 p-2">
                Price Range
              </h3>
              <div className="flex flex-col xl:gap-4 gap-2">
                {priceRanges?.map((range, idx) => (
                  <label
                    key={idx}
                    className="flex items-center gap-3 cursor-pointer group p-2"
                  >
                    <div className="relative w-6 h-6 flex items-center justify-center">
                      {/* Hidden Native Checkbox */}
                      <input
                        type="checkbox"
                        className="peer absolute opacity-0 w-full h-full cursor-pointer z-10"
                      />

                      {/* Unchecked State SVG (Default Border) */}
                      <svg
                        className="absolute inset-0 w-full h-full  peer-checked:opacity-0"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M22.5594 1.44037C21.5992 0.480122 20.4428 0 19.0907 0H4.90898C3.55685 0 2.40055 0.480122 1.44019 1.44037C0.480122 2.40073 0 3.55679 0 4.90916V19.0909C0 20.443 0.480122 21.5992 1.44019 22.5596C2.40055 23.5199 3.55685 24.0001 4.90898 24.0001H19.0907C20.4428 24.0001 21.5988 23.5199 22.5595 22.5596C23.5198 21.5992 23.9998 20.443 23.9998 19.0909V4.90916C23.9996 3.55703 23.5195 2.40073 22.5594 1.44037ZM21.8178 19.0909C21.8178 19.8407 21.5509 20.4828 21.0169 21.0171C20.4828 21.5512 19.8409 21.8178 19.0906 21.8178H4.90898C4.15895 21.8178 3.51691 21.5512 2.98276 21.0171C2.44873 20.4828 2.18168 19.8407 2.18168 19.0909V4.90916C2.18168 4.15918 2.44873 3.51715 2.98276 2.98294C3.51691 2.44885 4.15895 2.18186 4.90898 2.18186H19.0907C19.8409 2.18186 20.4828 2.44891 21.0169 2.98294C21.551 3.51709 21.8178 4.15912 21.8178 4.90916V19.0909Z"
                          fill="#E5E7EB"
                        />
                      </svg>

                      {/* Checked State SVG (The same SVG but with Orange fill and a White Tick) */}
                      <div className="hidden peer-checked:flex items-center justify-center w-full h-full bg-primary rounded-md transition-all">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={4}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    </div>

                    <span className="text-gray-600 group-hover:text-primary transition-colors">
                      {range}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Right Side: Product Listing */}
          <main className="flex-1">
            {/* Top Bar: Search & Sort */}
            <div className="flex flex-col md:flex-row gap-4 justify-between mb-8">
              <div className="relative rounded-2xl flex-1 border border-gray-200">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full text-gray-700 py-3 pl-4 focus:outline-none focus:border-primary"
                />
                <button className="absolute p-2 cursor-pointer right-2 top-1/2 -translate-y-1/2 text-gray-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <g clip-path="url(#clip0_845_25336)">
                      <path
                        d="M3 10C3 10.9193 3.18106 11.8295 3.53284 12.6788C3.88463 13.5281 4.40024 14.2997 5.05025 14.9497C5.70026 15.5998 6.47194 16.1154 7.32122 16.4672C8.1705 16.8189 9.08075 17 10 17C10.9193 17 11.8295 16.8189 12.6788 16.4672C13.5281 16.1154 14.2997 15.5998 14.9497 14.9497C15.5998 14.2997 16.1154 13.5281 16.4672 12.6788C16.8189 11.8295 17 10.9193 17 10C17 9.08075 16.8189 8.1705 16.4672 7.32122C16.1154 6.47194 15.5998 5.70026 14.9497 5.05025C14.2997 4.40024 13.5281 3.88463 12.6788 3.53284C11.8295 3.18106 10.9193 3 10 3C9.08075 3 8.1705 3.18106 7.32122 3.53284C6.47194 3.88463 5.70026 4.40024 5.05025 5.05025C4.40024 5.70026 3.88463 6.47194 3.53284 7.32122C3.18106 8.1705 3 9.08075 3 10Z"
                        stroke="#364153"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M21 21L15 15"
                        stroke="#364153"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_845_25336">
                        <rect width="24" height="24" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </button>
              </div>
              <div className="flex items-center gap-4 ">
                <Select>
                  <SelectTrigger className="w-45 rounded-2xl h-12! z-10">
                    <SelectValue placeholder="Sort by: Featured" />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl mt-12">
                    <SelectGroup>
                      <SelectItem className="bg-transparent!" value="apple">
                        Price: Low to High
                      </SelectItem>
                      <SelectItem className="bg-transparent!" value="banana">
                        Price: High to Low
                      </SelectItem>
                      <SelectItem className="bg-transparent!" value="blueberry">
                        Newest
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Gift Grid Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-[20px] font-medium text-gray-900">
                Gift Boxes
              </h2>
              <Button variant={"outline"} className="text-gray-700 font-medium">
                View All
              </Button>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {PRODUCTS?.map((product) => {
                return (
                  <GiftBoxCard product={product} key={product.id}></GiftBoxCard>
                );
              })}
            </div>
          </main>
        </div>
      </div>
    </section>
  );
};

export default GiftListingSection;
