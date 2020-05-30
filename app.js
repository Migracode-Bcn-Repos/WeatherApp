const apiKey = "416e0f0dd8c8e9042517b54f30bf565c";
const notification = document.getElementsByClassName("notification")[0];

(function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }
})();

function onError(error) {
  console.error("No no no ", error);
  displayError(error);
}

function displayError(error) {
  const p = document.createElement("p");
  p.innerHTML = error.message;
  notification.style.display = "block";
  notification.appendChild(p);
}

function onSuccess(position) {
  const { latitude, longitude } = position.coords;
  get(latitude, longitude, displayWeather, displayError);
}

async function get(latitude, longitude, onSuccess, onError) {
  return await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
  )
    .then((response) => response.json())
    .then(onSuccess)
    .catch(onError);
}

function displayWeather(weatherInfo) {
  const temperatureValue = selectParagraphIn(".temperature-value");
  const temperatureDescription = selectParagraphIn(".temperature-description");
  const appTitle = selectParagraphIn(".app-title");
  const location = selectParagraphIn(".location");

  temperatureValue.innerText =
    kelvinToCelsius(weatherInfo.main.temp).toFixed(1) +
    temperatureValue.innerText.slice(1);
  temperatureDescription.innerText = weatherInfo.weather[0].main;
  appTitle.innerText = location.innerText = weatherInfo.name;
}

function selectParagraphIn(query) {
  return document.querySelector(query).querySelector("p");
}

function kelvinToCelsius(temp) {
  return temp - 273.15;
}
