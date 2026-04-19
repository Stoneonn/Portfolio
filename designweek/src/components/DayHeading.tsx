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
    <h2 ref={ref} className="day-heading" id="day-heading">
      {w} {day}
    </h2>
  );
}
