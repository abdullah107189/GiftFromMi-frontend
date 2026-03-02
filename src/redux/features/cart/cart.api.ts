import { baseApi } from "@/redux/baseApi";

export const cartApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addToCart: builder.mutation({
            query: (cartInfo: { product_variant_id: number, quantity: number }) => ({
                url: "/cart/add",
                method: "POST",
                data: cartInfo,
            })
        }),
        updateCart: builder.mutation({
            query: (cartInfo: { cart_item_id: number; quantity: number }) => ({
                url: "/cart/update",
                method: "PUT",
                data: cartInfo,
            })
        }),

        removeCart: builder.mutation({
            query: (cartInfo: { cart_item_id: number; }) => ({
                url: "/cart/remove",
                method: "POST",
                data: cartInfo,
            })
        }),
        clearCart: builder.mutation({
            query: (cartInfo: { cart_item_id: number; }) => ({
                url: "/cart/clear",
                method: "POST",
                data: cartInfo,
            })
        }),
    })
})
export const { useAddToCartMutation, useUpdateCartMutation } = cartApi;