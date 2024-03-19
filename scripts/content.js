document.addEventListener("DOMContentLoaded", function (){
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://api.weatherbit.io/v2.0/current?key=6d4df29c7c614fe4adb713c5fe966249&lat=48.971731&lon=19.584162", true);
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200){
                var jsonResponse = JSON.parse(this.responseText);
                handleResponse(jsonResponse);
            }else {
                console.error("HTTP error:", this.status);
                var errMessageElement = document.createElement("div");
                errMessageElement.textContent = "skontroluj pripojenie";
                document.body.appendChild(errMessageElement);
            }
        }
    };
    xhttp.send();
});

function handleResponse(response) {
    appendInfoElement("Datum posledneho merania: ", response.data[0].ob_time);
    appendInfoElement("Teplota: ", parseInt(response.data[0].temp) + "°C");
    appendInfoElement("Rychlost vetra: ", response.data[0].wind_spd.toFixed(2) + "m/s");

    var WeatherIcon = document.createElement("img");
    WeatherIcon.src = "https://cdn.weatherbit.io/static/img/icons/" + response.data[0].weather.icon + ".png";
    document.body.appendChild(WeatherIcon);
}

function appendInfoElement(label, value) {
    var element = document.createElement("div");
    element.classList.add("info-element");
    element.textContent = label + value
    document.body.appendChild(element);
}
