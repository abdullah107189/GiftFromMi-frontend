/* eslint-disable @typescript-eslint/no-explicit-any */
// src/store/cart/cartSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type CartItem = {
    productId: number;      // product id
    variantId: number;      // variant id
    cartItemId?: number;
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

export type CartSyncStatus = "idle" | "syncing" | "error";

export type CartSyncMeta = {
    ownerUserId: number | null;
    status: CartSyncStatus;
    error: string | null;
};

export type CartState = {
    itemsById: Record<string, CartItem>; // key-based map
    sync: CartSyncMeta;
};

const CART_STORAGE_KEY = "app_cart_v1";
const createInitialSyncMeta = (): CartSyncMeta => ({
    ownerUserId: null,
    status: "idle",
    error: null,
});

const ensureSyncMeta = (state: CartState) => {
    if (!state.sync) {
        state.sync = createInitialSyncMeta();
    }

    return state.sync;
};

// Guest users start from an empty Redux cart.
// Logged-in users also start empty and are hydrated from the server later.
export const createEmptyCartState = (): CartState => ({
    itemsById: {},
    sync: createInitialSyncMeta(),
});

function loadCartFromStorage(): CartState {
    try {
        const raw = localStorage.getItem(CART_STORAGE_KEY);
        if (!raw) return createEmptyCartState();
        const parsed = JSON.parse(raw) as CartState;

        if (!parsed?.itemsById || typeof parsed.itemsById !== "object") {
            return createEmptyCartState();
        }
        const normalized: CartState = {
            itemsById: {},
            sync: {
                ownerUserId:
                    typeof parsed.sync?.ownerUserId === "number"
                        ? parsed.sync.ownerUserId
                        : null,
                status:
                    parsed.sync?.status === "syncing" ||
                        parsed.sync?.status === "error"
                        ? parsed.sync.status
                        : "idle",
                error:
                    typeof parsed.sync?.error === "string" ? parsed.sync.error : null,
                },
        };

        // Safety rule:
        // if the stored cart belongs to a logged-in user, ignore it.
        // Logged-in carts must come from the server, not localStorage.
        if (normalized.sync.ownerUserId !== null) {
            return createEmptyCartState();
        }

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
        return createEmptyCartState();
    }
}

const initialState: CartState =
    typeof window === "undefined"
        ? createEmptyCartState()
        : loadCartFromStorage();

type AddToCartPayload = Omit<CartItem, "qty"> & { qty?: number };

// Keep quantity safe and within stock limits.
const clampQty = (qty: number, stockQty: number) => {
    const base = Number.isFinite(qty) ? qty : 1;
    const safe = Math.max(1, Math.floor(base));
    if (!Number.isFinite(stockQty) || stockQty <= 0) return safe;
    return Math.min(safe, stockQty);
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart(state, action: PayloadAction<AddToCartPayload>) {
            const payload = action.payload;

            // Every cart item is tracked by productId + variantId.
            const key = payload.key || `${payload.productId}_${payload.variantId}`;

            const existing = state.itemsById[key];

            if (existing) {
                const add = payload.qty ?? 1;
                existing.qty = clampQty(existing.qty + add, existing.stockQty);
                existing.cartItemId = payload.cartItemId ?? existing.cartItemId;
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

            item.qty = clampQty(item.qty - 1, item.stockQty);
        },

        setQty(state, action: PayloadAction<{ key: string; qty: number }>) {
            const { key, qty } = action.payload;
            const item = state.itemsById[key];
            if (!item) return;

            const base = Number.isFinite(qty) ? qty : 1;
            item.qty = clampQty(base, item.stockQty);
        },

        patchCartItem(
            state,
            action: PayloadAction<{ key: string; changes: Partial<CartItem> }>,
        ) {
            const { key, changes } = action.payload;
            const item = state.itemsById[key];
            if (!item) return;

            Object.assign(item, changes);

            if (typeof changes.qty === "number") {
                item.qty = clampQty(changes.qty, item.stockQty);
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

        replaceCart(state, action: PayloadAction<CartItem[]>) {
            state.itemsById = action.payload.reduce<Record<string, CartItem>>(
                (acc, item) => {
                    acc[item.key] = item;
                    return acc;
                },
                {},
            );
        },

        setCartOwnerUserId(state, action: PayloadAction<number | null>) {
            ensureSyncMeta(state).ownerUserId = action.payload;
        },

        setCartSyncStatus(
            state,
            action: PayloadAction<{ status: CartSyncStatus; error?: string | null }>,
        ) {
            const sync = ensureSyncMeta(state);
            sync.status = action.payload.status;
            sync.error = action.payload.error ?? null;
        },

        hydrateServerCart(
            state,
            action: PayloadAction<{ items: CartItem[]; userId: number }>,
        ) {
            // After login, Redux becomes a UI cache of the server cart.
            state.itemsById = action.payload.items.reduce<Record<string, CartItem>>(
                (acc, item) => {
                    acc[item.key] = item;
                    return acc;
                },
                {},
            );
            const sync = ensureSyncMeta(state);
            sync.ownerUserId = action.payload.userId;
            sync.status = "idle";
            sync.error = null;
        },

        resetCartSyncMeta(state) {
            state.sync = createInitialSyncMeta();
        },
    },
});

export const {
    addToCart,
    incrementQty,
    decrementQty,
    setQty,
    patchCartItem,
    removeFromCart,
    clearCart,
    hydrateCart,
    replaceCart,
    setCartOwnerUserId,
    setCartSyncStatus,
    hydrateServerCart,
    resetCartSyncMeta,
} = cartSlice.actions;

export { CART_STORAGE_KEY };
export default cartSlice.reducer;
