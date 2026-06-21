import React, { useCallback, useEffect, useRef, useState } from "react";
import Header from "../../components/header/header";
import Temp from "../../components/temp/temp";
import Forecast from "../../components/forecast/forecast";
import SearchHistory from "../../components/search-history/SearchHistory";
import { useAuth } from "../../context/AuthContext";
import { auth } from "../../config/firebase/config";
import {
  getWeatherByCity,
  getWeatherForecast,
  getTodayAstro,
  reverseGeocodeLabel,
  formatLocationLabel,
} from "../../api/weather";
import {
  getSearchHistory,
  saveSearchHistory,
  updateUserLocation,
} from "../../services/firestoreService";
import {
  clearLocalSearchHistory,
  getLocalSearchHistory,
  saveLocalSearchHistory,
} from "../../services/localSearchHistory";

const GEOLOCATION_ERRORS = {
  1: "Permission denied — allow location access in your browser.",
  2: "Position unavailable — GPS could not determine your location.",
  3: "Request timed out — try again.",
};

function inferQueryType(query) {
  return /^-?\d+(\.\d+)?,-?\d+(\.\d+)?$/.test(query.trim())
    ? "coordinates"
    : "city";
}

function Home() {
  const { user } = useAuth();
  const searchMetaRef = useRef({});
  const [city, setCity] = useState("");
  const [locationLabel, setLocationLabel] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saveError, setSaveError] = useState(null);

  const loadSearchHistory = useCallback(async () => {
    if (!auth.currentUser?.uid) {
      setSearchHistory(getLocalSearchHistory());
      return;
    }

    setHistoryLoading(true);

    try {
      const local = getLocalSearchHistory();
      if (local.length) {
        for (const item of [...local].reverse()) {
          await saveSearchHistory({
            query: item.query,
            queryType: item.queryType,
            locationLabel: item.locationLabel,
            weather: item.weather,
            forecast: item.forecast,
          });
        }
        clearLocalSearchHistory();
      }

      const history = await getSearchHistory();
      setSearchHistory(history);
    } catch (err) {
      const message =
        err.code === "permission-denied"
          ? "[Firestore] Permission denied. Publish firestore.rules in Firebase Console."
          : `[Firestore] ${err.message}`;
      setSaveError(message);
      console.error(message, err);
    } finally {
      setHistoryLoading(false);
    }
  }, []);

  const persistSearchHistory = useCallback(
    async (payload) => {
      if (!auth.currentUser?.uid) {
        const updated = saveLocalSearchHistory(payload);
        setSearchHistory(updated);
        return;
      }

      try {
        setSaveError(null);
        await saveSearchHistory(payload);
        await loadSearchHistory();
      } catch (err) {
        const message =
          err.code === "permission-denied"
            ? "[Firestore] Permission denied. Publish firestore.rules in Firebase Console."
            : `[Firestore] ${err.message}`;
        setSaveError(message);
        console.error(message, err);
      }
    },
    [loadSearchHistory]
  );

  const fetchWeather = useCallback(
    async (searchCity, meta = {}) => {
      setLoading(true);
      setError(null);

      try {
        const [current, forecast] = await Promise.all([
          getWeatherByCity(searchCity),
          getWeatherForecast(searchCity),
        ]);

        setWeatherData(current);
        setForecastData(forecast);

        await persistSearchHistory({
          query: searchCity,
          queryType: meta.queryType || inferQueryType(searchCity),
          locationLabel:
            meta.locationLabel ?? formatLocationLabel(current.location),
          weather: current,
          forecast: forecast,
        });
      } catch (err) {
        setError(err.message || "Failed to fetch weather data");
        setWeatherData(null);
        setForecastData(null);
      } finally {
        setLoading(false);
      }
    },
    [persistSearchHistory]
  );

  const requestWeather = useCallback((query, meta = {}) => {
    searchMetaRef.current = meta;
    setCity(query);
  }, []);

  useEffect(() => {
    if (!city) return;
    fetchWeather(city, searchMetaRef.current);
  }, [city, fetchWeather]);

  useEffect(() => {
    loadSearchHistory();
  }, [loadSearchHistory, user]);

  const handleCurrentLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError("[Geolocation] Not supported by this browser.");
      setLoading(false);
      return;
    }

    setError(null);
    setLoading(true);
    setLocationLabel(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const query = `${latitude},${longitude}`;

        try {
          const label = await reverseGeocodeLabel(latitude, longitude);
          setLocationLabel(label);

          if (auth.currentUser?.uid) {
            updateUserLocation(auth.currentUser.uid, {
              lat: latitude,
              lng: longitude,
              location: label,
            }).catch((err) => console.error("[Firestore] Failed to save location:", err));
          }

          requestWeather(query, {
            queryType: "current_location",
            locationLabel: label,
          });
        } catch (err) {
          setError(err.message || "[Current Location] Failed.");
          setWeatherData(null);
          setForecastData(null);
          setLoading(false);
        }
      },
      (geoError) => {
        const reason = GEOLOCATION_ERRORS[geoError.code] || geoError.message;
        setError(`[Geolocation] ${reason}`);
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );
  }, [requestWeather]);

  useEffect(() => {
    handleCurrentLocation();
  }, [handleCurrentLocation]);

  const handleSearch = (newCity, meta = {}) => {
    if (newCity) {
      setLocationLabel(meta.locationLabel || null);
      requestWeather(newCity, {
        queryType: meta.queryType || "city",
        locationLabel: meta.locationLabel,
      });
    }
  };

  const handleHistorySelect = (item) => {
    setLocationLabel(item.locationLabel || null);
    requestWeather(item.query, {
      queryType: item.queryType || inferQueryType(item.query),
      locationLabel: item.locationLabel,
    });
  };

  const todayAstro = getTodayAstro(forecastData);

  return (
    <div className="min-h-screen pb-6 sm:pb-10">
      <Header onSearch={handleSearch} onCurrentLocation={handleCurrentLocation} />
      {error && (
        <div className="mx-auto mt-4 w-[90%] max-w-4xl rounded-xl bg-red-900/60 px-4 py-3 text-center text-white">
          {error}
        </div>
      )}
      {saveError && (
        <div className="mx-auto mt-4 w-[90%] max-w-4xl rounded-xl bg-amber-900/70 px-4 py-3 text-center text-white">
          {saveError}
        </div>
      )}
      <Temp
        weatherData={weatherData}
        loading={loading}
        astro={todayAstro}
        locationLabel={locationLabel}
      />
      <Forecast forecastData={forecastData} loading={loading} />
      <SearchHistory
        history={searchHistory}
        loading={historyLoading}
        onSelect={handleHistorySelect}
        isGuest={!user}
      />
    </div>
  );
}

export default Home;
