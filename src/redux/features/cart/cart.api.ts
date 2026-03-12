/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/baseApi";
import { normalizeCartItems } from "./cartUtils";

type AddToCartPayload = {
    product_variant_id: number;
    quantity: number;
};

type UpdateCartPayload = {
    cart_item_id: number;
    quantity: number;
};

type CartItemActionPayload = {
    cart_item_id: number;
};

export const cartApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllCartItems: builder.query({
            query: () => ({
                url: "/cart",
                method: "GET",
            }),
            providesTags: ["CART"],
            transformResponse: (res: any) => normalizeCartItems(res.data),
        }),
        addToCart: builder.mutation<any, AddToCartPayload>({
            query: (cartInfo) => ({
                url: "/cart/add",
                method: "POST",
                data: cartInfo,
            }),
        }),
        updateCart: builder.mutation<any, UpdateCartPayload>({
            query: (cartInfo) => {
                const formData = new FormData();
                formData.append("cart_item_id", String(cartInfo.cart_item_id));
                formData.append("quantity", String(cartInfo.quantity));
                return {
                    url: "/cart/update",
                    method: "POST",
                    data: formData,
                };
            },
        }),

        removeCart: builder.mutation<any, CartItemActionPayload>({
            query: (cartInfo) => {
                const formData = new FormData();
                formData.append("cart_item_id", String(cartInfo.cart_item_id));
                return {
                    url: "/cart/remove",
                    method: "POST",
                    data: formData,
                };
            },
        }),
        clearCart: builder.mutation<any, CartItemActionPayload>({
            query: (cartInfo) => {
                const formData = new FormData();
                formData.append("cart_item_id", String(cartInfo.cart_item_id));
                return {
                    url: "/cart/clear",
                    method: "POST",
                    data: formData,
                };
            },
        }),
    })
})
export const {
    useGetAllCartItemsQuery,
    useAddToCartMutation,
    useUpdateCartMutation,
    useRemoveCartMutation,
    useClearCartMutation,
} = cartApi;
