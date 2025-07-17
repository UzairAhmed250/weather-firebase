import React, { useEffect, useState } from "react";
import Header from "../../components/header/header";
import Temp from "../../components/temp/temp";
import Forecast from "../../components/forecast/forecast";
import MainHeader from "../../components/main-header/main";
import { getWeatherByCity } from "../../api/weather";

function Home() {
  const [city, setCity] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null)
 
  useEffect(() => {
    console.log("before city" , city)

    if (!city) return;
    console.log("after city" , city)

    setLoading(true);
    setError(null);
    getWeatherByCity(city)
      .then(data => {
        console.log("data",   data)
        setWeatherData(data);
        setError(null);
      })
      .catch(err => {
        console.error (err);
        setError("Failed to fetch Weather data");
        setWeatherData(null);
      })
      .finally(() => setLoading(false));
  }, [city])

  console.log("weatherData", weatherData)

  const handleSearch = (newCity) => {
    console.log("🔍 Search triggered:", newCity);
    setCity(newCity);
  }

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await response.json();
            const city =
              data.address.city ||
              data.address.town ||
              data.address.village ||
              data.address.state;
            if (city) {
              setCity(city);
            } else {
              alert("Could not determine city from your location.");
            }
          } catch (err) {
            alert("Error fetching city from coordinates.");
          }
        },
        (error) => {
          alert("Unable to retrieve your location");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div>
      <MainHeader />
      <Header onSearch={handleSearch} onCurrentLocation={handleCurrentLocation} />
      <Temp weatherData={weatherData} loading={loading} />
      <Forecast />
    </div>
  );
}

export default Home;
