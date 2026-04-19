import type { ScheduleEvent } from "../lib/eventsFromCsv";
import { EventCard } from "./EventCard";

type Props = {
  events: ScheduleEvent[];
  selectedDay: number;
};

export function EventGrid({ events, selectedDay }: Props) {
  return (
    <div className="event-grid">
      {events.map((e) => (
        <EventCard key={e.id} event={e} selectedDay={selectedDay} />
      ))}
    </div>
  );
}
