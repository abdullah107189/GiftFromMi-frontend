/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { useCheckoutMutation } from "@/redux/features/checkout/checkout.api";
import { toast } from "sonner";
import { useEffect } from "react";
import { createFormData } from "@/utils/createFormData";

function buildCheckoutFormData(data: CheckoutCustomerFormData) {
  const payload = {
    type: data.type,
    name: data.name.trim(),
    email: data.email.trim(),
    phone: data.phone.trim(),
    street_address: data.street_address.trim(),
    country: data.country.trim(),
    town_city: data.town_city.trim(),
    district: data.district.trim(),
    postcode: data.postcode?.trim() ?? "",
    order_notes: data.order_notes?.trim() ?? "",
    shippingCountryCode: data.shippingCountryCode.trim(),
    shippingCountry: data.shippingCountry.trim(),
    shippingProvince: data.shippingProvince.trim(),
    shippingCity: data.shippingCity.trim(),
    shippingAddress: data.shippingAddress.trim(),
    logisticName: data.logisticName.trim(),
    fromCountryCode: data.fromCountryCode.trim(),
  };

  return createFormData(payload);
}

const CheckoutPage = () => {
  const cartItems = useSelector(selectCartItemsArray);
  const total = useSelector(selectCartTotal);
  const subtotal = useSelector(selectCartSubtotal);

  const [checkout, { isLoading: isCheckoutLoading }] = useCheckoutMutation();

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

  // ✅ keep type synced with URL
  useEffect(() => {
    methods.setValue("type", isBulk ? "bulk" : "single", {
      shouldDirty: true,
      shouldTouch: true,
    });
  }, [isBulk, methods]);

  const handleProceedCheckout = methods.handleSubmit(async (data) => {
    try {
      const formData = buildCheckoutFormData(data);
      if (import.meta.env.DEV) {
        console.table(
          Array.from(formData.entries()).map(([key, value]) => ({
            key,
            value: String(value),
          })),
        );
      }

      const res: any = await checkout(formData).unwrap();

      toast.success(res?.message || "Checkout completed successfully!");

      window.location.replace(res?.data?.url);
    } catch (err: any) {
      const backendErrors = err?.data?.errors ?? err?.data;
      toast.error("Checkout failed. Please check required fields.");

      if (backendErrors && typeof backendErrors === "object") {
        Object.entries(backendErrors).forEach(([field, msgs]) => {
          const message = Array.isArray(msgs) ? String(msgs[0]) : String(msgs);
          methods.setError(field as keyof CheckoutCustomerFormData, {
            type: "server",
            message,
          });
        });
      }
    }
  });

  return (
    <FormProvider {...methods}>
      <section className="relative max-w-main xl:mt-36 md:mt-30 mt-15 xl:pb-15 md:pb-10 pb-5">
        <SEO title="Checkout" description="Complete your purchase securely." />
        <CheckoutToggle />

        <div className="max-w-container mx-auto px-3">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 space-y-10">
              {isBulk ? <BulkCustomerInfo /> : <CustomerInfo />}
              <PaymentMethod />
            </div>

            <div className="lg:col-span-5 sticky self-start top-40">
              <OrderSummary
                cartItems={cartItems}
                total={total}
                subtotal={subtotal}
                isCheckoutLoading={isCheckoutLoading}
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
