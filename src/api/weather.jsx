
export async function getWeatherByCity(city) {
    const url = `${process.env.BASE_URL}?acess_key${process.env.ACCESS_KEY}&query=${encodeURIComponent(city)}` 
    const response = await fetch(url);
    if(!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    if(!data.ok) throw new Error(data.error.info);
    return data;
}