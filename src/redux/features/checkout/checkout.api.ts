import { baseApi } from "@/redux/baseApi";

export const checkoutApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Users
        checkout: builder.mutation({
            query: (data: FormData) => ({
                url: "/checkout",
                method: "POST",
                data,
                headers: { Accept: "application/json" },
            }),
            invalidatesTags: ["CART"],
            transformResponse: (res) => res,
        }),
        previewBulkCheckout: builder.mutation({
            query: (data: FormData) => ({
                url: "/cart/checkout/preview-bulk",
                method: "POST",
                data,
                headers: { Accept: "application/json" },
            }),
            transformResponse: (res) => res,
        }),
        calculateShippingFee: builder.mutation({
            query: (data: FormData) => ({
                url: "/cart/calculate-shipping",
                method: "POST",
                data,
                headers: { Accept: "application/json" },
            }),
            transformResponse: (res) => res.data,
        }),
    }),
});
export const { useCheckoutMutation, usePreviewBulkCheckoutMutation, useCalculateShippingFeeMutation } = checkoutApi;