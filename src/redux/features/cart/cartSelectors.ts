// src/store/cart/cartSelectors.ts 

import type { RootState } from "@/redux/store";

export const selectCartItemsArray = (state: RootState) =>
    Object.values(state.cart.itemsById);

export const selectCartItemsCount = (state: RootState) =>
    Object.values(state.cart.itemsById).reduce((sum, i) => sum + i.qty, 0);

export const selectCartSubtotal = (state: RootState) =>
    Object.values(state.cart.itemsById).reduce((sum, i) => sum + i.originalPrice * i.qty, 0);

export const selectShipping = (state: RootState) => {
    const subtotal = selectCartSubtotal(state);
    if (subtotal <= 0) return 0;
    return 24;
};

export const selectCartTotal = (state: RootState) =>
    selectCartSubtotal(state) + selectShipping(state);