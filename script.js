const apiKey = "45854a247861e19489b7b198ce42d4e1";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q={city}&appid=${apiKey}`;

const searchbox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");


async function checkWeather(city){
    const response = await fetch(apiUrl.replace('{city}' , city));

    if(response.status == 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        var data = await response.json();

document.querySelector(".city").innerHTML = data.name;
document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
document.querySelector(".wind").innerHTML = data.wind.speed + "km/hr";

if(data.weather[0].main == "Clouds"){
weatherIcon.src ="images/clouds.png";
}
else if(data.weather[0].main == "Clear"){
weatherIcon.src = "images/clear.png";
}
else if(data.weather[0].main == "Rain"){
weatherIcon.src = "images/rain.png";
}
else if(data.weather[0].main == "Snow"){
weatherIcon.src = "images/snow.png";
}
else if(data.weather[0].main == "Mist"){
weatherIcon.src = "images/mist.png";
}
else {
weatherIcon.src = "images/drizzle.png";
}
document.querySelector(".weather").style.display = "block";
document.querySelector(".error").style.display = "none";


    }
   
}
searchbox.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        checkWeather(searchbox.value);
    }
});

searchBtn.addEventListener("click", ()=>{
    checkWeather(searchbox.value);
})
//  checkWeather('New York');

