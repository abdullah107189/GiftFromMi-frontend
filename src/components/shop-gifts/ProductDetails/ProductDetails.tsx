import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Button } from "@/components/ui/button";
import DynamicBreadcrumb from "@/components/shared/DynamicBreadcrumb";
import Rating from "@/components/shared/Rating";
import { Loader2 } from "lucide-react";
import RelatedProdect from "./RelatedProdect";

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
    <main className="relative max-w-main xl:mt-36 md:mt-30 mt-15 xl:pb-15 md:pb-10 pb-5 overflow-hidden">
      <div className="max-w-container mx-auto px-3">
        <DynamicBreadcrumb customLabel={product?.title} />

        {!product ? (
          <p className="">Not Found</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-6">
            {/* Left Side: Main Image */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl overflow-hidden xl:max-w-182 xl:max-h-108.75 w-full lg:h-125 md:h-100 h-80">
                <img
                  src={activeImage}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex lg:hidden gap-2 pt-4">
                {product.image.map((src, index) => (
                  <div
                    key={index}
                    onClick={() => setActiveImage(src)}
                    className={`w-28.75 h-24 aspect-[115/96 rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                      activeImage === src
                        ? "border-orange-500"
                        : "border-transparent"
                    }`}
                  >
                    <img src={src} className="w-full h-full object-cover " />
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side: Product Details */}
            <div className="lg:col-span-6 flex flex-col justify-start space-y-5">
              <div>
                <h1 className="xl:text-[40px] md:text-3xl text-2xl font-semibold text-gray-900 mb-2">
                  {product.title}
                </h1>
                <div className="flex items-center gap-3">
                  <div className="flex text-primary">
                    <Rating rating={product.rating} showText={false}></Rating>
                  </div>
                  <span className="font-bold text-primary">
                    {product.rating.toFixed(1)}
                  </span>
                  <span className="text-sm text-gray-500">
                    {product.reviewsCount} reviews
                  </span>

                  <div className="ml-auto flex items-center gap-2">
                    <span className="text-2xl font-semibold text-primary">
                      ${product.price}
                    </span>
                    <span className="text-gray-500 font-medium">
                      ${product.oldPrice}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 font-semibold">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <g clip-path="url(#clip0_848_30742)">
                    <path
                      d="M7.18359 16.0515L6.00047 23.8527C5.86866 23.8527 5.7368 23.8218 5.61558 23.76L4.55175 23.2177L0.486234 21.1451C0.188813 20.9935 0 20.6796 0 20.3362V14.1441C0 13.9707 0.0478125 13.8051 0.133781 13.6641L5.69822 15.5483L7.18359 16.0515Z"
                      fill="#FAF3EB"
                    />
                    <path
                      d="M7.1836 16.0511L6.00048 23.8523C5.86866 23.8523 5.73681 23.8214 5.61559 23.7596L4.55176 23.2173V15.9158L5.69813 15.5479L7.1836 16.0511Z"
                      fill="#EFDBBF"
                    />
                    <path
                      d="M6 16.6545V23.8526C6.13144 23.8526 6.26339 23.8216 6.38433 23.7597L11.9996 20.8978L13.0346 17.4009L11.9996 13.5957L8.16473 14.5457L6 16.6545Z"
                      fill="#FAF3EB"
                    />
                    <path
                      d="M12.0005 13.5957L13.0355 17.4009L12.0005 20.8976L6.38535 23.7597C6.26635 23.8206 6.13463 23.8524 6.00098 23.8525V23.2175L10.1359 21.1096C10.2611 21.0458 10.3662 20.9486 10.4396 20.8288C10.513 20.709 10.5518 20.5713 10.5518 20.4308V14.3341L10.825 13.8869L12.0005 13.5957Z"
                      fill="#EFDBBF"
                    />
                    <path
                      d="M12.0003 13.5958L5.27649 16.285L0.133789 13.6635C0.214977 13.5303 0.330055 13.4182 0.470211 13.3434L6.00076 10.3711L9.51807 11.3913L12.0003 13.5958Z"
                      fill="#DBB176"
                    />
                    <path
                      d="M12.0003 13.5958L6.00073 16.6545L5.27637 16.2851L10.0739 13.8393C10.2757 13.7364 10.2789 13.4492 10.0793 13.342L5.27637 10.7603L6.00073 10.3711L9.51799 11.3915L12.0003 13.5958Z"
                      fill="#E7C9A1"
                    />
                    <path
                      d="M19.4704 15.9044L17.9995 23.8525C17.8659 23.8524 17.7342 23.8206 17.6152 23.7597L16.5509 23.2175L12 20.8976V13.5957L18.4858 15.6002L19.4704 15.9044Z"
                      fill="#FAF3EB"
                    />
                    <path
                      d="M19.4703 15.9038L17.9995 23.8519C17.8658 23.8518 17.7341 23.82 17.6151 23.7591L16.5508 23.2168V15.9154L18.4857 15.5996L19.4703 15.9038Z"
                      fill="#EFDBBF"
                    />
                    <path
                      d="M18 16.6539V23.8522C18.1317 23.8522 18.2634 23.8213 18.3847 23.7594L23.514 21.1444C23.8116 20.9928 24.0002 20.6789 24.0002 20.3355V14.1432C24.0002 13.97 23.9523 13.8045 23.8665 13.6631L20.5712 14.6044L18 16.6539Z"
                      fill="#FAF3EB"
                    />
                    <path
                      d="M23.9995 14.1441V20.3362C23.9995 20.6796 23.8107 20.9935 23.5133 21.1451L18.3839 23.76C18.2648 23.8209 18.1328 23.8527 17.999 23.8527V23.2177L22.0645 21.1451C22.362 20.9935 22.5508 20.6796 22.5508 20.3362V14.3343L22.8339 13.9587L23.8658 13.6641C23.9536 13.8087 23.9999 13.9748 23.9995 14.1441Z"
                      fill="#EFDBBF"
                    />
                    <path
                      d="M23.8667 13.6635L17.2752 16.2852L12 13.5959L13.5298 12.1704L14.3652 11.3915L17.9995 10.3711L19.9137 11.3997L23.5301 13.3433C23.6702 13.4182 23.7856 13.5307 23.8667 13.6635Z"
                      fill="#DBB176"
                    />
                    <path
                      d="M23.866 13.6634L17.9988 16.6545L17.2744 16.2851L22.0723 13.8393C22.2709 13.738 22.2809 13.4517 22.0849 13.3455L22.0807 13.3433L17.2744 10.7603L17.9988 10.3711L23.5294 13.3433C23.6694 13.4181 23.7848 13.5306 23.866 13.6634Z"
                      fill="#E7C9A1"
                    />
                    <path
                      d="M19.9132 11.3997C19.4738 12.8397 18.1347 13.8871 16.5503 13.8871C15.2663 13.8871 14.1426 13.1985 13.5293 12.1704L14.3647 11.3915L17.999 10.3711L19.9132 11.3997Z"
                      fill="#E7C9A1"
                    />
                    <path
                      d="M13.0353 5.78745L10.5518 12.8165L6.00098 10.3706V3.80469C6.00098 3.63134 6.04879 3.46569 6.13424 3.32422L11.7726 5.33694L13.0353 5.78745Z"
                      fill="#FAF3EB"
                    />
                    <path
                      d="M13.0343 5.78743L11.9995 13.5954L10.5508 12.8165V5.5764L11.7715 5.33691L13.0343 5.78743Z"
                      fill="#EFDBBF"
                    />
                    <path
                      d="M17.9995 3.80469L13.8384 12.6074L12 13.5954V6.3148L14.4837 4.61998L17.8657 3.32422C17.9535 3.4691 17.9998 3.6353 17.9995 3.80469Z"
                      fill="#FAF3EB"
                    />
                    <path
                      d="M17.866 3.32422L16.7221 3.7625L16.5511 3.99444V6.42453C16.5511 6.65858 16.3736 6.85128 16.1411 6.87828C14.3925 7.08139 13.0352 8.56756 13.0352 10.3706C13.0352 11.22 13.3365 11.9999 13.8387 12.6074L16.5511 11.1493V11.1495L17.9998 10.3706V3.80469C18.0001 3.6353 17.9538 3.46909 17.866 3.32422Z"
                      fill="#EFDBBF"
                    />
                    <path
                      d="M17.8656 3.32434L11.2755 5.94531L6.13379 3.32434C6.21502 3.19089 6.32977 3.07905 6.46998 3.004L11.5985 0.248876C11.5999 0.248313 11.6011 0.247423 11.6025 0.24686C11.7254 0.18126 11.8626 0.147112 12.0019 0.147464C12.1412 0.147815 12.2783 0.182656 12.4009 0.248876L17.5294 3.00405C17.6695 3.07905 17.7846 3.19089 17.8656 3.32434Z"
                      fill="#DBB176"
                    />
                    <path
                      d="M17.8655 3.32412L11.9998 6.31469L11.2754 5.94527L16.0723 3.49971C16.2709 3.39851 16.2808 3.11234 16.0849 3.00621L16.0807 3.00396L11.2754 0.422835L11.5985 0.248976C11.5999 0.247992 11.6008 0.247523 11.6023 0.246585C11.7252 0.1811 11.8624 0.147048 12.0017 0.147465C12.141 0.147882 12.278 0.182755 12.4005 0.248976L17.5294 3.00391C17.6695 3.07877 17.7844 3.1908 17.8655 3.32412Z"
                      fill="#E7C9A1"
                    />
                    <path
                      d="M20.8367 10.3705C20.8367 8.42865 18.1361 6.91895 18.1361 6.91895L17.2753 6.92921C15.6731 7.25706 14.4834 8.67137 14.4834 10.3704C14.4834 12.0683 15.6749 13.4822 17.2753 13.8114L18.1174 13.7836C18.1174 13.7837 20.8367 12.3123 20.8367 10.3705Z"
                      fill="#B87E2E"
                    />
                    <path
                      d="M21.5152 10.3705C21.5152 12.3123 19.9414 13.8865 17.9992 13.8865C17.756 13.8867 17.5134 13.8616 17.2754 13.8116C18.8694 13.4779 20.0665 12.064 20.0665 10.3705C20.0665 8.67699 18.8694 7.26306 17.2754 6.92935C17.5134 6.87935 17.756 6.85426 17.9992 6.85449C19.9415 6.85454 21.5152 8.42879 21.5152 10.3705Z"
                      fill="#D5A15B"
                    />
                    <path
                      d="M17.5219 11.9661C17.4306 11.9662 17.3427 11.9317 17.2758 11.8696L16.1044 10.7842C16.0356 10.7185 15.9953 10.6284 15.9924 10.5333C15.9894 10.4382 16.024 10.3458 16.0887 10.276C16.1533 10.2062 16.2429 10.1646 16.3379 10.1603C16.433 10.1559 16.5259 10.1892 16.5967 10.2528L17.5058 11.0952L19.2893 9.2327C19.3559 9.16476 19.4465 9.12575 19.5416 9.12408C19.6367 9.12241 19.7287 9.15823 19.7976 9.22379C19.8665 9.28935 19.9069 9.3794 19.91 9.47448C19.9131 9.56955 19.8786 9.66202 19.8141 9.73192L17.7843 11.8535C17.7505 11.8891 17.7098 11.9175 17.6647 11.9368C17.6196 11.9562 17.571 11.9661 17.5219 11.9661Z"
                      fill="#F3F0F3"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_848_30742">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <span className="text-[#84CC16] ">In Stock</span>
                <span className="text-gray-700">
                  — {product.stockCount} items left
                </span>
              </div>

              <p className="xl:mt-8 md:mt-6 mt-3">{product.description}</p>

              <Button className="w-fit bg-[#C58A33] hover:bg-[#A6742B] text-white px-8 py-6 rounded-xl text-md font-medium">
                Send This Gift Now
              </Button>

              {/* Thumbnails aligned to the right bottom like image */}
              <div className="hidden lg:flex gap-2 pt-4">
                {product.image.map((src, index) => (
                  <div
                    key={index}
                    onClick={() => setActiveImage(src)}
                    className={`w-28.75 h-24 aspect-[115/96 rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                      activeImage === src
                        ? "border-orange-500"
                        : "border-transparent"
                    }`}
                  >
                    <img src={src} className="w-full h-full object-cover " />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      <RelatedProdect></RelatedProdect>
    </main>
  );
};

export default ProductDetails;
