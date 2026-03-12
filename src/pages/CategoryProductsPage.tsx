/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { ArrowLeft, FolderOpen, Package2 } from "lucide-react";
import GiftBoxCard from "@/components/shared/cards/GiftBoxCard";
import SEO from "@/components/shared/SEO";
import PageLoader from "@/components/shared/PageLoader";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Pagination from "@/components/Dashboard/Seller/Orders/Pagination";
import type { Category } from "@/types/public";
import type { IProduct } from "@/types";
import {
  useCategorizedProductByIdQuery,
  useCategoryListQuery,
} from "@/redux/features/public/public.api";

const ITEMS_PER_PAGE = 9;

export default function CategoryProductsPage() {
  const params = useParams();
  const categoryId = Number(params.categoryId);
  const [currentPage, setCurrentPage] = useState(1);
  const shouldSkipQuery = Number.isNaN(categoryId);

  const { data: categoryDetails, isLoading: isCategoryLoading } =
    useCategorizedProductByIdQuery(categoryId, {
      skip: shouldSkipQuery,
    });

  const { data: categories = [], isLoading: isCategoryListLoading } =
    useCategoryListQuery(undefined);

  useEffect(() => {
    setCurrentPage(1);
  }, [categoryId]);

  if (isCategoryLoading || isCategoryListLoading) {
    return <PageLoader />;
  }

  if (shouldSkipQuery || !categoryDetails) {
    return (
      <section className="max-w-main xl:mt-36 md:mt-30 mt-20 xl:pb-15 md:pb-10 pb-5 px-3">
        <div className="max-w-container mx-auto rounded-[32px] border border-[#F3E5CC] bg-[linear-gradient(180deg,#FFFFFF_0%,#FFF8EE_100%)] p-6 md:p-8 text-center shadow-[0_16px_40px_rgba(17,24,39,0.08)]">
          <div className="mx-auto mb-5 flex h-[72px] w-[72px] items-center justify-center rounded-[24px] bg-white shadow-[0_16px_32px_rgba(202,138,50,0.14)]">
            <FolderOpen className="h-8 w-8 text-[#CA8A32]" />
          </div>
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
            Category not found
          </h1>
          <p className="mt-3 text-sm md:text-base text-[#64748B]">
            We could not load this category right now. Please go back and try
            another category.
          </p>
          <div className="mt-8 flex justify-center">
            <Link to="/shop-gifts">
              <Button asChild className="rounded-2xl">
                <ArrowLeft className="h-4 w-4" />
                Back to Shop Gifts
              </Button>
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const products = categoryDetails.products ?? [];
  const totalPages = Math.max(1, Math.ceil(products.length / ITEMS_PER_PAGE));
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = products.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  return (
    <section className="max-w-main xl:mt-36 md:mt-30 mt-20 xl:pb-15 md:pb-10 pb-5 px-3">
      <SEO
        title={`${categoryDetails.name} Products`}
        description={`Browse all products under ${categoryDetails.name}.`}
      />

      <div className="max-w-container mx-auto space-y-8">
        <div className="rounded-[32px] overflow-hidden shadow-[0_16px_40px_rgba(17,24,39,0.08)]">
          <div className="bg-[linear-gradient(96deg,#D0A15A_5.18%,#C57200_96.62%)] text-white p-6 md:p-8">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-sm text-white/80">Shop Gifts Category</p>
                <h1 className="mt-2 text-3xl md:text-4xl font-semibold">
                  {categoryDetails.name}
                </h1>
                <p className="mt-3 max-w-2xl text-sm md:text-base text-white/85">
                  {categoryDetails.description ||
                    `All available products under ${categoryDetails.name}.`}
                </p>
              </div>

              <Link to="/shop-gifts">
                <Button 
                  variant="outline"
                  className="rounded-2xl bg-white/10 text-white border-white/25 hover:bg-white hover:text-primary"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Shop Gifts
                </Button>
              </Link>
            </div>
          </div>

          <div className="bg-white p-5 md:p-8">
            <div className="flex flex-wrap items-center gap-3">
              <Badge className="border-none bg-[#FFF4E5] text-[#B96800] px-4 py-2 shadow-none">
                Category ID: {categoryDetails.id}
              </Badge>
              <Badge className="border-none bg-[#F5F5F6] text-gray-700 px-4 py-2 shadow-none">
                {products.length} products
              </Badge>
              <Badge className="border-none bg-[#F5F5F6] text-gray-700 px-4 py-2 shadow-none">
                Page {currentPage} of {totalPages}
              </Badge>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)] gap-8">
          <aside className="rounded-[28px] border border-gray-200 bg-white p-5 md:p-6 shadow-[0_10px_30px_rgba(17,24,39,0.05)] h-fit">
            <div className="flex items-center gap-3 mb-5">
              <FolderOpen className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-semibold text-gray-900">
                Categories
              </h2>
            </div>

            <div className="space-y-2">
              {categories.map((category: Category) => {
                const isActive = category.id === categoryDetails.id;

                return (
                  <Link
                    key={category.id}
                    to={`/shop-gifts/category/${category.id}`}
                    className={`flex items-center justify-between rounded-2xl px-4 py-3 transition-all ${
                      isActive
                        ? "bg-[linear-gradient(96deg,#D0A15A_5.18%,#C57200_96.62%)] text-white"
                        : "bg-[#F8FAFC] text-gray-700 hover:bg-[#FFF6EA] hover:text-primary"
                    }`}
                  >
                    <span className="font-medium">{category.name}</span>
                    <span
                      className={`text-sm ${isActive ? "text-white/90" : "text-gray-500"}`}
                    >
                      {category.products_count ??
                        category.products?.length ??
                        0}
                    </span>
                  </Link>
                );
              })}
            </div>
          </aside>

          <div className="space-y-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  All {categoryDetails.name} Products
                </h2>
                <p className="mt-1 text-sm md:text-base text-[#64748B]">
                  Showing {paginatedProducts.length} items on this page from the
                  selected category.
                </p>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3">
                <Package2 className="h-5 w-5 text-primary" />
                <span className="text-sm font-medium text-gray-700">
                  Total products: {products.length}
                </span>
              </div>
            </div>

            {paginatedProducts.length === 0 ? (
              <div className="rounded-[28px] border border-dashed border-[#D6B88A] bg-[#FFF9F1] p-8 text-center">
                <h3 className="text-xl font-semibold text-gray-900">
                  No products found
                </h3>
                <p className="mt-2 text-sm md:text-base text-[#64748B]">
                  This category is available, but there are no products to show
                  right now.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {paginatedProducts.map((product: IProduct) => (
                  <GiftBoxCard key={product.id} product={product} />
                ))}
              </div>
            )}

            {products.length > ITEMS_PER_PAGE && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
