function showTemperature(response) {
  let citys = document.querySelector("#city");
  citys.innerHTML = response.data.name;
  let descriptions = document.querySelector("#descrip");
  descriptions.innerHTML = response.data.weather[0].description;
  let temeratureResult = document.querySelector("#temp");
  temeratureResult.innerHTML = Math.round(response.data.main.temp);
  let humidity = document.querySelector("#hum");
  humidity.innerHTML = response.data.main.humidity;
  let realFeel = document.querySelector("#feel");
  realFeel.innerHTML = Math.round(response.data.main.feels_like);
  let wind = document.querySelector("#winds");
  wind.innerHTML = Math.round(response.data.wind.speed);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  celsiusTemperature = response.data.main.temp;
}
function onLoadSearch(city) {
  let apiKey = "2a616ebfe6301993b4a745aa00dd9a26";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
function typeCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-city-input");
  let citys = document.querySelector("#city");
  citys.innerHTML = `${searchInput.value}`;
  let apiKey = "2a616ebfe6301993b4a745aa00dd9a26";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
let form = document.querySelector("#search-city");
form.addEventListener("submit", typeCity);

function currentTempInfo(event) {
  function showResult(response) {
    let citys = document.querySelector("#city");
    citys.innerHTML = response.data.name;
    let currentTemp = Math.round(response.data.main.temp);
    let tempDisplay = document.querySelector("#temp");
    tempDisplay.innerHTML = currentTemp;
    let descriptions = document.querySelector("#descrip");
    descriptions.innerHTML = response.data.weather[0].description;
    let humidity = document.querySelector("#hum");
    humidity.innerHTML = response.data.main.humidity;
    let realFeel = document.querySelector("#feel");
    realFeel.innerHTML = Math.round(response.data.main.feels_like);
    let wind = document.querySelector("#winds");
    wind.innerHTML = Math.round(response.data.wind.speed);
  }
  function retrievePosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiKey = "2a616ebfe6301993b4a745aa00dd9a26";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showResult);
  }

  navigator.geolocation.getCurrentPosition(retrievePosition);
}
onLoadSearch("Nigeria");
let current = document.querySelector("#rent");
current.addEventListener("click", currentTempInfo);

function showTemperatureInFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");
  let FahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(FahrenheitTemperature);
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

function showTemperatureInCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}
celsiusTemperature = null;
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showTemperatureInCelsius);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showTemperatureInFahrenheit);

let currentTime = new Date();
function toDaysDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let currentYear = date.getFullYear();
  let currentDay = days[date.getDay()];
  let currentMonth = months[date.getMonth()];
  let currentDate = date.getDate();
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let currentSeconds = date.getSeconds();

  let toDaysDate = `${currentDay}, ${currentMonth}, ${currentDate},${currentYear},     ${hours}:${minutes}:${currentSeconds}`;

  return toDaysDate;
}
let h6 = document.querySelector("h6");
h6.innerHTML = `${toDaysDate(currentTime)}`;

function displayForecast() {
  let forecastElement = document.querySelector("#weather-forecast");
  let forecastHTML = `<ul class="list-group list-group-flush">`;
  let days = ["Thursday", "Friday", "Saturday", "Sunday", "Monday"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      ` <li class="list-group-item" id="forecast">
                <span class="weather-forecast-date">${day} </span>
                <img src="icon.png" alt="" width="30px" />
                <span class="warp">
                <span class="weather-forecast-temp-max">18°</span>
                <span class="weather-forecast-temp-min">12°</span>
                </span>
              </li>
            `;
  });

  forecastHTML = forecastHTML + `</ul>`;
  forecastElement.innerHTML = forecastHTML;
}
displayForecast();
