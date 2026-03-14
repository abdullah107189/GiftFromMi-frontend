/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Link, useParams } from "react-router";
import {
  MessageSquareText,
  MoreHorizontal,
  PackageCheck,
  PencilLine,
  Sparkles,
  Star,
  Store,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import {
  addToCart,
  patchCartItem,
  removeFromCart,
  setCartOwnerUserId,
  setQty,
} from "@/redux/features/cart/cartSlice";
import { toast } from "sonner";
import SharedDropdown from "@/components/shared/SharedDropdown";
import { useAddToCartMutation } from "@/redux/features/cart/cart.api";
import {
  selectIsLoggedIn,
  selectUser,
} from "@/redux/features/auth/authSelectors";
import { selectCartItemsArray } from "@/redux/features/cart/cartSelectors";
import {
  useCreateReviewMutation,
  useUpdateReviewMutation,
} from "@/redux/features/review/review.api";
import { cn } from "@/lib/utils";

const REVIEW_PREVIEW_LENGTH = 180;

type ProductReview = {
  id: number;
  product_id: number;
  user_id?: number;
  message: string;
  reply?: string | null;
  review: number;
  avatar?: string | null;
  name?: string | null;
  email?: string | null;
};

type ProductInfo = IProduct & {
  rating?: number;
  reviewsCount?: number;
  reviewCount?: number;
  averageRating?: number;
};

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

const getDisplayName = (review: ProductReview) =>
  review.name?.trim() || review.email?.trim() || "Anonymous customer";

const getInitials = (value: string) =>
  value
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((chunk) => chunk[0]?.toUpperCase() ?? "")
    .join("") || "GC";

const getApiErrorMessage = (error: any, fallbackMessage: string) => {
  if (typeof error?.data === "string") return error.data;
  return error?.data?.message || fallbackMessage;
};

const ProductDetails = () => {
  const { id } = useParams();
  const { data, isLoading, isFetching, refetch } = useProductDetailsQuery(id!);
  const dispatch = useDispatch<AppDispatch>();
  const [addToCartMutation] = useAddToCartMutation();
  const [createProductReview, { isLoading: isSubmittingReview }] =
    useCreateReviewMutation();
  const [updateReview, { isLoading: isUpdatingReview }] =
    useUpdateReviewMutation();
  const user = useSelector(selectUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const cartItems = useSelector(selectCartItemsArray);

  const product = data?.productInfo as ProductInfo | undefined;
  const relatedProducts = data?.relatedProducts || [];

  const variants: Variant[] = useMemo(
    () => product?.variants || [],
    [product?.variants],
  );

  const galleryImages: string[] = useMemo(() => {
    return product?.product_image?.map((img: any) => img.image) || [];
  }, [product?.product_image]);

  const [selectedVariantId, setSelectedVariantId] = useState<number | null>(
    null,
  );
  const [activeImage, setActiveImage] = useState<string>("");
  const [reviewForm, setReviewForm] = useState({
    review: 0,
    message: "",
  });
  const [expandedReviewIds, setExpandedReviewIds] = useState<number[]>([]);
  const [editingReviewId, setEditingReviewId] = useState<number | null>(null);
  const [editReviewForm, setEditReviewForm] = useState({
    review: 0,
    message: "",
  });

  const selectedVariant: Variant | undefined = useMemo(() => {
    if (!variants.length) return undefined;
    if (selectedVariantId == null) return variants[0];
    return (
      variants.find((variant) => variant.id === selectedVariantId) ??
      variants[0]
    );
  }, [variants, selectedVariantId]);

  const variantOptions = useMemo(
    () =>
      variants.map((variant) => ({
        label: `${variant.color || variant.size || variant.sku} - $${variant.sell_price} (${variant.quantity > 0 ? `${variant.quantity} in stock` : "Out of stock"})`,
        value: String(variant.id),
      })),
    [variants],
  );

  useEffect(() => {
    if (variants.length) setSelectedVariantId(variants[0].id);
    else setSelectedVariantId(null);
  }, [id, variants]);

  useEffect(() => {
    const variantImage = selectedVariant?.imageUrl || selectedVariant?.image;
    if (variantImage) {
      setActiveImage(variantImage);
      return;
    }

    if (galleryImages.length > 0) {
      setActiveImage(galleryImages[0]);
      return;
    }

    setActiveImage("");
  }, [
    selectedVariant?.id,
    selectedVariant?.imageUrl,
    selectedVariant?.image,
    galleryImages,
  ]);

  const variantThumbs = useMemo(() => {
    const list = variants
      .map((variant) => ({
        id: variant.id,
        label: variant.color || variant.size || variant.sku,
        img: variant.imageUrl || variant.image || "",
        qty: variant.quantity ?? 0,
      }))
      .filter((variant) => variant.img);

    const seen = new Set<string>();
    return list.filter((variant) => {
      if (seen.has(variant.img)) return false;
      seen.add(variant.img);
      return true;
    });
  }, [variants]);

  const fallbackThumbs = useMemo(() => {
    const seen = new Set<string>();
    return galleryImages.filter((img) => {
      if (seen.has(img)) return false;
      seen.add(img);
      return true;
    });
  }, [galleryImages]);

  const thumbsToShow = variantThumbs.length
    ? variantThumbs.map((variant) => variant.img)
    : fallbackThumbs;

  const reviews: ProductReview[] = useMemo(
    () => (product?.reviews as ProductReview[]) || [],
    [product?.reviews],
  );

  const totalReviews = useMemo(
    () => product?.reviewsCount ?? product?.reviewCount ?? reviews.length,
    [product?.reviewCount, product?.reviewsCount, reviews.length],
  );

  const averageRating = useMemo(() => {
    if (typeof product?.averageRating === "number")
      return product.averageRating;
    if (typeof product?.rating === "number") return product.rating;
    if (!reviews.length) return 0;

    const total = reviews.reduce(
      (sum, reviewItem) => sum + Number(reviewItem.review || 0),
      0,
    );
    return total / reviews.length;
  }, [product?.averageRating, product?.rating, reviews]);

  const ratingBreakdown = useMemo(
    () =>
      [5, 4, 3, 2, 1].map((starValue) => {
        const count = reviews.filter(
          (reviewItem) => Number(reviewItem.review) === starValue,
        ).length;

        return {
          starValue,
          count,
          percentage:
            totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0,
        };
      }),
    [reviews, totalReviews],
  );

  const toggleReviewExpanded = (reviewId: number) => {
    setExpandedReviewIds((prev) =>
      prev.includes(reviewId)
        ? prev.filter((itemId) => itemId !== reviewId)
        : [...prev, reviewId],
    );
  };

  const startEditingReview = (reviewItem: ProductReview) => {
    setEditingReviewId(reviewItem.id);
    setEditReviewForm({
      review: Number(reviewItem.review) || 0,
      message: reviewItem.message || "",
    });
    setExpandedReviewIds((prev) =>
      prev.includes(reviewItem.id) ? prev : [...prev, reviewItem.id],
    );
  };

  const cancelEditingReview = () => {
    setEditingReviewId(null);
    setEditReviewForm({
      review: 0,
      message: "",
    });
  };

  if (isFetching || isLoading) return <PageLoader />;
  if (!product) return <p>Not Found</p>;

  const price = selectedVariant?.price ?? product?.variants?.[0]?.price ?? 0;
  const sellPrice =
    selectedVariant?.sell_price ?? product?.variants?.[0]?.sell_price ?? 0;
  const stockQty = selectedVariant?.quantity ?? 0;
  const inStock = stockQty > 0;
  const saveAmount = Math.max(Number(price) - Number(sellPrice), 0);
  const selectedVariantLabel =
    selectedVariant?.color || selectedVariant?.size || selectedVariant?.sku;
  const productCode = product?.cj_product_id || `#${product.id}`;

  const handleAddToCart = async (currentProduct: IProduct) => {
    const variant = selectedVariant;

    if (!variant) {
      toast.error("No variant available for this product");
      return;
    }
    if (variant.quantity <= 0) {
      toast.error("This variant is out of stock");
      return;
    }

    const cartItem = {
      productId: currentProduct.id,
      variantId: variant.id,
      key: `${currentProduct.id}_${variant.id}`,
      sku: variant.sku,
      title: currentProduct.title,
      image:
        variant.imageUrl ||
        variant.image ||
        currentProduct?.product_image?.[0]?.image ||
        fallbackImage,
      originalPrice: Number(variant.price),
      sellPrice: Number(variant.sell_price ?? variant.price),
      qty: 1,
      stockQty: Number(variant.quantity ?? 0),
      inStock: variant.quantity > 0,
      cj_product_id: (currentProduct as any)?.cj_product_id,
      cj_variant_id: variant.cj_variant_id,
      variantLabel: variant.color || variant.size || variant.sku,
    };

    const addToCartItems = {
      product_variant_id: variant.id,
      quantity: 1,
    };
    const existingItem = cartItems.find((item) => item.key === cartItem.key);

    dispatch(addToCart(cartItem));
    dispatch(setCartOwnerUserId(user?.id ?? null));
    toast.success("Product added to cart");

    if (user) {
      try {
        const response = await addToCartMutation(addToCartItems).unwrap();
        const serverCartItemId =
          response?.data?.cart_item_id ??
          response?.data?.id ??
          response?.cart_item_id ??
          response?.id;

        if (serverCartItemId) {
          dispatch(
            patchCartItem({
              key: cartItem.key,
              changes: { cartItemId: Number(serverCartItemId) },
            }),
          );
        }
      } catch {
        if (existingItem) {
          dispatch(setQty({ key: existingItem.key, qty: existingItem.qty }));
        } else {
          dispatch(removeFromCart({ key: cartItem.key }));
        }
        toast.error("Add to cart failed. Please try again.");
      }
    }
  };

  const handleReviewSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isLoggedIn) {
      toast.error("Please login first to add a review.");
      return;
    }

    if (!reviewForm.review) {
      toast.error("Please choose a rating.");
      return;
    }

    if (!reviewForm.message.trim()) {
      toast.error("Please write a short review message.");
      return;
    }

    try {
      const response: any = await createProductReview({
        product_id: product.id,
        review: reviewForm.review,
        message: reviewForm.message.trim(),
      }).unwrap();

      setReviewForm({
        review: 0,
        message: "",
      });
      toast.success(response?.message || "Review submitted successfully.");
      await refetch();
    } catch (error) {
      toast.error(
        getApiErrorMessage(error, "Could not submit your review right now."),
      );
    }
  };

  const handleReviewUpdate = async (reviewItem: ProductReview) => {
    if (!editReviewForm.review) {
      toast.error("Please choose a rating.");
      return;
    }

    if (!editReviewForm.message.trim()) {
      toast.error("Please write a short review message.");
      return;
    }

    try {
      const response: any = await updateReview({
        id: reviewItem.id,
        data: {
          product_id: product.id,
          review: editReviewForm.review,
          message: editReviewForm.message.trim(),
        },
      }).unwrap();

      toast.success(response?.message || "Review updated successfully.");
      cancelEditingReview();
      await refetch();
    } catch (error) {
      toast.error(
        getApiErrorMessage(error, "Could not update your review right now."),
      );
    }
  };

  return (
    <main className="relative max-w-main xl:mt-36 md:mt-30 mt-15 xl:pb-15 md:pb-10 pb-5 overflow-hidden">
      <SEO
        title={product?.title || "Product Details"}
        description={product?.short_description || "Product details page"}
      />

      <div className="max-w-container mx-auto px-3">
        <DynamicBreadcrumb customLabel={product?.title} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:mt-6">
          <div className="lg:col-span-6">
            <div className="rounded-2xl overflow-hidden xl:max-w-182 xl:max-h-140.75 w-full lg:h-125 md:h-100 h-80 aspect-4/3 lg:aspect-16/10">
              <img
                src={activeImage || thumbsToShow[0] || fallbackImage}
                alt={product.title}
                className="w-full h-full object-cover"
                onError={(event) => {
                  event.currentTarget.src = fallbackImage;
                }}
              />
            </div>

            <div className="flex lg:hidden gap-2 pt-4">
              {(variantThumbs.length
                ? variantThumbs
                : thumbsToShow.map(
                    (img, index) =>
                      ({ id: index, img, label: "", qty: 1 }) as const,
                  )
              )
                .slice(0, 6)
                .map((variant, index) => {
                  const isActive =
                    variantThumbs.length > 0
                      ? selectedVariant?.id === variant.id
                      : activeImage === variant.img;

                  return (
                    <div
                      key={variantThumbs.length ? variant.id : index}
                      onClick={() => {
                        if (variantThumbs.length) {
                          setSelectedVariantId(variant.id);
                          setActiveImage(variant.img);
                        } else {
                          setActiveImage(variant.img);
                        }
                      }}
                      className={`w-28.75 h-24 aspect-115/96 rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                        isActive ? "border-orange-500" : "border-transparent"
                      } ${variant.qty <= 0 ? "opacity-50" : ""}`}
                      title={variant.label}
                    >
                      <img
                        src={variant.img}
                        className="w-full h-full object-cover"
                        onError={(event) => {
                          event.currentTarget.src = fallbackImage;
                        }}
                      />
                    </div>
                  );
                })}
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-start md:space-y-5 space-y-2">
            <div>
              <h1 className="xl:text-[40px] md:text-3xl text-2xl font-semibold text-gray-900 mb-2">
                {product.title}
              </h1>

              <div className="flex items-center md:gap-3 gap-2">
                <div className="flex text-primary">
                  <Rating rating={averageRating} showText={false} />
                </div>
                <span className="font-bold text-primary">
                  {averageRating ? averageRating.toFixed(1) : "0.0"}
                </span>
                <span className="text-sm text-gray-500">
                  {totalReviews} reviews
                </span>

                <div className="ml-auto flex items-start gap-2">
                  <span className="text-4xl font-semibold text-primary">
                    ${sellPrice}
                  </span>
                  <span className="text-gray-500 text-xl font-medium line-through">
                    ${price}
                  </span>
                </div>
              </div>
            </div>

            {variants.length > 0 && (
              <div className="mt-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Choose Variant
                </label>

                <SharedDropdown
                  options={variantOptions}
                  selectedValue={
                    selectedVariant?.id ? String(selectedVariant.id) : undefined
                  }
                  onValueChange={(value) => {
                    const nextId = Number(value);
                    setSelectedVariantId(nextId);

                    const variant = variants.find((item) => item.id === nextId);
                    const variantImage = variant?.imageUrl || variant?.image;
                    if (variantImage) setActiveImage(variantImage);
                  }}
                  placeholder="Select Variant"
                  align="end"
                  className="w-full"
                />
              </div>
            )}

            <div className="flex items-center gap-2 font-semibold mt-2">
              <span
                className={`${inStock ? "text-[#84CC16]" : "text-red-500"}`}
              >
                {inStock ? "In Stock" : "Sold Out"}
              </span>
              <span className="text-gray-700">
                {inStock ? `- ${stockQty} items left` : "- Out of stock"}
              </span>
            </div>

            <p className="xl:mt-8 md:mt-6 mt-2">{product.short_description}</p>

            <div className="flex gap-4">
              <Button
                variant="outline"
                disabled={!inStock}
                onClick={() => handleAddToCart(product)}
                className="w-fit"
              >
                Add To Cart
              </Button>
              <Link to="/shopping-cart" className="w-fit">
                <Button disabled={!inStock}>Send This Gift Now</Button>
              </Link>
            </div>

            <div className="hidden lg:flex gap-2 pt-4">
              {(variantThumbs.length
                ? variantThumbs
                : thumbsToShow.map(
                    (img, index) =>
                      ({ id: index, img, label: "", qty: 1 }) as const,
                  )
              )
                .slice(0, 7)
                .map((variant, index) => {
                  const isActive =
                    variantThumbs.length > 0
                      ? selectedVariant?.id === variant.id
                      : activeImage === variant.img;

                  return (
                    <div
                      key={variantThumbs.length ? variant.id : index}
                      onClick={() => {
                        if (variantThumbs.length) {
                          setSelectedVariantId(variant.id);
                          setActiveImage(variant.img);
                        } else {
                          setActiveImage(variant.img);
                        }
                      }}
                      className={`w-28.75 h-24 aspect-115/96 rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                        isActive ? "border-primary" : "border-transparent"
                      } ${variant.qty <= 0 ? "opacity-50" : ""}`}
                      title={variant.label}
                    >
                      <img
                        src={variant.img}
                        className="w-full h-full object-cover"
                        onError={(event) => {
                          event.currentTarget.src = fallbackImage;
                        }}
                      />
                    </div>
                  );
                })}
            </div>
          </div>
        </div>

        <section className="xl:mt-16 md:mt-12 mt-10 space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.95fr)] gap-6">
            <div className="rounded-4xl border border-primary-200 bg-primary-50/60 p-6 md:p-8 ">
              <div className="flex flex-wrap items-start justify-between gap-4 ">
                <div className="space-y-2">
                  <span className="inline-flex rounded-full bg-white px-4 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-primary shadow-sm">
                    Product Overview
                  </span>
                  <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
                    More about this product
                  </h2>
                  <p className="max-w-3xl text-sm md:text-base leading-7 text-gray-600">
                    {product.short_description || "No summary available yet."}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="bg-white text-gray-700">
                    {product?.brand?.name || "Generic Brand"}
                  </Badge>
                  <Badge variant="outline" className="bg-white text-gray-700">
                    {product?.source_type?.toUpperCase() || "LOCAL"}
                  </Badge>
                  <Badge variant="outline" className="bg-white text-gray-700">
                    {product?.is_customizable
                      ? "Customizable"
                      : "Standard item"}
                  </Badge>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-3xl border border-white bg-white p-5 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-50 text-primary">
                      <Store className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Brand</p>
                      <p className="font-semibold text-gray-900">
                        {product?.brand?.name || "Local"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl border border-white bg-white p-5 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-50 text-primary">
                      <PackageCheck className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Availability</p>
                      <p className="font-semibold text-gray-900">
                        {inStock
                          ? `${stockQty} units ready`
                          : "Currently sold out"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl border border-white bg-white p-5 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-50 text-primary">
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Selected option</p>
                      <p className="font-semibold text-gray-900">
                        {selectedVariantLabel || "Default product setup"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-3xl border border-white bg-white p-5 shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-50 text-primary">
                      <MessageSquareText className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Customer feedback</p>
                      <p className="font-semibold text-gray-900">
                        {totalReviews > 0
                          ? `${averageRating.toFixed(1)} average from ${totalReviews} review${totalReviews > 1 ? "s" : ""}`
                          : "No reviews yet"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 rounded-3xl border border-white bg-white p-6 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Product description
                    </h3>
                    <p className="text-sm text-gray-500">
                      Full details from the product catalog
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className="bg-primary-50 text-primary"
                  >
                    Code: {productCode}
                  </Badge>
                </div>

                <div
                  className="mt-4 text-sm leading-7 text-gray-600 [&_h1]:mb-4 [&_h1]:text-2xl [&_h1]:font-semibold [&_h2]:mb-4 [&_h2]:text-xl [&_h2]:font-semibold [&_img]:hidden [&_p]:mb-4 [&_strong]:font-semibold"
                  dangerouslySetInnerHTML={{
                    __html:
                      product.description ||
                      "<p>No detailed description available for this product yet.</p>",
                  }}
                />
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-4xl border border-primary-200 bg-white p-6 md:p-8 shadow-sm">
                <h2 className="text-2xl font-semibold text-gray-900">
                  Purchase snapshot
                </h2>
                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Quick info before you move to cart.
                </p>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between border-b border-dashed border-gray-200 pb-4">
                    <span className="text-sm text-gray-500">Current price</span>
                    <span className="text-lg font-semibold text-primary">
                      ${sellPrice}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-dashed border-gray-200 pb-4">
                    <span className="text-sm text-gray-500">Regular price</span>
                    <span className="font-medium text-gray-800">${price}</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-dashed border-gray-200 pb-4">
                    <span className="text-sm text-gray-500">You save</span>
                    <span className="font-medium text-gray-800">
                      ${saveAmount}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-dashed border-gray-200 pb-4">
                    <span className="text-sm text-gray-500">Variants</span>
                    <span className="font-medium text-gray-800">
                      {variants.length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-b border-dashed border-gray-200 pb-4">
                    <span className="text-sm text-gray-500">
                      Gallery images
                    </span>
                    <span className="font-medium text-gray-800">
                      {galleryImages.length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Featured</span>
                    <span className="font-medium text-gray-800">
                      {product?.is_featured ? "Yes" : "No"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded-4xl border border-primary-200 bg-white p-6 md:p-8 shadow-sm">
                <h2 className="text-2xl font-semibold text-gray-900">
                  Available options
                </h2>
                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Select the variation that matches your order.
                </p>

                <div className="mt-6 space-y-3">
                  {variants.length > 0 ? (
                    variants.map((variant) => {
                      const isActive = selectedVariant?.id === variant.id;
                      return (
                        <button
                          type="button"
                          key={variant.id}
                          onClick={() => {
                            setSelectedVariantId(variant.id);
                            const nextImage =
                              variant.imageUrl || variant.image || activeImage;
                            if (nextImage) setActiveImage(nextImage);
                          }}
                          className={cn(
                            "w-full rounded-3xl border p-4 text-left transition-all",
                            isActive
                              ? "border-primary bg-primary-50 shadow-sm"
                              : "border-gray-200 bg-white hover:border-primary-200",
                          )}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <p className="font-semibold text-gray-900">
                                {variant.color || variant.size || variant.sku}
                              </p>
                              <p className="mt-1 text-sm text-gray-500">
                                SKU: {variant.sku}
                              </p>
                            </div>
                            <Badge
                              variant="outline"
                              className={cn(
                                "bg-white",
                                variant.quantity > 0
                                  ? "text-[#84CC16]"
                                  : "text-red-500",
                              )}
                            >
                              {variant.quantity > 0
                                ? `${variant.quantity} in stock`
                                : "Out of stock"}
                            </Badge>
                          </div>

                          <div className="mt-3 flex items-center justify-between gap-3 text-sm">
                            <span className="text-gray-500">
                              Sell price:{" "}
                              <span className="font-semibold text-primary">
                                ${variant.sell_price}
                              </span>
                            </span>
                            <span className="text-gray-400 line-through">
                              ${variant.price}
                            </span>
                          </div>
                        </button>
                      );
                    })
                  ) : (
                    <div className="rounded-3xl border border-dashed border-gray-200 px-4 py-6 text-sm text-gray-500">
                      No variant options available for this product.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] gap-6">
            <div className="rounded-4xl border border-primary-200 bg-white p-6 md:p-8 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <span className="inline-flex rounded-full bg-primary-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                    Reviews
                  </span>
                  <h2 className="mt-3 text-2xl md:text-3xl font-semibold text-gray-900">
                    What customers are saying
                  </h2>
                </div>

                <div className="min-w-52 rounded-3xl bg-primary-50 p-5">
                  <div className="flex items-end gap-3">
                    <span className="text-4xl font-semibold text-primary">
                      {averageRating.toFixed(1)}
                    </span>
                    <div className="pb-1">
                      <Rating rating={averageRating} showText={false} />
                      <p className="mt-1 text-sm text-gray-500">
                        Based on {totalReviews} review
                        {totalReviews > 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 lg:grid-cols-[220px_minmax(0,1fr)] gap-6">
                <div className="space-y-3">
                  {ratingBreakdown.map((item) => (
                    <div
                      key={item.starValue}
                      className="flex items-center gap-3"
                    >
                      <span className="w-10 text-sm font-medium text-gray-700">
                        {item.starValue} star
                      </span>
                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-100">
                        <div
                          className="h-full rounded-full bg-primary"
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                      <span className="w-8 text-right text-sm text-gray-500">
                        {item.count}
                      </span>
                    </div>
                  ))}
                </div>

                {/* reviews */}
                <div className="space-y-4 h-100 md:h-125 lg:h-137.5 overflow-y-auto">
                  {reviews.length > 0 ? (
                    reviews.map((reviewItem) => {
                      const displayName = getDisplayName(reviewItem);
                      const isOwnReview = user?.id === reviewItem.user_id;
                      const isExpanded = expandedReviewIds.includes(
                        reviewItem.id,
                      );
                      const isEditing = editingReviewId === reviewItem.id;
                      const reviewMessage =
                        reviewItem.message || "No written feedback.";
                      const isLongMessage =
                        reviewMessage.length > REVIEW_PREVIEW_LENGTH;
                      const previewMessage = isLongMessage
                        ? `${reviewMessage.slice(0, REVIEW_PREVIEW_LENGTH).trim()}...`
                        : reviewMessage;

                      return (
                        <div
                          key={reviewItem.id}
                          className="rounded-3xl border border-gray-200 bg-gray-50/70 p-5"
                        >
                          <div className="flex items-start gap-4">
                            <Avatar className="h-12 w-12 border border-primary-200">
                              <AvatarImage
                                src={reviewItem.avatar || undefined}
                                alt={displayName}
                              />
                              <AvatarFallback className="bg-primary-50 text-primary font-semibold">
                                {getInitials(displayName)}
                              </AvatarFallback>
                            </Avatar>

                            <div className="min-w-0 flex-1">
                              <div className="flex flex-wrap items-center justify-between gap-2">
                                <div>
                                  <p className="font-semibold text-gray-900">
                                    {displayName}
                                  </p>
                                  {reviewItem.email ? (
                                    <p className="text-sm text-gray-500">
                                      {reviewItem.email}
                                    </p>
                                  ) : null}
                                </div>
                                <div className="flex items-center gap-2">
                                  <Rating
                                    rating={Number(reviewItem.review) || 0}
                                    showText={false}
                                  />
                                  <span className="text-sm font-medium text-gray-700">
                                    {Number(reviewItem.review).toFixed(1)}
                                  </span>
                                </div>
                              </div>

                              <div className="mt-4 space-y-3">
                                {isEditing ? (
                                  <div className="space-y-4 rounded-2xl border border-primary-200 bg-white p-4">
                                    <div>
                                      <p className="mb-3 text-sm font-medium text-gray-700">
                                        Update your rating
                                      </p>
                                      <div className="flex flex-wrap gap-2">
                                        {[1, 2, 3, 4, 5].map((starValue) => (
                                          <button
                                            key={starValue}
                                            type="button"
                                            onClick={() =>
                                              setEditReviewForm((prev) => ({
                                                ...prev,
                                                review: starValue,
                                              }))
                                            }
                                            className={cn(
                                              "inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm font-medium transition-all",
                                              editReviewForm.review >= starValue
                                                ? "border-primary bg-primary-50 text-primary"
                                                : "border-gray-200 bg-white text-gray-600 hover:border-primary-200",
                                            )}
                                          >
                                            <Star
                                              className={cn(
                                                "h-4 w-4",
                                                editReviewForm.review >=
                                                  starValue
                                                  ? "fill-primary text-primary"
                                                  : "text-gray-300",
                                              )}
                                            />
                                            {starValue}
                                          </button>
                                        ))}
                                      </div>
                                    </div>

                                    <div>
                                      <p className="mb-3 text-sm font-medium text-gray-700">
                                        Update your comment
                                      </p>
                                      <Textarea
                                        rows={5}
                                        value={editReviewForm.message}
                                        onChange={(event) =>
                                          setEditReviewForm((prev) => ({
                                            ...prev,
                                            message: event.target.value,
                                          }))
                                        }
                                      />
                                    </div>

                                    <div className="flex flex-wrap gap-3">
                                      <Button
                                        type="button"
                                        onClick={() =>
                                          handleReviewUpdate(reviewItem)
                                        }
                                        disabled={isUpdatingReview}
                                      >
                                        {isUpdatingReview
                                          ? "Saving..."
                                          : "Save changes"}
                                      </Button>
                                      <Button
                                        type="button"
                                        variant="outline"
                                        onClick={cancelEditingReview}
                                        disabled={isUpdatingReview}
                                      >
                                        Cancel
                                      </Button>
                                    </div>
                                  </div>
                                ) : (
                                  <>
                                    <p className="text-sm leading-7 text-gray-600">
                                      {isExpanded
                                        ? reviewMessage
                                        : previewMessage}
                                    </p>

                                    {(isLongMessage || isOwnReview) && (
                                      <div className="flex flex-wrap items-center gap-3">
                                        {isLongMessage ? (
                                          <button
                                            type="button"
                                            onClick={() =>
                                              toggleReviewExpanded(
                                                reviewItem.id,
                                              )
                                            }
                                            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-opacity hover:opacity-80"
                                          >
                                            <MoreHorizontal className="h-4 w-4" />
                                            {isExpanded
                                              ? "Show less"
                                              : "Read more"}
                                          </button>
                                        ) : null}

                                        {isOwnReview ? (
                                          <button
                                            type="button"
                                            onClick={() =>
                                              startEditingReview(reviewItem)
                                            }
                                            className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-700 transition-opacity hover:opacity-80"
                                          >
                                            <PencilLine className="h-4 w-4" />
                                            Edit review
                                          </button>
                                        ) : null}
                                      </div>
                                    )}
                                  </>
                                )}
                              </div>

                              {reviewItem.reply ? (
                                <div className="mt-4 rounded-2xl border border-primary-200 bg-white p-4">
                                  <p className="text-sm font-semibold text-gray-900">
                                    Seller reply
                                  </p>
                                  <p className="mt-2 text-sm leading-6 text-gray-600">
                                    {reviewItem.reply}
                                  </p>
                                </div>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="rounded-3xl border border-dashed border-gray-200 px-5 py-8 text-center text-sm text-gray-500">
                      No reviews yet. Be the first customer to share feedback.
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="">
              <div className="rounded-4xl border border-primary-200 bg-white p-6 md:p-8 shadow-sm">
                <span className="inline-flex rounded-full bg-primary-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                  Write a review
                </span>
                <h2 className="mt-3 text-2xl font-semibold text-gray-900">
                  Share your experience
                </h2>
                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Add a manual rating and a short comment for this product.
                </p>

                {isLoggedIn ? (
                  <form
                    className="mt-6 space-y-5"
                    onSubmit={handleReviewSubmit}
                  >
                    <div>
                      <label className="mb-3 block text-sm font-medium text-gray-700">
                        Your rating
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {[1, 2, 3, 4, 5].map((starValue) => (
                          <button
                            key={starValue}
                            type="button"
                            onClick={() =>
                              setReviewForm((prev) => ({
                                ...prev,
                                review: starValue,
                              }))
                            }
                            className={cn(
                              "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all",
                              reviewForm.review >= starValue
                                ? "border-primary bg-primary-50 text-primary"
                                : "border-gray-200 bg-white text-gray-600 hover:border-primary-200",
                            )}
                          >
                            <Star
                              className={cn(
                                "h-4 w-4",
                                reviewForm.review >= starValue
                                  ? "fill-primary text-primary"
                                  : "text-gray-300",
                              )}
                            />
                            {starValue}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="review-message"
                        className="mb-3 block text-sm font-medium text-gray-700"
                      >
                        Your review
                      </label>
                      <Textarea
                      className="rounded-xl"
                        id="review-message"
                        rows={6}
                        value={reviewForm.message}
                        onChange={(event) =>
                          setReviewForm((prev) => ({
                            ...prev,
                            message: event.target.value,
                          }))
                        }
                        placeholder="Write what you liked, quality impression, delivery feel, or any practical feedback."
                      />
                    </div>

                    <div className="rounded-3xl bg-primary-50 p-4 text-sm leading-6 text-gray-600">
                      Posting as{" "}
                      <span className="font-semibold text-gray-900">
                        {user?.first_name || user?.last_name
                          ? `${user?.first_name || ""} ${user?.last_name || ""}`.trim()
                          : user?.email}
                      </span>
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmittingReview}
                      className="w-full"
                    >
                      {isSubmittingReview
                        ? "Submitting review..."
                        : "Submit review"}
                    </Button>
                  </form>
                ) : (
                  <div className="mt-6 rounded-3xl border border-dashed border-primary-200 bg-primary-50 p-5">
                    <p className="text-sm leading-6 text-gray-600">
                      Login to add a rating and comment for this product. After
                      submission, the review will appear in the customer review
                      list.
                    </p>
                    <Link to="/login" className="mt-4 inline-block">
                      <Button>Login to review</Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>

      <RelatedProdect relatedProducts={relatedProducts} />
    </main>
  );
};

export default ProductDetails;
