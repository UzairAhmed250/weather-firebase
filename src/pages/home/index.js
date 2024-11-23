import React from 'react'
import Header from '../../components/header/header'
import Temp from '../../components/temp/temp'
import Forecast from '../../components/forecast/forecast'
import MainHeader from '../../components/main-header/main'
import Login from '../../{auth}/login'

function Home() {
  return (
    <div>
     <MainHeader/>
 <Header />
    <Temp />
    <Forecast />  
    {/* <Login /> */}
    </div>
  )
}

export default Home