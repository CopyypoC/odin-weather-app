import { getWeatherData } from "./get-weather-data";
import { getGifUrl } from "./get-gif";

const locationForm = document.querySelector(".location-form");
const location = document.getElementById("location-input");

locationForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const weatherData = await getWeatherData(location.value);
  const gifUrl = await getGifUrl(weatherData.currentConditions.conditions);

  displayGif(gifUrl);
  location.value = "";
});

function displayWeatherData() {}

const gifContainer = document.querySelector(".gif-container");
function displayGif(url) {
  const gif = document.createElement("img");

  gif.src = url;
  (gif.alt = "Weather GIF"), gif.classList.add("gif");

  gifContainer.replaceChildren();
  gifContainer.appendChild(gif);
}
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
