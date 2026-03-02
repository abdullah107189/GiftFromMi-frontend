/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router";
import { Button } from "@/components/ui/button";
import DynamicBreadcrumb from "@/components/shared/DynamicBreadcrumb";
import Rating from "@/components/shared/Rating";
import RelatedProdect from "./RelatedProdect";
import SEO from "@/components/shared/SEO";
import { useProductDetailsQuery } from "@/redux/features/public/public.api";
import PageLoader from "@/components/shared/PageLoader";
import fallbackImage from "@/assets/fallback.png";
import type { IProduct } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "@/redux/store";
import { addToCart } from "@/redux/features/cart/cartSlice";
import { toast } from "sonner";
import SharedDropdown from "@/components/shared/SharedDropdown";
import { useAddToCartMutation } from "@/redux/features/cart/cart.api";
import { selectUser } from "@/redux/features/auth/authSelectors";

type Variant = {
  id: number;
  product_id: number;
  sku: string;
  price: number;
  sell_price: number;
  quantity: number;
  image?: string;
  imageUrl?: string;
  cj_variant_id?: string;
  alert_quantity?: number;
  color?: string;
  size?: string | null;
};

const ProductDetails = () => {
  const { id } = useParams();
  const { data, isLoading, isFetching } = useProductDetailsQuery(id!);
  const dispatch = useDispatch<AppDispatch>();
  const [addToCartMutation,] = useAddToCartMutation();
  const user = useSelector(selectUser);
  console.log("user------>", user)


  const product = data?.productInfo as any;
  const relatedProducts = data?.relatedProducts || [];

  const variants: Variant[] = useMemo(() => product?.variants || [], [product?.variants]);

  const galleryImages: string[] = useMemo(() => {
    return product?.product_image?.map((img: any) => img.image) || [];
  }, [product?.product_image]);

  const [selectedVariantId, setSelectedVariantId] = useState<number | null>(null);

  const selectedVariant: Variant | undefined = useMemo(() => {
    if (!variants.length) return undefined;
    if (selectedVariantId == null) return variants[0];
    return variants.find((v) => v.id === selectedVariantId) ?? variants[0];
  }, [variants, selectedVariantId]);

  const [activeImage, setActiveImage] = useState<string>("");

  const variantOptions = useMemo(
    () =>
      (variants || []).map((v) => ({
        label: `${v.color || v.size || v.sku} — $${v.sell_price} (${v.quantity > 0 ? `${v.quantity} in stock` : "Out of stock"})`,
        value: String(v.id),
      })),
    [variants],
  );
  useEffect(() => {
    if (variants.length) setSelectedVariantId(variants[0].id);
    else setSelectedVariantId(null);
  }, [id, variants.length]);

  useEffect(() => {
    const vImg = selectedVariant?.imageUrl || selectedVariant?.image;
    if (vImg) {
      setActiveImage(vImg);
      return;
    }
    if (galleryImages.length > 0) {
      setActiveImage(galleryImages[0]);
      return;
    }
    setActiveImage("");
  }, [selectedVariant?.id, selectedVariant?.imageUrl, selectedVariant?.image, galleryImages]);

  const variantThumbs = useMemo(() => {
    const list = (variants || [])
      .map((v) => ({
        id: v.id,
        label: v.color || v.size || v.sku,
        img: v.imageUrl || v.image || "",
        qty: v.quantity ?? 0,
      }))
      .filter((x) => x.img);

    const seen = new Set<string>();
    return list.filter((x) => {
      if (seen.has(x.img)) return false;
      seen.add(x.img);
      return true;
    });
  }, [variants]);

  const fallbackThumbs = useMemo(() => {
    const seen = new Set<string>();
    return (galleryImages || []).filter((img) => {
      if (seen.has(img)) return false;
      seen.add(img);
      return true;
    });
  }, [galleryImages]);

  const thumbsToShow = variantThumbs.length ? variantThumbs.map((v) => v.img) : fallbackThumbs;

  if (isFetching || isLoading) return <PageLoader />;
  if (!product) return <p>Not Found</p>;

  const price = selectedVariant?.price ?? product?.variants?.[0]?.price ?? 0;
  const sellPrice = selectedVariant?.sell_price ?? product?.variants?.[0]?.sell_price ?? 0;
  const stockQty = selectedVariant?.quantity ?? 0;
  const inStock = stockQty > 0;

  const handleAddToCart = async (product: IProduct) => {
    const v = selectedVariant;

    if (!v) {
      toast.error("No variant available for this product");
      return;
    }
    if (v.quantity <= 0) {
      toast.error("This variant is out of stock");
      return;
    }

    const cartItem = {
      productId: product.id,
      variantId: v.id,
      key: `${product.id}_${v.id}`, // ✅ unique

      title: product.title,
      image: v.imageUrl || v.image || product?.product_image?.[0]?.image || fallbackImage,

      originalPrice: Number(v.price),
      sellPrice: Number(v.sell_price),

      brand: product?.brand?.name,
      shortDescription: product?.short_description,

      qty: 1,
      stockQty: v.quantity,
      inStock: v.quantity > 0,

      sku: v.sku,
      cj_product_id: (product as any)?.cj_product_id,
      cj_variant_id: v.cj_variant_id,
      variantLabel: v.color || v.size || v.sku,
    };

    const addToCartItems = {
      product_variant_id: v.id,
      quantity: 1,
    };
    dispatch(addToCart(cartItem));
    toast.success("Product added to cart");
    if (user) {
      const result = await addToCartMutation(addToCartItems);
      console.log(result);
    }
  };

  return (
    <main className="relative max-w-main xl:mt-36 md:mt-30 mt-15 xl:pb-15 md:pb-10 pb-5 overflow-hidden">
      <SEO title={product?.title || "Product Details"} description={product?.short_description || "Product details page"} />

      <div className="max-w-container mx-auto px-3">
        <DynamicBreadcrumb customLabel={product?.title} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:mt-6">
          {/* Left Side: Main Image */}
          <div className="lg:col-span-6">
            <div className="rounded-2xl overflow-hidden xl:max-w-182 xl:max-h-140.75 w-full lg:h-125 md:h-100 h-80 aspect-4/3 lg:aspect-16/10">
              <img
                src={activeImage || thumbsToShow[0] || fallbackImage}
                alt={product.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = fallbackImage;
                }}
              />
            </div>

            {/* Mobile thumbnails */}
            <div className="flex lg:hidden gap-2 pt-4">
              {(variantThumbs.length
                ? variantThumbs
                : thumbsToShow.map((img, i) => ({ id: i, img, label: "", qty: 1 } as any))
              )
                .slice(0, 6)
                .map((v: any, index: number) => {
                  const isActive = variantThumbs.length > 0
                    ? selectedVariant?.id === v.id
                    : activeImage === v.img;

                  return (
                    <div
                      key={variantThumbs.length ? v.id : index}
                      onClick={() => {
                        if (variantThumbs.length) {
                          setSelectedVariantId(v.id);
                          setActiveImage(v.img);
                        } else {
                          setActiveImage(v.img);
                        }
                      }}
                      className={`w-28.75 h-24 aspect-115/96 rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${isActive ? "border-orange-500" : "border-transparent"
                        } ${v.qty <= 0 ? "opacity-50" : ""}`}
                      title={v.label}
                    >
                      <img
                        src={v.img}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = fallbackImage;
                        }}
                      />
                    </div>
                  );
                })}
            </div>
          </div>

          {/* Right Side: Product Details */}
          <div className="lg:col-span-6 flex flex-col justify-start md:space-y-5 space-y-2">
            <div>
              <h1 className="xl:text-[40px] md:text-3xl text-2xl font-semibold text-gray-900 mb-2">
                {product.title}
              </h1>

              <div className="flex items-center md:gap-3 gap-2">
                <div className="flex text-primary">
                  <Rating rating={product?.rating} showText={false} />
                </div>
                <span className="font-bold text-primary">{product?.rating ? product.rating.toFixed(1) : 0}</span>
                <span className="text-sm text-gray-500">{product?.reviewsCount} reviews</span>

                <div className="ml-auto flex items-start gap-2">
                  <span className="text-4xl font-semibold text-primary">${sellPrice}</span>
                  <span className="text-gray-500 text-xl font-medium line-through">${price}</span>
                </div>
              </div>
            </div>

            {/* Variant Select */}
            {variants.length > 0 && (
              <div className="mt-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Choose Variant
                </label>

                <SharedDropdown
                  options={variantOptions}
                  selectedValue={selectedVariant?.id ? String(selectedVariant.id) : undefined}
                  onValueChange={(value) => {
                    const nextId = Number(value);
                    setSelectedVariantId(nextId);

                    // ✅ instantly update image based on selected variant
                    const v = variants.find((x) => x.id === nextId);
                    const vImg = v?.imageUrl || v?.image;
                    if (vImg) setActiveImage(vImg);
                  }}
                  placeholder="Select Variant"
                  align="end"
                  className="w-full"
                />
              </div>
            )}

            <div className="flex items-center gap-2 font-semibold mt-2">
              <span className={`${inStock ? "text-[#84CC16]" : "text-red-500"}`}>
                {inStock ? "In Stock" : "Sold Out"}
              </span>
              <span className="text-gray-700">
                {inStock ? `— ${stockQty} items left` : "— Out of stock"}
              </span>
            </div>

            <p className="xl:mt-8 md:mt-6 mt-2">{product.short_description}</p>

            <div className="flex gap-4">
              <Button variant={"outline"} disabled={!inStock} onClick={() => handleAddToCart(product)} className="w-fit">
                Add To Cart
              </Button>
              <Link to={"/shopping-cart"} className="w-fit">
                <Button disabled={!inStock}>Send This Gift Now</Button>
              </Link>
            </div>

            {/* Desktop thumbnails */}
            <div className="hidden lg:flex gap-2 pt-4">
              {(variantThumbs.length
                ? variantThumbs
                : thumbsToShow.map((img, i) => ({ id: i, img, label: "", qty: 1 } as any))
              )
                .slice(0, 7)
                .map((v: any, index: number) => {
                  const isActive = variantThumbs.length > 0
                    ? selectedVariant?.id === v.id
                    : activeImage === v.img;

                  return (
                    <div
                      key={variantThumbs.length ? v.id : index}
                      onClick={() => {
                        if (variantThumbs.length) {
                          setSelectedVariantId(v.id);
                          setActiveImage(v.img);
                        } else {
                          setActiveImage(v.img);
                        }
                      }}
                      className={`w-28.75 h-24 aspect-115/96 rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${isActive ? "border-primary" : "border-transparent"
                        } ${v.qty <= 0 ? "opacity-50" : ""}`}
                      title={v.label}
                    >
                      <img
                        src={v.img}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = fallbackImage;
                        }}
                      />
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>

      <RelatedProdect relatedProducts={relatedProducts} />
    </main>
  );
};

export default ProductDetails;  