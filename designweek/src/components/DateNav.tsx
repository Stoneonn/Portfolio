const DAYS = [19, 20, 21, 22, 23, 24, 25, 26] as const;

type Props = {
  selectedDay: number;
  onSelectDay: (day: number) => void;
};

export function DateNav({ selectedDay, onSelectDay }: Props) {
  return (
    <nav className="date-nav" aria-label="Days">
      {DAYS.map((d) => (
        <button
          key={d}
          type="button"
          className={
            "date-nav__circle" +
            (d === selectedDay ? " date-nav__circle--active" : "")
          }
          aria-current={d === selectedDay ? "date" : undefined}
          onClick={() => onSelectDay(d)}
        >
          {d}
        </button>
      ))}
    </nav>
  );
}
