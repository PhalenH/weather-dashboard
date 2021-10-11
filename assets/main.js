console.log("======");

var selectedCity = $("#selected-city");
var currentTemp = $("#current-temp");
var currentWind = $("#current-wind");
var currentHumid = $("#current-humid");
var currentUv = $("#current-uv");
var weatherContainer = $(".weather-container");
var searchButton = $("#search-button");
var listOfCities = $(".city-searched");
var currentDay = moment();

var city = [];
if (localStorage.getItem("city") != null) {
  city = JSON.parse(localStorage.getItem("city"));
}
function saveCity() {
  localStorage.setItem("city", JSON.stringify(city));
}

function initial() {
  weatherContainer.attr("style", "display: none");

  searchButton.on("click", function () {
    var cityInput = $("#city").val();
    displayWeather(cityInput);
    weatherContainer.attr("style", "display: block");

    for (var i = 0; i < city.length; i++) {
      if (cityInput == city[i]) {
        return;
      }
    }

    city.push(cityInput);
    renderCity();
    saveCity();
  });
}
// closes initial function

function displayWeather(x) {
  var cityInput = $("#city").val();
  var currentConditions = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=imperial&appid=5b787b122cd0fc16a703d189885623e5`;

  fetch(currentConditions)
    .then(function (response) {
      // console.log(response.status);
      if (response.status === 404) {
        alert("Error: City not found, please try again.");
        initial();
      }
      return response.json();
    })
    .then(function (data) {
      var currentDate = currentDay.format("L");
      var iconcode = data.weather[0].icon;
      var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
      $("#wicon").attr("src", iconurl);

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
          currentUv.text(`UV Index: ${data.current.uvi}`);
          if(data.current.uvi > 2){
            currentUv.addClass('moderate-uv')
          } else if (data.current.uvi >7 ) {
            currentUv.addClass('severe-uv')
          } else {
            currentUv.addClass('favorable-uv')
          }

          for (var i = 1; i < 6; i++) {
            var date5 = $("#date-" + i);
            var temp5 = $("#temp-" + i);
            var wind5 = $("#wind-" + i);
            var humid5 = $("#humid-" + i);
            var wicon5 = $("#wicon-" + i);
            var futurDate = new Date(data.daily[i].dt * 1000);
            var date = moment(futurDate).format("MM/DD/YYYY");
            var iconcode = data.daily[i].weather[0].icon;
            var iconurl =
              "https://openweathermap.org/img/w/" + iconcode + ".png";

            date5.text(date);
            wicon5.attr("src", iconurl);
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

function renderCity() {
  listOfCities.text("");

  for (var i = 0; i < city.length; i++) {
    var pEl = document.createElement("p");
    pEl.textContent = city[i].toUpperCase();
    pEl.setAttribute("id", "city-" + i);
    document.querySelector(".city-searched").appendChild(pEl);
  }
}

// function displayOldCity() {
//   listOfCities.on("click", function (event) {
//     var element = event.target;

//     if (element.matches("p") === true) {
//       var index = element.getAttribute("id");
//       console.log(index);

//       for (var i = 0; i < city.length; i++) {
//         console.log($("#city-" + i));
//         var oldCity = $("#city-" + i)[0].innerText;
//         console.log(oldCity);

//         if (index == $("#city-" + i)[0].id) {
//           console.log(oldCity);
//           displayWeather(oldCity)
//           break;
//           // displayWeather(oldCity)
//         }
//       }
//     }
//   });
// }

renderCity();
// displayOldCity();
initial();

// function checkRepeat() {
//   for (var i = 0; i < city.length; i++) {
//     var cityInput = $("#city").val();
//     if (cityInput == city[i]) {
//       return;
//     }
//   }
// }
// why does this work when typed out but not as a function when I call it before createCityList(); and saveCity();
