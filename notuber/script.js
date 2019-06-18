var map, infoWindow;
var myCoordinates;
var markers = [];
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 42.352271, lng: -71.05524200000001},
          zoom: 12
        });
        var image = {
          url: 'https://tuftsdev.github.io/WebProgramming/assignments/summer2019/car.png',
          size: new google.maps.Size(30, 70),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(15, 35)
        };

        var icons = {
          car: {
            icon: image
          }
        };

        var features = [
          {
            position: new google.maps.LatLng(42.3453, -71.0464),
            type: 'car',
            id: 'mXfkjrFw'
          }, {
            position: new google.maps.LatLng(42.3662, -71.0621),
            type: 'car',
            id: 'nZXB8ZHz'
          }, {
            position: new google.maps.LatLng(42.3603, -71.0547),
            type: 'car',
            id: 'Tkwu74WC'
          }, {
            position: new google.maps.LatLng(42.3472, -71.0802),
            type: 'car',
            id: '5KWpnAJN'
          }, {
            position: new google.maps.LatLng(42.3663, -71.0544),
            type: 'car',
            id: 'uf5ZrXYw'
          }, {
            position: new google.maps.LatLng(42.3542, -71.0704),
            type: 'car',
            id: 'VMerzMH8'
          }
        ];

        // Create car markers.
        for (var i = 0; i < features.length; i++) {
          var marker = new google.maps.Marker({
            position: features[i].position,
            icon: icons[features[i].type].icon,
            map: map,
            id: features[i].id
          });
          markers.push(marker);
        };

        //Create my location marker. Based on code from https://developers.google.com/maps/documentation/javascript/geolocation
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            var myPosition = new google.maps.Marker({
            	position: pos,
            	map: map

            });
            myPosition.addListener('click', function getClosestCar(){
            	console.log("get closest car");
            	var lowest = google.maps.geometry.spherical.computeDistanceBetween(myPosition.position, markers[0].position);
				for(var i = 1; i < markers.length; i++){
					var temp = google.maps.geometry.spherical.computeDistanceBetween(myPosition.position, markers[i].position);
					if(temp < lowest){
						lowest = temp;
					}
				}
				lowest *= 0.000621371;
				infoWindow = new google.maps.InfoWindow;
				infoWindow.setPosition(myPosition.position);
            	infoWindow.setContent("The nearest car is "+lowest.toFixed(1)+ " miles away.");
            	infoWindow.open(map, myPosition);

				console.log("The nearest car is "+lowest.toFixed(1)+ " miles away.");
            });
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }

		//Find closest car and display infoWindow
		infoWindow = new google.maps.InfoWindow;


      }

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
      'Error: The Geolocation service failed.' :
      'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}


      

