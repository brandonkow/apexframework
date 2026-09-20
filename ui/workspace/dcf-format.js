export function dcfPercent(value, digits = 1) {
  return Number.isFinite(value) ? `${(value * 100).toFixed(digits)}%` : "Not available";
}

export function dcfDscr(value) {
  return Number.isFinite(value) ? `${value.toFixed(2)}x` : "N/A";
}
