import { useEffect, useRef } from "react";
import {
  clearCart,
  hydrateServerCart,
  resetCartSyncMeta,
  setCartSyncStatus,
} from "@/redux/features/cart/cartSlice";
import type { CartItem } from "@/redux/features/cart/cartSlice";
import {
  cartApi,
  useAddToCartMutation,
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

// A tiny signature helps us avoid hydrating Redux with the same server cart
// over and over again.
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

  const { data: serverCartItemsData = EMPTY_CART_ITEMS, isSuccess: isServerCartLoaded } =
    useGetAllCartItemsQuery(undefined, {
      skip: !user,
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
      refetchOnReconnect: true,
    });

  const previousUserIdRef = useRef<number | null>(null);
  const pendingLoginMergeUserIdRef = useRef<number | null>(null);
  const isMergingGuestCartRef = useRef(false);
  const lastHydratedSignatureRef = useRef<string | null>(null);

  useEffect(() => {
    if (!user) {
      // Logout rule:
      // clear the in-memory cart and go back to guest mode.
      if (previousUserIdRef.current !== null) {
        dispatch(clearCart());
        dispatch(resetCartSyncMeta());
      }

      previousUserIdRef.current = null;
      pendingLoginMergeUserIdRef.current = null;
      isMergingGuestCartRef.current = false;
      lastHydratedSignatureRef.current = null;
      return;
    }

    if (previousUserIdRef.current !== user.id) {
      // This is the login transition.
      // We mark it so guest cart merge runs only once.
      previousUserIdRef.current = user.id;
      pendingLoginMergeUserIdRef.current = user.id;
      lastHydratedSignatureRef.current = null;
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (!user || !isServerCartLoaded) return;
    if (pendingLoginMergeUserIdRef.current !== user.id) return;
    if (isMergingGuestCartRef.current) return;

    const guestItems = ownerUserId === null ? cartItems : EMPTY_CART_ITEMS;
    const hasGuestItems = guestItems.length > 0;

    if (!hasGuestItems) {
      // No guest cart exists, so we simply hydrate Redux from the server cart.
      dispatch(
        hydrateServerCart({
          items: serverCartItemsData,
          userId: user.id,
        }),
      );
      lastHydratedSignatureRef.current = buildCartSignature(serverCartItemsData);
      pendingLoginMergeUserIdRef.current = null;
      dispatch(setCartSyncStatus({ status: "idle" }));
      return;
    }

    isMergingGuestCartRef.current = true;
    dispatch(setCartSyncStatus({ status: "syncing" }));

    const syncGuestCartOnLogin = async () => {
      try {
        // Merge guest items with the current server cart only once on login.
        const { itemsToCreate, itemsToUpdate } = mergeGuestCartWithServer(
          guestItems,
          serverCartItemsData,
        );

        // Update quantities for items that already exist in the database.
        for (const item of itemsToUpdate) {
          await updateCartMutation({
            cart_item_id: item.cartItemId,
            quantity: item.quantity,
          }).unwrap();
        }

        // Create items that only existed in the guest cart.
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

        // From this point forward, Redux mirrors the database cart.
        dispatch(
          hydrateServerCart({
            items: refreshedServerItems,
            userId: user.id,
          }),
        );
        lastHydratedSignatureRef.current =
          buildCartSignature(refreshedServerItems);
        dispatch(setCartSyncStatus({ status: "idle" }));
      } catch {
        dispatch(
          setCartSyncStatus({
            status: "error",
            error: "Cart sync failed",
          }),
        );
      } finally {
        pendingLoginMergeUserIdRef.current = null;
        isMergingGuestCartRef.current = false;
      }
    };

    void syncGuestCartOnLogin();
  }, [
    addToCartMutation,
    cartItems,
    dispatch,
    isServerCartLoaded,
    ownerUserId,
    serverCartItemsData,
    updateCartMutation,
    user,
  ]);

  useEffect(() => {
    if (!user || !isServerCartLoaded) return;
    if (pendingLoginMergeUserIdRef.current === user.id) return;
    if (isMergingGuestCartRef.current) return;

    // Multi-device support:
    // when the server cart changes, refresh Redux from the server.
    const serverSignature = buildCartSignature(serverCartItemsData);
    if (
      ownerUserId === user.id &&
      lastHydratedSignatureRef.current === serverSignature
    ) {
      return;
    }

    dispatch(
      hydrateServerCart({
        items: serverCartItemsData,
        userId: user.id,
      }),
    );
    lastHydratedSignatureRef.current = serverSignature;
  }, [dispatch, isServerCartLoaded, ownerUserId, serverCartItemsData, user]);

  return null;
};

export default CartSyncManager;
