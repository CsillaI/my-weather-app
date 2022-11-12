//Update Date in real time
let today = new Date();
console.log(today);

let day = today.getDay();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentDay = days[today.getDay()];

let mm = today.getMonth();
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

let currentMonth = months[today.getMonth()];

let dd = today.getDate();
let yyyy = today.getFullYear();

let hours = today.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = today.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let seconds = today.getSeconds();
if (seconds < 10) {
  seconds = `0${seconds}`;
}

//Modifying HTML for current day/time/date:
let dayOfTheWeekRealTime = document.querySelector("#current-day");
dayOfTheWeekRealTime.innerHTML = currentDay;

let currentDate = `, ${currentMonth} ${dd}`;
let currentDateRealTime = document.querySelector("#current-date");
currentDateRealTime.innerHTML = currentDate;

let currentTime = `${hours}:${minutes}`;
let currentTimeRealTime = document.querySelector("#current-time");
currentTimeRealTime.innerHTML = currentTime;

//Temperature Convertor:
function showFahrenheit(event) {
  event.preventDefault();
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  let fahrenheitTemperature = Math.round((celsiusTemperature * 9) / 5 + 32);
  document.querySelector("#temperature-main").innerHTML = fahrenheitTemperature;
}

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", showFahrenheit);

function showCelsius(event) {
  event.preventDefault();
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
  document.querySelector("#temperature-main").innerHTML =
    Math.round(celsiusTemperature);
}

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", showCelsius);

let celsiusTemperature = null;

//Search Engine

function showWeather(response) {
  console.log(response);
  celsiusTemperature = response.data.temperature.current;

  document.querySelector("#temperature-main").innerHTML =
    Math.round(celsiusTemperature);

  document.querySelector("#weather-description").innerHTML =
    response.data.condition.description;

  document.querySelector("#feels-like-main").innerHTML = `${Math.round(
    response.data.temperature.feels_like
  )}&degC`;

  document.querySelector("#wind-main").innerHTML = `${Math.round(
    response.data.wind.speed
  )} km/h`;

  document.querySelector(
    "#humidity-main"
  ).innerHTML = `${response.data.temperature.humidity}%`;

  document.querySelector("#city").innerHTML = response.data.city;

  document
    .querySelector("#main-weather-icon")
    .setAttribute(
      "src",
      `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
    );
}

function search(city) {
  let apiKey = "646809et7a8c3ba7374obd5ce9af7bc0";
  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city-input").value;
  search(city);
}

let searchCity = document.querySelector("#search-city");
searchCity.addEventListener("submit", handleSubmit);

//Current Button

function showWeatherInCurrentLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "646809et7a8c3ba7374obd5ce9af7bc0";
  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${longitude}&lat=${latitude}&key=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showWeather);
}

function getMyLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showWeatherInCurrentLocation);
}

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getMyLocation);

search("Cancun");
