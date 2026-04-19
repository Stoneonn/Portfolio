import Papa from "papaparse";
import { inferAccess } from "./accessHeuristic";
import { parseActiveDays } from "./parseScheduleDates";
import { splitLocation } from "./splitLocation";

export type ScheduleEvent = {
  id: string;
  eventName: string;
  description: string;
  locationRaw: string;
  venue: string;
  address: string;
  mapQuery: string;
  activeDays: number[];
  coverImage: string;
  eventUrl: string;
  brand: string;
  locationCategory: string;
  access: string;
  timeLabel: string;
  dateRaw: string;
};

type CsvRow = {
  "Event Name": string;
  Date: string;
  Location: string;
  Description: string;
  cover_image: string;
  event_url: string;
  brand: string;
  location_category: string;
  access: string;
  time_label: string;
};

function deriveBrand(eventName: string): string {
  const split = eventName.split(/\s+-\s+|\s+at\s+/i);
  const first = (split[0] ?? eventName).trim();
  return first.toUpperCase().slice(0, 40);
}

function buildTimeLabel(
  row: CsvRow,
  timeHints: string[],
  description: string
): string {
  const manual = row.time_label?.trim();
  if (manual) return manual;
  if (timeHints.length) return timeHints.join(" · ");
  const fromDesc = description.match(
    /(\d{1,2}\s*(?::\d{2})?\s*(?:AM|PM|am|pm)(?:\s*[–\-]\s*\d{1,2}\s*(?::\d{2})?\s*(?:AM|PM|am|pm))?)/
  );
  if (fromDesc) return fromDesc[1].toUpperCase();
  return "SEE EVENT";
}

export function normalizeRows(rows: CsvRow[]): ScheduleEvent[] {
  const out: ScheduleEvent[] = [];
  rows.forEach((row, index) => {
    const eventName = (row["Event Name"] ?? "").trim();
    const dateRaw = (row.Date ?? "").trim();
    const locationRaw = (row.Location ?? "").trim();
    const description = (row.Description ?? "").trim();

    if (!eventName && !dateRaw) return;

    const { activeDays, timeHints } = parseActiveDays(dateRaw);

    if (activeDays.length === 0) {
      console.warn(
        `[schedule] No days in Apr 19–26 window for row ${index + 1}: "${eventName}" (${dateRaw})`
      );
    }

    const { venue, address, mapQuery } = splitLocation(locationRaw);
    const access =
      row.access?.trim() ||
      inferAccess(description, eventName);
    const brand = (row.brand?.trim() || deriveBrand(eventName)).toUpperCase();
    const locationCategory = row.location_category?.trim() || "In town";
    const timeLabel = buildTimeLabel(row, timeHints, description);

    const rawCover = row.cover_image?.trim() ?? "";
    const coverImage =
      rawCover && !/^https?:\/\//i.test(rawCover) && !rawCover.startsWith("/")
        ? `/${rawCover.replace(/^\.\//, "")}`
        : rawCover;

    out.push({
      id: `evt-${index}-${slugFragment(eventName)}`,
      eventName,
      description,
      locationRaw,
      venue: venue || locationRaw,
      address,
      mapQuery,
      activeDays,
      coverImage,
      eventUrl: row.event_url?.trim() ?? "",
      brand,
      locationCategory,
      access,
      timeLabel,
      dateRaw,
    });
  });
  return out;
}

function slugFragment(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 24);
}

export async function loadScheduleEvents(
  url = `${import.meta.env.BASE_URL}events.csv`
): Promise<ScheduleEvent[]> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to load ${url}: ${res.status}`);
  const text = await res.text();
  const parsed = Papa.parse<CsvRow>(text, {
    header: true,
    skipEmptyLines: true,
  });
  if (parsed.errors.length) {
    console.warn("[schedule] CSV parse warnings:", parsed.errors);
  }
  const rows = (parsed.data ?? []).filter((r) => r["Event Name"]?.trim());
  return normalizeRows(rows);
}

export function eventsForDay(
  events: ScheduleEvent[],
  day: number
): ScheduleEvent[] {
  return events.filter((e) => e.activeDays.includes(day));
}
