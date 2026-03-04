
import SEO from "@/components/shared/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowLeft, Home, RefreshCw, XCircle } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router";

const PaymentCancel = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const reason = searchParams.get("reason");
    const paymentIntent = searchParams.get("payment_intent") || searchParams.get("payment_intent_id");
    const sessionId = searchParams.get("session_id");
    const redirectStatus = searchParams.get("redirect_status");

    const referenceId = paymentIntent || sessionId;
    const showReference = Boolean(referenceId);

    return (
        <section className="relative max-w-main xl:mt-36 md:mt-30 mt-15 xl:pb-15 md:pb-10 pb-5">
            <SEO
                title="Payment Cancelled"
                description="Your payment was cancelled. You can retry checkout or return to shopping."
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
                                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
                                    <XCircle className="h-6 w-6" />
                                </span>
                                <p className="text-sm font-medium text-gray-600">Checkout status</p>
                            </div>

                            <h1 className="mt-4 xl:text-5xl lg:text-4xl md:text-3xl text-2xl font-medium text-gray-900">
                                Payment cancelled
                            </h1>

                            <p className="mt-4 text-gray-600 md:text-lg leading-relaxed">
                                No worries — your card was not charged. If this was a mistake, you can
                                retry the checkout anytime.
                            </p>

                            {(reason || redirectStatus) && (
                                <div className="mt-6 rounded-2xl border border-gray-200 bg-gray-50 p-4">
                                    <p className="text-sm font-semibold text-gray-900">Details</p>
                                    <div className="mt-2 space-y-2 text-sm text-gray-700">
                                        {redirectStatus && (
                                            <div className="flex items-center justify-between gap-3">
                                                <span className="text-gray-600">Status</span>
                                                <span className="font-medium">{redirectStatus}</span>
                                            </div>
                                        )}
                                        {reason && (
                                            <div className="flex items-center justify-between gap-3">
                                                <span className="text-gray-600">Reason</span>
                                                <span className="font-medium">{reason}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            <div className="mt-8 flex flex-col sm:flex-row gap-3">
                                <Link to="/checkout">
                                    <Button className="w-full sm:w-auto" showIcon>
                                        <RefreshCw className="h-4 w-4" />
                                        Retry checkout
                                    </Button>
                                </Link>

                                <Button
                                    variant="outline"
                                    className="w-full sm:w-auto"
                                    onClick={() => navigate(-1)}
                                >
                                    <ArrowLeft className="h-4 w-4" />
                                    Go back
                                </Button>

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
                                            What you can do next
                                        </p>
                                        <span className="text-xs font-medium text-gray-600">
                                            Secure checkout
                                        </span>
                                    </div>
                                    <p className="text-gray-600 text-sm">
                                        Your cart is still saved. You can continue without losing your items.
                                    </p>
                                </CardHeader>

                                <CardContent className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="rounded-2xl bg-white border border-gray-200 p-4">
                                            <p className="font-semibold text-gray-900">Try again</p>
                                            <p className="mt-1 text-sm text-gray-600">
                                                Return to checkout and complete your payment.
                                            </p>
                                        </div>

                                        <div className="rounded-2xl bg-white border border-gray-200 p-4">
                                            <p className="font-semibold text-gray-900">Review your cart</p>
                                            <p className="mt-1 text-sm text-gray-600">
                                                Double-check quantities, address, and shipping options.
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
                                    <Link to="/shopping-cart">
                                        <Button variant="outline" className="w-full sm:w-auto">
                                            View cart
                                        </Button>
                                    </Link>
                                    <Link to="/shop-gifts">
                                        <Button className="w-full sm:w-auto" showIcon>
                                            Continue shopping
                                        </Button>
                                    </Link>
                                </CardFooter>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    );
};

export default PaymentCancel;

