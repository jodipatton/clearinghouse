/** Whole days between an ISO date/datetime and `asOf`, positive when `iso` is in the past. */
export function daysBetween(iso: string, asOf: Date): number {
  const ms = asOf.getTime() - new Date(iso).getTime();
  return Math.floor(ms / (24 * 60 * 60 * 1000));
}
