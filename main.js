// handling ui
$(".js-questionmark").click( function () {
  $(".js-info").fadeIn();
});

$(".js-close").click( function () {
  $(".js-info").fadeOut();
});

// functionality
// user enters city
$('.js-input').keypress(function(e) {
       if(e.which == 13) {
         console.log("city is " + $(this).val());
             cityCheck($(this).val());
       }
   });

   // ajax calls to api
   // parsing of ajax
   // if parsing is successful

    function displayError() {
        $(".js-error").fadeIn().delay(2000).fadeOut();
    }

   function cityCheck(city) {
     // use "locations" to check if city exists

       var jqxhr = $.ajax("https://api.openaq.org/v1/locations?city=" + city)
        .done(function(data) {
            console.log("!!! woo ajax ok");
            console.log(data);
            var result = data.results.length;
            if (result > 0) {
                console.log("this city exists!");
                callApi(city);
            } else {
              displayError();
            }
        })
        .fail(function() {
            displayError();
            console.log("there was a problem with the ajax???");
        });





     // city does not exist, display error message


   }

// user clicks on button with city
$(".js-btn").click(function() {
    var city = $(this).data("city");
    callApi(city);
});

// show loading spinner
function loading() {
  $(".js-loading").addClass("dt");
  $(".js-loading").fadeIn();
}


function callApi(city) {

    // successful
    // -> put city name into results
    $(".js-city").text(city);

    // -> hand parameters to check
    measurementCheck();
}


// check which measurements are available
function measurementCheck() {
    // which parameter is available?


}


// compare to appropriate thresholds


// change results section accordingly
function changeResults(airquality) {
    var qualitySpan = $(".js-airquality");

    if (airquality == "low") {
        qualitySpan.text("carefully");
    } else if (airquality == "med") {
        qualitySpan.text("consciously");
    } else {
        qualitySpan.text("easily");
    }

    loadingDone();
}


// display results and scroll to them
function loadingDone() {
  $(".js-loading").fadeOut();
  $('html, body').animate({
       scrollTop: $(".js-result").offset().top
   }, 1500);
}


var PM2pt5 = prompt("Enter value for PM2.5 between 0 and 80 mg/m-3");
var PM10 = prompt("Enter value for PM10 between 0 and 120 mg/m-3");
var SO2 = prompt("Enter value for S02 between 0 and 1200 mg/m-3");
var NO2 = prompt("Enter value for NO2 between 0 and 700 mg/m-3");
var ozone = prompt("Enter value for ozone between 0 and 400 mg/m-3");


if (PM2pt5 <= 35){
    console.log('Air Quality Index for PM2.5 is' + 'low');
}
else if(PM2pt5 >35 && PM2pt5 <= 54){
    console.log('Air Quality Index for PM2.5 is' + 'moderate');
}
else if(PM2pt5 >54) {
    console.log('Air Quality Index for PM2.5 is' + 'high');
}


if (PM10 <= 50){
    console.log('Air Quality Index for PM10 is' + 'low');
}
else if(PM10 >50 && PM10 < 75){
    console.log('Air Quality Index for PM10 is' + 'moderate');
}
else if(PM10 >75) {
    console.log('Air Quality Index for PM10 is' + 'high');
}


if (SO2 <= 266){
    console.log('Air Quality Index for S02 is' + 'low');
}
else if(SO2 >266  &&  SO2 < 533){
    console.log('Air Quality Index for S02 is' + 'moderate');
}
else if(SO2 >533) {
    console.log('Air Quality Index for S02 is' + 'high');
}


if (NO2 <= 200){
    console.log('Air Quality Index for N02 is' + 'low');
}
else if(NO2 >200 && NO2 < 401){
    console.log('Air Quality Index for N02 is' + 'moderate');
}
else if(NO2 >401) {
    console.log('Air Quality Index for N02 is' + 'high');
}

if (ozone <= 100){
    console.log('Air Quality Index for ozone is' + 'low');
}
else if(ozone >100  && ozone < 161){
    console.log('Air Quality Index for ozone is' + 'moderate');
}
else if(ozone > 161) {
    console.log('Air Quality Index for ozone is' + 'high');
}
