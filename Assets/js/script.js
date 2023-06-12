var weather = {
  apiKey: "a33cca847de5ea85a77efcba5384ad55",

  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&units=imperial&appid=" +
        this.apiKey
    )
      .then((response) => response.json())
      .then((data) => {
        this.displayWeather(data);
        this.fetchForecast(city); // Fetch forecast after displaying current weather
        this.saveCity(city);
        this.updateStorageSection();
      })
      .catch((error) => {
        console.log("Error fetching weather:", error);
      });
  },
  fetchForecast: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
        city +
        "&units=imperial&appid=" +
        this.apiKey
    )
      .then((response) => response.json())
      .then((data) => {
        for (i = 0; i < 5; i++) {
          const icon = data.list[i].weather[0].icon;
          document.getElementById("img" + (i + 1)).src =
            "https://openweathermap.org/img/wn/" + icon + "@2x.png";
          document.getElementById("day" + (i + 1) + "Temp").innerHTML =
            data.list[i].main.temp + " °F";
          document.getElementById("day" + (i + 1) + "Speed").innerHTML =
            data.list[i].wind.speed;
          document.getElementById("day" + (i + 1) + "Humidity").innerHTML =
            data.list[i].main.humidity + " %";

          const date = new Date(data.list[i].dt_txt);
          const formattedDate = date.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          });
          const formattedTime = date.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          });
          const formattedDateTime = formattedDate + " " + formattedTime;

          document.getElementById("day" + (i + 1)).innerHTML =
            formattedDateTime;
        }
      })
      .catch((error) => {
        console.log("Error fetching forecast:", error);
      });
  },

  displayWeather: function (data) {
    var { name } = data;
    var { icon, description } = data.weather[0];
    var { temp, humidity } = data.main;
    var { speed } = data.wind;

    console.log(name, icon, description, temp, humidity, speed);

    document.querySelector("#city").innerText = name;
    document.querySelector("#date").innerText = getDate();

    document.querySelector("#icon").src =
      "https://openweathermap.org/img/wn/" + icon + "@2x.png";

    document.querySelector("#temp").innerText = temp + "°F";
    document.querySelector("#speed").innerText = speed + " MPH";
    document.querySelector("#humidity").innerText = humidity + "%";

    document.querySelector("#weather").classList.remove("loading");
  },
  saveCity: function (city) {
    let cities = JSON.parse(localStorage.getItem("recentCities")) || [];
    const existingIndex = cities.indexOf(city);

    if (existingIndex !== -1) {
      cities.splice(existingIndex, 1);
    }

    cities.unshift(city);
    cities = cities.slice(0, 8);
    localStorage.setItem("recentCities", JSON.stringify(cities));
  },
  updateStorageSection: function () {
    let cities = JSON.parse(localStorage.getItem("recentCities")) || [];
    const storageSection = document.querySelector("#storage");
    storageSection.innerHTML = "";

    cities.forEach((city) => {
      const button = document.createElement("button");
      button.textContent = city;
      button.addEventListener("click", () => {
        this.fetchWeather(city);
      });
      storageSection.appendChild(button);
    });
  },
  search: function () {
    this.fetchWeather(document.querySelector("#search-bar").value);
  },
};

function getDate() {
  const options = { weekday: "long", month: "short", day: "numeric" };
  const date = new Date();
  return date.toLocaleDateString(undefined, options);
}

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

// document.addEventListener(DOMContentLoaded, function () {
//   var newName;

//   function getInfo() {
//     newName = document.getElementById("search-bar").value;
//     var cityName = document.getElementById("city");
//     cityName.innerHTML = "--" + newName;
//   }

//   fetch(
//     "https://api.openweathermap.org/data/2.5/forecast?q=" +
//       newName +
//       "&units=imperial&appid=a33cca847de5ea85a77efcba5384ad55"
//   )
//     .then((response) => response.json())
//     .then((data) => {
//       for (i = 0; i < 5; i++) {
//         document.getElementById("day" + (i + 1) + "Temp").innerHTML =
//           "Temp: " + Number(data.list[i].main.temp - 60.46).toFixed(1) + "°";
//       }
//     });
// });
