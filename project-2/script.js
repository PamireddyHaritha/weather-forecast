const temp = document.getElementById("temp");
date = document.getElementById("date-time")

let currentCity ="";
let currentUnit ="f";
let hourlyorWeek = "Week";

function getDateTime() {
    let now = new Date(),
    hour = now.getHours(),
    minute = now.getMinutes();

    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Fryday",
        "Saturday",
    ];
    hour = hour % 12;
    if(hour < 10) {
        hour = "0" + minute;
    }
    if(minute <10) {
        minute = "0" + minute;
    }

    let datString = days[now.getDay()];
    return`${dayString}, ${hour}:${minute}`;
}

date.innerText = getDateTime();
// update time every second
setInterval(() => {
    date.innerText = getDateTime();
}, 1000);

// fun to get public ip with fetch
function getPublicIp() {
    fetch("https://geolocation-db.com/json/", {
        method: "GET",
    })
    .then((response) => response.json())
    .then((date) => {
        console.log(data);
        currentCity = data.currentCity;
        getWeatherData(data.city, currentUnit, hourlyorWeek);
    });
}
getPublicIp();

// function to get weather data

function getWeatherData (city, unit, hourlyorWeek) {
    const apiKey = "S4XXLCPPG48HXA722PZHXWBZ6";
    fetch(
        `https://weather.visualcrossing.com/visualcrossingWebServices/rest/services/timeline/$%7Bcity%7D?unitGroup=metric&key=EJ6UBL2JEQGYB3AA4ENASN62J&contentType=json`,
        {
            method: "GET",
        }
    )
    .then((response) => response.json())
    .then((data) => {
        let today = data.currentConditions;
        if(unit == "c") {
            temp.innerText = today.temp;
        } else {
            temp.innerText == celciusToFahrenheit(today.temp);
        }
    });
}

// convert celcius to fahrenheit
function celciusToFahrenheit(temp) {
    return ((temp*9)/5+ 32).toFixed(1);
}
