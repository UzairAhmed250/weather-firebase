import React from "react";
import { HistoryOutlined } from "@ant-design/icons";

function formatSearchedAt(timestamp) {
  if (!timestamp) return "";

  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function SearchHistory({ history, loading, onSelect }) {
  if (loading) {
    return (
      <div className="mx-auto mt-6 max-w-6xl px-4">
        <div className="rounded-2xl bg-[#444444] px-4 py-5 shadow-md">
          <div className="mx-auto h-5 w-40 animate-pulse rounded bg-[#5a5a5a]" />
          <div className="mt-4 space-y-2">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="h-10 animate-pulse rounded-xl bg-[#5a5a5a]" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!history?.length) {
    return null;
  }

  return (
    <div className="mx-auto mt-6 max-w-6xl px-4">
      <div className="rounded-2xl bg-[#444444] px-4 py-5 shadow-md sm:px-6">
        <h2 className="flex items-center justify-center gap-2 font-display text-lg font-bold text-white sm:justify-start sm:text-xl">
          <HistoryOutlined />
          Recent Searches
        </h2>
        <ul className="mt-4 space-y-2">
          {history.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => onSelect(item)}
                className="flex w-full flex-col gap-1 rounded-xl bg-[#3a3a3a] px-4 py-3 text-left transition hover:bg-[#505050] sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-display text-sm font-semibold text-white sm:text-base">
                    {item.locationLabel || item.query}
                  </p>
                  <p className="font-mono text-xs text-[#9ca3af]">
                    {item.weather?.current?.temperature != null
                      ? `${item.weather.current.temperature}°C · ${item.weather.current.weather_descriptions?.[0] || "—"}`
                      : item.query}
                  </p>
                </div>
                <span className="font-mono text-[11px] text-[#b3b3b3] sm:text-xs">
                  {formatSearchedAt(item.searchedAt)}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SearchHistory;
