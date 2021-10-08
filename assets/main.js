console.log("======");

var selectedCity = $("#selected-city");
var currentTemp = $("#current-temp");
var currentWind = $("#current-wind");
var currentHumid = $("#current-humid");
var currentUv = $("#current-uv");
var weatherContainer = $('.weather-container');
var searchButton = $('#search-button');
var listOfCities =$('.city-searched');
// var weatherContainer = document.getElementById("weather-display");

var currentDay = moment();

function initial() {
  weatherContainer.attr("style", "display: none")

searchButton.on('click', function(){
  displayWeather();
  weatherContainer.attr("style", "display: block")

  var li = $('<li>');
    // li.attr("data-index", i);
    listOfCities.append(li);
    var cityInput = $('#city').val();
    console.log(typeof cityInput)
    li.text(cityInput.toUpperCase());
});
}

function displayWeather() {
  var cityInput = $('#city').val();
  console.log(cityInput)
  var currentConditions = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=imperial&appid=5b787b122cd0fc16a703d189885623e5`;
  // var fiveDayForecast = 'api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}'
  // links to weather api's

  fetch(currentConditions)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var currentDate = currentDay.format("L");
      var iconcode = data.weather[0].icon;
      var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
      $('#wicon').attr('src', iconurl);

      selectedCity.text(`${data.name} (${currentDate})`);
      currentTemp.text(`Temp: ${data.main.temp}° F`);
      currentWind.text(`Wind: ${data.wind.speed} MPH`);
      currentHumid.text(`Humidity: ${data.main.humidity} %`);

      var lat = data.coord.lat;
      var lon = data.coord.lon;
      var uvIndex = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=5b787b122cd0fc16a703d189885623e5`;

      fetch(uvIndex)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
            console.log(data);
          console.log(data.current.uvi);
          currentUv.text(`UV Index: ${data.current.uvi}`);

          for (var i = 1; i < 6; i++) {
            // console.log(data);
            var date5 = $("#date-" + i);
            var icon5 = $("#icon-" + i);
            var temp5 = $("#temp-" + i);
            var wind5 = $("#wind-" + i);
            var humid5 = $("#humid-" + i);
            var wicon5 =$("#wicon-" + i)
            var date = new Date(data.daily[i].dt * 1000);
            var iconcode = data.daily[i].weather[0].icon;
            var iconurl = "https://openweathermap.org/img/w/" + iconcode + ".png";

            date5.text(date);
            wicon5.attr('src', iconurl);
            // icon5.text(data.daily[i].weather[0].icon);
            temp5.text(`Temp: ${data.daily[i].temp.day}° F`);
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

initial();



// Events needed for

// searchButton.on('click', displayWeather);

// when search bar is clicked/submitted
// will display current forecast and 5 day forecast

// TheCityUserClicksOn.on('click', displayWeather)

// when previously search city is clicked
// will display current forecast and 5 day forecast
