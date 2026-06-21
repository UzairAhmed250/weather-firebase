const API_KEY = process.env.REACT_APP_ACCESS_KEY;
const CURRENT_URL =
  process.env.REACT_APP_BASE_URL;
const FORECAST_URL =
  process.env.REACT_APP_BASE_URL_FORECAST;
const SEARCH_URL = "https://api.weatherapi.com/v1/search.json";

const getLocationQuery = (location) => {
  const query = location?.trim();

  if (!query) {
    throw new Error(
      "[Weather API] No location provided. Search for a city or click Current Location."
    );
  }

  return encodeURIComponent(query);
};

export async function reverseGeocodeLabel(lat, lon) {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=14&addressdetails=1`;
  const response = await fetch(url, { headers: { Accept: "application/json" } });

  if (!response.ok) {
    throw new Error(`[Reverse Geocode] HTTP ${response.status} for coordinates ${lat}, ${lon}`);
  }

  const data = await response.json();
  const address = data?.address;
  const city = address.city;
  const area = address.town;
  const country = address.country;

  if (area && city && area.toLowerCase() !== city.toLowerCase()) {
    return `${area}, ${city}, ${country}`;
  }
  if (city && country) {
    return `${city}, ${country}`;
  }

  throw new Error(
    `[Reverse Geocode] No city/country found for coordinates. Response: ${data.display_name || "empty"}`
  );
}

function ensureHttps(url) {
  if (!url) return url;
  return url.startsWith("//") ? `https:${url}` : url;
}

async function fetchWeatherData(url) {
  if (!API_KEY) {
    throw new Error("Weather API key is missing. Add REACT_APP_ACCESS_KEY to your .env file.");
  }

  const response = await fetch(url);
  const data = await response.json();

  if (data.error) {
    throw new Error(
      `[Weather API] ${data.error.message || data.error.info || "Request failed"}`
    );
  }

  if (!response.ok) {
    throw new Error(`[Weather API] HTTP ${response.status} for ${url}`);
  }

  return data;
}

function normalizeCurrent(data) {
  const { location, current } = data;

  return {
    location: {
      name: location.name,
      region: location.region,
      country: location.country,
      localtime: location.localtime,
    },
    current: {
      temperature: current.temp_c,
      feelslike: current.feelslike_c,
      humidity: current.humidity,
      pressure: current.pressure_mb,
      wind_speed: current.wind_kph,
      uv_index: current.uv,
      weather_icons: [ensureHttps(current.condition.icon)],
      weather_descriptions: [current.condition.text],
    },
  };
}

function normalizeForecast(data) {
  const forecast = {};

  for (const day of data.forecast.forecastday) {
    forecast[day.date] = {
      date: day.date,
      maxtemp: day.day.maxtemp_c,
      mintemp: day.day.mintemp_c,
      astro: {
        sunrise: day.astro.sunrise,
        sunset: day.astro.sunset,
      },
      hourly: day.hour.map((hour) => ({
        time: hour.time.split(" ")[1].replace(":", ""),
        weather_icons: [ensureHttps(hour.condition.icon)],
        weather_descriptions: [hour.condition.text],
        temp: hour.temp_c,
        wind_speed: hour.wind_kph,
      })),
    };
  }

  return { forecast };
}

const MAX_SUGGESTIONS = 10;

async function searchWeatherApi(query) {
  if (!API_KEY) {
    return [];
  }

  const url = `${SEARCH_URL}?key=${API_KEY}&q=${encodeURIComponent(query)}`;
  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok || data?.error || !Array.isArray(data)) {
    return [];
  }

  return data;
}

async function searchNominatim(query) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=${MAX_SUGGESTIONS}&q=${encodeURIComponent(query)}`;
  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
      "User-Agent": "WeatherFirebaseApp/1.0",
    },
  });

  if (!response.ok) {
    return [];
  }

  const data = await response.json();
  if (!Array.isArray(data)) {
    return [];
  }

  return data.map((place) => {
    const address = place.address || {};
    const name =
      address.city ||
      address.town ||
      address.village ||
      address.suburb ||
      place.name ||
      place.display_name?.split(",")[0] ||
      query;

    return {
      id: `nominatim-${place.place_id}`,
      name,
      region: address.state || address.state_district || address.county || "",
      country: address.country || "",
      lat: Number(place.lat),
      lon: Number(place.lon),
    };
  });
}

function dedupeSearchResults(results) {
  const seen = new Set();
  const unique = [];

  for (const item of results) {
    const latKey = Number(item.lat).toFixed(2);
    const lonKey = Number(item.lon).toFixed(2);
    const key = `${item.name.toLowerCase()}|${item.country?.toLowerCase() || ""}|${latKey}|${lonKey}`;

    if (seen.has(key)) {
      continue;
    }

    seen.add(key);
    unique.push(item);

    if (unique.length >= MAX_SUGGESTIONS) {
      break;
    }
  }

  return unique;
}

export async function searchLocations(query) {
  const trimmed = query?.trim();
  if (!trimmed || trimmed.length < 2) {
    return [];
  }

  const [weatherResults, nominatimResults] = await Promise.allSettled([
    searchWeatherApi(trimmed),
    searchNominatim(trimmed),
  ]);

  const weather =
    weatherResults.status === "fulfilled" ? weatherResults.value : [];
  const nominatim =
    nominatimResults.status === "fulfilled" ? nominatimResults.value : [];

  return dedupeSearchResults([...weather, ...nominatim]);
}

export function formatSuggestionLabel({ name, region, country }) {
  if (region && region !== name && !name.includes(region)) {
    return `${name}, ${region}, ${country}`;
  }
  return `${name}, ${country}`;
}

export async function getWeatherByCity(city) {
  const locationQuery = getLocationQuery(city);
  const url = `${CURRENT_URL}?key=${API_KEY}&q=${locationQuery}`;
  const data = await fetchWeatherData(url);
  return normalizeCurrent(data);
}

export async function getWeatherForecast(city) {
  const locationQuery = getLocationQuery(city);
  const url = `${FORECAST_URL}?key=${API_KEY}&q=${locationQuery}&days=5`;
  const data = await fetchWeatherData(url);
  return normalizeForecast(data);
}

export function getTodayAstro(forecastData) {
  if (!forecastData?.forecast) return null;
  const firstDay = Object.values(forecastData.forecast)[0];
  return firstDay?.astro ?? null;
}

export function formatHour(time) {
  const hour = parseInt(time, 10) / 100;
  return `${hour.toString().padStart(2, "0")}:00`;
}

export function formatLocationLabel(location) {
  if (!location) return "";

  const { name, region, country } = location;
  if (region && region !== name && !name.includes(region)) {
    return `${name}, ${region}, ${country}`;
  }
  return `${name}, ${country}`;
}

export function formatForecastDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}
