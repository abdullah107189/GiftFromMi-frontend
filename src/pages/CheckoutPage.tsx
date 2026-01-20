import { BulkCustomerInfo } from "@/components/Checkout/BulkCustomerInfo";
import CheckoutToggle from "@/components/Checkout/CheckoutToggle";
import { CustomerInfo } from "@/components/Checkout/CustomerInfo";
import { OrderSummary } from "@/components/Checkout/OrderSummary";
import { PaymentMethod } from "@/components/Checkout/PaymentMethod";
import { useState } from "react";

const CheckoutPage = () => {
  const [isBulk, setIsBulk] = useState(false);
  return (
    <section className="relative max-w-main xl:mt-36 md:mt-30 mt-15 xl:pb-15 md:pb-10 pb-5">
      <CheckoutToggle isBulk={isBulk} setIsBulk={setIsBulk} />
      <div className="max-w-container mx-auto px-3">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Side Components */}
          <div className="lg:col-span-7 space-y-10">
            {isBulk ? <BulkCustomerInfo /> : <CustomerInfo />}
            <PaymentMethod />
          </div>
          {/* Right Side Component */}
          <div className="lg:col-span-5 sticky self-start top-40">
            <OrderSummary />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CheckoutPage;
