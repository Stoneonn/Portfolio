import { useCallback, useEffect, useMemo, useState } from "react";
import { DateNav } from "./components/DateNav";
import { DayHeading } from "./components/DayHeading";
import { EventGrid } from "./components/EventGrid";
import { Header } from "./components/Header";
import { eventsForDay, loadScheduleEvents, type ScheduleEvent } from "./lib/eventsFromCsv";
import { hashForDay, parseDayFromHash } from "./lib/hashDay";

const DEFAULT_DAY = 19;

function readDayFromLocation(): number {
  const fromHash = parseDayFromHash(window.location.hash);
  if (fromHash !== null) return fromHash;
  return DEFAULT_DAY;
}

export default function App() {
  const [events, setEvents] = useState<ScheduleEvent[] | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [selectedDay, setSelectedDayState] = useState<number>(DEFAULT_DAY);

  useEffect(() => {
    loadScheduleEvents()
      .then(setEvents)
      .catch((e: unknown) => {
        setLoadError(e instanceof Error ? e.message : "Failed to load events");
      });
  }, []);

  useEffect(() => {
    setSelectedDayState(readDayFromLocation());
    const onHash = () => setSelectedDayState(readDayFromLocation());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const setSelectedDay = useCallback((day: number) => {
    setSelectedDayState(day);
    const next = hashForDay(day);
    if (window.location.hash !== next) {
      window.history.replaceState(null, "", next);
    }
  }, []);

  const visible = useMemo(
    () => (events ? eventsForDay(events, selectedDay) : []),
    [events, selectedDay]
  );

  if (loadError) {
    return (
      <div className="app">
        <Header />
        <p className="app__error" role="alert">
          {loadError}
        </p>
      </div>
    );
  }

  if (!events) {
    return (
      <div className="app">
        <Header />
        <p className="app__loading">Loading…</p>
      </div>
    );
  }

  return (
    <div className="app">
      <Header />
      <DateNav selectedDay={selectedDay} onSelectDay={setSelectedDay} />
      <main>
        <DayHeading day={selectedDay} />
        {visible.length === 0 ? (
          <p className="app__loading">No events this day.</p>
        ) : (
          <EventGrid events={visible} selectedDay={selectedDay} />
        )}
      </main>
    </div>
  );
}
