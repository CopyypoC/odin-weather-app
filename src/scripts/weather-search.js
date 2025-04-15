import { getWeatherData } from "./get-weather-data";

const locationForm = document.querySelector(".location-form");
const location = document.getElementById("location");

locationForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const weatherData = await getWeatherData(location.value);
  console.log(weatherData);
});

// description: 'Cooling down with a chance of rain',
// resolvedAddress: "London, England, United Kingdom"
// currentConditions {
//   conditions: 'Partially cloudy',
//   temp: 52.3,
//   feelslike: 55.2,
//   icon: 'partly-cloudy-night',
//   precip: 0.45,
//   windspeed: 2.8,
//   humidity: 85.4,
//   datetimeEpoch: 1744673220,
// }
