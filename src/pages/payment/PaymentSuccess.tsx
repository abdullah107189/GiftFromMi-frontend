
import SEO from "@/components/shared/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CheckCircle2, Home, PackageSearch, ShoppingBag } from "lucide-react";
import { Link, useSearchParams } from "react-router";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();

  const paymentIntent =
    searchParams.get("payment_intent") || searchParams.get("payment_intent_id");
  const sessionId = searchParams.get("session_id");
  const redirectStatus = searchParams.get("redirect_status");

  const referenceId = paymentIntent || sessionId;
  const showReference = Boolean(referenceId);

  return (
    <section className="relative max-w-main xl:mt-36 md:mt-30 mt-15 xl:pb-15 md:pb-10 pb-5">
      <SEO
        title="Payment Successful"
        description="Payment completed successfully. Thank you for your order."
      />

      <div className="px-3 max-w-container mx-auto">
        <div className="relative overflow-hidden rounded-3xl border border-primary/10 bg-white">
          <div
            className={cn(
              "pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full blur-3xl opacity-30",
              "bg-[linear-gradient(96deg,#D0A15A_5.18%,#C57200_96.62%)]",
            )}
          />
          <div
            className={cn(
              "pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full blur-3xl opacity-20",
              "bg-[linear-gradient(96deg,#D0A15A_5.18%,#C57200_96.62%)]",
            )}
          />

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 p-6 md:p-10">
            <div className="lg:col-span-5 flex flex-col justify-center">
              <div className="inline-flex items-center gap-3">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                  <CheckCircle2 className="h-6 w-6" />
                </span>
                <p className="text-sm font-medium text-gray-600">Checkout status</p>
              </div>

              <h1 className="mt-4 xl:text-5xl lg:text-4xl md:text-3xl text-2xl font-medium text-gray-900">
                Payment successful
              </h1>

              <p className="mt-4 text-gray-600 md:text-lg leading-relaxed">
                Your order has been placed successfully. We’ll start processing it right
                away.
              </p>

              {redirectStatus && (
                <div className="mt-6 rounded-2xl border border-gray-200 bg-gray-50 p-4">
                  <p className="text-sm font-semibold text-gray-900">Details</p>
                  <div className="mt-2 space-y-2 text-sm text-gray-700">
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-gray-600">Status</span>
                      <span className="font-medium">{redirectStatus}</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link to="/shop-gifts" className="w-full sm:w-auto">
                  <Button className="w-full sm:w-auto" showIcon>
                    <ShoppingBag className="h-4 w-4" />
                    Continue shopping
                  </Button>
                </Link>

                <Link to="/shopping-cart">
                  <Button variant="outline" className="w-full sm:w-auto">
                    <PackageSearch className="h-4 w-4" />
                    View cart
                  </Button>
                </Link>

                <Link to="/">
                  <Button variant="ghost" className="w-full sm:w-auto">
                    <Home className="h-4 w-4" />
                    Home
                  </Button>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7">
              <Card className="bg-primary-50 border-primary/20 xl:rounded-4xl lg:rounded-3xl rounded-2xl">
                <CardHeader className="gap-1">
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-gray-900 font-semibold md:text-xl">
                      Next steps
                    </p>
                    <span className="text-xs font-medium text-gray-600">Thank you</span>
                  </div>
                  <p className="text-gray-600 text-sm">
                    You’ll receive an email confirmation shortly.
                  </p>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="rounded-2xl bg-white border border-gray-200 p-4">
                      <p className="font-semibold text-gray-900">Confirmation</p>
                      <p className="mt-1 text-sm text-gray-600">
                        Check your inbox for the receipt and order details.
                      </p>
                    </div>

                    <div className="rounded-2xl bg-white border border-gray-200 p-4">
                      <p className="font-semibold text-gray-900">Need help?</p>
                      <p className="mt-1 text-sm text-gray-600">
                        If anything looks wrong, contact support with your reference.
                      </p>
                    </div>
                  </div>

                  {showReference && (
                    <div className="rounded-2xl bg-white border border-gray-200 p-4">
                      <div className="flex items-center justify-between gap-3">
                        <p className="font-semibold text-gray-900">Reference</p>
                        <span className="text-xs text-gray-500">For support</span>
                      </div>
                      <p className="mt-2 font-mono text-sm text-gray-700 break-all">
                        {referenceId}
                      </p>
                    </div>
                  )}
                </CardContent>

                <CardFooter className="flex flex-col sm:flex-row gap-3 justify-between">
                  <Link to="/customer-dashboard">
                    <Button variant="outline" className="w-full sm:w-auto">
                      Go to dashboard
                    </Button>
                  </Link>
                  <Link to="/shop-gifts" className="w-full sm:w-auto">
                    <Button className="w-full sm:w-auto" showIcon>
                      Shop more gifts
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentSuccess;

