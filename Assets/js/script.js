var weather = {
  apiKey: "a33cca847de5ea85a77efcba5384ad55",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => response.json())
      .then((data) => {
        this.displayWeather(data);
        this.saveCity(city); // Save the searched city to local storage
        this.updateStorageSection(); // Update the storage section
      });
  },
  displayWeather: function (data) {
    var { name } = data;
    var { icon, description } = data.weather[0];
    var { temp, humidity } = data.main;
    var { speed } = data.wind;
    console.log(name, icon, description, temp, humidity, speed);
    document.querySelector("#city").innerText = name;
    document.querySelector("#icon").src =
      "https://openweathermap.org/img/wn/" + icon + "@2x.png";
    document.querySelector("#temp").innerText = temp + "°F";
    document.querySelector("#speed").innerText = speed + "MPH";
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

var fiveDayWeather = {
  apiKey: "a33cca847de5ea85a77efcba5384ad55",
  fetchFiveDayWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
        city +
        "&cnt=5&appid=" +
        this.apiKey
    )
      .then((response) => response.json())
      .then((data) => console.log(data));
  },
};

// Update the storage section on page load
window.addEventListener("DOMContentLoaded", function () {
  weather.updateStorageSection();
});
``;
