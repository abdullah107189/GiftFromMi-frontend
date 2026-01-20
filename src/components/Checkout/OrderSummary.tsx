import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export function OrderSummary() {
  const cartItems = [
    { id: 1, name: "Tech Box", qty: 1, price: 25.5 },
    { id: 2, name: "Gift Box", qty: 2, price: 8.0 },
    { id: 3, name: "Premium Watch", qty: 1, price: 30.0 },
  ];

  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
  const shipping = 5.0;
  const total = subtotal + shipping;

  return (
    <div className="bg-white rounded-2xl md:p-6 p-4 border border-gray-100 sticky top-8">
      <div className="flex items-center gap-4 mb-8 justify-center">
        <div className="w-12 h-12 rounded-full bg-primary p-3 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
          >
            <path
              d="M31.1386 6.81017C31.1386 6.61167 31.0796 6.41765 30.9691 6.25276C30.8586 6.08787 30.7015 5.95955 30.5179 5.88411L16.3775 0.0750842C16.1337 -0.0250281 15.8604 -0.0250281 15.6166 0.0750842L1.47618 5.88411C1.29256 5.95954 1.13552 6.08785 1.025 6.25275C0.914475 6.41764 0.855466 6.61166 0.855469 6.81017V25.1898C0.855466 25.3883 0.914475 25.5824 1.025 25.7473C1.13552 25.9121 1.29256 26.0405 1.47618 26.1159L15.6166 31.9249C15.8599 32.025 16.1329 32.025 16.3762 31.9249C16.3883 31.9208 15.8529 32.1404 30.5179 26.1159C30.7015 26.0405 30.8586 25.9121 30.9691 25.7473C31.0796 25.5824 31.1386 25.3883 31.1386 25.1898V6.81017ZM15.997 11.621L10.7868 9.48066L22.0467 4.56873L27.6053 6.85228L15.997 11.621ZM2.85776 8.38797L7.35297 10.2346V15.4446C7.35297 15.9975 7.80123 16.4458 8.35411 16.4458C8.907 16.4458 9.35526 15.9975 9.35526 15.4446V11.0572L14.9959 13.3744V29.5052L2.85776 24.5187V8.38797ZM15.997 2.08345L19.4676 3.5092L8.20782 8.42114L4.38876 6.85222L15.997 2.08345ZM16.9982 13.3744L29.1363 8.38797V24.5187L16.9982 29.5052V13.3744Z"
              fill="white"
            />
          </svg>
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">
            Yur Order Summry
          </h2>
          <p className="text-gray-900">Please provide your contact details</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex justify-between text-[18px] font-semibold text-gray-900   pb-4 border-b border-[#EBECF0]">
          <span>Product</span>
          <span>Subtotal</span>
        </div>

        {/* Dynamic Product List */}
        <div className="space-y-5">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-start self-stretch"
            >
              <div className="space-y-0.5">
                <p className="  font-medium text-gray-900">{item.name}</p>
                <p className="text-sm text-gray-900">Qty: {item.qty}</p>
              </div>
              <p className="text-2xl font-semibold text-gray-900 font-manrope">
                ${item.price.toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        {/* Calculation Section */}
        <div className="space-y-4">
          <div className="flex justify-between items-center border-y border-[#EBECF0] md:py-6 py-4">
            <span className="text-gray-600 ">Subtotal</span>
            <span className="text-2xl font-semibold font-manrope">
              ${subtotal.toFixed(1)}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-xlfont-semibold text-gray-900">Total</span>
            <span className="text-3xl font-semibold text-primary font-manrope">
              ${subtotal.toFixed(2)}
            </span>
          </div>

          <div className="space-y-4 pt-2">
            <RadioGroup defaultValue="free" className="space-y-3">
              <p className="text-xl text-gray-900">Shipping</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <RadioGroupItem
                    value="free"
                    id="free"
                    className="text-primary active:border-primary! border-gray-200"
                  />
                  <div>
                    <Label htmlFor="free" className="text-gray-900 text-base">
                      Free Delivery
                    </Label>
                    <span className="text-sm text-gray-900">
                      For orders above $25
                    </span>
                  </div>
                </div>
                <span className="text-2xl font-semibold text-primary">
                  Free
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <RadioGroupItem
                    value="express"
                    id="express"
                    className="text-primary active:border-primary! border-gray-200"
                  />
                  <Label htmlFor="express" className="text-base text-gray-900">
                    Express Delivery
                  </Label>
                </div>
                <span className="text-2xl font-semibold text-gray-900 font-manrope">
                  $5.00
                </span>
              </div>
            </RadioGroup>
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-gray-100">
            <span className="text-xl font-semibold text-gray-900">Total</span>
            <span className="text-3xl font-semibold text-primary font-manrope">
              ${total.toFixed(2)}
            </span>
          </div>
        </div>

        <button className="w-full h-14 bg-primary text-white font-medium rounded-2xl">
          Pracced Checkout
        </button>

        <div className="flex flex-col items-center gap-1 opacity-60">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M2.84456 12.5631C2.99448 13.6767 3.91677 14.549 5.03912 14.6006C5.98353 14.644 6.94288 14.6667 7.99935 14.6667C9.05582 14.6667 10.0151 14.644 10.9595 14.6006C12.0819 14.549 13.0042 13.6767 13.1541 12.5631C13.252 11.8365 13.3327 11.0917 13.3327 10.3333C13.3327 9.57493 13.252 8.8302 13.1541 8.10353C13.0042 6.99 12.0819 6.11766 10.9595 6.06606C10.0151 6.02265 9.05582 6 7.99935 6C6.94288 6 5.98353 6.02265 5.03912 6.06606C3.91677 6.11766 2.99448 6.99 2.84456 8.10353C2.74672 8.8302 2.66602 9.57493 2.66602 10.3333C2.66602 11.0917 2.74672 11.8365 2.84456 12.5631Z"
                stroke="#85888E"
              />
              <path
                d="M5 6.00016V4.3335C5 2.67664 6.34315 1.3335 8 1.3335C9.65687 1.3335 11 2.67664 11 4.3335V6.00016"
                stroke="#85888E"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M10.666 10.3267V10.3333"
                stroke="#85888E"
                stroke-width="1.33333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M8 10.3267V10.3333"
                stroke="#85888E"
                stroke-width="1.33333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M5.33398 10.3267V10.3333"
                stroke="#85888E"
                stroke-width="1.33333"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <div className="">
              <p className="text-sm text-gray-500">
                Your personal details are safe with us.
              </p>
              <p className="text-sm text-gray-500">
                Payments are processed securely.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
