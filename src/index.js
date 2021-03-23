/*let weather = [
  {
    cities: "Paris",
    temp: 19.7,
    humidity: 80,
  },
  {
    cities: "Tokyo",
    temp: 17.3,
    humidity: 50,
  },
  {
    cities: "Lisbon",
    temp: 30.2,
    humidity: 20,
  },
  {
    cities: "San Francisco",
    temp: 20.9,
    humidity: 100,
  },
  {
    cities: "Moscow",
    temp: -5,
    humidity: 20,
  },
];
*/

let now = new Date();

function formatDate(currentTime) {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let date = currentTime.getDate();
  let day = days[currentTime.getDay()];
  let year = currentTime.getFullYear();
  let month = months[currentTime.getMonth()];
  let hour = currentTime.getHours();
  let minute = currentTime.getMinutes();
  let displayDate = `${day}, ${date} ${month} ${year}, ${hour}:${minute}`;

  return displayDate;
}

let timeDateNow = document.querySelector(".day-date-time");
timeDateNow.innerHTML = formatDate(now);

//

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp-now");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

function convertToCelcius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp-now");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round(((temperature - 32) * 5) / 9);
}

let celciusLink = document.querySelector("#celcius-link");
celciusLink.addEventListener("click", convertToCelcius);

//

function showWeatherCondition(response) {
  console.log(response.data);

  document.querySelector(".city").innerHTML = response.data.name;
  document.querySelector("#temp-now").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].main;
}

function searchCity(city) {
  let apiKey = "3535582e190a7084b5cf1cb8af8b7750";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showWeatherCondition);
}

function handleClick(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

let searchButton = document.querySelector(".btn-primary");
searchButton.addEventListener("click", handleClick);

searchCity("San Francisco");

//

function searchCurrentPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "3535582e190a7084b5cf1cb8af8b7750";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCurrentPosition);
}

let currentButton = document.querySelector(".btn-success");
currentButton.addEventListener("click", getCurrentLocation);

/*
function searchLocation(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

*/
