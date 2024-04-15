const apiKey = 'ef1294eeef3865a952258ab01e350f8b';

const submitBtn = document.getElementById('submitBtn');
const cityInput = document.getElementById('cityInput');
const weatherInfo = document.getElementById('weatherInfo');

submitBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city !== '') {
        fetchWeather(city);
    } else {
        alert('Please enter a city name');
    }
});

function fetchWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            alert(error.message);
        });
}

function displayWeather(data) {
    const temperature = data.main.temp;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const weatherDescription = data.weather[0].description;

    weatherInfo.innerHTML = `
        <p>Temperature: ${temperature}°C</p>
        <p>Humidity: ${humidity}%</p>
        <p>Wind Speed: ${windSpeed} m/s</p>
        <p>Weather: ${weatherDescription}</p>
    `;
}
