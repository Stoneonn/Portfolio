const WINDOW_START = { month: 3, day: 19, year: 2026 } as const;
const WINDOW_END = { month: 3, day: 26, year: 2026 } as const;

function windowStartDate(): Date {
  return new Date(WINDOW_START.year, WINDOW_START.month, WINDOW_START.day);
}

function windowEndDate(): Date {
  return new Date(WINDOW_END.year, WINDOW_END.month, WINDOW_END.day);
}

function isTimeLike(inner: string): boolean {
  const t = inner.toLowerCase();
  return (
    /\d/.test(t) ||
    /am|pm/.test(t) ||
    /everyday|until|from|late|noon|midnight/.test(t)
  );
}

export function stripTrailingTimeParens(raw: string): { core: string; timeHints: string[] } {
  let core = raw.trim();
  const timeHints: string[] = [];
  const re = /\s*\(([^)]*)\)\s*$/;
  while (true) {
    const m = core.match(re);
    if (!m) break;
    const inner = m[1].trim();
    if (!isTimeLike(inner)) break;
    timeHints.unshift(inner);
    core = core.slice(0, m.index).trim();
  }
  return { core, timeHints };
}

function enumerateDaysInclusive(start: Date, end: Date): number[] {
  const out: number[] = [];
  const cur = new Date(start.getFullYear(), start.getMonth(), start.getDate());
  const last = new Date(end.getFullYear(), end.getMonth(), end.getDate());
  const win0 = windowStartDate();
  const win1 = windowEndDate();
  while (cur <= last) {
    if (cur >= win0 && cur <= win1 && cur.getMonth() === 3) {
      out.push(cur.getDate());
    }
    cur.setDate(cur.getDate() + 1);
  }
  return [...new Set(out)].sort((a, b) => a - b);
}

function parseAprilSingleDay(core: string): number[] | null {
  const m = core.match(/^April\s+(\d{1,2})\s*,?\s*(\d{4})$/i);
  if (!m) return null;
  const day = Number(m[1]);
  const year = Number(m[2]);
  if (year !== 2026 || day < 1 || day > 30) return null;
  const d = new Date(2026, 3, day);
  return enumerateDaysInclusive(d, d);
}

function parseAprilRangeSameYear(core: string): number[] | null {
  const m = core.match(
    /^April\s+(\d{1,2})\s*[–\-]\s*(\d{1,2})\s*,?\s*(\d{4})$/i
  );
  if (!m) return null;
  const d1 = Number(m[1]);
  const d2 = Number(m[2]);
  const year = Number(m[3]);
  if (year !== 2026) return null;
  const start = new Date(2026, 3, Math.min(d1, d2));
  const end = new Date(2026, 3, Math.max(d1, d2));
  return enumerateDaysInclusive(start, end);
}

function parseAprilToMayRange(core: string): number[] | null {
  const m = core.match(
    /^April\s+(\d{1,2})\s*[–\-]\s*May\s+(\d{1,2})\s*,?\s*(\d{4})$/i
  );
  if (!m) return null;
  const aprilDay = Number(m[1]);
  const mayDay = Number(m[2]);
  const year = Number(m[3]);
  if (year !== 2026) return null;
  const start = new Date(2026, 3, aprilDay);
  const end = new Date(2026, 4, mayDay);
  return enumerateDaysInclusive(start, end);
}

function parseAprilMonthOnly(core: string): number[] | null {
  const m = core.match(/^April\s*,?\s*(\d{4})$/i);
  if (!m) return null;
  if (Number(m[1]) !== 2026) return null;
  return [19, 20, 21, 22, 23, 24, 25, 26];
}

export function parseActiveDays(dateCell: string): {
  activeDays: number[];
  timeHints: string[];
} {
  const { core, timeHints } = stripTrailingTimeParens(dateCell);
  const c = core.replace(/\s+/g, " ").trim();

  let active: number[] | null =
    parseAprilRangeSameYear(c) ||
    parseAprilToMayRange(c) ||
    parseAprilSingleDay(c) ||
    parseAprilMonthOnly(c);

  if (!active) {
    const loose = c.match(/April\s+(\d{1,2})\s*[–\-]\s*(\d{1,2})/i);
    if (loose) {
      const d1 = Number(loose[1]);
      const d2 = Number(loose[2]);
      const start = new Date(2026, 3, Math.min(d1, d2));
      const end = new Date(2026, 3, Math.max(d1, d2));
      active = enumerateDaysInclusive(start, end);
    }
  }

  if (!active) {
    const one = c.match(/April\s+(\d{1,2})/i);
    if (one) {
      const day = Number(one[1]);
      const d = new Date(2026, 3, day);
      active = enumerateDaysInclusive(d, d);
    }
  }

  if (!active) {
    active = [];
  }

  const filtered = active.filter((d) => d >= 19 && d <= 26);
  return { activeDays: filtered, timeHints };
}

export function formatOrdinalDay(day: number): string {
  const s = String(day);
  const j = day % 10;
  const k = day % 100;
  let suf = "TH";
  if (j === 1 && k !== 11) suf = "ST";
  else if (j === 2 && k !== 12) suf = "ND";
  else if (j === 3 && k !== 13) suf = "RD";
  return `${s}${suf}`;
}

export function weekdayNameForAprilDay2026(day: number): string {
  const d = new Date(2026, 3, day);
  return d.toLocaleDateString("en-US", { weekday: "long" });
}
