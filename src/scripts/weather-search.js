import { getWeatherData } from "./get-weather-data";
import { getGifUrl } from "./get-gif";
import { format } from "date-fns";

const imperial = {
  temp: "°F",
  precip: "in",
  speed: "mph",
};

const metric = {
  temp: "°C",
  precip: "mm",
  speed: "kph",
};

let system = "imperial";
let prevSearch = "";

const locationForm = document.querySelector(".location-form");
const location = document.getElementById("location-input");
locationForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    prevSearch = location.value;
    const weatherData = await getWeatherData(location.value, system);
    const gifUrl = await getGifUrl(weatherData.currentConditions.conditions);

    console.log(weatherData);
    displayWeatherData(weatherData, system);

    displayGif(gifUrl);
    location.value = "";
  } catch (err) {
    location.setCustomValidity(err);
    location.reportValidity();
  }
});

const weatherContainer = document.querySelector(".weather-container");
async function displayWeatherData(weatherData, system) {
  weatherContainer.replaceChildren();
  locationContainer.replaceChildren();
  displayWeatherLocation(weatherData);
  await displayWeatherCard(weatherData, system);
  displayWeatherExtra(weatherData, system);
  displayWeatherDesc(weatherData);
}

function displayWeatherCard(weatherData, system) {
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
  if (system === "imperial") {
    temp.textContent = `${weatherData.currentConditions.temp} ${imperial.temp}`;
  } else if (system === "metric") {
    temp.textContent = `${weatherData.currentConditions.temp} ${metric.temp}`;
  }

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

function displayWeatherExtra(weatherData, system) {
  const weatherExtra = document.createElement("div");
  weatherExtra.classList.add("weather-extra");

  const extraContainerArr = [];
  for (let i = 0; i < 4; i++) {
    const extraContainer = document.createElement("div");
    extraContainer.classList.add("extra-container");
    extraContainerArr.push(extraContainer);
  }

  const feelsLike = document.createElement("p");
  feelsLike.textContent = "Feels Like";
  const feelsLikeNum = document.createElement("p");
  if (system === "imperial") {
    feelsLikeNum.textContent = `${weatherData.currentConditions.feelslike} ${imperial.temp}`;
  } else if (system === "metric") {
    feelsLikeNum.textContent = `${weatherData.currentConditions.feelslike} ${metric.temp}`;
  }

  const precip = document.createElement("p");
  precip.textContent = "Precip";
  const precipNum = document.createElement("p");
  if (system === "imperial") {
    precipNum.textContent = `${weatherData.currentConditions.precip} ${imperial.precip}`;
  } else if (system === "metric") {
    precipNum.textContent = `${weatherData.currentConditions.precip} ${metric.precip}`;
  }

  const windspeed = document.createElement("p");
  windspeed.textContent = "Wind Speed";
  const windspeedNum = document.createElement("p");
  if (system === "imperial") {
    windspeedNum.textContent = `${weatherData.currentConditions.windspeed} ${imperial.speed}`;
  } else if (system === "metric") {
    windspeedNum.textContent = `${weatherData.currentConditions.windspeed} ${metric.speed}`;
  }

  const humidity = document.createElement("p");
  humidity.textContent = "Humidity";
  const humidityNum = document.createElement("p");
  humidityNum.textContent = weatherData.currentConditions.humidity + " %";

  extraContainerArr[0].append(feelsLike, feelsLikeNum);
  extraContainerArr[1].append(precip, precipNum);
  extraContainerArr[2].append(windspeed, windspeedNum);
  extraContainerArr[3].append(humidity, humidityNum);
  for (let i = 0; i < 4; i++) {
    weatherExtra.append(extraContainerArr[i]);
  }

  weatherContainer.append(weatherExtra);
}

function displayWeatherDesc(weatherData) {
  const weatherDesc = document.createElement("div");
  weatherDesc.classList.add("weather-desc");

  const description = document.createElement("p");
  description.classList.add("description");
  description.textContent = weatherData.days[0].description;

  weatherDesc.append(description);
  weatherContainer.append(weatherDesc);
}

const locationContainer = document.querySelector(".location-container");
function displayWeatherLocation(weatherData) {
  const resolvedAddress = document.createElement("h1");
  resolvedAddress.classList.add("resolved-address");
  resolvedAddress.textContent = weatherData.resolvedAddress;

  locationContainer.append(resolvedAddress);
}

const gifContainer = document.querySelector(".gif-container");
function displayGif(url) {
  const gif = document.createElement("img");

  gif.src = url;
  (gif.alt = "Weather GIF"), gif.classList.add("gif");

  gifContainer.replaceChildren();
  gifContainer.appendChild(gif);
}

const toggleUnits = document.querySelector(".toggle-units");
toggleUnits.addEventListener("click", () => {
  if (prevSearch === "") {
    return;
  }

  if (system === "imperial") {
    system = "metric";
  } else {
    system = "imperial";
  }

  location.value = prevSearch;
  locationForm.requestSubmit();
});
