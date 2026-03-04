import { BulkCustomerInfo } from "@/components/Checkout/BulkCustomerInfo";
import CheckoutToggle from "@/components/Checkout/CheckoutToggle";
import { CustomerInfo } from "@/components/Checkout/CustomerInfo";
import { OrderSummary } from "@/components/Checkout/OrderSummary";
import { PaymentMethod } from "@/components/Checkout/PaymentMethod";
import SEO from "@/components/shared/SEO";
import {
  selectCartItemsArray,
  selectCartSubtotal,
  selectCartTotal,
} from "@/redux/features/cart/cartSelectors";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  checkoutSchema,
  type CheckoutCustomerFormData,
} from "@/zodValidation/checkout.schema";

const CheckoutPage = () => {
  const cartItems = useSelector(selectCartItemsArray);
  const total = useSelector(selectCartTotal);
  const subtotal = useSelector(selectCartSubtotal);

  const [searchParams] = useSearchParams();
  const isBulk = searchParams.get("type") === "bulk";
  const methods = useForm<CheckoutCustomerFormData>({
    resolver: zodResolver(checkoutSchema),
    mode: "onSubmit",
    defaultValues: {
      type: "single",
      name: "",
      email: "",
      phone: "",
      street_address: "",
      country: "",
      town_city: "",
      district: "",
      postcode: "",
      order_notes: "",
      shippingCountryCode: "",
      shippingCountry: "",
      shippingProvince: "",
      shippingCity: "",
      shippingAddress: "",
      logisticName: "",
      fromCountryCode: "",
      saveInfo: false,
    },
  });

  // ✅ Use handleSubmit so you always get the latest form values
  const handleProceedCheckout = methods.handleSubmit((data) => {
    console.log("CustomerInfo data from RHF:", data);
    // TODO: call your checkout API here
  });

  return (
    <FormProvider {...methods}>
      <section className="relative max-w-main xl:mt-36 md:mt-30 mt-15 xl:pb-15 md:pb-10 pb-5">
        <SEO title="Checkout" description="Complete your purchase securely." />
        <CheckoutToggle />

        <div className="max-w-container mx-auto px-3">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Side */}
            <div className="lg:col-span-7 space-y-10">
              {isBulk ? <BulkCustomerInfo /> : <CustomerInfo />}
              <PaymentMethod />
            </div>

            {/* Right Side */}
            <div className="lg:col-span-5 sticky self-start top-40">
              <OrderSummary
                cartItems={cartItems}
                total={total}
                subtotal={subtotal}
                onProceedCheckout={handleProceedCheckout}
              />
            </div>
          </div>
        </div>
      </section>
    </FormProvider>
  );
};

export default CheckoutPage;
