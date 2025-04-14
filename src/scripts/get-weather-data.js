const WEATHER_API_KEY = "4L8UCU9LFDTAE5TN7VUVVNURC";

async function getLocationWeather(location) {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=${WEATHER_API_KEY}`,
    );
    const json = await response.json();
    return json;
  } catch (err) {
    console.error(err);
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
