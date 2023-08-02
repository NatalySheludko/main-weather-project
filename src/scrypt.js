function formatCurrentDate(dateTime) {
  let currentDate = new Date(dateTime);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = days[currentDate.getDay()];
  let currentHours = currentDate.getHours();
  if (currentHours < 10) {
    currentHours = `0${currentHours}`;
  }
  let currentMinutes = currentDate.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }
  let showFormatDate = document.querySelector(
    "#show-current-day-hours-minutes"
  );
  return `${currentDay} ${currentHours}:${currentMinutes}`;
}

function showCurrentWeather(response) {
  let currentTemperature = document.querySelector("#show-temperature");
  let currentCity = document.querySelector("#current-city");
  let currentDescription = document.querySelector("#current-description");
  let currentWind = document.querySelector("#current-wind");
  let currentHumidity = document.querySelector("#current-humidity");
  let currentFeelsTemperature = document.querySelector(
    "#show-feels-temperature"
  );
  let currentDate = document.querySelector("#current-date");
  let weatherIconUrl = `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`;
  let iconElement = document.getElementById("current-icon");

  currentTemperature.innerHTML = Math.round(response.data.temperature.current);
  currentCity.innerHTML = `Weather: ${response.data.city}`;
  currentDescription.innerHTML = response.data.condition.description;
  currentWind.innerHTML = Math.round(response.data.wind.speed);
  currentHumidity.innerHTML = response.data.temperature.humidity;
  currentFeelsTemperature.innerHTML = Math.round(
    response.data.temperature.feels_like
  );
  currentDate.innerHTML = formatCurrentDate(response.data.time * 1000);
  iconElement.innerHTML =
    "<img src='" + weatherIconUrl + "' alt='Weather Icon'>";
}

function search(currentCity) {
  let apiKey = "6fa3cb02fc6ct4bd31ab65905b1ado1a";
  let unit = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${currentCity}&key=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showCurrentWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let enterCityInput = document.querySelector("#search-city");
  search(enterCityInput.value);
}

let searchCity = document.querySelector("#enter-city");
searchCity.addEventListener("click", handleSubmit);
