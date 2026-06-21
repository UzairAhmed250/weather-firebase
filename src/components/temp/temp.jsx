import React from "react";
import sunRise from "../../assets/sunrise.svg";
import sunSet from "../../assets/sunset.svg";
import humid from "../../assets/humidity.svg";
import press from "../../assets/pressure.svg";
import wind from "../../assets/wind.svg";
import uv from "../../assets/uv.svg";
import { formatLocationLabel } from "../../api/weather";

function StatItem({ icon, iconAlt, value, label }) {
  return (
    <div className="flex flex-col items-center">
      <img className="h-7 w-7 sm:h-10 sm:w-10" src={icon} alt={iconAlt} />
      <div className="font-mono text-sm font-semibold text-white sm:text-base">{value}</div>
      <div className="text-[10px] text-white sm:text-sm">{label}</div>
    </div>
  );
}

function Temp({ weatherData, loading, astro, locationLabel }) {
  if (loading) {
    return (
      <div className="mx-auto mt-4 flex max-w-6xl flex-col gap-3 px-2 lg:mt-12 lg:flex-row lg:flex-wrap lg:justify-center lg:gap-8 lg:px-4 lg:gap-[75px]">
        <div className="w-full rounded-3xl bg-[#444444] px-3 py-4 shadow-[0px_0px_10px_0px_rgba(0,0,0,0.9)] lg:w-[25%] lg:px-4 lg:py-5">
          <div className="mx-auto h-4 w-28 animate-pulse rounded-lg bg-[#5a5a5a] lg:h-5 lg:w-32" />
          <div className="mx-auto mt-4 h-10 w-32 animate-pulse rounded-lg bg-[#5a5a5a] lg:mt-6 lg:h-12 lg:w-40" />
          <div className="mx-auto mt-2 h-2.5 w-20 animate-pulse rounded bg-[#5a5a5a] lg:mt-4 lg:h-3" />
        </div>

        <div className="hidden w-full flex-col gap-4 rounded-3xl bg-[#444444] px-4 py-4 shadow-[0px_0px_10px_0px_rgba(0,0,0,0.9)] lg:flex lg:w-[65%] lg:flex-row lg:flex-wrap lg:justify-around lg:gap-6 lg:py-5">
          <div className="flex flex-1 flex-col gap-3 lg:gap-4">
            <div className="h-8 w-20 animate-pulse rounded-lg bg-[#5a5a5a] lg:h-10 lg:w-24" />
            <div className="h-3 w-28 animate-pulse rounded bg-[#5a5a5a] lg:h-4 lg:w-32" />
            <div className="h-3 w-24 animate-pulse rounded bg-[#5a5a5a] lg:h-4 lg:w-28" />
          </div>
          <div className="flex flex-col items-center gap-2 lg:gap-4">
            <div className="h-16 w-16 animate-pulse rounded-xl bg-[#5a5a5a] lg:h-20 lg:w-20" />
            <div className="h-3 w-16 animate-pulse rounded bg-[#5a5a5a] lg:h-4 lg:w-20" />
          </div>
          <div className="flex gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="flex flex-col items-center gap-1 lg:gap-2">
                <div className="h-7 w-7 animate-pulse rounded-full bg-[#5a5a5a] lg:h-9 lg:w-9" />
                <div className="h-2.5 w-10 animate-pulse rounded bg-[#5a5a5a] lg:h-3 lg:w-12" />
              </div>
            ))}
          </div>
        </div>

        <div className="flex w-full flex-col gap-3 rounded-3xl bg-[#444444] px-3 py-4 shadow-[0px_0px_10px_0px_rgba(0,0,0,0.9)] lg:hidden">
          <div className="h-8 w-24 animate-pulse rounded-lg bg-[#5a5a5a]" />
          <div className="grid grid-cols-2 gap-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="h-12 animate-pulse rounded-lg bg-[#5a5a5a]" />
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
  const placeName = locationLabel ?? formatLocationLabel(location);

  return (
    <div className="mx-auto mt-4 flex max-w-6xl flex-col gap-3 px-2 lg:mt-12 lg:flex-row lg:flex-wrap lg:justify-center lg:gap-8 lg:px-4 lg:gap-[75px]">
      <div className="w-full rounded-3xl bg-[#444444] px-3 py-4 shadow-[0px_0px_10px_0px_rgba(0,0,0,0.9)] lg:w-[25%] lg:px-4 lg:py-5">
        <div className="line-clamp-2 text-center font-display text-sm font-bold text-white lg:line-clamp-none lg:text-xl lg:text-[25px]">
          {placeName}
        </div>
        <div className="mt-1 flex flex-col lg:mt-2">
          <div className="text-center font-mono text-3xl font-bold leading-tight text-white min-[375px]:text-4xl lg:text-5xl lg:text-[65px]">
            {localTime}
          </div>
          <div className="text-center font-mono text-[10px] font-medium text-[#d4d4d4] lg:text-xs">
            {localDate}
          </div>
        </div>
      </div>

      {/* Desktop weather card — original horizontal layout */}
      <div className="hidden w-full flex-col gap-4 rounded-3xl bg-[#444444] px-4 py-4 shadow-[0px_0px_10px_0px_rgba(0,0,0,0.9)] lg:flex lg:w-[65%] lg:flex-row lg:flex-wrap lg:items-center lg:justify-around lg:gap-6 lg:py-5 lg:flex-nowrap">
        <div className="leading-normal">
          <div className="font-display text-3xl font-bold leading-none text-[#b3b3b3] lg:text-4xl lg:text-[50px]">
            {current.temperature}°C
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-1 lg:gap-2">
            <div className="text-sm font-medium text-[#b3b3b3] lg:text-base">Feels like:</div>
            <div className="font-mono text-lg font-semibold text-[#b3b3b3] lg:text-xl lg:text-[25px]">
              {current.feelslike}°C
            </div>
          </div>
          {astro && (
            <div className="mt-3 space-y-1 lg:mt-6 lg:space-y-0">
              <div className="flex items-center gap-2 font-semibold text-white">
                <img src={sunRise} alt="Sunrise" className="h-6 w-6 lg:h-8 lg:w-8" />
                <div>
                  <div className="text-sm lg:text-base">Sunrise</div>
                  <div className="font-mono text-[11px] lg:text-xs">{astro.sunrise}</div>
                </div>
              </div>
              <div className="flex items-center gap-2 font-semibold text-white">
                <img src={sunSet} alt="Sunset" className="h-6 w-6 lg:h-8 lg:w-8" />
                <div>
                  <div className="text-sm lg:text-base">Sunset</div>
                  <div className="font-mono text-[11px] lg:text-xs">{astro.sunset}</div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col items-center justify-center gap-2 lg:gap-4">
          <div className="w-16 lg:w-20 xl:w-28">
            <img
              className="w-full rounded-lg bg-black"
              src={current.weather_icons[0]}
              alt={current.weather_descriptions[0]}
            />
          </div>
          <div className="text-center font-display text-base font-semibold text-white lg:text-lg lg:text-[25px]">
            {current.weather_descriptions[0]}
          </div>
        </div>

        <div className="flex items-center gap-6 lg:gap-10">
          <StatItem icon={humid} iconAlt="Humidity" value={`${current.humidity}%`} label="Humidity" />
          <StatItem icon={press} iconAlt="Pressure" value={`${current.pressure} hPa`} label="Pressure" />
          <StatItem icon={wind} iconAlt="Wind" value={`${current.wind_speed} km/h`} label="Wind" />
          <StatItem icon={uv} iconAlt="UV" value={current.uv_index} label="UV" />
        </div>
      </div>

      {/* Mobile weather card — stacked layout */}
      <div className="flex w-full flex-col gap-3 rounded-3xl bg-[#444444] px-3 py-4 shadow-[0px_0px_10px_0px_rgba(0,0,0,0.9)] lg:hidden">
        <div className="flex items-start justify-between gap-3 border-b border-[#555555] pb-3">
          <div className="min-w-0 flex-1">
            <div className="font-display text-2xl font-bold leading-none text-[#b3b3b3] min-[375px]:text-3xl">
              {current.temperature}°C
            </div>
            <div className="mt-1 flex flex-wrap items-center gap-1">
              <div className="text-xs font-medium text-[#b3b3b3]">Feels like:</div>
              <div className="font-mono text-base font-semibold text-[#b3b3b3]">
                {current.feelslike}°C
              </div>
            </div>
          </div>
          <div className="flex shrink-0 flex-col items-center gap-1">
            <div className="w-14">
              <img
                className="w-full rounded-lg bg-black"
                src={current.weather_icons[0]}
                alt={current.weather_descriptions[0]}
              />
            </div>
            <div className="max-w-[5.5rem] text-center font-display text-xs font-semibold leading-tight text-white">
              {current.weather_descriptions[0]}
            </div>
          </div>
        </div>

        {astro && (
          <div className="grid grid-cols-2 gap-3 border-b border-[#555555] pb-3">
            <div className="flex items-center gap-2 font-semibold text-white">
              <img src={sunRise} alt="Sunrise" className="h-5 w-5" />
              <div className="min-w-0">
                <div className="text-xs">Sunrise</div>
                <div className="font-mono text-[10px]">{astro.sunrise}</div>
              </div>
            </div>
            <div className="flex items-center gap-2 font-semibold text-white">
              <img src={sunSet} alt="Sunset" className="h-5 w-5" />
              <div className="min-w-0">
                <div className="text-xs">Sunset</div>
                <div className="font-mono text-[10px]">{astro.sunset}</div>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 justify-items-center gap-x-3 gap-y-4 min-[400px]:grid-cols-4">
          <StatItem icon={humid} iconAlt="Humidity" value={`${current.humidity}%`} label="Humidity" />
          <StatItem icon={press} iconAlt="Pressure" value={`${current.pressure} hPa`} label="Pressure" />
          <StatItem icon={wind} iconAlt="Wind" value={`${current.wind_speed} km/h`} label="Wind" />
          <StatItem icon={uv} iconAlt="UV" value={current.uv_index} label="UV" />
        </div>
      </div>
    </div>
  );
}

export default Temp;
