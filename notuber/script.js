var map;
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 42.352271, lng: -71.05524200000001},
          zoom: 14
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

        // Create markers.
        for (var i = 0; i < features.length; i++) {
          var marker = new google.maps.Marker({
            position: features[i].position,
            icon: icons[features[i].type].icon,
            map: map,
            id: features[i].id
          });
        };

      }



