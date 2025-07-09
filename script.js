const apiKey = "45854a247861e19489b7b198ce42d4e1";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q={city}&appid=${apiKey}`;

const searchbox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search-btn");
const weatherIcon = document.querySelector(".weather-icon");
const loadingElement = document.querySelector(".loading");
const errorElement = document.querySelector(".error");
const weatherElement = document.querySelector(".weather");


async function checkWeather(city){
    if (!city.trim()) {
        showError("Please enter a city name");
        return;
    }
    
    showLoading();
    
    const response = await fetch(apiUrl.replace('{city}' , city));

    if(response.status == 404){
        showError("City not found. Please try again.");
    } else {
        try {
            var data = await response.json();
            updateWeatherDisplay(data);
            showWeather();
        } catch (error) {
            showError("Failed to get weather data. Please try again.");
        }
    }
}

function updateWeatherDisplay(data) {
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = Math.round(data.wind.speed) + " km/h";
    
    // Update additional weather details
    document.querySelector(".feels-like").innerHTML = Math.round(data.main.feels_like) + "°C";
    document.querySelector(".visibility").innerHTML = data.visibility ? Math.round(data.visibility / 1000) + " km" : "N/A";
    document.querySelector(".weather-description").innerHTML = data.weather[0].description;

    // Update weather icon
    const weatherCondition = data.weather[0].main;
    switch(weatherCondition) {
        case "Clouds":
            weatherIcon.src = "images/clouds.png";
            break;
        case "Clear":
            weatherIcon.src = "images/clear.png";
            break;
        case "Rain":
            weatherIcon.src = "images/rain.png";
            break;
        case "Snow":
            weatherIcon.src = "images/snow.png";
            break;
        case "Mist":
        case "Haze":
        case "Fog":
            weatherIcon.src = "images/mist.png";
            break;
        case "Drizzle":
            weatherIcon.src = "images/drizzle.png";
            break;
        default:
            weatherIcon.src = "images/clear.png";
    }
}

function showLoading() {
    loadingElement.style.display = "block";
    errorElement.style.display = "none";
    weatherElement.style.display = "none";
}

function showError(message) {
    errorElement.querySelector("p").textContent = message;
    errorElement.style.display = "block";
    loadingElement.style.display = "none";
    weatherElement.style.display = "none";
}

function showWeather() {
    weatherElement.style.display = "block";
    loadingElement.style.display = "none";
    errorElement.style.display = "none";
}

// Event listeners
searchbox.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        checkWeather(searchbox.value);
    }
});

searchBtn.addEventListener("click", () => {
    checkWeather(searchbox.value);
});

// Clear input on focus for better UX
searchbox.addEventListener('focus', function() {
    this.select();
});

// Initialize with a default city (optional)
// checkWeather('New York');