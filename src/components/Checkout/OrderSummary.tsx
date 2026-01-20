import { ShoppingBag, ShieldCheck } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export function OrderSummary() {
  return (
    <div className="bg-white rounded-2xl p-8 border border-gray-50 shadow-sm sticky top-8">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-full bg-[#CA8A32] flex items-center justify-center">
          <ShoppingBag className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-[20px] font-bold text-gray-900">
            Your Order Summary
          </h2>
          <p className="text-gray-400 text-xs">Review your selected items</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Product List */}
        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <p className="text-[15px] font-semibold text-gray-800">
                Tech Box
              </p>
              <p className="text-xs text-gray-400">Qty: 1</p>
            </div>
            <p className="text-[15px] font-bold text-gray-900">$25.50</p>
          </div>
        </div>

        {/* Pricing Calculation */}
        <div className="pt-6 border-t border-gray-100 space-y-4">
          <div className="flex justify-between text-sm text-gray-400 font-medium">
            <span>Subtotal</span>
            <span className="text-gray-900 font-bold">$25.50</span>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-bold text-gray-900">Shipping</p>
            <RadioGroup defaultValue="free" className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <RadioGroupItem
                    value="free"
                    id="f"
                    className="text-[#CA8A32]"
                  />
                  <Label
                    htmlFor="f"
                    className="text-sm font-bold text-gray-700"
                  >
                    Free Delivery
                  </Label>
                </div>
                <span className="text-sm font-bold text-[#CA8A32]">Free</span>
              </div>
            </RadioGroup>
          </div>

          <div className="flex justify-between items-center text-[#CA8A32] pt-4 border-t border-gray-100">
            <span className="text-[18px] font-bold">Total</span>
            <span className="text-[26px] font-black">$25.50</span>
          </div>
        </div>

        <button className="w-full h-14 bg-[#CA8A32] hover:bg-[#B3792B] text-white font-bold rounded-xl transition-all shadow-lg shadow-[#CA8A32]/20 active:scale-[0.98]">
          Proceed Checkout
        </button>

        <div className="mt-4 flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-gray-300" />
          <p className="text-[10px] text-gray-400 text-center leading-tight">
            Payments are processed securely.
          </p>
        </div>
      </div>
    </div>
  );
}
