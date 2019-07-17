
			var lyrWatersheds;
		var lyrWatershedStyle;
				lyrWatershedStyle = L.geoJson(null, {
				style: function(feature) {
					return {
					fillColor: "#233864",
					weight: 0.5,
					color: '#233864',
					// dashArray: 7,
					Opacity: 1.0,
					fillOpacity: 0.05};

				},
				onEachFeature: onEachFeature,
			});
				lyrWatersheds = omnivore.geojson('data/tspws_watershed.json', null, lyrWatershedStyle)
				  .on('ready', function() {
					lyrWatersheds.setStyle(lyrWatershedStyle);

					lyrWatersheds.eachLayer(function(layer) {
          			var wathershedTooltip = layer;

            		wathershedTooltip.bindTooltip(layer.feature.properties.NAME,{className:'watershedtoolClass',permanent: false, offset: [0, 0], direction:'center'});
					}).addTo(map);
				});
        function zoomToFeature(e) {
  		      window.location.href = e.target.feature.properties.win_url;
	    }
		function onEachFeature(feature, layer) {
				layer.on({
				mouseover: highlightFeature,
				mouseout: resetHighlight,
				click: zoomToFeature
		});
	   }
	   function resetHighlight(e) {
	            lyrWatersheds.resetStyle(e.target);
								info1.update();
        }
		function highlightFeature(e) {
			var layer = e.target;
			layer.setStyle({
				weight: 3,
				color: 'white',
				dashArray: '1',
				fillOpacity: 1,
                Opacity: 1,
				// fillColor:'#EBA53D',
				fillColor:"#1F3864",
			});
	if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
		layer.bringToFront();
	}

	info1.update(layer.feature.properties);
		}
        function LatLngToArrayString(ll){
          return "["+ll.lat.toFixed(5)+", "+ll.lng.toFixed(5)+"]";
		}
		map.setMaxBounds(map.getBounds());
