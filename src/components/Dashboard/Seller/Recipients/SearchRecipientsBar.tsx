import { Input } from "@/components/ui/input";

export default function SearchRecipientsBar() {
  return (
    <div className="flex justify-between items-center flex-1 self-stretch xl:mt-8 md:mt-6 mt-4 md:mb-6 mb-4">
      {/* Search Input Section */}
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-00">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M14.0008 14.0008L11.1074 11.1074"
              stroke="#99A1AF"
              stroke-width="1.33333"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z"
              stroke="#6A7282"
              stroke-width="1.33333"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
        <Input
          type="text"
          placeholder="Search recipients..."
          className="flex xl:w-123.25 lg:w-100 md:w-90 w-80 h-9.5 text-gray-900 pl-10 pr-4 py-2 items-center rounded-[10px] border border-gray-200 bg-[#F9FAFB] focus-visible:ring-0 focus-visible:border-[#CA8A32] placeholder:text-gray-9 00 text-sm transition-all"
        />
      </div>

      {/* Right Action Button */}
      <button className="flex p-2.5 justify-center items-center gap-2.5 rounded-xl border border-[#CA8A32] bg-white hover:bg-orange-50 transition-colors">
        <span className="text-[#CA8A32] text-sm font-medium">8 recipients</span>
      </button>
    </div>
  );
}
