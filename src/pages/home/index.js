import React, { useEffect, useState } from "react";
import Header from "../../components/header/header";
import Temp from "../../components/temp/temp";
import Forecast from "../../components/forecast/forecast";
import MainHeader from "../../components/main-header/main";
import { getWeatherByCity } from "../../api/weather";

function Home() {
  const [city, setCity] = useState(null);
  const [weather, setWeather] = useState(null);
 
  useEffect(() => {
    getWeatherByCity(city)
      .then(data => setWeather(data))
      .catch(err => console.error (err))
  }, [city])

  const handleSearch = (newCity) => {
    setCity(newCity);
  }

  return (
    <div>
      <MainHeader />
      <Header onSearch={handleSearch} />
      <Temp />
      <Forecast />
    </div>
  );
}

export default Home;
