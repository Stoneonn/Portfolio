import { useEffect, useRef } from "react";
import { weekdayNameForAprilDay2026 } from "../lib/parseScheduleDates";

type Props = {
  day: number;
};

export function DayHeading({ day }: Props) {
  const ref = useRef<HTMLHeadingElement>(null);
  const skipScroll = useRef(true);
  const w = weekdayNameForAprilDay2026(day);

  useEffect(() => {
    if (skipScroll.current) {
      skipScroll.current = false;
      return;
    }
    ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [day]);

  return (
    <div className="day-header-row">
      <h2 ref={ref} className="day-heading" id="day-heading">
        {w} {day}
      </h2>
      <a 
        className="btn-view-map" 
        href="https://www.pampam.city/oemers-mdw-2026-bqHB3mB885uCqJpvSxOt?45.466145%2C9.194202%2C13.21=" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        View Map
      </a>
    </div>
  );
}
