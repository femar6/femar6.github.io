var map;

$(window).resize(function () {
	sizeLayerControl();
});

$("#about-btn").click(function () {
	$("#aboutModal").modal("show");
	$(".navbar-collapse.in").collapse("hide");
	return false;
});

//////////////////////TOOLS/////////////////////////////

$("#full-extent-btn").click(function () {
	map.fitBounds(nightPopLayer.getBounds());
	$(".navbar-collapse.in").collapse("hide");
	return false;
});

$("#legend-btn").click(function () {
	$("#legendModal").modal("show");
	$(".navbar-collapse.in").collapse("hide");
	return false;
});

$("#nav-btn").click(function () {
	$(".navbar-collapse").collapse("toggle");
	return false;
});


function sizeLayerControl() {
	$(".leaflet-control-layers").css("max-height", $("#map").height() - 50);
}


/* Basemap Layers */
var basemaps = [
	L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
		maxZoom: 21,
		attribution: '&copy; <a href="http://www.google.com">Google</a>',
		subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
	}),
	L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.{ext}', {
		attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
		subdomains: 'abcd',
		minZoom: 0,
		maxZoom: 18,
		ext: 'png'
	}),
	L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
		maxZoom: 17,
		attribution: 'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
	}),
	L.tileLayer("https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png", {
		maxZoom: 19,
		attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://cartodb.com/attributions">CartoDB</a>'
	}),

	L.tileLayer('http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}', {
		maxZoom: 21,
		attribution: '&copy; <a href="http://www.google.com">Google</a>',
		subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
	}),
	L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
		attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
	}),
];
var map = new L.map("map", {
	zoom: 7,
	center: [ 29.777921, -96.755904],
	zoomControl: false,
	minZoom: 6,
	maxZoom: 21,
	attributionControl: true
});
map.setMaxBounds(map.getBounds().pad(1));
var natgeoUrl = 'http://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}';
var natgeoAttrib = 'Map data &copy; National Geographic World Map';

//Plugin magic goes here! Note that you cannot use the same layer object again, as that will confuse the two map controls
var natGeo = new L.TileLayer(natgeoUrl, {
	attribution: natgeoAttrib
});
var rect1 = {
	color: "#ff1100",
	weight: 3
};
var rect2 = {
	color: "#0000AA",
	weight: 1,
	opacity: 0,
	fillOpacity: 0
};
var miniMap = new L.Control.MiniMap(natGeo, {
	toggleDisplay: false,
	aimingRectOptions: rect1,
	shadowRectOptions: rect2
}).addTo(map);
map.addControl(L.control.basemaps({
	basemaps: basemaps,
	tileW: 0,
	tileX: 0,
	tileY: 0,
	tileZ: 1
}));
/* Attribution control */
function updateAttribution(e) {
	$.each(map._layers, function (index, layer) {
		if (layer.getAttribution) {
			$("#attribution").html((layer.getAttribution()));
		}
	});
}
map.on("layeradd", updateAttribution);
map.on("layerremove", updateAttribution);

var attributionControl = L.control({
	position: "bottomleft"
});
attributionControl.onAdd = function (map) {
	var div = L.DomUtil.create("div", "leaflet-control-attribution");
	div.innerHTML = "<span class='hidden-xs'>Source: <a target='_blank' href='https://www.fema.gov/risk-map-region-vi'>FEMA Region 6 - Mitigation - Risk Analysis</a> | </span><a href='#' onclick='$(\"#attributionModal\").modal(\"show\"); return false;'>Attribution</a>";
	return div;
};
map.addControl(attributionControl);
var zoomControl = L.control.zoom({
	position: "topleft"
}).addTo(map);
/* Larger screens get expanded layer control and visible sidebar */
if (document.body.clientWidth <= 767) {
	var isCollapsed = true;
} else {
	var isCollapsed = false;
}
var baseLayers = {
};

var mask = omnivore.topojson('data/mask.json')
.on('ready', function() {
		mask.setStyle({fillColor:'black',color:'white',fillOpacity:0.75,})
        }).addTo(map);
var groupedOverlays = {
	"Flood and Event Products": {
	},
	"Reference": {


	}
};
var layerControl = L.control.groupedLayers(baseLayers, groupedOverlays, { collapsed: isCollapsed
}).addTo(map);


// Leaflet patch to make layer control scrollable on touch browsers
var container = $(".leaflet-control-layers")[0];
if (!L.Browser.touch) {
	L.DomEvent
		.disableClickPropagation(container)
		.disableScrollPropagation(container);
} else {
	L.DomEvent.disableClickPropagation(container);
}
//WATERMARK
L.Control.Watermark = L.Control.extend({
	onAdd: function (map) {
		var img = L.DomUtil.create('img');

		img.src = './assets/img/fema_tdem.png';
		img.style.width = '175px';

		return img;
	},

	onRemove: function (map) {
		// Nothing to do here
	}
});
L.control.watermark = function (opts) {
	return new L.Control.Watermark(opts);
}
L.control.watermark({
	position: 'bottomleft'
}).addTo(map);

  var searchControl = L.esri.Geocoding.geosearch().addTo(map);

  var results = L.layerGroup().addTo(map);

  searchControl.on('results', function(data){
    results.clearLayers();
    for (var i = data.results.length - 1; i >= 0; i--) {
      results.addLayer(L.marker(data.results[i].latlng));
    }
  });
	var ctlScale = L.control.scale({
		position: 'bottomright',
		updateWhenIdle: false,
		metric: false,
		maxWidth: 200
	}).addTo(map);
