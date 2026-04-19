import type { ScheduleEvent } from "../lib/eventsFromCsv";
import { formatOrdinalDay, weekdayNameForAprilDay2026 } from "../lib/parseScheduleDates";

type Props = {
  event: ScheduleEvent;
  selectedDay: number;
};

function mapsUrl(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function EventCard({ event, selectedDay }: Props) {
  const href = event.eventUrl;
  const hasLink = Boolean(href);
  const cover = event.coverImage.trim();
  const dayName = weekdayNameForAprilDay2026(selectedDay).toUpperCase();
  const dayOrd = formatOrdinalDay(selectedDay);

  const brandInner = <span>{event.brand}</span>;
  const subtitleInner = (
    <span>{event.description}</span>
  );

  return (
    <article className="event-card">
      <div
        className={
          "event-card__cover" +
          (!cover ? " event-card__cover--placeholder" : "")
        }
      >
        {cover ? (
          <img src={cover} alt="" loading="lazy" />
        ) : (
          <span>No poster</span>
        )}
      </div>

      <div className="event-card__brand">
        {hasLink ? (
          <a href={href} target="_blank" rel="noopener noreferrer">
            {brandInner}
          </a>
        ) : (
          brandInner
        )}
      </div>

      <p className="event-card__subtitle">
        {hasLink ? (
          <a href={href} target="_blank" rel="noopener noreferrer">
            {subtitleInner}
          </a>
        ) : (
          subtitleInner
        )}
      </p>

      <p className="event-card__loc-cat">{event.locationCategory}</p>

      <hr className="event-card__divider" />

      <div className="event-card__access">{event.access}</div>
      <p className="event-card__line">
        {dayName} {dayOrd}
      </p>
      <p className="event-card__line">{event.timeLabel}</p>
      <p className="event-card__line event-card__line--venue">{event.venue}</p>
      {event.address ? (
        <p className="event-card__line event-card__line--address">
          {event.address}
        </p>
      ) : null}

      <a
        className="event-card__cta"
        href={mapsUrl(event.mapQuery)}
        target="_blank"
        rel="noopener noreferrer"
      >
        View in map
      </a>
    </article>
  );
}
