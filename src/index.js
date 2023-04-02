function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
                <div class="col-2">
                  <div class="weather-forecast-day">${formatDay(
                    forecastDay.time
                  )}</div>
                  <img
                    src="https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
                      forecastDay.condition.icon
                    }.png"
                    alt="weather icon"
                    id="forecast-icon"
                    width="40" />
                  <div class="weather-forecast-temp">
                    <span class="forecast-max-temp">${Math.round(
                      forecastDay.temperature.maximum
                    )}</span>°
                    <span class="forecast-min-temp">${Math.round(
                      forecastDay.temperature.minimum
                    )}</span>°
                  </div>
                </div>
              
            `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(city) {
  let key = "6b4f0f84o6274ffd76c87903428ea4t0";
  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${key}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}
function handleCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
}
console.log(city);
function displayWeather(response) {
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;
  let temperatureElement = document.querySelector("#currentTemp");
  celsiusTemp = response.data.temperature.current;
  temperatureElement.innerHTML = Math.round(celsiusTemp);
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.condition.description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = Math.round(response.data.temperature.humidity);
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.time * 1000);
  let iconElement = document.querySelector("#today-icon");
  iconElement.setAttribute(
    "src",
    `https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  iconElement.setAttribute("alt", response.data.condition.description);
  getForecast(response.data.city);
}

function search(city) {
  let key = "6b4f0f84o6274ffd76c87903428ea4t0";
  let units = "metric";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${key}&units=${units}`;

  axios.get(apiUrl).then(displayWeather);
}
function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}
function showPosition(position) {
  let key = "6b4f0f84o6274ffd76c87903428ea4t0";
  let units = "metric";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lat=${lat}&lon=${lon}&key=${key}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
}
function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
let submitCurrentLocation = document.querySelector("#currentButton");
submitCurrentLocation.addEventListener("click", currentLocation);

let celsiusTemp = null;

let form = document.querySelector("#searchForm");
form.addEventListener("submit", handleSubmit);

function displayCelsiusTemp(event) {
  event.preventDefault();
  fahrenheitlink.classList.remove("active");
  celsiuslink.classList.add("active");
  let temperatureElement = document.querySelector("#currentTemp");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
}
function displayFahrenheitTemp(event) {
  event.preventDefault();
  fahrenheitlink.classList.add("active");
  celsiuslink.classList.remove("active");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#currentTemp");
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}
let fahrenheitlink = document.querySelector("#fahrenheit-link");
fahrenheitlink.addEventListener("click", displayFahrenheitTemp);
let celsiuslink = document.querySelector("#celsius-link");
celsiuslink.addEventListener("click", displayCelsiusTemp);

search("Berlin");
getForecast("Berlin");
