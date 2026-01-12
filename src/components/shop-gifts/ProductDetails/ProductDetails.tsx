import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Star, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import DynamicBreadcrumb from "@/components/shared/DynamicBreadcrumb";

export interface IProduct {
  id: string | number;
  title: string;
  description: string;
  price: number;
  oldPrice?: number;
  image: string[];
  rating: number;
  reviewsCount: number;
  stockCount: number;
  inStock: boolean;
}

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [activeImage, setActiveImage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const products: IProduct[] = [
    {
      id: "1",
      title: "Tech Accessories Pack",
      price: 500,
      oldPrice: 750,
      image: [
        "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf",
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
        "https://images.unsplash.com/photo-1491933382434-500287f9b54b",
        "https://images.unsplash.com/photo-1586201375761-83865001e31c",
        "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0",
      ],
      rating: 5,
      reviewsCount: 124,
      stockCount: 12,
      inStock: true,
      description:
        "A thoughtfully curated premium tech accessories set design delight professionals, clients, and loved ones. Perfect for celebrations, office event, and corporate gifting.",
    },
  ];

  useEffect(() => {
    const foundProduct = products.find((p) => p.id.toString() === "1");
    if (foundProduct) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setProduct(foundProduct);
      setActiveImage(foundProduct.image[0]);
    }
    setLoading(false);
  }, [id]);

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );

  return (
    <section className="relative max-w-main xl:mt-36 md:mt-30 mt-15 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 ">
        <DynamicBreadcrumb customLabel={product?.title} />
        {!product ? (
          <p className="">Not Found</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-6">
            {/* Left Side: Main Image */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl overflow-hidden bg-slate-100 aspect-[16/10]">
                <img
                  src={activeImage}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right Side: Product Details */}
            <div className="lg:col-span-6 flex flex-col justify-start space-y-5">
              <div>
                <h1 className="text-4xl font-bold text-[#111827] mb-2">
                  {product.title}
                </h1>
                <div className="flex items-center gap-3">
                  <div className="flex text-orange-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        fill="currentColor"
                        stroke="none"
                      />
                    ))}
                  </div>
                  <span className="text-sm font-bold text-orange-500">
                    {product.rating.toFixed(1)}
                  </span>
                  <span className="text-sm text-gray-400">
                    {product.reviewsCount} reviews
                  </span>

                  <div className="ml-auto flex items-center gap-2">
                    <span className="text-2xl font-bold text-orange-600">
                      ${product.price}
                    </span>
                    <span className="text-sm text-gray-400 line-through">
                      ${product.oldPrice}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex -space-x-1">
                  <div className="w-4 h-4 rounded-full bg-yellow-200 border border-white" />
                  <div className="w-4 h-4 rounded-full bg-yellow-400 border border-white" />
                </div>
                <span className="text-green-600 text-sm font-semibold">
                  In Stock
                </span>
                <span className="text-gray-400 text-sm">
                  — {product.stockCount} items left
                </span>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed">
                {product.description}
              </p>

              <Button className="w-fit bg-[#C58A33] hover:bg-[#A6742B] text-white px-8 py-6 rounded-xl text-md font-medium">
                Send This Gift Now
              </Button>

              {/* Thumbnails aligned to the right bottom like image */}
              <div className="flex gap-2 pt-4">
                {product.image.map((src, index) => (
                  <div
                    key={index}
                    onClick={() => setActiveImage(src)}
                    className={`w-20 h-14 rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                      activeImage === src
                        ? "border-orange-500"
                        : "border-transparent"
                    }`}
                  >
                    <img src={src} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductDetails;
