const STORAGE_KEY = "weather_search_history";
const MAX_ITEMS = 10;

export function getLocalSearchHistory() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveLocalSearchHistory(entry) {
  const existing = getLocalSearchHistory();
  const newItem = {
    id: `local-${Date.now()}`,
    query: entry.query,
    queryType: entry.queryType,
    locationLabel: entry.locationLabel || entry.query,
    weather: entry.weather,
    forecast: entry.forecast,
    searchedAt: new Date().toISOString(),
  };

  const filtered = existing.filter((item) => item.query !== entry.query);
  const updated = [newItem, ...filtered].slice(0, MAX_ITEMS);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
}

export function clearLocalSearchHistory() {
  localStorage.removeItem(STORAGE_KEY);
}
