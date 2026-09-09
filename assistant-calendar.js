export const malaysiaDate = (now = Date.now()) => new Date(now + 8 * 3600000).toISOString().slice(0, 10);
export function planDate(value) {
  if (value == null || value === "") return "";
  const invalid = message => { throw Object.assign(new Error(message), { statusCode: 400 }); };
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value) || value < "1990-01-01" || value > "2100-12-31") invalid("Use an exact calendar date, or leave the date unknown.");
  const stamp = Date.parse(value);
  if (!Number.isFinite(stamp) || new Date(stamp).toISOString().slice(0, 10) !== value) invalid("That calendar date does not exist.");
  return value;
}
