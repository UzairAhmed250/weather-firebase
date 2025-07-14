import React from "react";
import Header from "../../components/header/header";
import Temp from "../../components/temp/temp";
import Forecast from "../../components/forecast/forecast";
import MainHeader from "../../components/main-header/main";

function Home() {
  return (
    <div>
      <MainHeader />
      <Header />
      <Temp />
      <Forecast />
    </div>
  );
}

export default Home;
