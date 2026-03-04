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
    }),
});
export const { useCheckoutMutation } = checkoutApi;
