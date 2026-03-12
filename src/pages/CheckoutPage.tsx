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
import {
  useCheckoutMutation,
  usePreviewBulkCheckoutMutation,
} from "@/redux/features/checkout/checkout.api";
import { toast } from "sonner";
import { useEffect } from "react";
import { createFormData } from "@/utils/createFormData";

function safeTrim(value?: string) {
  return value?.trim() ?? "";
}

function buildCheckoutFormData(data: CheckoutCustomerFormData) {
  const payload = {
    type: data.type,
    name: safeTrim(data.name),
    email: safeTrim(data.email),
    phone: safeTrim(data.phone),
    street_address: safeTrim(data.street_address),
    country: safeTrim(data.country),
    town_city: safeTrim(data.town_city),
    district: safeTrim(data.district),
    postcode: safeTrim(data.postcode) || undefined,
    order_notes: safeTrim(data.order_notes) || undefined,
    shippingCountryCode: safeTrim(data.shippingCountryCode),
    shippingCountry: safeTrim(data.shippingCountry),
    shippingProvince: safeTrim(data.shippingProvince),
    shippingCity: safeTrim(data.shippingCity),
    shippingAddress: safeTrim(data.shippingAddress),
    // logisticName: safeTrim(data.logisticName) || undefined,
    fromCountryCode: safeTrim(data.fromCountryCode),
    scheduled_at: safeTrim(data.scheduled_at),
  };

  return createFormData(payload);
}

const CheckoutPage = () => {
  const cartItems = useSelector(selectCartItemsArray);
  const total = useSelector(selectCartTotal);
  const subtotal = useSelector(selectCartSubtotal);

  const [checkout, { isLoading: isCheckoutLoading }] = useCheckoutMutation();
  const [previewBulkCheckout, { isLoading: isBulkCheckoutLoading }] =
    usePreviewBulkCheckoutMutation();

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
      // logisticName: "",
      fromCountryCode: "",
      saveInfo: false,
      bulkHeaders: [],
      bulkRows: [],
      scheduled_at: "",
    },
  });

  // ✅ keep type synced with URL
  useEffect(() => {
    methods.setValue("type", isBulk ? "bulk" : "single", {
      shouldDirty: true,
      shouldTouch: true,
    });
  }, [isBulk, methods]);

  const handleProceedCheckout = async () => {
    await methods.handleSubmit(
      async (data) => {
        if (data.type === "bulk") {
          const bulkFormData = new FormData();
          bulkFormData.append("type", "bulk");
          bulkFormData.append("csv_file", data.bulkFile as File);

          const bulkPayload = {
            fileName: data.bulkFile?.name ?? "",
            fileSize: data.bulkFile?.size ?? 0,
            headers: data.bulkHeaders ?? [],
            rows: data.bulkRows ?? [],
          };

          console.log("Bulk checkout payload:", bulkPayload);
          console.log("Order preview:", {
            items: cartItems,
            subtotal,
            total,
          });

          try {
            const previewResult =
              await previewBulkCheckout(bulkFormData).unwrap();
            if (previewResult.status === 200) {
              toast.success(
                previewResult?.message ||
                  "Bulk preview completed successfully!",
              );
            } else {
              toast.error(
                previewResult?.message ||
                  "Bulk preview failed. Please try again.",
              );
              return;
            }
            const res: any = await checkout(bulkFormData).unwrap();
            toast.success(res?.message || "Checkout completed successfully!");
            window.location.replace(res?.data?.url);
          } catch (err: any) {
            const message =
              err?.data?.message ?? "Bulk preview failed. Please try again.";
            toast.error(message);
          }
          return;
        }

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
              const message = Array.isArray(msgs)
                ? String(msgs[0])
                : String(msgs);
              methods.setError(field as keyof CheckoutCustomerFormData, {
                type: "server",
                message,
              });
            });
          }
        }
      },
      () => {
        toast.error(
          isBulk
            ? "Please upload a valid CSV file before continuing."
            : "Please complete the required checkout fields.",
        );
      },
    )();
  };

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
                isCheckoutLoading={isCheckoutLoading || isBulkCheckoutLoading}
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
