import { getWeatherData } from "./get-weather-data";

const locationForm = document.querySelector(".location-form");
const location = document.getElementById("location");

locationForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const weatherData = await getWeatherData(location.value);
  console.log(weatherData);
});
