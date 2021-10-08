console.log("======");

var searchButton = document.getElementById("search-button");
var weatherContainer = document.getElementById("weather-display");
var cityInput = document.getElementById("city");
var currentDate = moment();

function displayWeather() {
  var currentConditions = `https://api.openweathermap.org/data/2.5/weather?q=philadelphia&appid=c3b781a7de141c8e06094287b67539ce`;
  // var fiveDayForecast = 'api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}'
  // links to weather api's

  fetch(currentConditions)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
    //   console.log(data);
      console.log(data.name);
      console.log(currentDate.format("L"));
      console.log(data.weather[0].icon);
      var fahrenheit = Math.floor((data.main.temp - 273.15) * (9 / 5) + 32);
      console.log(fahrenheit);
      console.log(data.wind.speed);
      console.log(data.main.humidity);

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

          for (var i = 1; i < 6; i++) {
            // console.log(data);
            var date = new Date(data.daily[i].dt * 1000);
            console.log(date);
            console.log(data.daily[i].weather[0].icon)
            var dailyFahrenheit = Math.floor((data.daily[i].temp.day - 273.15) * (9 / 5) + 32);
            console.log(dailyFahrenheit)
            console.log(data.daily[i].wind_speed)
            console.log(data.daily[i].humidity)

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
