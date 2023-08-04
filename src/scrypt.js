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

  celsiusTemperature = response.data.temperature.current; //without 'let' becouse global specific variables
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

function fahrenheitTemperatureScale(event) {
  event.preventDefault();
  let fahrenheitTemperature = document.querySelector("#show-temperature");
  let fahrenheitDegreeFormula = (celsiusTemperature * 9) / 5 + 32;
  fahrenheitTemperature.innerHTML = Math.round(fahrenheitDegreeFormula);
  let fahrenheitTemperatureFeels = document.querySelector(
    "#show-feels-temperature"
  );
  let fahrenheitDegreeFormulaFeels = (celsiusTemperatureFeels * 9) / 5 + 32;
  fahrenheitTemperatureFeels.innerHTML = Math.round(
    fahrenheitDegreeFormulaFeels
  );
}

function celsiusTemperatureScale(event) {
  event.preventDefault();
  let celsiusTemperatureDegree = document.querySelector("#show-temperature");
  celsiusTemperatureDegree.innerHTML = Math.round(celsiusTemperature);
  let celsiusDegreeTemperatureFeels = document.querySelector(
    "#show-feels-temperature"
  );
  celsiusDegreeTemperatureFeels.innerHTML = Math.round(celsiusTemperatureFeels);
}

let celsiusTemperature = null;
let celsiusTemperatureFeels = null;

let searchCity = document.querySelector("#enter-city");
searchCity.addEventListener("click", handleSubmit);

let fahrenheitButton = document.querySelector("#link-fahrenheit"); //global specific variables create outside function
fahrenheitButton.addEventListener("click", fahrenheitTemperatureScale);

let celsiusButton = document.querySelector("#link-celsius");
celsiusButton.addEventListener("click", celsiusTemperatureScale);

let fahrenheitButtonFeels = document.querySelector("#link-fahrenheit-feels");
fahrenheitButtonFeels.addEventListener("click", fahrenheitTemperatureScale);

let celsiusButtonFeels = document.querySelector("#link-celsius-feels");
celsiusButtonFeels.addEventListener("click", celsiusTemperatureScale);
