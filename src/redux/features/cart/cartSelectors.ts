import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from "@/redux/store";

const defaultCartSync = {
    ownerUserId: null,
    status: "idle" as const,
    error: null,
};

const selectItemsById = (state: RootState) => state.cart?.itemsById ?? {};
const selectCartSync = (state: RootState) => state.cart?.sync ?? defaultCartSync;

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
    () => 0
);

export const selectCartTotal = createSelector(
    [selectCartSubtotal, selectShipping],
    (subtotal, shipping) => subtotal + shipping
);

export const selectCartOwnerUserId = createSelector(
    [selectCartSync],
    (sync) => sync?.ownerUserId,
);

export const selectCartSyncStatus = createSelector(
    [selectCartSync],
    (sync) => sync?.status ?? "idle",
);
