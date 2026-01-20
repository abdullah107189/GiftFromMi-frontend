import CheckoutToggle from "@/components/Checkout/CheckoutToggle";
import { CustomerInfo } from "@/components/Checkout/CustomerInfo";
import { OrderSummary } from "@/components/Checkout/OrderSummary";
import { PaymentMethod } from "@/components/Checkout/PaymentMethod";

const CheckoutPage = () => {
  return (
    <section className="relative max-w-main xl:mt-36 md:mt-30 mt-15 xl:pb-15 md:pb-10 pb-5 overflow-hidden">
      <CheckoutToggle />
      <div className="max-w-container mx-auto px-3">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Side Components */}
          <div className="lg:col-span-7 space-y-10">
            <CustomerInfo />
            <PaymentMethod />
          </div>

          {/* Right Side Component */}
          <div className="lg:col-span-5">
            <OrderSummary />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckoutPage;
