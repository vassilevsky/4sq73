var map = new YMaps.Map(document.getElementById('map_placeholder'));
var plotted_venues_ids = {};

YMaps.Events.observe(map, map.Events.BoundsChange, function(map) {
  var bounds = map.getBounds();

  jQuery.ajax({
    url: 'https://api.foursquare.com/v2/venues/search',
    dataType: 'jsonp',
    data: {
      client_id: 'XKBFBXHOCLKHTLGERTD2FR0XEZM0A0RW5MSWSCNGNFW10TVM',
      client_secret: 'IWD13I0PNJLXMJVNROPY5VYRD05HY2B1OXLL0P5VLC5TIFMW',
      v: 20190308,
      intent: 'browse',
      sw: ''+bounds.getBottom()+','+bounds.getLeft(),
      ne: ''+bounds.getTop()+','+bounds.getRight(),
      limit: 50,
      locale: 'ru'
    },
    cache: true,
    success: function(data) {
      if (data.response.venues) {
        for(var i = 0; i < data.response.venues.length; i++) {
          var venue = data.response.venues[i];

          if (plotted_venues_ids[venue.id] === undefined) {
            var venue_location = new YMaps.GeoPoint(venue.location.lng, venue.location.lat);
            var placemark = new YMaps.Placemark(venue_location);
            placemark.setIconContent(venue.name);
            map.addOverlay(placemark);
            plotted_venues_ids[venue.id] = true;
          }
        }
      }
    }
  });
});

map.setCenter(new YMaps.GeoPoint(48.397473, 54.318478), 17, YMaps.MapType.SATELLITE);
