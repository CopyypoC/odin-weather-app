import { getWeatherData } from "./get-weather-data";
import { getGifUrl } from "./get-gif";
import { format } from "date-fns";

let unit = "F";

const locationForm = document.querySelector(".location-form");
const location = document.getElementById("location-input");
locationForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const weatherData = await getWeatherData(location.value);
  const gifUrl = await getGifUrl(weatherData.currentConditions.conditions);

  console.log(weatherData);
  displayWeatherData(weatherData);

  displayGif(gifUrl);
  location.value = "";
});

const locationContainer = document.querySelector(".location-container");
const weatherContainer = document.querySelector(".weather-container");
async function displayWeatherData(weatherData) {
  weatherContainer.replaceChildren();
  await displayWeatherCard(weatherData);
}

async function displayWeatherCard(weatherData) {
  const weatherCard = document.createElement("div");
  weatherCard.classList.add("weather-card");

  const fullDate = new Date(
    weatherData.days[0].datetime + "T" + weatherData.currentConditions.datetime,
  );
  const dateDay = document.createElement("p");
  const dateTime = document.createElement("p");
  dateDay.classList.add("date-day");
  dateTime.classList.add("date-time");
  dateDay.textContent = format(fullDate, "EEEE");
  dateTime.textContent = format(fullDate, "MMMM dd, K:mm aaa");

  const temp = document.createElement("p");
  temp.classList.add("temp");
  temp.textContent = `${weatherData.currentConditions.temp} °${unit}`;

  const icon = document.createElement("img");
  icon.classList.add("icon");
  import(`../weather-icons/${weatherData.currentConditions.icon}.svg`).then(
    (img) => {
      icon.src = img.default;
      icon.alt = `${weatherData.currentConditions.icon} icon`;
    },
  );

  const conditions = document.createElement("p");
  conditions.classList.add("conditions");
  conditions.textContent = weatherData.currentConditions.conditions;

  weatherCard.append(dateDay, dateTime, temp, icon, conditions);
  weatherContainer.append(weatherCard);
}

const gifContainer = document.querySelector(".gif-container");
function displayGif(url) {
  const gif = document.createElement("img");

  gif.src = url;
  (gif.alt = "Weather GIF"), gif.classList.add("gif");

  gifContainer.replaceChildren();
  gifContainer.appendChild(gif);
}
// weatherData Object ↓
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
