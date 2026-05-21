const apiKey = "9813dd15b88926d1ab1bffee549e418c";

function getWeatherEmoji(condition) {
  const c = condition.toLowerCase();
  if (c.includes("thunder")) return "⛈️";
  if (c.includes("drizzle")) return "🌦️";
  if (c.includes("rain")) return "🌧️";
  if (c.includes("snow")) return "❄️";
  if (c.includes("mist") || c.includes("fog") || c.includes("haze")) return "🌫️";
  if (c.includes("clear")) return "☀️";
  if (c.includes("few clouds")) return "🌤️";
  if (c.includes("scattered clouds")) return "⛅";
  if (c.includes("cloud")) return "☁️";
  return "🌡️";
}

function getWeather() {
  const city = document.getElementById("city").value.trim();
  const result = document.getElementById("result");

  if (city === "") {
    result.innerHTML = `<div class="error-msg">⚠️ Please enter a city name</div>`;
    return;
  }

  // Show loading
  result.innerHTML = `
    <div class="loading">
      <div class="spinner"></div>
      <p>Fetching weather...</p>
    </div>`;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      if (data.cod === "404") {
        result.innerHTML = `<div class="error-msg">❌ City not found. Try again.</div>`;
        return;
      }

      const emoji = getWeatherEmoji(data.weather[0].description);
      const feelsLike = Math.round(data.main.feels_like);
      const temp = Math.round(data.main.temp);

      result.innerHTML = `
        <div class="weather-content reveal">
          <div class="city-row">
            <div>
              <div class="city-name">${data.name}</div>
              <div class="country-badge">${data.sys.country}</div>
            </div>
          </div>

          <div class="temp-row">
            <div class="temp-big">${temp}</div>
            <div class="temp-unit">°C</div>
          </div>

          <div class="condition">
            <span class="weather-emoji">${emoji}</span>
            ${data.weather[0].description}
          </div>

          <div class="stats-grid">
            <div class="stat-item">
              <div class="stat-label">Feels Like</div>
              <div class="stat-value">${feelsLike}°C</div>
            </div>
            <div class="stat-item">
              <div class="stat-label">Humidity</div>
              <div class="stat-value">${data.main.humidity}%</div>
            </div>
            <div class="stat-item">
              <div class="stat-label">Wind Speed</div>
              <div class="stat-value">${data.wind.speed} m/s</div>
            </div>
            <div class="stat-item">
              <div class="stat-label">Pressure</div>
              <div class="stat-value">${data.main.pressure} hPa</div>
            </div>
          </div>
        </div>`;
    })
    .catch(() => {
      result.innerHTML = `<div class="error-msg">⚠️ Error fetching data. Check your connection.</div>`;
    });
}
