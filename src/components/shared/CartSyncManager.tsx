import { useEffect, useEffectEvent, useRef } from "react";
import {
    clearCart,
    hydrateServerCart,
    resetCartSyncMeta,
    setCartSyncStatus,
} from "@/redux/features/cart/cartSlice";
import type { CartItem } from "@/redux/features/cart/cartSlice";
import {
    useAddToCartMutation,
    cartApi,
    useGetAllCartItemsQuery,
    useUpdateCartMutation,
} from "@/redux/features/cart/cart.api";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { selectUser } from "@/redux/features/auth/authSelectors";
import {
    selectCartItemsArray,
    selectCartOwnerUserId,
} from "@/redux/features/cart/cartSelectors";
import { mergeGuestCartWithServer } from "@/redux/features/cart/cartUtils";

const EMPTY_CART_ITEMS: CartItem[] = [];

const buildCartSignature = (
    items: Array<{ key: string; qty: number; cartItemId?: number }>,
) =>
    items
        .map((item) => `${item.key}:${item.qty}:${item.cartItemId ?? "new"}`)
        .sort()
        .join("|");

const CartSyncManager = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);
    const cartItems = useAppSelector(selectCartItemsArray);
    const ownerUserId = useAppSelector(selectCartOwnerUserId);

    const [addToCartMutation] = useAddToCartMutation();
    const [updateCartMutation] = useUpdateCartMutation();

    const { data: serverCartItemsData, isSuccess: isServerCartLoaded } = useGetAllCartItemsQuery(undefined, {
        skip: !user,
        refetchOnMountOrArgChange: true,
        refetchOnFocus: true,
        refetchOnReconnect: true,
    });
    const serverCartItems = serverCartItemsData ?? EMPTY_CART_ITEMS;

    const isSyncingRef = useRef(false);
    const lastHydratedSignatureRef = useRef<string | null>(null);
    const previousUserIdRef = useRef<number | null>(null);

    useEffect(() => {
        if (user) {
            previousUserIdRef.current = user.id;
            return;
        }

        if (previousUserIdRef.current !== null) {
            dispatch(clearCart());
            dispatch(resetCartSyncMeta());
            lastHydratedSignatureRef.current = null;
            previousUserIdRef.current = null;
        }
    }, [dispatch, user]);

    const syncCartState = useEffectEvent(async () => {
        if (!user || isSyncingRef.current) return;

        const serverSignature = buildCartSignature(serverCartItems);
        const hasGuestCart = ownerUserId === null && cartItems.length > 0;

        if (
            !hasGuestCart &&
            ownerUserId === user.id &&
            lastHydratedSignatureRef.current === serverSignature
        ) {
            return;
        }

        isSyncingRef.current = true;
        dispatch(setCartSyncStatus({ status: "syncing" }));

        try {
            if (hasGuestCart) {
                const { itemsToCreate, itemsToUpdate } = mergeGuestCartWithServer(
                    cartItems,
                    serverCartItems,
                );

                for (const item of itemsToUpdate) {
                    await updateCartMutation({
                        cart_item_id: item.cartItemId,
                        quantity: item.quantity,
                    }).unwrap();
                }

                for (const item of itemsToCreate) {
                    await addToCartMutation({
                        product_variant_id: item.variantId,
                        quantity: item.qty,
                    }).unwrap();
                }

                const refreshedServerItems = await dispatch(
                    cartApi.endpoints.getAllCartItems.initiate(undefined, {
                        forceRefetch: true,
                        subscribe: false,
                    }),
                ).unwrap();

                dispatch(
                    hydrateServerCart({
                        items: refreshedServerItems,
                        userId: user.id,
                    }),
                );
                lastHydratedSignatureRef.current =
                    buildCartSignature(refreshedServerItems);
            } else {
                dispatch(
                    hydrateServerCart({
                        items: serverCartItems,
                        userId: user.id,
                    }),
                );
                lastHydratedSignatureRef.current = serverSignature;
            }

            dispatch(setCartSyncStatus({ status: "idle" }));
        } catch {
            dispatch(
                setCartSyncStatus({
                    status: "error",
                    error: "Cart sync failed",
                }),
            );
        } finally {
            isSyncingRef.current = false;
        }
    });

    useEffect(() => {
        if (!user || !isServerCartLoaded) return;
        void syncCartState();
    }, [isServerCartLoaded, serverCartItems, user]);

    return null;
};

export default CartSyncManager;
