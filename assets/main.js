console.log("======");

var selectedCity = $("#selected-city");
var currentTemp = $("#current-temp");
var currentWind = $("#current-wind");
var currentHumid = $("#current-humid");
var currentUv = $("#current-uv");

var searchButton = document.getElementById("search-button");
var weatherContainer = document.getElementById("weather-display");
// var cityInput = document.getElementById("city");
// var cityInput = $('#city').val();
var currentDay = moment();

function displayWeather() {
  var currentConditions = `https://api.openweathermap.org/data/2.5/weather?q=philadelphia&appid=c3b781a7de141c8e06094287b67539ce`;
  // var fiveDayForecast = 'api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}'
  // links to weather api's

  fetch(currentConditions)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      console.log(data.name);
      var currentDate = currentDay.format("L");
      console.log(data.weather[0].icon);
      var fahrenheit = Math.floor((data.main.temp - 273.15) * (9 / 5) + 32);

      selectedCity.text(`${data.name} (${currentDate}) ${data.weather[0].icon}`);
      currentTemp.text(`Temp: ${fahrenheit}° F`);
      currentWind.text(`Wind: ${data.wind.speed} MPH`);
      currentHumid.text(`Humidity: ${data.main.humidity} %`);

      var lat = data.coord.lat;
      var lon = data.coord.lon;
      var uvIndex = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=c3b781a7de141c8e06094287b67539ce`;

      fetch(uvIndex)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          //   console.log(data);
          console.log(data.current.uvi);
          currentUv.text(`UV Index: ${data.current.uvi}`);

          for (var i = 1; i < 6; i++) {
            // console.log(data);
            var date5 = $("#date-" + i);
            var icon5 = $("#icon-" + i);
            var temp5 = $("#temp-" + i);
            var wind5 = $("#wind-" + i);
            var humid5 = $("#humid-" + i);
            var date = new Date(data.daily[i].dt * 1000);
            var dailyFahrenheit = Math.floor(
              (data.daily[i].temp.day - 273.15) * (9 / 5) + 32
            );

            date5.text(date);
            icon5.text(data.daily[i].weather[0].icon);
            temp5.text(`Temp: ${dailyFahrenheit}° F`);
            wind5.text(`Wind: ${data.daily[i].wind_speed} MPH`);
            humid5.text(`Humidity: ${data.daily[i].humidity} %`);
          }
          //closes for loop
        });
      //closes 2nd .then(function
    });
  //closes 1st .then(function
}
//closes displayweather function

displayWeather();

// Events needed for

// searchButton.on('click', displayWeather);

// when search bar is clicked/submitted
// will display current forecast and 5 day forecast

// TheCityUserClicksOn.on('click', displayWeather)

// when previously search city is clicked
// will display current forecast and 5 day forecast
