const HASH_RE = /^#?day-(\d+)-(\d+)-(\d+)$/;

export function parseDayFromHash(hash: string): number | null {
  const m = hash.match(HASH_RE);
  if (!m) return null;
  const day = Number(m[1]);
  const month = Number(m[2]);
  const year = Number(m[3]);
  if (year !== 2026 || month !== 4) return null;
  if (day < 19 || day > 26) return null;
  return day;
}

export function hashForDay(day: number): string {
  return `#day-${day}-4-2026`;
}
