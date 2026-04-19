export type SplitLocation = {
  venue: string;
  address: string;
  mapQuery: string;
};

const TRAILING_PARENS = /\(([^)]*)\)\s*$/;

export function splitLocation(raw: string): SplitLocation {
  const trimmed = raw.trim();
  if (!trimmed) {
    return { venue: "", address: "", mapQuery: "" };
  }
  let venue = trimmed;
  let address = "";
  const m = TRAILING_PARENS.exec(trimmed);
  if (m) {
    venue = trimmed.slice(0, m.index).trim();
    address = m[1].trim();
  }
  const mapQuery = [venue, address].filter(Boolean).join(", ") || trimmed;
  return { venue: venue || trimmed, address, mapQuery };
}
