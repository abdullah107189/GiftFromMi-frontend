import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Types
interface CalendarEvent {
  date: Date;
  type: "Birthday" | "Holiday" | "Custom" | "Recurring";
}

interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  events: CalendarEvent[];
}

// Utility function (replacing @/lib/utils cn)
const cn = (...classes: (string | boolean | undefined)[]) => {
  return classes.filter(Boolean).join(" ");
};

// Sample Data
const calendarEvents: CalendarEvent[] = [
  { date: new Date(2024, 11, 16), type: "Birthday" },
  { date: new Date(2024, 11, 18), type: "Birthday" },
  { date: new Date(2024, 11, 19), type: "Birthday" },
  { date: new Date(2024, 11, 20), type: "Birthday" },
  { date: new Date(2024, 11, 21), type: "Birthday" },
  { date: new Date(2024, 11, 23), type: "Birthday" },
  { date: new Date(2024, 11, 25), type: "Custom" },
  { date: new Date(2024, 11, 26), type: "Birthday" },
  { date: new Date(2024, 11, 27), type: "Birthday" },
  { date: new Date(2024, 11, 28), type: "Birthday" },
  { date: new Date(2024, 11, 29), type: "Birthday" },
];

// Custom Calendar Component
const CustomCalendar = ({
  selectedDate,
  onDateSelect,
}: {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}) => {
  const [month, setMonth] = useState(new Date(2024, 11, 1));

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getDaysInMonth = (date: Date): CalendarDay[] => {
    const year = date.getFullYear();
    const monthIdx = date.getMonth();
    const firstDay = new Date(year, monthIdx, 1).getDay();
    const daysInMonth = new Date(year, monthIdx + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, monthIdx, 0).getDate();

    const days: CalendarDay[] = [];

    // Previous month days
    for (let i = firstDay - 1; i >= 0; i--) {
      const dayDate = daysInPrevMonth - i;
      const date = new Date(year, monthIdx - 1, dayDate);
      days.push({
        date,
        isCurrentMonth: false,
        events: [],
      });
    }

    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, monthIdx, i);
      const events = calendarEvents.filter(
        (e) => e.date.toDateString() === date.toDateString(),
      );
      days.push({
        date,
        isCurrentMonth: true,
        events,
      });
    }

    // Next month days
    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      const date = new Date(year, monthIdx + 1, i);
      days.push({
        date,
        isCurrentMonth: false,
        events: [],
      });
    }

    return days;
  };

  const days = getDaysInMonth(month);

  const handlePrevMonth = () => {
    setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1));
  };

  return (
    <div className="bg-white rounded-2xl md:p-6 p-4 shadow-[0_0_4px_0_rgba(0,0,0,0.16)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-gray-900">
          {month.toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={handlePrevMonth}
            className="p-2 hover:bg-gray-50 rounded-full transition-colors border border-gray-100"
          >
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <button
            onClick={handleNextMonth}
            className="p-2 hover:bg-gray-50 rounded-full transition-colors border border-gray-100"
          >
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Days of week */}
      <div className="grid grid-cols-7 gap-4 mb-4">
        {daysOfWeek.map((day) => (
          <div
            key={day}
            className="text-center text-sm font-medium text-gray-400 uppercase tracking-wide"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-4">
        {days.map((day, idx) => {
          const isSelected =
            day.date.toDateString() === selectedDate.toDateString();
          const isOutside = !day.isCurrentMonth;

          return (
            <button
              key={idx}
              onClick={() => !isOutside && onDateSelect(day.date)}
              disabled={isOutside}
              className={cn(
                "xl:h-25 lg:h-20 rounded-[10px] md:h-15 h-10 w-full border transition-all flex flex-col items-center justify-center gap-3 text-sm",
                isSelected &&
                  "bg-[#CA8A32] border-[#CA8A32] text-white shadow-lg",
                !isSelected &&
                  "bg-white border-gray-200 text-gray-900 hover:border-[#CA8A32] hover:bg-gray-50",
                isOutside &&
                  "opacity-30 cursor-default hover:bg-white hover:border-gray-100",
              )}
            >
              <span className="font-medium">{day.date.getDate()}</span>

              {day.events.length > 0 && (
                <div className="flex gap-1">
                  {isSelected ? (
                    <>
                      <div className="h-1.5 w-1.5 rounded-full bg-white" />
                      <div className="h-1.5 w-1.5 rounded-full bg-white" />
                    </>
                  ) : (
                    <div
                      className={cn(
                        "h-1.5 w-1.5 rounded-full",
                        day.events[0].type === "Birthday" && "bg-[#F97316]",
                        day.events[0].type === "Holiday" && "bg-[#10B981]",
                        day.events[0].type === "Custom" && "bg-[#A855F7]",
                        day.events[0].type === "Recurring" && "bg-[#F97316]",
                      )}
                    />
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-8">
        <div className="flex items-center gap-3">
          <div className="w-3.5 h-3.5 rounded-full bg-[#FF6900]" />
          <span className="text-xs text-gray-500 font-medium">Birthday</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-3.5 h-3.5 rounded-full bg-[#00C950]" />
          <span className="text-xs text-gray-500 font-medium">Holiday</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-3.5 h-3.5 rounded-full bg-[#AD46FF]" />
          <span className="text-xs text-gray-500 font-medium">Custom</span>
        </div>
      </div>
    </div>
  );
};
export default CustomCalendar;
