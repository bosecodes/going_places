      var map;
      var service;
      var infowindow;

      function initialize() {
        var sydney = new google.maps.LatLng(22.4646, 88.377);

        infowindow = new google.maps.InfoWindow();

        map = new google.maps.Map(
            document.getElementById('map'), {center: sydney, zoom: 15});

        var request = {
          location: sydney,
          query: 'police',
          rankBy: google.maps.places.RankBy.DISTANCE,
        };

        service = new google.maps.places.PlacesService(map);
        service.textSearch(request, callback);
      }

      function createMarker(place) {
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location,
        });

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent(place.name);
          var theplace = place.place_id.formatted_phone_number;
          infowindow.open(map, this);
        });
      }

    //   function callback(results, status) {
    //       if(status == google.maps.places.PlacesServiceStatus.OK) {
    //           var marker = new google.maps.Marker({
    //               map: map,
    //               place: {
    //                   placeId: results[0].place_id,
    //                   location: results[0].geometry.location,
    //               }
    //           });
    //           for(var i = 0; i < results.length; i++){
    //             createMarker(results[0]);
    //           }
    //       }
    //   }
      var j;
      function callback(results, status) {
        if(status == google.maps.places.PlacesServiceStatus.OK) {
            for(var i = 0; i < results.length; i++) {            
                service.getDetails(results[0], function(place, status) {
                    if (status == google.maps.places.PlacesServiceStatus.OK) {
                        var marker = new google.maps.Marker({
                            map: map,
                            position: place.geometry.location
                        });
                        j = place.formatted_phone_number;
                        console.log(j);
                        google.maps.event.addListener(marker, 'click', function() {
                            infowindow.setContent(place.name);
                            infowindow.open(map, this);
                        });
                    }    
                });
            }
        }
    }
