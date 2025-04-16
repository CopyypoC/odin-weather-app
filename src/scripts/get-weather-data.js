const WEATHER_API_KEY = "4L8UCU9LFDTAE5TN7VUVVNURC";

async function getLocationWeather(location, system) {
  try {
    let response = {};
    if (system === "metric") {
      response = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${WEATHER_API_KEY}&unitGroup=metric`,
      );
    } else if (system === "imperial") {
      response = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${WEATHER_API_KEY}`,
      );
    }
    const json = await response.json();
    console.log(json);
    return json;
  } catch (err) {
    console.error(err);
    throw new Error("Must enter valid location.");
  }
}

function extractWeatherData(weatherRequest) {
  const weatherData = {
    resolvedAddress: weatherRequest.resolvedAddress,
    days: weatherRequest.days,
    currentConditions: weatherRequest.currentConditions,
  };

  return weatherData;
}

export async function getWeatherData(location, system) {
  const json = await getLocationWeather(location, system);
  return extractWeatherData(json);
}
