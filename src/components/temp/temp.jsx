import React from "react";
import sunRise from "../../assets/sunrise.svg";
import sunSet from "../../assets/sunset.svg";
import humid from "../../assets/humidity.svg";
import press from "../../assets/pressure.svg";
import wind from "../../assets/wind.svg";
import uv from "../../assets/uv.svg";
import { formatLocationLabel } from "../../api/weather";

function Temp({ weatherData, loading, astro, locationLabel }) {
  if (loading) {
    return (
      <div className="mx-auto mt-6 flex max-w-6xl flex-col gap-4 px-4 sm:mt-12 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-8 lg:gap-[75px]">
        <div className="w-full rounded-3xl bg-[#444444] px-4 py-4 shadow-[0px_0px_10px_0px_rgba(0,0,0,0.9)] sm:w-[25%] sm:py-5">
          <div className="mx-auto h-4 w-28 animate-pulse rounded-lg bg-[#5a5a5a] sm:h-5 sm:w-32" />
          <div className="mx-auto mt-4 h-10 w-32 animate-pulse rounded-lg bg-[#5a5a5a] sm:mt-6 sm:h-12 sm:w-40" />
          <div className="mx-auto mt-2 h-2.5 w-20 animate-pulse rounded bg-[#5a5a5a] sm:mt-4 sm:h-3" />
        </div>

        <div className="flex w-full flex-col gap-4 rounded-3xl bg-[#444444] px-4 py-4 shadow-[0px_0px_10px_0px_rgba(0,0,0,0.9)] sm:w-[65%] sm:flex-row sm:flex-wrap sm:justify-around sm:gap-6 sm:py-5">
          <div className="flex flex-1 flex-col gap-3 sm:gap-4">
            <div className="h-8 w-20 animate-pulse rounded-lg bg-[#5a5a5a] sm:h-10 sm:w-24" />
            <div className="h-3 w-28 animate-pulse rounded bg-[#5a5a5a] sm:h-4 sm:w-32" />
            <div className="h-3 w-24 animate-pulse rounded bg-[#5a5a5a] sm:h-4 sm:w-28" />
          </div>
          <div className="flex flex-col items-center gap-2 sm:gap-4">
            <div className="h-16 w-16 animate-pulse rounded-xl bg-[#5a5a5a] sm:h-20 sm:w-20" />
            <div className="h-3 w-16 animate-pulse rounded bg-[#5a5a5a] sm:h-4 sm:w-20" />
          </div>
          <div className="grid grid-cols-4 gap-2 sm:flex sm:gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="flex flex-col items-center gap-1 sm:gap-2">
                <div className="h-7 w-7 animate-pulse rounded-full bg-[#5a5a5a] sm:h-9 sm:w-9" />
                <div className="h-2.5 w-10 animate-pulse rounded bg-[#5a5a5a] sm:h-3 sm:w-12" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!weatherData) {
    return (
      <div className="mt-10 text-center text-white">
        Search for a city or use your current location to see weather data.
      </div>
    );
  }

  const { location, current } = weatherData;
  const [localDate, localTime] = location.localtime.split(" ");

  return (
    <div className="mx-auto mt-6 flex max-w-6xl flex-col gap-4 px-4 sm:mt-12 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-8 lg:gap-[75px]">
      <div className="w-full rounded-3xl bg-[#444444] px-4 py-4 shadow-[0px_0px_10px_0px_rgba(0,0,0,0.9)] sm:w-[25%] sm:py-5">
        <div className="text-center font-display text-base font-bold text-white sm:text-xl lg:text-[25px]">
          {locationLabel ?? formatLocationLabel(location)}
        </div>
        <div className="mt-1 flex flex-col sm:mt-2">
          <div className="text-center font-mono text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-[65px]">
            {localTime}
          </div>
          <div className="text-center font-mono text-[11px] font-medium text-[#d4d4d4] sm:text-xs">
            {localDate}
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col gap-4 rounded-3xl bg-[#444444] px-4 py-4 shadow-[0px_0px_10px_0px_rgba(0,0,0,0.9)] sm:w-[65%] sm:flex-row sm:flex-wrap sm:items-center sm:justify-around sm:gap-6 sm:py-5 lg:flex-nowrap">
        <div className="leading-normal">
          <div className="font-display text-3xl font-bold leading-none text-[#b3b3b3] sm:text-4xl lg:text-[50px]">
            {current.temperature}°C
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-1 sm:gap-2">
            <div className="text-sm font-medium text-[#b3b3b3] sm:text-base">
              Feels like:
            </div>
            <div className="font-mono text-lg font-semibold text-[#b3b3b3] sm:text-xl lg:text-[25px]">
              {current.feelslike}°C
            </div>
          </div>
          {astro && (
            <div className="mt-3 space-y-1 sm:mt-6 sm:space-y-0">
              <div className="flex items-center gap-2 font-semibold text-white">
                <img src={sunRise} alt="Sunrise" className="h-6 w-6 sm:h-8 sm:w-8" />
                <div>
                  <div className="text-sm sm:text-base">Sunrise</div>
                  <div className="font-mono text-[11px] sm:text-xs">{astro.sunrise}</div>
                </div>
              </div>
              <div className="flex items-center gap-2 font-semibold text-white">
                <img src={sunSet} alt="Sunset" className="h-6 w-6 sm:h-8 sm:w-8" />
                <div>
                  <div className="text-sm sm:text-base">Sunset</div>
                  <div className="font-mono text-[11px] sm:text-xs">{astro.sunset}</div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col items-center justify-center gap-2 sm:gap-4">
          <div className="w-16 sm:w-20 lg:w-28">
            <img
              className="w-full rounded-lg bg-black"
              src={current.weather_icons[0]}
              alt={current.weather_descriptions[0]}
            />
          </div>
          <div className="text-center font-display text-base font-semibold text-white sm:text-lg lg:text-[25px]">
            {current.weather_descriptions[0]}
          </div>
        </div>

        <div className="grid grid-cols-4 gap-2 sm:flex sm:items-center sm:gap-6 lg:gap-10">
          <div className="flex flex-col items-center">
            <img className="h-7 w-7 sm:h-10 sm:w-10" src={humid} alt="Humidity" />
            <div className="font-mono text-sm font-semibold text-white sm:text-base">{current.humidity}%</div>
            <div className="text-[10px] text-white sm:text-sm">Humidity</div>
          </div>
          <div className="flex flex-col items-center">
            <img className="h-7 w-7 sm:h-10 sm:w-10" src={press} alt="Pressure" />
            <div className="font-mono text-sm font-semibold text-white sm:text-base">{current.pressure} hPa</div>
            <div className="text-[10px] text-white sm:text-sm">Pressure</div>
          </div>
          <div className="flex flex-col items-center">
            <img className="h-7 w-7 sm:h-10 sm:w-10" src={wind} alt="Wind" />
            <div className="font-mono text-sm font-semibold text-white sm:text-base">{current.wind_speed} km/h</div>
            <div className="text-[10px] text-white sm:text-sm">Wind</div>
          </div>
          <div className="flex flex-col items-center">
            <img className="h-7 w-7 sm:h-10 sm:w-10" src={uv} alt="UV" />
            <div className="font-mono text-sm font-semibold text-white sm:text-base">{current.uv_index}</div>
            <div className="text-[10px] text-white sm:text-sm">UV</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Temp;
