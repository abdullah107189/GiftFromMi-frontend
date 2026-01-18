// import { DayPicker, type DayProps } from "react-day-picker";

import CustomCalendar from "./CustomCalendar";
import { useState } from "react";
import EventList from "./EventList";

export type CalendarEvent = {
  id: string;
  name: string;
  description: string;
  time: string;
  date: Date;
  type: "birthday" | "holiday" | "custom";
  initials: string;
};

const events: CalendarEvent[] = [
  {
    id: "1",
    name: "Emma Thompson",
    description: "Birthday Gift Box",
    time: "9:00 AM",
    date: new Date(2024, 11, 25),
    type: "birthday",
    initials: "ET",
  },
  {
    id: "2",
    name: "Robert Smith",
    description: "Holiday Hamper",
    time: "10:00 AM",
    date: new Date(2024, 11, 25),
    type: "holiday",
    initials: "RS",
  },
  {
    id: "3",
    name: "Emma Thompson",
    description: "Birthday Gift Box",
    time: "9:00 AM",
    date: new Date(2024, 11, 25),
    type: "birthday",
    initials: "ET",
  },
  {
    id: "4",
    name: "Robert Smith",
    description: "Holiday Hamper",
    time: "10:00 AM",
    date: new Date(2024, 11, 25),
    type: "holiday",
    initials: "RS",
  },
];

export default function EventDashboard() {
  const [selectedDate, setSelectedDate] = useState(new Date(2024, 11, 25));
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
      <div className="md:col-span-7">
        <CustomCalendar
          selectedDate={selectedDate}
          onDateSelect={setSelectedDate}
        />
      </div>

      {/* Event List Section */}
      <div className="md:col-span-5 ">
        <EventList events={events}></EventList>
      </div>
    </div>
  );
}
