ymaps.ready(function() {
  var map = new ymaps.Map('map_placeholder', {
    center: [54.318478, 48.397473],
    zoom: 17,
    type: 'yandex#satellite'
  });

  var plotted_venues_ids = {};

  map.events.add('boundschange', function(e) {
    var bounds = e.get('newBounds');

    var south = bounds[0][0];
    var west  = bounds[0][1];
    var north = bounds[1][0];
    var east  = bounds[1][1];

    jQuery.ajax({
      url: 'https://api.foursquare.com/v2/venues/search',
      dataType: 'jsonp',
      data: {
        client_id: 'XKBFBXHOCLKHTLGERTD2FR0XEZM0A0RW5MSWSCNGNFW10TVM',
        client_secret: 'IWD13I0PNJLXMJVNROPY5VYRD05HY2B1OXLL0P5VLC5TIFMW',
        v: 20190308,
        intent: 'browse',
        sw: '' + south + ',' + west,
        ne: '' + north + ',' + east,
        limit: 50,
        locale: 'ru'
      },
      cache: true,
      success: function(data) {
        if (data.response.venues) {
          for(var i = 0; i < data.response.venues.length; i++) {
            var venue = data.response.venues[i];

            if (plotted_venues_ids[venue.id] === undefined) {
              map.geoObjects.add(new ymaps.Placemark(
                [
                  venue.location.lat,
                  venue.location.lng
                ],
                {
                  iconContent: venue.name
                },
                {
                  preset: 'islands#grayStretchyIcon'
                }
              ));

              plotted_venues_ids[venue.id] = true;
            }
          }
        }
      }
    });
  });
});
