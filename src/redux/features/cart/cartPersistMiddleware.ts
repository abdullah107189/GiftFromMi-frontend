/* eslint-disable @typescript-eslint/no-explicit-any */
// src/store/cart/cartPersistMiddleware.ts
import type { Middleware } from "@reduxjs/toolkit";
import { CART_STORAGE_KEY } from "./cartSlice";

export const cartPersistMiddleware: Middleware = (storeApi) => (next) => (action) => {
    const result = next(action);

    const state = storeApi.getState() as any;
    const cartState = state.cart;

    try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartState));
    } catch {
        // ignore storage errors
    }

    return result;
};