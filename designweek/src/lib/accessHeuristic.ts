export function inferAccess(description: string, eventName: string): string {
  const t = `${eventName} ${description}`.toLowerCase();
  if (
    /pre-registration|pre registration|registration required|rsvp|upon registration|reservation required|tickets via dice|free entry \(tickets/i.test(
      t
    )
  ) {
    return "UPON REGISTRATION";
  }
  return "OPEN HOURS";
}
