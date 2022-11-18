//Date & Time

function formatDay(timestamp) {
  let today = new Date(timestamp * 1000);

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
  return days[day];
}

function formatDate(timestamp) {
  let today = new Date(timestamp * 1000);

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

  let dd = today.getDate();

  return "," + " " + months[mm] + " " + dd;
}

function formatTime(timestamp) {
  let today = new Date(timestamp * 1000);

  let hours = today.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = today.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return hours + ":" + minutes;
}

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

  document.querySelector("#current-day").innerHTML = formatDay(
    response.data.time
  );

  document.querySelector("#current-date").innerHTML = formatDate(
    response.data.time
  );

  document.querySelector("#current-time").innerHTML = formatTime(
    response.data.time
  );

  document
    .querySelector("#main-weather-icon")
    .setAttribute(
      "src",
      `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
    );

  getForecast(response.data.coordinates);
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

//Daily Forecast

function formatForecastDay(timestamp) {
  let today = new Date(timestamp * 1000);

  let day = today.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function formatForecastDate(timestamp) {
  let today = new Date(timestamp * 1000);

  let date = today.getDate();
  let month = today.getMonth();
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
  return months[month] + " " + date;
}

function showForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#weather-forecast");

  let forecastHTML = `<div class="row forecast-wrapper">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `        
              <div class="card text-center first" style="width: 9rem">
                <div class="card-body">
                  <h5 class="card-title">${formatForecastDay(
                    forecastDay.time
                  )}</h5>
                  <div class="card-text">
                    <div class="date">${formatForecastDate(
                      forecastDay.time
                    )}</div>
                    <img
                      src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
                        forecastDay.condition.icon
                      }.png"
                      alt="cloudy icon"
                    />
                    <div class="temperature">
                      <span class="max-temp">${Math.round(
                        forecastDay.temperature.maximum
                      )}&deg;</span>
                      <span class="temperature-separator">/</span>
                      <span class="min-temp">${Math.round(
                        forecastDay.temperature.minimum
                      )}&deg;</span>
                    </div>
                  </div>
                </div>
              </div>
            `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "646809et7a8c3ba7374obd5ce9af7bc0";
  let lon = coordinates.longitude;
  let lat = coordinates.latitude;
  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lat=${lat}&lon=${lon}&key=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showForecast);
}

search("Cluj-Napoca");
