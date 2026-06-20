import React, { useEffect, useState } from "react";
import "./header.css";
import { CloseOutlined, GlobalOutlined, SearchOutlined } from "@ant-design/icons";

export default function Header({ onSearch, onCurrentLocation }) {
  const [input, setInput] = useState("");

  useEffect(() => {
    if (!input.trim()) return;

    const handler = setTimeout(() => {
      onSearch(input.trim());
    }, 500);

    return () => clearTimeout(handler);
  }, [input, onSearch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input.trim());
    }
  };

  const handleClear = () => {
    setInput("");
    onCurrentLocation();
  };

  return (
    <div className="mt-5 flex flex-wrap items-center justify-around gap-4 px-4">
      <div className="h-6">
        <input type="checkbox" id="switch" className="checkbox" />
        <label htmlFor="switch" className="toggle">
          <p>&nbsp;&nbsp;</p>
        </label>
      </div>

      <div className="relative w-full max-w-xl sm:w-[50%]">
        <form className="w-full" onSubmit={handleSubmit}>
          <input
            type="search"
            placeholder="Search for your preferred city..."
            className="search-input h-10 w-full rounded-[50px] border border-[#59bb18] bg-[#3a3a3a] pl-14 pr-11 font-sans text-sm font-medium text-white shadow shadow-slate-800 outline-none placeholder:font-normal placeholder:text-[#9ca3af] focus:border-[#59bb18] focus:ring-2 focus:ring-[#59bb18]/40 sm:text-base"
            onChange={(e) => setInput(e.target.value)}
            value={input}
          />
        </form>
        <div className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-[20px] text-[#59bb18]">
          <SearchOutlined />
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
      </div>

      <button
        type="button"
        className="flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-[25px] bg-[#59bb18] shadow shadow-slate-800 sm:w-[13%]"
        onClick={onCurrentLocation}
      >
        <GlobalOutlined className="text-[20px] text-white" />
        <span className="font-sans text-sm font-semibold text-white sm:text-base">
          Current Location
        </span>
      </button>
    </div>
  );
}
