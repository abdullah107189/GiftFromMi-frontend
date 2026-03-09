import { baseApi } from "@/redux/baseApi";
import { normalizeCartItems } from "./cartUtils";

export const cartApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllCartItems: builder.query({
            query: () => ({
                url: "/cart",
                method: "GET",
            }),
            providesTags: ["CART"],
            transformResponse: (res) => normalizeCartItems(res.data),
        }),
        addToCart: builder.mutation({
            query: (cartInfo: { product_variant_id: number, quantity: number }) => ({
                url: "/cart/add",
                method: "POST",
                data: cartInfo,
            }),
        }),
        updateCart: builder.mutation({
            query: (cartInfo: { cart_item_id: number; quantity: number }) => {
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

        removeCart: builder.mutation({
            query: (cartInfo: { cart_item_id: number; }) => {
                const formData = new FormData();
                formData.append("cart_item_id", String(cartInfo.cart_item_id));
                return {
                    url: "/cart/remove",
                    method: "POST",
                    data: formData,
                };
            },
        }),
        clearCart: builder.mutation({
            query: (cartInfo: { cart_item_id: number; }) => {
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
