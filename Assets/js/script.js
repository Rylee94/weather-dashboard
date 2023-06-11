var weather = {
  apiKey: "a33cca847de5ea85a77efcba5384ad55",
  fetchWeather: function (city) {
    // Fetch current weather
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=imperial&appid=" +
        this.apiKey
    )
      .then((response) => response.json())
      .then((data) => {
        this.displayWeather(data); // Display current weather

        // Fetch 5-day forecast
        fetch(
          "https://api.openweathermap.org/data/2.5/forecast?q=" +
            city +
            "&cnt=5&units=imperial&appid=" +
            this.apiKey
        )
          .then((response) => response.json())
          .then((data) => {
            this.displayForecast(data); // Display 5-day forecast
          })
          .catch((error) => {
            console.log("Error fetching forecast:", error);
          });

        this.saveCity(city); // Save the searched city to local storage
        this.updateStorageSection(); // Update the storage section
      })
      .catch((error) => {
        console.log("Error fetching weather:", error);
      });
  },

  displayWeather: function (data) {
    var { name } = data;
    var { icon, description } = data.weather[0];
    var { temp, humidity } = data.main;
    var { speed } = data.wind;
    console.log(name, icon, description, temp, humidity, speed);
    document.querySelector("#city").innerText = name;
    document.querySelector("#date").innerText = date;

    document.querySelector("#icon").src =
      "https://openweathermap.org/img/wn/" + icon + "@2x.png";
    document.querySelector("#temp").innerText = temp + "°F";
    document.querySelector("#speed").innerText = speed + " MPH";
    document.querySelector("#humidity").innerText = humidity + "%";

    document.querySelector("#weather").classList.remove("loading");
  },
  saveCity: function (city) {
    // Retrieve the existing list of cities from local storage
    let cities = JSON.parse(localStorage.getItem("recentCities")) || [];

    // Remove the city from the list if it already exists
    const existingIndex = cities.indexOf(city);
    if (existingIndex !== -1) {
      cities.splice(existingIndex, 1);
    }

    // Add the city to the beginning of the list
    cities.unshift(city);

    // Keep only the 8 most recent cities
    cities = cities.slice(0, 8);

    // Store the updated list back to local storage
    localStorage.setItem("recentCities", JSON.stringify(cities));
  },
  updateStorageSection: function () {
    // Retrieve the recent cities from local storage
    let cities = JSON.parse(localStorage.getItem("recentCities")) || [];

    // Get the storage section element
    const storageSection = document.querySelector("#storage");

    // Clear the existing content
    storageSection.innerHTML = "";

    // Create and append div elements for each city
    cities.forEach((city) => {
      const div = document.createElement("div");
      div.textContent = city;
      div.addEventListener("click", () => {
        this.fetchWeather(city); // Fetch weather for the clicked city
      });
      storageSection.appendChild(div);
    });
  },
  search: function () {
    this.fetchWeather(document.querySelector("#search-bar").value);
  },
};

document.querySelector("#search-btn").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector("#search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      weather.search();
    }
  });

weather.fetchWeather("Minneapolis");

//
//
// "https://api.openweathermap.org/data/2.5/forecast?q=" +
//   city +
//   "&cnt=5&units=imperial&appid=" +
//   this.apiKey;
// //
//
// var fiveDayWeather = {
//   apiKey: "a33cca847de5ea85a77efcba5384ad55",
//   fetchFiveDayWeather: function (city) {
//     fetch(
//       "https://api.openweathermap.org/data/2.5/forecast?q=" +
//         city +
//         "&cnt=5&units=imperial&appid=" +
//         this.apiKey
//     )
//       .then((response) => response.json())
//       .then((data) => {
//         this.displayFiveDayWeather(data);
//       });
//   },
//   displayFiveDayWeather: function (data) {
//     var forecastSection = document.querySelector("#forecast");
//     forecastSection.innerHTML = ""; // Clear the existing content

//     data.list.forEach((item) => {
//       var { dt_txt, main, weather, wind } = item;
//       var { temp, humidity } = main;
//       var { icon } = weather[0];
//       var { speed } = wind;

//       var forecastItem = document.createElement("div");
//       forecastItem.classList.add("forecast-item");

//       var speedElement = document.createElement("p");
//       speedElement.textContent = "Wind: " + speed + " MPH";
//       forecastItem.appendChild(speedElement);

//       var date = document.createElement("p");
//       date.classList.add("date");
//       date.textContent = dt_txt;
//       forecastItem.appendChild(date);

//       var weatherIcon = document.createElement("img");
//       weatherIcon.classList.add("weather-icon");
//       weatherIcon.src = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
//       weatherIcon.alt = "";
//       forecastItem.appendChild(weatherIcon);

//       var temperature = document.createElement("p");
//       temperature.classList.add("temperature");
//       temperature.textContent = "Temp: " + temp + "°F";
//       forecastItem.appendChild(temperature);

//       var humidityElement = document.createElement("p");
//       humidityElement.classList.add("humidity");
//       humidityElement.textContent = "Humidity: " + humidity + "%";
//       forecastItem.appendChild(humidityElement);

//       forecastSection.appendChild(forecastItem);
//     });
//   },
// };

// fiveDayWeather.fetchFiveDayWeather("minneapolis");

// // Update the storage section on page load
// window.addEventListener("DOMContentLoaded", function () {
//   weather.updateStorageSection();
// });
