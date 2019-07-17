var map;
var nhdGroup;
var ctlScale;
var mask;
var basemaps;
var natgeoUrl;
var natgeoAttrib;
var natGeo;
var rect1;
var rect2;
var miniMap;
var zoomControl;
var attributionControl;



/* Basemap Layers */
basemaps = [
	L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
		attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
	}),
	L.tileLayer('https://api.mapbox.com/v4/mapbox.streets-satellite/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 21,
		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
			'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="http://mapbox.com">Mapbox</a>',
		id: 'mapbox.streets'
	}),
	L.tileLayer("https://cartocdn_{s}.global.ssl.fastly.net/base-eco/{z}/{x}/{y}.png", {
		maxZoom: 21,
		attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://cartodb.com/attributions">CartoDB</a>'
	}),
	L.tileLayer("https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png", {
		maxZoom: 19,
		attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://cartodb.com/attributions">CartoDB</a>'
	}),

	L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
		maxZoom: 21,
		attribution: '&copy; <a href="http://www.google.com">Google</a>',
		subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
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

map = new L.map("map", {
	zoom: 9,
	center: [30.55753, -94.09241],
	zoomControl: false,
	minZoom: 0,
	maxZoom: 21,
	attributionControl: false
});
natgeoUrl = 'http://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}';
natgeoAttrib = 'Map data &copy; National Geographic World Map';

//Plugin magic goes here! Note that you cannot use the same layer object again, as that will confuse the two map controls
natGeo = new L.TileLayer(natgeoUrl, {
	attribution: natgeoAttrib
});

rect1 = {
	color: "#ff1100",
	weight: 3
};
rect2 = {
	color: "#0000AA",
	weight: 1,
	opacity: 0,
	fillOpacity: 0
};
miniMap = new L.Control.MiniMap(natGeo, {
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

map.on("layeradd", updateAttribution);
map.on("layerremove", updateAttribution);
//map.addControl(attributionControl);

attributionControl = L.control({
	position: "bottomleft"
});
attributionControl.onAdd = function (map) {
	var div = L.DomUtil.create("div", "leaflet-control-attribution");
	div.innerHTML = "<span class='hidden-xs'>Source: FEMA Hazards and Performance Analysis (HPA) | </span><a href='' onclick='$(\"#attributionModal\").modal(\"show\"); return false;'>Attribution</a>";
	return div;
};

zoomControl = L.control.zoom({
	position: "topleft"
}).addTo(map);

/* Larger screens get expanded layer control and visible sidebar */
if (document.body.clientWidth <= 767) {
	var isCollapsed = true;
} else {
	var isCollapsed = false;
}


ctlScale = L.control.scale({
	position: 'bottomleft',
	updateWhenIdle: false,
	metric: false,
	maxWidth: 200
}).addTo(map);

//var usngcoords =L.control.mouseCoordinate({
//	gpsLong: false,
//	utm: false,
//	utmref: true
//}).addTo(map);


// Leaflet patch to make layer control scrollabel on touch browsers
//var container = $(".leaflet-control-layers")[0];
//if (!L.Browser.touch) {
//	L.DomEvent
//		.disableClickPropagation(container)
//		.disableScrollPropagation(container);
//} else {
//	L.DomEvent.disableClickPropagation(container);
//}


function updateAttribution(e) {
	$.each(map._layers, function (index, layer) {
		if (layer.getAttribution) {
			$("#attribution").html((layer.getAttribution()));
		}
	});
}

function zoomToFeature(e) {
	window.open(e.target.feature.properties.win_url);
}

function onEachFeature(feature, layer) {
	layer.on({
		mouseover: highlightFeature,
		mouseout: resetHighlight,
		click: zoomToFeature
	});
}

function resetHighlight(e) {
	lyrPop.resetStyle(e.target);

}

function highlightFeature(e) {
	var layer = e.target;

	layer.setStyle({
		weight: 4,
		color: 'cyan',
		dashArray: '1',
		fillOpacity: 0.3,
		fillColor: 'cyan',
		Opacity: 1,
	});
}

function zoomToFeaturenhd(e) {
	window.open(e.target.feature.properties.win_url);
}

function resetHighlightnhd(e) {
	lyrnhd.resetStyle(e.target);

}

function highlightFeaturenhd(e) {
	var layer = e.target;

	layer.setStyle({
		weight: 4,
		color: 'yellow',
	});
}
function sizeLayerControl() {
	$(".leaflet-control-layers").css("max-height", $("#map").height() - 50);
}
function animateSidebar() {
	$("#sidebar").animate({
		width: "toggle"
	}, 500, function () {
		map.invalidateSize();
	});
}