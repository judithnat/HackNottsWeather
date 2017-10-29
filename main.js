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
                // city does not exist, display error message
              displayError();
            }
        })
        .fail(function() {
            displayError();
            console.log("there was a problem with the ajax???");
        });

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
  loading();
    var jqxhr = $.ajax("https://api.openaq.org/v1/measurements?city=" + city + "&limit=1")
    .done(function(data) {
      console.log(data);
      var parameters = [];
      // results are successfully returned
        parameters[0] = data.results[0].parameter;  // type of measurement
        parameters[1] = data.results[0].value; // value of measurement
        $(".js-city").text(city);
        measurementCheck(parameters);
    })
    .fail(function() {
      // if not api call fails, try again
      callApi(city);
    });
}

// check which measurements are available
function measurementCheck(parameters) {
  console.log("measure chekc");
    // which parameter is available?
    // compare to appropriate thresholds
    var type = parameters[0];
    var val = parameters[1];
    var aq = "med";

    // pm25, val, so2, no2, o3, co
    if (type == "pm25") {
      if (val <= 35){
          aq = "low";
      }
      else if(val >35 && val <= 54){
          aq = "med";
      }
      else if(val >54) {
          aq = "hi";
      }

    } else if (type == "pm10") {
      if (val <= 50){
          aq = "low";
      }
      else if(val >50 && val < 75){
          aq = "med";
      }
      else if(val >75) {
          aq = "hi";
      }

    } else if (type == "so2") {
      if (val <= 266){
          aq = "low";
      }
      else if(val >266  &&  val < 533){
          aq = "med";
      }
      else if(val >533) {
          aq = "hi";
      }

    } else if (type == "no2") {
      if (val <= 200){
          aq = "low";
      }
      else if(val >200 && val < 401){
          aq = "med";
      }
      else if(val >401) {
          aq = "hi";
      }

    } else if (type == "o3") {
      if (val <= 100){
          aq = "low";
      }
      else if(val >100  && val < 161){
          aq = "med";
      }
      else if(val > 161) {
          aq = "hi";
      }

    } else {
      console.log("unknown type eek");
      // if unknown, maybe go for med?
    }
    displayResults(aq);
}

// change results section accordingly
function displayResults(airquality) {
  console.log(airquality);
    var qualitySpan = $(".js-airquality");
    if (airquality == "low") {
        qualitySpan.text("easily");
    } else if (airquality == "med") {
        qualitySpan.text("consciously");
    } else if (airquality == "hi"){
        qualitySpan.text("carefully");
    }
    loadingDone();
}


// display results and scroll to them
function loadingDone() {
  $(".js-result").show();
  $(".js-loading").fadeOut();
  $('html, body').animate({
       scrollTop: $(".js-result").offset().top
   }, 1500);
}

/*
var val = prompt("Enter value for PM2.5 between 0 and 80 mg/m-3");
var val = prompt("Enter value for val between 0 and 120 mg/m-3");
var val = prompt("Enter value for S02 between 0 and 1200 mg/m-3");
var val = prompt("Enter value for val between 0 and 700 mg/m-3");
var val = prompt("Enter value for val between 0 and 400 mg/m-3");












*/
