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

let currentDate = `Date: ${currentMonth}/${dd}/${yyyy}`;
let currentDateRealTime = document.querySelector("#current-date");
currentDateRealTime.innerHTML = currentDate;

let currentTime = `Time: ${hours}:${minutes}:${seconds}`;
let currentTimeRealTime = document.querySelector("#current-time");
currentTimeRealTime.innerHTML = currentTime;

//Temperature Convertor:
function showFahrenheit() {
  document.querySelector("#temperature").innerHTML = `77`;
}

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", showFahrenheit);

function showCelsius() {
  document.querySelector("#temperature").innerHTML = `25`;
}

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", showCelsius);

//Search Engine

function showWeather(response) {
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;

  document.querySelector("#wind-main").innerHTML = `Wind: ${Math.round(
    response.data.wind.speed
  )} Km/h`;

  document.querySelector(
    "#humidity-main"
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;

  document.querySelector("#city").innerHTML = response.data.name;
}

function search(city) {
  let apiKey = "26c3b9ca117cfb48cae7b8b5045e0b6e";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city-input").value;
  search(city);
}

let searchCity = document.querySelector("#search-city");
searchCity.addEventListener("submit", handleSubmit);

function showCurrentLocation(response) {
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;
  
  //document.querySelector("#feels-like-main").innerHTML = `Feels like: ${Math.round(response.data.main.feels_like)}&degC`;
   //needs work 
  document.querySelector("#wind-main").innerHTML = `Wind: ${Math.round(
    response.data.wind.speed
  )} Km/h`;

  document.querySelector(
    "#humidity-main"
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;

  document.querySelector("#city").innerHTML = response.data.name;
}

//Current Button

function showWeatherInCurrentLocation(position) {
  let latitude = position.coords.latitude;
  console.log(latitude);
  let longitude = position.coords.longitude;
  let apiKey = "40ebc0b50ce65146caa1b8728b0cb36d";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showWeather);
}

function getMyLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showWeatherInCurrentLocation);
}

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getMyLocation);

search("New York");
