// src/store/cart/cartSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type CartItem = {
    id: string;
    title: string;
    price: number;     // unit price
    image?: string;
    qty: number;
};

export type CartState = {
    itemsById: Record<string, CartItem>;
};

const CART_STORAGE_KEY = "app_cart_v1";

function loadCartFromStorage(): CartState {
    try {
        const raw = localStorage.getItem(CART_STORAGE_KEY);
        if (!raw) return { itemsById: {} };
        const parsed = JSON.parse(raw) as CartState;

        // basic guard
        if (!parsed?.itemsById || typeof parsed.itemsById !== "object") {
            return { itemsById: {} };
        }
        return parsed;
    } catch {
        return { itemsById: {} };
    }
}

const initialState: CartState =
    typeof window === "undefined" ? { itemsById: {} } : loadCartFromStorage();

type AddToCartPayload = Omit<CartItem, "qty"> & { qty?: number };

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart(state, action: PayloadAction<AddToCartPayload>) {
            const { id, title, price, image, qty = 1 } = action.payload;

            const existing = state.itemsById[id];
            if (existing) {
                existing.qty += qty;
            } else {
                state.itemsById[id] = { id, title, price, image, qty };
            }
        },

        incrementQty(state, action: PayloadAction<{ id: string }>) {
            const item = state.itemsById[action.payload.id];
            if (item) item.qty += 1;
        },

        decrementQty(state, action: PayloadAction<{ id: string }>) {
            const item = state.itemsById[action.payload.id];
            if (!item) return;

            item.qty -= 1;
            if (item.qty <= 0) {
                delete state.itemsById[action.payload.id];
            }
        },

        setQty(state, action: PayloadAction<{ id: string; qty: number }>) {
            const { id, qty } = action.payload;
            const item = state.itemsById[id];
            if (!item) return;

            const safeQty = Math.max(0, Math.floor(qty));
            if (safeQty === 0) delete state.itemsById[id];
            else item.qty = safeQty;
        },

        removeFromCart(state, action: PayloadAction<{ id: string }>) {
            delete state.itemsById[action.payload.id];
        },

        clearCart(state) {
            state.itemsById = {};
        },

        // optional: SSR/rehydrate or manual load
        hydrateCart(_state, action: PayloadAction<CartState>) {
            return action.payload;
        },
    },
});

export const {
    addToCart,
    incrementQty,
    decrementQty,
    setQty,
    removeFromCart,
    clearCart,
    hydrateCart,
} = cartSlice.actions;

export { CART_STORAGE_KEY };
export default cartSlice.reducer;