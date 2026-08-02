const timeFmt = new Intl.DateTimeFormat("fr-FR", {
  hour: "2-digit",
  minute: "2-digit",
});

const dateLongFmt = new Intl.DateTimeFormat("fr-FR", {
  weekday: "long",
  day: "numeric",
  month: "long",
});

const dateShortFmt = new Intl.DateTimeFormat("fr-FR", {
  day: "2-digit",
  month: "2-digit",
});

export function formatTime(d: Date): string {
  return timeFmt.format(d);
}

export function formatDateLong(d: Date): string {
  return dateLongFmt.format(d);
}

export function formatDateShort(d: Date): string {
  return dateShortFmt.format(d);
}

/** Bornes [début, fin[ de la journée locale contenant `ref` (par défaut aujourd'hui). */
export function dayRange(ref: Date = new Date()): { start: Date; end: Date } {
  const start = new Date(ref);
  start.setHours(0, 0, 0, 0);
  const end = new Date(start);
  end.setDate(end.getDate() + 1);
  return { start, end };
}
