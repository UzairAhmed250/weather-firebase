import React from "react";
import "./forecast.css";
import Forecastchild from "./forecast-child";
import sun from "../../assets/sun.svg";
import { UpOutlined } from "@ant-design/icons";
import { formatForecastDate, formatHour } from "../../api/weather";

function getUpcomingHours(hourly, count = 5) {
  if (!hourly?.length) return [];

  const currentHour = new Date().getHours();
  const upcoming = hourly.filter(
    (hour) => Math.floor(parseInt(hour.time, 10) / 100) >= currentHour
  );

  return (upcoming.length ? upcoming : hourly).slice(0, count);
}

function HourlyCard({ hour }) {
  return (
    <div className="flex flex-col items-center gap-1 rounded-2xl bg-[#373636] px-1 py-2.5 sm:gap-2 sm:rounded-[20px] sm:px-2 sm:py-3">
      <div className="font-mono text-sm font-bold sm:text-base">{formatHour(hour.time)}</div>
      <img
        className="h-8 w-8 object-contain sm:h-9 sm:w-9"
        src={hour.weather_icons?.[0] || sun}
        alt={hour.weather_descriptions?.[0] || "Weather"}
      />
      <div className="font-mono text-sm font-bold sm:text-base">{hour.temp}°C</div>
      <UpOutlined className="text-xs text-[#b3b3b3] sm:text-sm" />
      <div className="font-mono text-[10px] font-medium text-[#d4d4d4] sm:text-xs">
        {hour.wind_speed} km/h
      </div>
    </div>
  );
}

function Forecast({ forecastData, loading }) {
  if (loading) {
    return (
      <div className="mx-auto mt-6 flex max-w-6xl flex-col gap-4 px-4 sm:mt-10 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-8 lg:gap-[75px]">
        <div className="w-full rounded-3xl bg-[#444444] px-4 py-4 shadow-[5px_5px_10px_0px_rgba(0,0,0,0.9)] sm:w-[25%] sm:py-5">
          <div className="mx-auto h-5 w-32 animate-pulse rounded-lg bg-[#5a5a5a] sm:h-6 sm:w-36" />
          <div className="mt-3 space-y-1 sm:mt-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex items-center gap-2 py-2">
                <div className="h-6 w-6 animate-pulse rounded-full bg-[#5a5a5a] sm:h-7 sm:w-7" />
                <div className="h-3 w-10 animate-pulse rounded bg-[#5a5a5a]" />
                <div className="h-3 flex-1 animate-pulse rounded bg-[#5a5a5a]" />
              </div>
            ))}
          </div>
        </div>

        <div className="w-full rounded-3xl bg-[#444444] px-4 py-4 shadow-[5px_5px_10px_0px_rgba(0,0,0,0.9)] sm:w-[65%] sm:py-5">
          <div className="mx-auto h-6 w-36 animate-pulse rounded-lg bg-[#5a5a5a] sm:h-7 sm:w-44" />
          <div className="hourly-forecast-row mt-3 px-3 pb-1 sm:mt-4 sm:px-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-1 rounded-2xl bg-[#373636] py-2.5"
              >
                <div className="h-3 w-8 animate-pulse rounded bg-[#5a5a5a]" />
                <div className="h-8 w-8 animate-pulse rounded-lg bg-[#5a5a5a]" />
                <div className="h-3 w-8 animate-pulse rounded bg-[#5a5a5a]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!forecastData?.forecast) {
    return null;
  }

  const days = Object.values(forecastData.forecast).slice(0, 5);
  const todayKey = Object.keys(forecastData.forecast)[0];
  const hourly = getUpcomingHours(forecastData.forecast[todayKey]?.hourly, 5);

  return (
    <div className="mx-auto mt-6 flex max-w-6xl flex-col gap-4 px-4 sm:mt-10 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-8 lg:gap-[75px]">
      <div className="w-full rounded-3xl bg-[#444444] font-semibold text-white shadow-[5px_5px_10px_0px_rgba(0,0,0,0.9)] sm:w-[25%]">
        <h2 className="px-2 pt-4 text-center font-display text-lg font-bold sm:pt-5 sm:text-[22px]">
          5 Day Forecast
        </h2>
        <div className="space-y-0.5 px-2 pb-4 pt-2 sm:space-y-1 sm:px-3 sm:pb-5">
          {days.map((day) => (
            <Forecastchild
              key={day.date}
              img={day.hourly?.[4]?.weather_icons?.[0] || sun}
              tem={`${day.maxtemp}°C`}
              date={formatForecastDate(day.date)}
            />
          ))}
        </div>
      </div>

      <div className="w-full rounded-3xl bg-[#444444] font-semibold text-white shadow-[5px_5px_10px_0px_rgba(0,0,0,0.9)] sm:w-[65%]">
        <h2 className="px-2 pt-4 text-center font-display text-lg font-bold sm:pt-5 sm:text-[25px]">
          Hourly Forecast
        </h2>
        {hourly.length > 0 ? (
          <div className="hourly-forecast-row mt-2 px-3 pb-4 pt-1 sm:mt-3 sm:px-4 sm:pb-5">
            {hourly.map((hour) => (
              <HourlyCard key={hour.time} hour={hour} />
            ))}
          </div>
        ) : (
          <div className="px-4 py-8 text-center text-sm text-[#b3b3b3] sm:py-10">
            Hourly forecast unavailable for this location.
          </div>
        )}
      </div>
    </div>
  );
}

export default Forecast;
