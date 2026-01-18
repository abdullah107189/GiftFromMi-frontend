import { useState } from "react";
import CustomCalendar from "./CustomCalendar";
import EventList from "./EventList";
import type { CalendarEvent } from "@/types/dashboard";

const events: CalendarEvent[] = [
  {
    id: "1",
    recipient: "Emma Thompson",
    gift: "Birthday Gift Box",
    time: "9:00 AM",
    date: new Date(2024, 11, 25),
    type: "birthday",
    initials: "ET",
  },
  {
    id: "2",
    recipient: "Robert Smith",
    gift: "Holiday Hamper",
    time: "10:00 AM",
    date: new Date(2024, 11, 25),
    type: "holiday",
    initials: "RS",
  },
  {
    id: "3",
    recipient: "Emma Thompson",
    gift: "Birthday Gift Box",
    time: "9:00 AM",
    date: new Date(2024, 11, 25),
    type: "birthday",
    initials: "ET",
  },
  {
    id: "4",
    recipient: "Robert Smith",
    gift: "Holiday Hamper",
    time: "10:00 AM",
    date: new Date(2024, 11, 25),
    type: "holiday",
    initials: "RS",
  },
];

export default function EventDashboard() {
  const [selectedDate, setSelectedDate] = useState(new Date(2024, 11, 25));
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
      <div className="lg:col-span-7">
        <CustomCalendar
          selectedDate={selectedDate}
          onDateSelect={setSelectedDate}
        />
      </div>

      {/* Event List Section */}
      <div className="lg:col-span-5 ">
        <EventList events={events}></EventList>
      </div>
    </div>
  );
}
