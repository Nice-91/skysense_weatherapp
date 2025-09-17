document.getElementById("cityInput").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    getWeather();
  }
});

async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();

  if (!city) {
    document.getElementById("weatherBox").innerHTML = `<p>Please enter a city name.</p>`;
    return;
  }

  const apiKey = "890477088ec7eb7494a847d7435c5693";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);

    if (response.status !== 200) {
      document.getElementById("weatherBox").innerHTML = `<p>City not found!</p>`;
      return;
    }

    const data = await response.json();

    const template = document.getElementById("weatherTemplate");
    const clone = template.content.cloneNode(true);

    clone.querySelector(".city-name").textContent = data.name;
    clone.querySelector(".weather-icon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    clone.querySelector(".weather-icon").alt = data.weather[0].description;
    clone.querySelector(".temp").textContent = `${data.main.temp} °C`;
    clone.querySelector(".desc").textContent = data.weather[0].description;

    clone.querySelector(".pressure").textContent = `${data.main.pressure} hPa`;
    clone.querySelector(".humidity").textContent = `${data.main.humidity}%`;
    clone.querySelector(".wind").textContent = `${data.wind.speed} m/s`;

    const weatherBox = document.getElementById("weatherBox");
    weatherBox.innerHTML = "";
    weatherBox.appendChild(clone);

  } catch (error) {
    console.error("Fetch error:", error);
    document.getElementById("weatherBox").innerHTML = `<p>Error fetching weather data.</p>`;
  }
}
