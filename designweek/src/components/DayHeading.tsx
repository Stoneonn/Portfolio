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
        href="https://www.pampam.city/mdw-2026-guide-XV0ojFRgi06SEcru2zW5?45.458662%2C9.193747%2C12.72=" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        View Map
      </a>
    </div>
  );
}
