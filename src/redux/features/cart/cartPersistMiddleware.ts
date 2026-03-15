/* eslint-disable @typescript-eslint/no-explicit-any */
// This middleware controls guest-cart persistence only.
// Logged-in carts must live on the server, so we stop using localStorage
// as soon as the cart belongs to a logged-in user.
import type { Middleware } from "@reduxjs/toolkit";
import { CART_STORAGE_KEY } from "./cartSlice";

export const cartPersistMiddleware: Middleware = (storeApi) => (next) => (action) => {
    const result = next(action);
    const actionType = (action as { type?: string })?.type;

    if (typeof actionType !== "string" || !actionType.startsWith("cart/")) {
        return result;
    }

    const state = storeApi.getState() as any;
    const cartState = state.cart;
    const isGuestCart = cartState?.sync?.ownerUserId === null;

    try {
        if (isGuestCart) {
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartState));
        } else {
            // Once a user is logged in, localStorage should no longer participate
            // in cart state at all.
            localStorage.removeItem(CART_STORAGE_KEY);
        }
    } catch {
        // ignore storage errors
    }
    return result;
};
