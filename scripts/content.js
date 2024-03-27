// document.addEventListener("DOMContentLoaded", function (){
//     const xhttp = new XMLHttpRequest();
//     xhttp.open("GET", "https://api.weatherbit.io/v2.0/current?key=6d4df29c7c614fe4adb713c5fe966249&lat=48.943973&lon=19.590072", true);
//     xhttp.onreadystatechange = function () {
//         if (this.readyState == 4) {
//             if (this.status == 200){
//                 var jsonResponse = JSON.parse(this.responseText);
//                 handleResponse(jsonResponse);
//             }else {
//                 console.error("HTTP error:", this.status);
//                 var errMessageElement = document.createElement("div");
//                 errMessageElement.textContent = "skontroluj pripojenie";
//                 errMessageElement.classList.add("error-element");
//                 document.body.appendChild(errMessageElement);
//             }
//         }
//     };
//     xhttp.send();
// });
document.addEventListener("DOMContentLoaded", function () {
    fetchWeather("lat=48.943832&lon=19.590152");
    var firstActive = document.getElementById("button1");
    firstActive.classList.add("active");
})
function fetchWeather(location) {
    var Url = buildUrlForLocation(location);
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", Url, true);
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                var jsonResponse = JSON.parse(this.responseText);
                handleResponse(jsonResponse);
            } else {
                console.error("HTTP error:", this.status);
                var errMessageElement = document.createElement("div");
                errMessageElement.textContent = "skontroluj pripojenie";
                errMessageElement.classList.add("error-element");
                document.body.appendChild(errMessageElement);
            }
        }
    };
    xhttp.send();
}

function buildUrlForLocation(location) {
    return "https://api.weatherbit.io/v2.0/current?key=6d4df29c7c614fe4adb713c5fe966249&" + location;
}

function handleResponse(response) {
    appendInfoElement("Datum posledneho merania: ", response.data[0].ob_time);
    appendInfoElement("Teplota: ", parseInt(response.data[0].temp) + "°C");
    appendInfoElement("Rychlost vetra: ", response.data[0].wind_spd.toFixed(2) + "m/s");

    appendWeatherIcon(response);
}

function appendInfoElement(label, value) {
    var existingElement = document.querySelector(".info-element[data-label='" + label + "']");
    if (existingElement) {
        existingElement.textContent = label + value;
    } else {
        var element = document.createElement("div");
        element.classList.add("info-element");
        element.textContent = label + value;
        element.setAttribute("data-label", label);
        document.body.appendChild(element);
    }
}

function appendWeatherIcon(response) {
    var existingIcon = document.querySelector(".weather-icon");
    if (existingIcon) {
        existingIcon.src = "https://cdn.weatherbit.io/static/img/icons/" + response.data[0].weather.icon + ".png";
    } else {
        var WeatherIcon = document.createElement("img");
        WeatherIcon.src = "https://cdn.weatherbit.io/static/img/icons/" + response.data[0].weather.icon + ".png";
        WeatherIcon.classList.add("weather-icon");
        document.body.appendChild(WeatherIcon);
    }
}
