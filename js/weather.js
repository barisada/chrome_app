const weatherDiv = document.querySelector(".weather");
const weatherSpan = document.querySelector(".weather span");
const API_KEY = "ff57cdf749904cc179888ae474f2a4d2";

function onGeoOk(position) {
  callWeatehrApi(position.coords.latitude, position.coords.longitude);
}
function onGeoError(e) {
  console.error("not allowed", e);
}

function callWeatehrApi(lat, lon) {
  const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  fetch(api)
    .then((response) => response.json())
    .then((data) => {
      const weatehrIconName = data.weather[0].icon;
      const weatherDesc = data.weather[0].description;
      const weatherImg = document.createElement("img");
      weatherImg.src = `https://openweathermap.org/img/wn/${weatehrIconName}.png`;
      weatherImg.alt = `${weatherDesc}`;
      weatherImg.title = `${weatherDesc}`;
      weatherDiv.appendChild(weatherImg);

      const city = data.name;
      const tempCurrent = data.main.temp;
      const tempMinMax = `${data.main.temp_min}/${data.main.temp_max}`;
      weatherSpan.innerText = `Current Temp : ${tempCurrent}, Min/Max : ${tempMinMax} @ ${city}`;
    });
}
navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
