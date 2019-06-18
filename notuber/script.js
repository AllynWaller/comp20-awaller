var map, infoWindow;
var myCoordinates;
var markers = [];
var lowestCar = 0;
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

        var features = [];

        /* = [
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
        };*/

        //Create my location marker. Based on code from https://developers.google.com/maps/documentation/javascript/geolocation
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
            	var lowest = google.maps.geometry.spherical.computeDistanceBetween(myPosition.position, markers[0].position);
				for(var i = 1; i < markers.length; i++){
					var temp = google.maps.geometry.spherical.computeDistanceBetween(myPosition.position, markers[i].position);
					if(temp < lowest){
						lowest = temp;
						lowestCar = i;
					}
				}
				lowest *= 0.000621371;
				infoWindow = new google.maps.InfoWindow;
				infoWindow.setPosition(myPosition.position);
            	infoWindow.setContent("The nearest car is "+markers[lowestCar].id+" and it is "+lowest.toFixed(1)+ " miles away.");
            	infoWindow.open(map, myPosition);

            	//Polyline based on https://developers.google.com/maps/documentation/javascript/examples/polyline-simple
            	var polylineCoordinates = [
          			markers[lowestCar].position,
          			myPosition.position
        		];
        		var carPath = new google.maps.Polyline({
        		  path: polylineCoordinates,
 		         geodesic: true,
        		  strokeColor: '#00FF00',
  		        strokeOpacity: 1.0,
        		  strokeWeight: 2
   		     });

  				carPath.setMap(map);

  				

	        });


	        //Get car locations from API
	        var xhr = new XMLHttpRequest();
			xhr.open('POST', 'https://hans-moleman.herokuapp.com/rides', true);
			xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

			xhr.onreadystatechange = function() {
				if(xhr.readyState == 4 && xhr.status == 200) {
	 		    	response = JSON.parse(xhr.responseText);
	 		    	for(var i=0; i<response.length; i++){
	 		    		features.push(
	 		    			{
            				position: new google.maps.LatLng(response[i].lat, response[i].lng),
            				type: 'car',
            				id: response[i]['_id']
         					})
	 		    	}
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
				}
			}

			xhr.send("username=HPjvo9hA&lat="+position.coords.latitude+"&lng="+position.coords.longitude);
          });
      }




      

