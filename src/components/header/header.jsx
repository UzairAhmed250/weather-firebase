import React, { useEffect, useRef, useState } from "react";
import "./header.css";
import { CloseOutlined, GlobalOutlined, LoadingOutlined, SearchOutlined } from "@ant-design/icons";
import { formatSuggestionLabel, searchLocations } from "../../api/weather";

export default function Header({ onSearch, onCurrentLocation }) {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const searchRef = useRef(null);
  const allowSuggestionsRef = useRef(false);

  useEffect(() => {
    const query = input.trim();
    if (!allowSuggestionsRef.current || query.length < 2) {
      if (query.length < 2) {
        setSuggestions([]);
        setShowSuggestions(false);
      }
      return;
    }

    const handler = setTimeout(async () => {
      setLoadingSuggestions(true);
      try {
        const results = await searchLocations(query);
        setSuggestions(results);
        setShowSuggestions(results.length > 0);
      } catch {
        setSuggestions([]);
        setShowSuggestions(false);
      } finally {
        setLoadingSuggestions(false);
      }
    }, 300);

    return () => clearTimeout(handler);
  }, [input]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (item) => {
    allowSuggestionsRef.current = false;
    const label = formatSuggestionLabel(item);
    setShowSuggestions(false);
    setSuggestions([]);
    setInput(label);
    onSearch(`${item.lat},${item.lon}`, {
      queryType: "city",
      locationLabel: label,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    allowSuggestionsRef.current = false;
    setShowSuggestions(false);

    if (suggestions.length > 0) {
      handleSelect(suggestions[0]);
      return;
    }

    setSuggestions([]);
    onSearch(input.trim(), { queryType: "city" });
  };

  const handleInputChange = (e) => {
    allowSuggestionsRef.current = true;
    setInput(e.target.value);
  };

  const handleClear = () => {
    allowSuggestionsRef.current = true;
    setInput("");
    setSuggestions([]);
    setShowSuggestions(false);
    onCurrentLocation();
  };

  return (
    <div className="mt-3 px-2 sm:mt-4 sm:px-3 md:mt-5 md:px-4">
      <div className="mx-auto flex w-full max-w-5xl items-center gap-2 sm:gap-4">
        <div className="h-6 shrink-0 scale-90 sm:scale-100">
          <input type="checkbox" id="switch" className="checkbox" />
          <label htmlFor="switch" className="toggle">
            <p>&nbsp;&nbsp;</p>
          </label>
        </div>

        <div className="flex w-full min-w-0 flex-1 items-center gap-2 sm:gap-3">
          <div ref={searchRef} className="relative min-w-0 flex-1">
            <form className="w-full" onSubmit={handleSubmit}>
              <input
                type="search"
                placeholder="Search for your preferred city..."
                className="search-input h-10 w-full truncate rounded-[50px] border border-[#59bb18] bg-[#3a3a3a] pl-11 pr-10 font-sans text-xs font-medium text-white shadow shadow-slate-800 outline-none placeholder:font-normal placeholder:text-[#9ca3af] focus:border-[#59bb18] focus:ring-2 focus:ring-[#59bb18]/40 sm:pl-14 sm:pr-11 sm:text-sm md:text-base"
                onChange={handleInputChange}
                onFocus={() => {
                  if (allowSuggestionsRef.current && suggestions.length > 0) {
                    setShowSuggestions(true);
                  }
                }}
                value={input}
                autoComplete="off"
                role="combobox"
                aria-expanded={showSuggestions}
                aria-controls="city-suggestions"
              />
            </form>
            <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[18px] text-[#59bb18] sm:left-5 sm:text-[20px]">
              {loadingSuggestions ? <LoadingOutlined spin /> : <SearchOutlined />}
            </div>
            {input.trim() && (
              <button
                type="button"
                onClick={handleClear}
                aria-label="Clear search and show current location"
                className="absolute right-3 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full bg-[#555555] text-xs text-[#d4d4d4] transition hover:bg-[#666666] hover:text-white"
              >
                <CloseOutlined />
              </button>
            )}

            {showSuggestions && suggestions.length > 0 && (
              <ul
                id="city-suggestions"
                role="listbox"
                className="absolute left-0 right-0 top-[calc(100%+8px)] z-[100] max-h-72 overflow-y-auto rounded-2xl border border-[#59bb18]/40 bg-[#3a3a3a] py-2 shadow-lg shadow-black/40"
              >
                {suggestions.map((item) => {
                  const label = formatSuggestionLabel(item);
                  return (
                    <li key={`${item.id}-${item.lat}-${item.lon}`}>
                      <button
                        type="button"
                        role="option"
                        aria-selected={false}
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => handleSelect(item)}
                        className="flex w-full flex-col px-4 py-2.5 text-left transition hover:bg-[#505050]"
                      >
                        <span className="font-sans text-sm font-semibold text-white">
                          {item.name}
                        </span>
                        <span className="font-mono text-xs text-[#9ca3af]">
                          {label}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          <button
            type="button"
            aria-label="Use current location"
            className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-full bg-[#59bb18] shadow shadow-slate-800 transition hover:opacity-90 sm:w-auto sm:rounded-[25px] sm:px-4 md:px-5"
            onClick={onCurrentLocation}
          >
            <GlobalOutlined className="text-[18px] text-white sm:text-[20px]" />
            <span className="hidden font-sans text-sm font-semibold text-white sm:inline md:text-base">
              Current Location
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
