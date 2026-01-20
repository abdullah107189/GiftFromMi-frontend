import { CreditCard, Wallet } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

export function PaymentMethod() {
  return (
    <div className="pt-4 space-y-6">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-[#CA8A32] flex items-center justify-center">
          <CreditCard className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-[20px] font-bold text-[#0F172A]">Payment Method</h2>
          <p className="text-gray-500 text-sm">Choose your preferred payment option</p>
        </div>
      </div>

      <div className="p-6 border border-gray-100 rounded-[20px] bg-white shadow-sm">
        <RadioGroup defaultValue="stripe">
          <div className="flex items-start gap-4">
            <RadioGroupItem value="stripe" id="stripe" className="mt-1 border-gray-300 text-[#CA8A32] w-5 h-5" />
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Wallet className="w-5 h-5 text-gray-400" />
                <Label htmlFor="stripe" className="text-[16px] font-bold text-[#0F172A] cursor-pointer">Stripe</Label>
                <div className="bg-[#FFF4E5] text-[#CA8A32] text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                  <span className="text-xs">+</span> Instant
                </div>
              </div>
              <p className="text-sm text-gray-400">Make a quick mobile payment using your favorite wallet.</p>
            </div>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}