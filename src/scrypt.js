let apiKey = "6fa3cb02fc6ct4bd31ab65905b1ado1a";
let currentCity = "Zaporizhzhia";
let unit = "metric";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${currentCity}&key=${apiKey}&units=${unit}`;

function formatCurrentDate() {
  let currentDate = new Date();
  //console.log(currentDate);
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
  //console.log(currentDay);
  let currentHours = currentDate.getHours();
  if (currentHours < 10) {
    currentHours = `0${currentHours}`;
  }
  //console.log(currentHours);
  let currentMinutes = currentDate.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }
  //console.log(currentMinutes);

  let showFormatDate = document.querySelector(
    "#show-current-day-hours-minutes"
  );
  showFormatDate.innerHTML = `${currentDay} ${currentHours}:${currentMinutes}`;
}
formatCurrentDate();