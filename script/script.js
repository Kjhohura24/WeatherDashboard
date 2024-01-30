//API key OpenWeatherAPP
var apiKey = "c513dfd9ce9fcf4c884213b749f9c052";

$("#search-form").submit(function (event) {
    event.preventDefault();
    var city = $("#search-input").val();
    getWeather(city);
});

function getWeather(city) {
    var todayUrl =
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&appid=" +
        apiKey +
        "&units=metric";

    $.getJSON(todayUrl, function (todayData) {
        var today = todayData;
        var todayIcon =
            "https://openweathermap.org/img/wn/" +
            today.weather[0].icon +
            "@2x.png";
        
        var todayHtml =
            
            "<div class='weather-title'>" + "<h2>" + today.name + " (" +
            
            (new Date().toLocaleDateString("en-GB", {day: "2-digit", month: "2-digit", year: "numeric"}))
            + ")" + "</h2>" +
            
            "<img class='weather-icon' src='" + todayIcon + "'>" + "</div>" +
            
            "<p>Temperature: " + (today.main.temp).toFixed(2) + "°C</p>" +
            
            "<p>Humidity: " + today.main.humidity + "%</p>" +
            
            "<p>Wind: " + today.wind.speed + "mph </p>";

        $("#today").html(todayHtml);
    });
}



$("#search-form").submit(function (event) {
    event.preventDefault();
    var city = $("#search-input").val();
    getForecast(city);
});

// Weather for the next 5 days
function getForecast(city) {
    var forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey + "&units=metric";

    
    $.getJSON(forecastUrl, function (forecastData) {

        
        var forecastDiv = $("<div>").addClass("card-deck p-3");
        
        var forecastArray = forecastData.list;
        
        var currentDate = new Date();
        
        var tomorrow = new Date(currentDate.getTime() + 24 * 60 * 60 * 1000);
        var count = 0;

        for (var i = 0; i < forecastArray.length; i += 8) {
            var forecast = forecastArray[i];
            var forecastDate = new Date(forecast.dt * 1000);
            if (forecastDate < tomorrow) {
                continue;
            }
            if (count >= 5) {
                break;
            }

            var formattedDate = forecastDate.toLocaleDateString();
 
            var forecastIcon = "https://openweathermap.org/img/wn/" + forecast.weather[0].icon + "@2x.png";
           
            var forecastTemp = "Temp: " + forecast.main.temp + " °C";
           
            var forecastHumidity = "Humidity: " + forecast.main.humidity + " %";
           
            var forecastWind = "Wind: " + forecast.wind.speed + " mph";

            
            var forecastRow = $("<div>").addClass("forecast-row card text-left p-2 wide-card");
            
            forecastRow.append($("<h6>").addClass("card-title text-left p-1").text(formattedDate));
            
            forecastRow.append($("<img>").addClass("weather-icon").attr("src", forecastIcon));
            
            forecastRow.append($("<p>").addClass("card-text text-left p-1").text(forecastTemp));
           
            forecastRow.append($("<p>").addClass("card-text text-left p-1").text(forecastWind));
            
            forecastRow.append($("<p>").addClass("card-text text-left p-1").text(forecastHumidity));
            forecastDiv.append(forecastRow);
            
        }

        var forecastTitle = $("<h2>").text("5 Day-Forecast: ").addClass("p-3");
        var titleContainer = $("<div>").addClass("d-flex");
        titleContainer.append(forecastTitle);

        var forecastContainer = $("<div>").addClass("d-flex flex-column");
        forecastContainer.append(titleContainer).append(forecastDiv);
        $("#forecast").html(forecastContainer);
    });
};