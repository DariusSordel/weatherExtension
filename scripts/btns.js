document.getElementById("button1").addEventListener("click", function() {
    setActive("button1");
    fetchWeather('lat=48.943832&lon=19.590152');
});
document.getElementById("button2").addEventListener("click", function() {
    setActive("button2");
    fetchWeather('lat=48.954249&lon=19.589139');
});
document.getElementById("button3").addEventListener("click", function() {
    setActive("button3");
    fetchWeather('lat=48.970230&lon=19.583319');
});
function setActive(clickedButton) {
    const btns = document.querySelectorAll(".active");
    btns.forEach(function (btn) {
        btn.classList.remove("active");
    })
    document.getElementById(clickedButton).classList.add("active");
}