$(document).ready(function() {
  
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            loadWeather(position.coords.latitude+','+position.coords.longitude); 
        }, showError); 
    } else {
        $("#weather").html("Geolocation is not supported by this browser.");
    }
  
    function showError(error) {
        switch(error.code) {
            case error.PERMISSION_DENIED:
                $("#weather").html("User denied the request for Geolocation.");
                break;
            case error.POSITION_UNAVAILABLE:
                $("#weather").html("Location information is unavailable.");
                break;
            case error.TIMEOUT:
                $("#weather").html("The request to get user location timed out.");
                break;
            case error.UNKNOWN_ERROR:
                $("#weather").html("An unknown error occurred.");
                break;
        }
    }
  
    $("#weather").click(function() {
        if($("#deg").text() === 'C') {
            $("#deg").text('F');
            fahrenheit = Math.round($("#temp").text() * 9/5 + 32);
            $("#temp").text(fahrenheit);
        } else {
            $("#deg").text('C');
            celcius = Math.round(($("#temp").text() - 32) / (9/5));
            $("#temp").text(celcius);
        }
    });
  
});

function loadWeather(location, woeid) {
    
    $.simpleWeather({
        location: location, 
        woeid: woeid,
        unit: 'c',
        success: function(weather) {
            html = '<i class="icon-'+ weather.code + '"></i><span id="temp">'+ weather.temp + '</span>&deg;<span id="deg">' + weather.units.temp + '</span>';
            $("#address").html("Location: "  + weather.city + ", " + weather.country);
            $("#today").html(weather.forecast[0].date);
            $("#weather").html(html);
            $("#description").html(weather.currently);
            $("#condition").attr("src", weather.thumbnail);
        },
        error: function(error) {
            $("#weather").html('<p>'+error+'</p>');
        }
    });
    
}