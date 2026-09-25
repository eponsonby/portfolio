// Most recent first (by the given field); items missing that field sort last.
export function sortByRecent(items, field) {
  return [...items].sort((a, b) => {
    if (!a[field] && !b[field]) return 0;
    if (!a[field]) return 1;
    if (!b[field]) return -1;
    return b[field].localeCompare(a[field]);
  });
}

// Monday-start of the week containing `date`.
export function weekStart(date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = (day === 0 ? -6 : 1) - day;
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}
