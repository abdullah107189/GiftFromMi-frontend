// src/store/cart/cartSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type CartItem = {
    productId: number;      // product id
    variantId: number;      // variant id
    sku: string;            // unique SKU
    cj_variant_id?: string;
    cj_product_id?: string;

    title: string;
    image: string;

    originalPrice: number;
    sellPrice: number;

    qty: number;
    stockQty: number;
    inStock: boolean;

    brand?: string;
    shortDescription?: string;
    variantLabel?: string;

    // ✅ unique key to prevent wrong merge
    key: string; // `${productId}_${variantId}`
};

export type CartState = {
    itemsById: Record<string, CartItem>; // key-based map
};

const CART_STORAGE_KEY = "app_cart_v1";

function loadCartFromStorage(): CartState {
    try {
        const raw = localStorage.getItem(CART_STORAGE_KEY);
        if (!raw) return { itemsById: {} };
        const parsed = JSON.parse(raw) as CartState;

        if (!parsed?.itemsById || typeof parsed.itemsById !== "object") {
            return { itemsById: {} };
        }
        const normalized: CartState = { itemsById: {} };

        for (const [storedKey, item] of Object.entries(parsed.itemsById)) {
            if (!item || typeof item !== "object") continue;

            const maybeKey = (item as { key?: unknown }).key;
            const key = (typeof maybeKey === "string" && maybeKey) || storedKey;
            if (!key || typeof key !== "string") continue;

            normalized.itemsById[key] = {
                ...(item as CartItem),
                key,
            };
        }

        return normalized;
    } catch {
        return { itemsById: {} };
    }
}

const initialState: CartState =
    typeof window === "undefined" ? { itemsById: {} } : loadCartFromStorage();

// qty optional
type AddToCartPayload = Omit<CartItem, "qty"> & { qty?: number };

// helpers
const clampQty = (qty: number, stockQty: number) => {
    const safe = Math.max(1, Math.floor(qty));
    if (!Number.isFinite(stockQty) || stockQty <= 0) return safe;
    return Math.min(safe, stockQty);
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart(state, action: PayloadAction<AddToCartPayload>) {
            const payload = action.payload;

            // ✅ ensure key exists (fallback to productId_variantId)
            const key = payload.key || `${payload.productId}_${payload.variantId}`;

            const existing = state.itemsById[key];

            if (existing) {
                // ✅ merge only qty, keep variant identity + image stable
                const add = payload.qty ?? 1;
                existing.qty = clampQty(existing.qty + add, existing.stockQty);

                // optional: stock updated হলে reflect করতে চাইলে
                existing.stockQty = payload.stockQty;
                existing.inStock = payload.inStock;
            } else {
                state.itemsById[key] = {
                    ...payload,
                    key,
                    qty: clampQty(payload.qty ?? 1, payload.stockQty),
                };
            }
        },

        incrementQty(state, action: PayloadAction<{ key: string }>) {
            const item = state.itemsById[action.payload.key];
            if (!item) return;
            item.qty = clampQty(item.qty + 1, item.stockQty);
        },

        decrementQty(state, action: PayloadAction<{ key: string }>) {
            const item = state.itemsById[action.payload.key];
            if (!item) return;

            const next = item.qty - 1;
            if (next <= 0) {
                delete state.itemsById[action.payload.key];
                return;
            }
            item.qty = next;
        },

        setQty(state, action: PayloadAction<{ key: string; qty: number }>) {
            const { key, qty } = action.payload;
            const item = state.itemsById[key];
            if (!item) return;

            const safeQty = Math.max(0, Math.floor(qty));
            if (safeQty === 0) {
                delete state.itemsById[key];
            } else {
                item.qty = clampQty(safeQty, item.stockQty);
            }
        },

        removeFromCart(state, action: PayloadAction<{ key: string }>) {
            delete state.itemsById[action.payload.key];
        },

        clearCart(state) {
            state.itemsById = {};
        },

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