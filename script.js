$(function() {
    const apiKey = "5ce24291e2d389df856c165e9f4b0364";
    const weatherUrl = "https://api.openweathermap.org/data/2.5/weather";
    const forecastUrl = "https://api.openweathermap.org/data/2.5/forecast";
  
    const searchForm = $("#search-form");
    const searchInput = $("#search-input");
    const historyList = $("#history");
    const todaySection = $("#today");
    const forecastSection = $("#forecast");
  
    searchForm.submit(function(event) {
      event.preventDefault();
      const city = searchInput.val().trim();
  
      // Get current weather data
      $.get(`${weatherUrl}?q=${city}&appid=${apiKey}&units=metric`, function(weatherData) {
        todaySection.empty();
        const currentCard = $("<div>").addClass("card mb-3");
        const currentCardBody = $("<div>").addClass("card-body");
        const cityName = $("<h2>").addClass("card-title").text(`${weatherData.name}, ${weatherData.sys.country}`);
        const weatherIcon = $("<img>").attr("src", `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`);
        const temperature = $("<p>").addClass("card-text").text(`Temperature: ${weatherData.main.temp} °C`);
        const description = $("<p>").addClass("card-text").text(`Description: ${weatherData.weather[0].description}`);
        currentCardBody.append(cityName, weatherIcon, temperature, description);
        currentCard.append(currentCardBody);
        todaySection.append(currentCard);
  
        // Get forecast data
        const lat = weatherData.coord.lat;
        const lon = weatherData.coord.lon;
        $.get(`${forecastUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`, function(forecastData) {
          forecastSection.empty();
          forecastData.list.filter((item, index) => index % 8 === 0).forEach(item => {
            const forecastCard = $("<div>").addClass("card col-2");
            const forecastCardBody = $("<div>").addClass("card-body");
            const forecastDate = $("<h5>").addClass("card-title").text(moment(item.dt_txt).format("MMM Do"));
            const forecastIcon = $("<img>").attr("src", `https://openweathermap.org/img/w/${item.weather[0].icon}.png`);
            const forecastTemperature = $("<p>").addClass("card-text").text(`Temperature: ${item.main.temp} °C`);
            const forecastDescription = $("<p>").addClass("card-text").text(`Description: ${item.weather[0].description}`);
            forecastCardBody.append(forecastDate, forecastIcon, forecastTemperature, forecastDescription);
            forecastCard.append(forecastCardBody);
            forecastSection.append(forecastCard);
          });
        });
      });
  
      // Add search history item
      $("<li>").addClass("list-group-item").text(city).appendTo(historyList);
    });
  });
  