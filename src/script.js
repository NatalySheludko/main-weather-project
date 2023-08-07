function formatCurrentDate() {
  let currentDate = new Date();
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

function formatDay(timestap) {
  let date = new Date(timestap * 1000);
  let day = date.getDay();
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#weather-forecast-list");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay) {
    forecastHTML =
      forecastHTML +
      `
    <div class="col">
      <div class="weekdays-forecast">${formatDay(forecastDay.time)}</div>
     <img
        src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
          forecastDay.condition.icon
        }.png"
        width="60"
      />
      <div>
        <span class="temperature-forecast-day">${Math.round(
          forecastDay.temperature.maximum
        )}°</span>
        <span class="temperature-forecast-night">${Math.round(
          forecastDay.temperature.minimum
        )}°</span>
      </div>
    </div>
  `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "6fa3cb02fc6ct4bd31ab65905b1ado1a";
  unit = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayForecast);
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
  currentCity.innerHTML = response.data.city;
  currentDescription.innerHTML = response.data.condition.description;
  currentWind.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/h`;

  currentHumidity.innerHTML = `Humidity: ${response.data.temperature.humidity}%`;
  currentFeelsTemperature.innerHTML = `${Math.round(
    response.data.temperature.feels_like
  )}°`;
  currentDate.innerHTML = formatCurrentDate();
  iconElement.innerHTML =
    "<img src='" + weatherIconUrl + "' alt='Weather Icon'>";

  getForecast(response.data.coordinates);
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

function findCurrentPosition(position) {
  let apiKey = "6fa3cb02fc6ct4bd31ab65905b1ado1a";
  let unit = "metric";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lat=${lat}&lon=${lon}&key=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showCurrentWeather);
}
navigator.geolocation.getCurrentPosition(findCurrentPosition);

let searchCity = document.querySelector("#enter-city");
searchCity.addEventListener("click", handleSubmit);
