
export async function getWeatherByCity(city) {
    const locationQuery = city ? encodeURIComponent(city) : "fetch:ip";
    const url = `${process.env.REACT_APP_BASE_URL}?access_key=${process.env.REACT_APP_ACCESS_KEY}&query=${locationQuery}` 
    const response = await fetch(url);
    if(!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    if(data.error) throw new Error(data.error.info);
    return data;
}

export async function getWeatherForecast(city) {
    const url = `${process.env.REACT_APP_BASE_URL_FORECAST}?access_key=${process.env.REACT_APP_ACCESS_KEY}&query=${encodeURIComponent(city)}&forecast_days=5&hourly=1`;

    try {
        console.log("Requesting:", url);
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Network Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        if (data.error) {
            throw new Error(data.error.info);
        }

        return data;
    } catch (err) {
        console.error("Fetch error:", err);
        throw err;
    }
}



  
