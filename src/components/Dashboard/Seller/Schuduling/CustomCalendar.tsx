import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker, type DayProps } from "react-day-picker";
import { cn } from "@/lib/utils";

export type CalendarEvent = {
  date: Date;
  type: "birthday" | "holiday" | "custom";
};

const events: CalendarEvent[] = [
  { date: new Date(2024, 11, 16), type: "birthday" },
  { date: new Date(2024, 11, 18), type: "birthday" },
  { date: new Date(2024, 11, 19), type: "birthday" },
  { date: new Date(2024, 11, 20), type: "birthday" },
  { date: new Date(2024, 11, 21), type: "birthday" },
  { date: new Date(2024, 11, 23), type: "birthday" },
  { date: new Date(2024, 11, 25), type: "custom" },
  { date: new Date(2024, 11, 26), type: "birthday" },
  { date: new Date(2024, 11, 27), type: "birthday" },
  { date: new Date(2024, 11, 28), type: "birthday" },
  { date: new Date(2024, 11, 29), type: "birthday" },
];

function CustomCalendar() {
  const selectedDate = new Date(2024, 11, 25);

  return (
    <div className="p-10 bg-white rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.04)] max-w-5xl mx-auto border border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-2xl font-semibold text-[#1A1A1A]">December 2024</h2>
        <div className="flex gap-2">
          <button className="p-2 hover:bg-gray-50 rounded-full transition-colors border border-gray-100">
            <ChevronLeft className="h-5 w-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full transition-colors border border-gray-100">
            <ChevronRight className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>

      <DayPicker
        mode="single"
        selected={selectedDate}
        showOutsideDays={true}
        className="w-full"
        classNames={{
          months: "w-full",
          month: "w-full space-y-6",
          month_caption: "hidden",
          table: "w-full border-separate border-spacing-x-4 border-spacing-y-4",
          head_row: "flex w-full justify-between mb-4 px-2",
          head_cell:
            "text-gray-400 flex-1 font-medium text-sm text-center uppercase tracking-wide",
          row: "w-full grid grid-cols-7 gap-4",
          cell: "p-0 h-28 relative",
        }}
        components={{
          Day: ({ day, modifiers }: DayProps) => {
            const date = day.date;
            const event = events.find(
              (e) => e.date.toDateString() === date.toDateString(),
            );
            const isSelected = modifiers.selected;
            const isOutside = modifiers.outside;

            return (
              <td className="p-10 rounded-2xl border" role="presentation">
                <button
                  type="button"
                  className={cn(
                    " transition-all flex flex-col items-center justify-center gap-3 text-xl",
                    isSelected
                      ? "bg-[#CA8A32] border-[#CA8A32] text-white shadow-lg shadow-orange-100"
                      : "bg-white border-gray-100 text-[#1A1A1A] hover:border-[#CA8A32] hover:bg-gray-50",
                    isOutside && "opacity-30 border-none",
                  )}
                >
                  <span
                    className={cn("font-medium", isOutside && "font-normal")}
                  >
                    {date.getDate()}
                  </span>

                  {event && (
                    <div className="flex gap-1.5">
                      {isSelected ? (
                        <>
                          <div className="h-2 w-2 rounded-full bg-white shadow-sm" />
                          <div className="h-2 w-2 rounded-full bg-white shadow-sm" />
                        </>
                      ) : (
                        <div
                          className={cn(
                            "h-2 w-2 rounded-full",
                            event.type === "birthday" && "bg-orange-500",
                            event.type === "holiday" && "bg-[#10B981]",
                            event.type === "custom" && "bg-[#8B5CF6]",
                          )}
                        />
                      )}
                    </div>
                  )}
                </button>
              </td>
            );
          },
        }}
      />

      {/* Footer Legend */}
      <div className="mt-12 pt-8 border-t border-gray-50 flex items-center gap-8">
        <div className="flex items-center gap-3">
          <div className="h-3.5 w-3.5 rounded-full bg-orange-500" />
          <span className="text-sm text-gray-500 font-medium">Birthday</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-3.5 w-3.5 rounded-full bg-[#10B981]" />
          <span className="text-sm text-gray-500 font-medium">Holiday</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-3.5 w-3.5 rounded-full bg-[#8B5CF6]" />
          <span className="text-sm text-gray-500 font-medium">Custom</span>
        </div>
      </div>
    </div>
  );
}

export default CustomCalendar;
