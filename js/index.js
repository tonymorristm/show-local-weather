$(function(){  // document ready function

// declaration of variables that will be used  
	var owmURL = "http://api.openweathermap.org/data/2.5/weather?";
	var apikey = "&appid=36538623bcbdf7b990f7def660ae45c1";
	var units = "&units=imperial";
	var tempF;
  var tempC;
	var desc;
	var city;
	var country;
  var id;
  var icon;
	var lat; // = lat= + "" + "&";
	var lon;  // = lon + "" + "&";
	var compURL;
  var backgroundImage = [];
  var iconWeatherIcon = []; 
                         
// this determines users location and if successful, will determine coords and if not it will display a failure message  
	navigator.geolocation.getCurrentPosition(success, failure); 
	
// geolocation success function  
	function success(position){
		lat = position.coords.latitude;
		lon = position.coords.longitude;
		compURL = (owmURL + "&" + "lat=" + lat + "&" + "lon=" + lon + units + apikey);

// calls the getWeather function    
	getWeatherJSON();
	}
  
 // geolocation failure function
  function failure(){
    $('body').html("<h1>Sorry, your location could not be determined.</h1>");
  }
	
 // this is the getWeather function, it gets the json data and is assigned to variables along with some formatting 
	function getWeatherJSON(){
		$.getJSON(compURL, function(json) {
			
			city = (json.name);
			country = (json.sys.country);
	    tempF = (json.main.temp.toFixed(1) + "&deg " + "F");
      desc = (json.weather[0].description);
			icon = (json.weather[0].icon);
      id =   (json.weather[0].id);
      tempC = ((json.main.temp.toFixed(1) - 32) * (5/9)).toFixed(1) + "&deg " + "C";
      
// array of background images      
    backgroundImage =[ 
      ["clear", "https://res.cloudinary.com/ddz2mbj0j/image/upload/v1458697961/clear_ozfkkb.jpg"],
      ["clouds", "https://res.cloudinary.com/ddz2mbj0j/image/upload/v1458755516/clouds_jeouwd.jpg"],
      ["rain", "https://res.cloudinary.com/ddz2mbj0j/image/upload/v1458697966/rain_oyhqhc.jpg"],
      ["snow", "https://res.cloudinary.com/ddz2mbj0j/image/upload/v1458697909/snow_pifixz.jpg"],
      ["mist", "https://res.cloudinary.com/ddz2mbj0j/image/upload/v1458697930/mist_czoaks.jpg"],
      ["default", "https://res.cloudinary.com/ddz2mbj0j/image/upload/v1458756649/buses_i4img2.jpg"]
      ]
      
// array of weather icons    
    iconWeatherIcon = [
      ["clear", "wi wi-day-sunny"],
      ["cloudy", "wi wi-cloudy"],
      ["rain", "wi wi-rain"],
      ["snow", "wi wi-snow"],
      ["mist", "wi wi-fog"],
      ["default", "wi wi-alien"]
    ]
    
// switch case is used to take json data of weather conditions and display a background image based on description
// it also displays weather icon based on the descriptions
// weather icons are from Erik Flowers https://erikflowers.github.io/weather-icons
      switch(id){
      
      //clear
        case 800:
          $("body").css("background-image", "url(" + backgroundImage[0][1] + ")");
          $('.icon').html(('<i class="' + iconWeatherIcon[0][1] + '"></i>'));
        break;
          
      // clouds
        case 801:
        case 802:
        case 803:
        case 804:
          $("body").css("background-image", "url(" + backgroundImage[1][1] + ")");
          $('.icon').html(('<i class="' + iconWeatherIcon[1][1] + '"></i>'));
        break;
          
      // rain - thunderstorm, drizzle, rain
        case 200:
        case 201:
        case 202:
        case 210:
        case 211:
        case 212:
        case 221:
        case 230:
        case 231:
        case 232:
        case 300:
        case 301:
        case 302:
        case 310:
        case 311:
        case 312:
        case 313:
        case 314:
        case 321:
        case 500:
        case 501:
        case 502:
        case 503:
        case 504:
        case 511:
        case 520:
        case 521:
        case 531:
          $("body").css("background-image", "url(" + backgroundImage[2][1] + ")");
          $('.icon').html(('<i class="' + iconWeatherIcon[2][1] + '"></i>'));
        break;
          
     // snow
        case 600:
        case 601:
        case 602:
        case 611:
        case 612:
        case 615:
        case 616:
        case 620:
        case 621:
        case 622:
          $("body").css("background-image", "url(" + backgroundImage[3][1] + ")");
          $('.icon').html(('<i class="' + iconWeatherIcon[3][1] + '"></i>'));
        break;
          
     // mist
        case 701:
        case 721:
          $("body").css("background-image", "url(" + backgroundImage[4][1] + ")");
          $('.icon').html(('<i class="' + iconWeatherIcon[4][1] + '"></i>'));
        break;
          
     // default
        default:
          $("body").css("background-image", "url(" + backgroundImage[5][1] + ")");
          $('.icon').html(('<i class="' + iconWeatherIcon[5][1] + '"></i>'));
      }
    
			$("#location-box").html(city);
      $(".tempF").html(tempF);
			$(".conditions").html(desc)
      
      $('#celsius').on( 'click', function () {
        $('.tempF').html(tempC);
      });
     
      $('#farenheit').on( 'click', function () {
        $('.tempF').html(tempF);
      });
      
    }); //getJSON compURL
		
	} // getWeatherJSON
	
});  // document ready function