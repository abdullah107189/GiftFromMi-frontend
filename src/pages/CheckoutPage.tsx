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
} from "@/redux/features/cart/cartSelectors";
import { useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  checkoutSchema,
  type CheckoutCustomerFormData,
} from "@/zodValidation/checkout.schema";
import {
  useCalculateShippingFeeMutation,
  useCheckoutMutation,
  usePreviewBulkCheckoutMutation,
} from "@/redux/features/checkout/checkout.api";
import type { IBulkClientSelection } from "@/types/client";
import { toast } from "sonner";
import { useEffect, useMemo, useRef, useState } from "react";
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
    scheduled_at: safeTrim(data.scheduled_at),
  };

  return createFormData(payload);
}

const CheckoutPage = () => {
  const cartItems = useSelector(selectCartItemsArray);
  const subtotal = useSelector(selectCartSubtotal);
  const [shippingFee, setShippingFee] = useState(0);

  const [checkout, { isLoading: isCheckoutLoading }] = useCheckoutMutation();
  const [previewBulkCheckout, { isLoading: isBulkCheckoutLoading }] =
    usePreviewBulkCheckoutMutation();

  const [calculateShippingFee, { isLoading: isShippingFeeLoading }] =
    useCalculateShippingFeeMutation({});
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const isBulk = searchParams.get("type") === "bulk";
  const hydratedBulkSelectionRef = useRef<string | null>(null);

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
      saveInfo: false,
      bulkHeaders: [],
      bulkRows: [],
      scheduled_at: "",
    },
  });

  const bulkRows = methods.watch("bulkRows") ?? [];
  const bulkRecipientCount = isBulk && bulkRows.length > 0 ? bulkRows.length : 1;

  // In bulk checkout, the same cart is sent once for each CSV recipient row.
  const displayCartItems = useMemo(
    () =>
      cartItems.map((item) => ({
        ...item,
        qty: (item?.qty ?? 0) * bulkRecipientCount,
      })),
    [bulkRecipientCount, cartItems],
  );
  const displaySubtotal = subtotal * bulkRecipientCount;
  const orderTotal = displaySubtotal + shippingFee;

  // ✅ keep type synced with URL
  useEffect(() => {
    methods.setValue("type", isBulk ? "bulk" : "single", {
      shouldDirty: true,
      shouldTouch: true,
    });
  }, [isBulk, methods]);

  useEffect(() => {
    const shippingToastId = "checkout-shipping-fee";

    if (isShippingFeeLoading) {
      toast.loading("Calculating shipping fee...", {
        id: shippingToastId,
      });
      return;
    }

    toast.dismiss(shippingToastId);
  }, [isShippingFeeLoading]);

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
              items: displayCartItems,
              recipientCount: bulkRecipientCount,
              subtotal: displaySubtotal,
              shippingFee,
              total: orderTotal,
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
            // console.table(
            //   Array.from(formData.entries()).map(([key, value]) => ({
            //     key,
            //     value: String(value),
            //   })),
            // );
          }

          const res: any = await checkout(formData).unwrap();

          toast.success(res?.message || "Checkout completed successfully!");

          window.location.replace(res?.data?.url);
        } catch (err: any) {
          const backendErrors = err?.data?.errors ?? err?.data;

          toast.error(
            err?.data?.message ||
              "Checkout failed. Please check required fields.",
          );

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
  const handleCalculateShippingForSingle = async (
    countryCode: string,
    type: string,
  ) => {
    if (!countryCode) {
      setShippingFee(0);
      return;
    }

    try {
      const data = createFormData({
        type,
        shippingCountryCode: countryCode,
      });
      const shippingFeeResponse = await calculateShippingFee(data).unwrap();
      setShippingFee(shippingFeeResponse?.shipping_cost ?? 0);
    } catch {
      setShippingFee(0);
      toast.error("Unable to calculate shipping fee right now.");
    }
  };

  const handleCalculateShippingForBulk = async (file?: File) => {
    if (!file) {
      setShippingFee(0);
      return;
    }

    try {
      const data = new FormData();
      data.append("type", "bulk");
      data.append("csv_file", file);

      const shippingFeeResponse = await calculateShippingFee(data).unwrap();
      setShippingFee(shippingFeeResponse?.shipping_cost ?? 0);
    } catch {
      setShippingFee(0);
      toast.error("Unable to calculate bulk shipping right now.");
      throw new Error("Bulk shipping calculation failed");
    }
  };

  useEffect(() => {
    const navigationState = location.state as
      | { bulkClientSelection?: IBulkClientSelection }
      | undefined;
    const bulkClientSelection = navigationState?.bulkClientSelection;

    if (!isBulk || !bulkClientSelection) return;

    const selectionSignature = `${bulkClientSelection.fileName}:${bulkClientSelection.rows.length}:${bulkClientSelection.csvContent.length}`;

    if (hydratedBulkSelectionRef.current === selectionSignature) return;

    hydratedBulkSelectionRef.current = selectionSignature;

    const generatedFile = new File(
      [bulkClientSelection.csvContent],
      bulkClientSelection.fileName,
      { type: "text/csv" },
    );

    methods.setValue("type", "bulk", {
      shouldDirty: true,
      shouldTouch: true,
    });
    methods.setValue("bulkFile", generatedFile, {
      shouldDirty: true,
      shouldValidate: true,
    });
    methods.setValue("bulkHeaders", bulkClientSelection.headers, {
      shouldDirty: true,
    });
    methods.setValue("bulkRows", bulkClientSelection.rows, {
      shouldDirty: true,
    });

    void handleCalculateShippingForBulk(generatedFile);
  }, [isBulk, location.state, methods]);

  return (
    <FormProvider {...methods}>
      <section className="relative max-w-main xl:mt-36 md:mt-30 mt-15 xl:pb-15 md:pb-10 pb-5">
        <SEO title="Checkout" description="Complete your purchase securely." />
        <CheckoutToggle />

        <div className="max-w-container mx-auto px-3">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 space-y-10">
              {isBulk ? (
                <BulkCustomerInfo
                  handleCalculateShippingForBulk={
                    handleCalculateShippingForBulk
                  }
                />
              ) : (
                <CustomerInfo
                  handleCalculateShippingForSingle={
                    handleCalculateShippingForSingle
                  }
                />
              )}
              <PaymentMethod />
            </div>

            <div className="lg:col-span-5 sticky self-start top-40">
              <OrderSummary
                cartItems={displayCartItems}
                total={orderTotal}
                subtotal={displaySubtotal}
                shippingFee={shippingFee}
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
