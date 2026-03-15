import fallbackImage from "@/assets/fallback.png";
import type { CartItem } from "./cartSlice";

const toNumber = (value: unknown, fallback = 0) => {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
};

const optionalNumber = (value: unknown) => {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : undefined;
};

const firstDefined = <T>(...values: T[]): T | undefined =>
    values.find((value) => value !== undefined && value !== null && value !== "");

type LooseCartRecord = Record<string, unknown> & {
    product_variant?: Record<string, unknown>;
    variant?: Record<string, unknown>;
    variantInfo?: Record<string, unknown>;
    product?: Record<string, unknown>;
    productInfo?: Record<string, unknown>;
};

export const normalizeCartItem = (raw: unknown): CartItem | null => {
    const item = (raw ?? {}) as LooseCartRecord;
    const variant = (item.product_variant ?? item.variant ?? item.variantInfo ?? {}) as Record<string, unknown>;
    const nestedVariantProduct = (
        (variant.product ?? variant.productInfo ?? variant.product_detail) ?? {}
    ) as Record<string, unknown>;
    const product = (
        item.product ??
        item.productInfo ??
        nestedVariantProduct
    ) as Record<string, unknown>;
    const variantId = toNumber(
        firstDefined(
            item.variantId,
            item.product_variant_id,
            item.variant_id,
            variant.id,
        ),
    );
    const productId = toNumber(
        firstDefined(item.productId, item.product_id, product.id, variant.product_id),
    );

    if (!variantId || !productId) {
        return null;
    }

    const stockQty = toNumber(
        firstDefined(item.stockQty, item.stock_quantity, item.available_quantity, variant.quantity),
    );
    const qty = toNumber(firstDefined(item.qty, item.quantity), 1);
    const image = firstDefined(
        item.image,
        item.imageUrl,
        item.product_image,
        item.thumbnail,
        variant.image,
        variant.imageUrl,
        product.image,
        product.imageUrl,
        Array.isArray(product.product_image)
            ? (
                (product.product_image[0] as Record<string, unknown> | undefined)?.image ??
                (product.product_image[0] as Record<string, unknown> | undefined)?.imageUrl
            )
            : undefined,
        fallbackImage,
    ) as string;

    const title = firstDefined(
        item.title,
        item.name,
        item.product_title,
        product.title,
        product.name,
        product.product_title,
        variant.title,
        variant.name,
        "Product",
    ) as string;
    const sku = firstDefined(item.sku, variant.sku, `variant-${variantId}`) as string;

    return {
        key: `${productId}_${variantId}`,
        productId,
        variantId,
        cartItemId: optionalNumber(firstDefined(item.cartItemId, item.cart_item_id, item.id)),
        sku,
        title,
        image,
        originalPrice: toNumber(
            firstDefined(item.originalPrice, item.price, variant.price, variant.sell_price),
        ),
        sellPrice: toNumber(
            firstDefined(item.sellPrice, item.sell_price, item.price, variant.sell_price, variant.price),
        ),
        qty: qty > 0 ? qty : 1,
        stockQty,
        inStock: Boolean(firstDefined(item.inStock, item.in_stock, stockQty > 0)),
        brand: firstDefined(
            item.brand,
            (product.brand as Record<string, unknown> | undefined)?.name,
        ) as string | undefined,
        shortDescription: firstDefined(item.shortDescription, product.short_description) as string | undefined,
        variantLabel: firstDefined(item.variantLabel, item.variant_label, variant.color, variant.size, sku) as string | undefined,
        cj_product_id: firstDefined(item.cj_product_id, product.cj_product_id) as string | undefined,
        cj_variant_id: firstDefined(item.cj_variant_id, variant.cj_variant_id) as string | undefined,
    };
};

export const normalizeCartItems = (items: unknown): CartItem[] => {
    if (!Array.isArray(items)) return [];

    return items
        .map((item) => normalizeCartItem(item))
        .filter((item): item is CartItem => item !== null);
};

const clampQty = (qty: number, stockQty: number) => {
    const safeQty = Math.max(1, Math.floor(qty));
    if (!Number.isFinite(stockQty) || stockQty <= 0) return safeQty;
    return Math.min(safeQty, stockQty);
};

export const mergeGuestCartWithServer = (
    guestItems: CartItem[],
    serverItems: CartItem[],
) => {
    // Start with the server cart because, after login, the database becomes
    // the source of truth.
    const mergedMap = new Map<string, CartItem>();
    const itemsToCreate: CartItem[] = [];
    const itemsToUpdate: Array<{ cartItemId: number; quantity: number }> = [];

    serverItems.forEach((item) => {
        mergedMap.set(item.key, item);
    });

    guestItems.forEach((guestItem) => {
        const existingServerItem = mergedMap.get(guestItem.key);

        if (!existingServerItem) {
            // Guest item does not exist on the server yet, so it must be created.
            mergedMap.set(guestItem.key, guestItem);
            itemsToCreate.push(guestItem);
            return;
        }

        // If both carts contain the same item, merge the quantities.
        const mergedQty = clampQty(
            existingServerItem.qty + guestItem.qty,
            Math.max(existingServerItem.stockQty, guestItem.stockQty),
        );

        mergedMap.set(guestItem.key, {
            ...existingServerItem,
            qty: mergedQty,
            stockQty: Math.max(existingServerItem.stockQty, guestItem.stockQty),
            inStock: existingServerItem.inStock || guestItem.inStock,
        });

        if (
            existingServerItem.cartItemId &&
            mergedQty !== existingServerItem.qty
        ) {
            itemsToUpdate.push({
                cartItemId: existingServerItem.cartItemId,
                quantity: mergedQty,
            });
        }
    });

    return {
        mergedItems: Array.from(mergedMap.values()),
        itemsToCreate,
        itemsToUpdate,
    };
};
