import React from "react";

function Forecastchild({ img, tem, date }) {
  return (
    <div className="flex items-center gap-2 px-1 py-2 sm:gap-3 sm:px-2 sm:py-2.5">
      <img className="h-6 w-6 shrink-0 object-contain sm:h-7 sm:w-7" src={img} alt="" />
      <span className="w-12 shrink-0 text-center font-mono text-xs font-semibold sm:w-14 sm:text-sm">
        {tem}
      </span>
      <span className="min-w-0 flex-1 truncate text-right text-[11px] text-[#d4d4d4] sm:text-xs">
        {date}
      </span>
    </div>
  );
}

export default Forecastchild;
