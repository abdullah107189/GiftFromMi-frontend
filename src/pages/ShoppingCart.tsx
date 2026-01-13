import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { IProduct } from "@/types";
import p1 from "@/assets/products/p1.png";
import p2 from "@/assets/products/p2.png";
import p3 from "@/assets/products/p3.png";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";

const cartItems: IProduct[] = [
  {
    id: 1,
    image: [p1],
    title: "Chocolate With Premium Box",
    description: "Experience the Taste of True Luxury",
    price: 20,
    oldPrice: 30,
    rating: 5,
    reviewsCount: 124,
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

export const ShoppingCart = () => {
  const [quantities, setQuantities] = useState<{ [key: number]: number }>(
    cartItems.reduce((acc, item) => ({ ...acc, [item.id]: 1 }), {})
  );

  const handleDecrease = (id: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) - 1),
    }));
  };

  const handleIncrease = (id: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] || 1) + 1,
    }));
  };

  const subTotal = cartItems.reduce(
    (acc, item) => acc + item.price * (quantities[item.id as number] || 1),
    0
  );
  const shipping = 24.0;
  const total = subTotal + shipping;
  return (
    <section className="relative max-w-main  md:mt-35 mt-20 py-5">
      <div className="px-3 max-w-container mx-auto">
        <h1 className="xl:text-5xl md:text-4xl text-3xl font-medium xl:mb-15 lg:mb-10 mb-5 text-gray-900">
          Shopping Gift Cart ({cartItems.length.toString().padStart(2, "0")}{" "}
          Items)
        </h1>

        <div className="grid grid-cols-1 xl:grid-cols-3 xl:gap-17.5 gap-10">
          {/* Products List */}
          <div className="lg:col-span-2 overflow-x-auto">
            <Table className="">
              <TableHeader>
                <TableRow className="bg-[#F0F1F1] border-none ">
                  <TableHead className="p-4 rounded-l-2xl xl:text-2xl font-semibold md:text-xl text-lg text-gray-900">
                    Product Details
                  </TableHead>
                  <TableHead className="p-4 text-center xl:text-2xl font-semibold md:text-xl text-lg text-gray-900">
                    Price
                  </TableHead>
                  <TableHead className="p-4 text-center xl:text-2xl font-semibold md:text-xl text-lg text-gray-900">
                    Quantity
                  </TableHead>
                  <TableHead className="p-4 text-center xl:text-2xl font-semibold md:text-xl text-lg text-gray-900">
                    Subtotal
                  </TableHead>
                  <TableHead className="p-4 rounded-r-2xl"></TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {cartItems.map((item) => (
                  <TableRow
                    key={item.id}
                    className="group border-none hover:bg-transparent"
                  >
                    {/* Product Details */}
                    <TableCell className="xl:pt-10 md:pt-8 pt-5 ">
                      <div className="flex   w-60 xl:gap-7.5 md:gap-5 gap-4">
                        <div className="xl:w-37.5 md:w-30 w-20 xl:h-38.25 md:h-30 h-20 rounded-lg bg-gray-100 shrink-0">
                          <img
                            src={item.image[0]}
                            className="w-full h-full object-cover rounded-xl"
                            alt={item.title}
                          />
                        </div>
                        <div className="flex max-w-40   relative flex-col justify-between gap-2">
                          <p className="font-medium xl:text-2xl md:text-xl text-lg text-gray-900 line-clamp-5 leading-tight whitespace-normal wrap-break-word">
                            {item.title}
                          </p>
                          <p className="text-gray-900 font-manrope">
                            Type: Gift Box
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    {/* Price */}
                    <TableCell className="p-4 text-center font-semibold font-manrope xl:text-2xl md:text-xl text-lg text-gray-700">
                      ${item.price.toFixed(2)}
                    </TableCell>

                    {/* Quantity */}
                    <TableCell>
                      <div className="flex items-center justify-center">
                        <div className="flex items-center bg-primary text-white rounded-2xl p-3 md:p-4 gap-3">
                          <button
                            onClick={() => handleDecrease(item?.id as number)}
                            className="hover:scale-110 border border-white p-1 rounded-lg transition-transform"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <path
                                d="M20 12H4"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>
                          <span className="font-semibold xl:text-2xl md:text-xl text-lg text-center min-w-[24px]">
                            {quantities[item.id as number] || 1}
                          </span>
                          <button
                            onClick={() => handleIncrease(item.id as number)}
                            className="hover:scale-110 border border-white p-1 rounded-lg transition-transform"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <path
                                d="M12 5V19.002"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M19.002 12.002H5"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </TableCell>

                    {/* Subtotal */}
                    <TableCell className=" text-center font-semibold xl:text-2xl lg:text-xl text-lg text-gray-700">
                      ${item.price.toFixed(2)}
                    </TableCell>

                    {/* Delete Button */}
                    <TableCell className="text-center">
                      <button className="p-3 text-red-400 border border-[#DF1C41] rounded-lg hover:bg-red-50 transition-colors group">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <path
                            d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5"
                            stroke="#DF1C41"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                          <path
                            d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5"
                            stroke="#DF1C41"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                          <path
                            d="M9.5 16.5V10.5"
                            stroke="#DF1C41"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                          <path
                            d="M14.5 16.5V10.5"
                            stroke="#DF1C41"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                        </svg>
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <Button className="mt-8  font-semibold h-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
              >
                <path
                  d="M7.70678 3.30529C7.51926 3.11782 7.26495 3.0125 6.99979 3.0125C6.73462 3.0125 6.48031 3.11782 6.29279 3.30529L0.292786 9.30529C0.105315 9.49282 0 9.74712 0 10.0123C0 10.2775 0.105315 10.5318 0.292786 10.7193L6.29279 16.7193C6.48139 16.9014 6.73399 17.0022 6.99619 17C7.25838 16.9977 7.5092 16.8925 7.6946 16.7071C7.88001 16.5217 7.98518 16.2709 7.98746 16.0087C7.98974 15.7465 7.88894 15.4939 7.70679 15.3053L3.41379 11.0123L14.9998 11.0123C15.265 11.0123 15.5194 10.9069 15.7069 10.7194C15.8944 10.5319 15.9998 10.2775 15.9998 10.0123C15.9998 9.74707 15.8944 9.49272 15.7069 9.30518C15.5194 9.11764 15.265 9.01229 14.9998 9.01229L3.41379 9.01229L7.70679 4.71929C7.89426 4.53176 7.99957 4.27745 7.99957 4.01229C7.99957 3.74712 7.89426 3.49281 7.70678 3.30529Z"
                  fill="currentColor"
                />
              </svg>
              Continue Gifting
            </Button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="md:p-6 p-4 bg-primary-50 border-primary rounded-4xl sticky top-36 shadow-sm">
              <h2 className="xl:text-[32px] md:text-2xl text-xl font-semibold text-center xl:mb-15.5 md:mb-10 mb-5 text-gray-900">
                Order Summary
              </h2>
              <div className="">
                <p className="md:text-lg md:pb-6 pb-4 font-semibold text-gray-900 ">
                  Product Details:
                </p>
                <div className="flex justify-between">
                  <span className="text-gray-900">Sub Total :</span>
                  <span className="font-semibold text-gray-900 text-xl">
                    ${subTotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between py-4">
                  <span className="text-gray-900">Shipping :</span>
                  <span className="font-semibold text-gray-900 text-xl">
                    ${shipping.toFixed(2)}
                  </span>
                </div>
                <hr className="border-gray-200 mb-4" />
                <div className="flex justify-between items-center">
                  <span className="text-gray-900 ">Total :</span>
                  <span className="text-xl font-semibold text-primary">
                    ${total.toFixed(2)}
                  </span>
                </div>
                <Button className="xl:mt-16 lg:mt-12 md:mt-10 mt-5 w-full">
                  Proceed Checkout
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
