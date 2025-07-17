
export async function getWeatherByCity(city) {
    const url = `${process.env.REACT_APP_BASE_URL}?access_key=${process.env.REACT_APP_ACCESS_KEY}&query=${encodeURIComponent(city)}` 
    const response = await fetch(url);
    if(!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    if(data.error) throw new Error(data.error.info);
    return data;
}

// export async function getWeatherForcast(city){
//     const url = `${process.env.REACT_APP_BASE_URL_FORECAST}?access_key=${process.env.REACT_APP_ACCESS_KEY}&query=${encodeURIComponent(city)}&forecast_days=5` 
    
// }


  
