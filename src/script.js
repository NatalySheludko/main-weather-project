function formatCurrentDate() {
  const currentDate = new Date();
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const currentDay = days[currentDate.getDay()];
  const currentHours = currentDate.getHours();
  if (currentHours < 10) {
    currentHours = `0${currentHours}`;
  }
  const currentMinutes = currentDate.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }
  const showFormatDate = document.querySelector(
    "#show-current-day-hours-minutes"
  );
  return `${currentDay} ${currentHours}:${currentMinutes}`;
}

function formatDay(timestap) {
  const date = new Date(timestap * 1000);
  const day = date.getDay();
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return days[day];
}

function displayForecast(response) {
  const forecast = response.data.daily;
  const forecastElement = document.querySelector("#weather-forecast-list");
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
  const apiKey = "6fa3cb02fc6ct4bd31ab65905b1ado1a";
  const unit = "metric";
  const apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayForecast);
}

function showCurrentWeather(response) {
  const currentTemperature = document.querySelector("#show-temperature");
  const currentCity = document.querySelector("#current-city");
  const currentDescription = document.querySelector("#current-description");
  const currentWind = document.querySelector("#current-wind");

  const currentHumidity = document.querySelector("#current-humidity");
  const currentFeelsTemperature = document.querySelector(
    "#show-feels-temperature"
  );
  const currentDate = document.querySelector("#current-date");
  const weatherIconUrl = `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`;
  const iconElement = document.getElementById("current-icon");

  celsiusTemperature = response.data.temperature.current;
  celsiusTemperatureFeels = response.data.temperature.feels_like;
  currentTemperature.innerHTML = Math.round(celsiusTemperature);
  currentCity.innerHTML = response.data.city;
  currentDescription.innerHTML = response.data.condition.description;
  currentWind.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/h`;

  currentHumidity.innerHTML = `Humidity: ${response.data.temperature.humidity}%`;
  currentFeelsTemperature.innerHTML = Math.round(celsiusTemperatureFeels);
  currentDate.innerHTML = formatCurrentDate();
  iconElement.innerHTML =
    "<img src='" + weatherIconUrl + "' alt='Weather Icon'>";

  getForecast(response.data.coordinates);
}

let celsiusTemperature = null;
let celsiusTemperatureFeels = null;

const DEFAULT_CITY = "Kyiv";

function search(currentCity) {
  const apiKey = "6fa3cb02fc6ct4bd31ab65905b1ado1a";
  const unit = "metric";
  const apiUrl = `https://api.shecodes.io/weather/v1/current?query=${currentCity}&key=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showCurrentWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  const enterCityInput = document.querySelector("#search-city");
  search(enterCityInput.value);
}

/*function findCurrentPosition(position) {
  const apiKey = "6fa3cb02fc6ct4bd31ab65905b1ado1a";
  const unit = "metric";
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const apiUrl = `https://api.shecodes.io/weather/v1/current?lat=${lat}&lon=${lon}&key=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showCurrentWeather);
}
navigator.geolocation.getCurrentPosition(findCurrentPosition);
*/

function fahrenheitTemperatureScale(event) {
  event.preventDefault();
  const fahrenheitTemperature = document.querySelector("#show-temperature");
  const fahrenheitDegreeFormula = (celsiusTemperature * 9) / 5 + 32;
  fahrenheitTemperature.innerHTML = Math.round(fahrenheitDegreeFormula);
  const fahrenheitTemperatureFeels = document.querySelector(
    "#show-feels-temperature"
  );
  const fahrenheitDegreeFormulaFeels = (celsiusTemperatureFeels * 9) / 5 + 32;
  fahrenheitTemperatureFeels.innerHTML = Math.round(
    fahrenheitDegreeFormulaFeels
  );
}

function celsiusTemperatureScale(event) {
  event.preventDefault();
  const celsiusTemperatureDegree = document.querySelector("#show-temperature");
  celsiusTemperatureDegree.innerHTML = Math.round(celsiusTemperature);
  const celsiusDegreeTemperatureFeels = document.querySelector(
    "#show-feels-temperature"
  );
  celsiusDegreeTemperatureFeels.innerHTML = Math.round(celsiusTemperatureFeels);
}

const searchCity = document.querySelector("#enter-city");
searchCity.addEventListener("click", handleSubmit);

const fahrenheitButton = document.querySelector("#link-fahrenheit");
fahrenheitButton.addEventListener("click", fahrenheitTemperatureScale);

const celsiusButton = document.querySelector("#link-celsius");
celsiusButton.addEventListener("click", celsiusTemperatureScale);

search(DEFAULT_CITY);
