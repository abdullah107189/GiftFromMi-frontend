import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from "@/redux/store";

const selectItemsById = (state: RootState) => state.cart.itemsById;

export const selectCartItemsArray = createSelector(
    [selectItemsById],
    (itemsById) => Object.values(itemsById)
);

export const selectCartItemsCount = createSelector(
    [selectCartItemsArray],
    (items) => items.reduce((sum, i) => sum + i.qty, 0)
);

export const selectCartSubtotal = createSelector(
    [selectCartItemsArray],
    (items) => items.reduce((sum, i) => sum + i.originalPrice * i.qty, 0)
);

export const selectShipping = createSelector(
    [selectCartSubtotal],
    (subtotal) => {
        if (subtotal <= 0) return 0;
        return 24;
    }
);

export const selectCartTotal = createSelector(
    [selectCartSubtotal, selectShipping],
    (subtotal, shipping) => subtotal + shipping
);