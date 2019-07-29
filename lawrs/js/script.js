
function lamaskStyle(feature) {
	return {
		fillColor: "#000",
		weight: 2,
		opacity: 1,
		color: 'white',
		fillOpacity: 1
	}
}


function lawrsStyle(feature) {
	return {
		fillColor: "darkred",
		weight: 1,
		opacity: 1,
		color: 'darkred',
		dashArray: 4,
		fillOpacity: 0.2
	}
}

function highlightFeature(e) {
	var layer = e.target;

	layer.setStyle({
		weight: 2,
		color: 'white',
		dashArray: '',
		fillOpacity: 1,
		fillColor: 'red'
	});

	if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
		layer.bringToFront();
	}

	info1.update(layer.feature.properties);
}

function resetHighlight(e) {
	lawrsLayer.resetStyle(e.target);
	info1.update();
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

var map = L.map('map', {
	center: [31.200001, -91.75001],
	zoom: [8],
	zoomControl: false,
	minZoom: 5,
	maxZoom: 10,
    attributionControl: false
});
map.setMaxBounds(map.getBounds().pad(0.2));
map.createPane('labels');
map.getPane('labels').style.zIndex = 650;
map.getPane('labels').style.pointerEvents = 'none';

var Hydda_Full = L.tileLayer('http://{s}.tile.openstreetmap.se/hydda/full/{z}/{x}/{y}.png', {
	maxZoom: 18,
}).addTo(map);
var marker = new L.marker([30.790432, -90.905637], { opacity: 0.01 }); //opacity may be set to zero
marker.bindTooltip("Amite", {direction: 'center',permanent: true, className: "watershed-label", offset: [0, 0] });
marker.addTo(map);
var marker = new L.marker([32.082076, -93.590285], { opacity: 0.01 }); //opacity may be set to zero
marker.bindTooltip("Bayou Pierre", {direction: 'center',permanent: true, className: "watershed-label", offset: [0, 0] });
marker.addTo(map);
var marker = new L.marker([30.891694, -91.325971], { opacity: 0.01 }); //opacity may be set to zero
marker.bindTooltip("Bayou Sara<br>-Thompson", {direction: 'center',permanent: true, className: "watershed-label", offset: [0, 0] });
marker.addTo(map);
var marker = new L.marker([30.691971, -92.102632], { opacity: 0.01 }); //opacity may be set to zero
marker.bindTooltip("Bayou Teche", {direction: 'center',permanent: true, className: "watershed-label", offset: [0, 0] });
marker.addTo(map);
var marker = new L.marker([32.744169, -91.674488], { opacity: 0.01 }); //opacity may be set to zero
marker.bindTooltip("Boeuf", {direction: 'center',direction: 'center',permanent: true, className: "watershed-label", offset: [0, 0] });
marker.addTo(map);
var marker = new L.marker([31.14585, -90.241198], { opacity: 0.01 }); //opacity may be set to zero
marker.bindTooltip("Bogue Chitto", {direction: 'center', direction: 'center',permanent: true, className: "watershed-label", offset: [0, 0] });
marker.addTo(map);
var marker = new L.marker([32.789315, -93.980338], { opacity: 0.01 }); //opacity may be set to zero
marker.bindTooltip("Cross Bayou", {direction: 'center',permanent: true, className: "watershed-label", offset: [0, 0] });
marker.addTo(map);
var marker = new L.marker([30.115288, -90.636171], { opacity: 0.01 }); //opacity may be set to zero
marker.bindTooltip("Lake Maurepas", {direction: 'center',permanent: true, className: "watershed-label", offset: [0, 0] });
marker.addTo(map);
var marker = new L.marker([30.499898, -90.044499], { opacity: 0.01 }); //opacity may be set to zero
marker.bindTooltip("Liberty Bayou<br>-Tchefuncta", {direction: 'center',permanent: true, className: "watershed-label", offset: [0, 0] });
marker.addTo(map);
var marker = new L.marker([32.91972, -93.330729], { opacity: 0.01 }); //opacity may be set to zero
marker.bindTooltip("Loggy Bayou", {direction: 'center',permanent: true, className: "watershed-label", offset: [0, 0] });
marker.addTo(map);
var marker = new L.marker([30.42313, -91.394159], { opacity: 0.01 }); //opacity may be set to zero
marker.bindTooltip("Lower Grand", {direction: 'center',permanent: true, className: "watershed-label", offset: [0, 0] });
marker.addTo(map);
var marker = new L.marker([32.15433, -92.029], { opacity: 0.01 }); //opacity may be set to zero
marker.bindTooltip("Lower Ouachita", {direction: 'center',permanent: true, className: "watershed-label", offset: [0, 0] });
marker.addTo(map);
var marker = new L.marker([30.864644, -89.759959], { opacity: 0.01 }); //opacity may be set to zero
marker.bindTooltip("Lower Pearl", {direction: 'center',permanent: true, className: "watershed-label", offset: [0, 0] });
marker.addTo(map);
var marker = new L.marker([31.562497, -92.908332], { opacity: 0.01 }); //opacity may be set to zero
marker.bindTooltip("Lower Red-<br>Lake Latt", {direction: 'center',permanent: true, className: "watershed-label", offset: [0, 0] });
marker.addTo(map);
var marker = new L.marker([30.761337, -93.655608], { opacity: 0.01 }); //opacity may be set to zero
marker.bindTooltip("Lower Sabine", {direction: 'center',permanent: true, className: "watershed-label", offset: [0, 0] });
marker.addTo(map);
var marker = new L.marker([29.925445, -92.630405], { opacity: 0.01 }); //opacity may be set to zero
marker.bindTooltip("Mermentau", {direction: 'center',permanent: true, className: "watershed-label", offset: [0, 0] });
marker.addTo(map);
var marker = new L.marker([30.503745, -92.443714], { opacity: 0.01 }); //opacity may be set to zero
marker.bindTooltip("Mermentau<br>Headwaters", {direction: 'center',permanent: true, className: "watershed-label", offset: [0, 0] });
marker.addTo(map);
var marker = new L.marker([32.265588, -93.487225], { opacity: 0.01 }); //opacity may be set to zero
marker.bindTooltip("Middle Red-<br>Coushatta", {direction: 'center',permanent: true, className: "watershed-label", offset: [0, 0] });
marker.addTo(map);
var marker = new L.marker([32.623961, -93.638448], { opacity: 0.01 }); //opacity may be set to zero
marker.bindTooltip("Red Chute", {direction: 'center',permanent: true, className: "watershed-label", offset: [0, 0] });
marker.addTo(map);
var marker = new L.marker([30.857767, -90.430437], { opacity: 0.01 }); //opacity may be set to zero
marker.bindTooltip("Tangipahoa", {direction: 'center',permanent: true, className: "watershed-label", offset: [0, 0] });
marker.addTo(map);
var marker = new L.marker([30.668135, -90.624764], { opacity: 0.01 }); //opacity may be set to zero
marker.bindTooltip("Tickfaw", {direction: 'center',permanent: true, className: "watershed-label", offset: [0, 0] });
marker.addTo(map);
var marker = new L.marker([29.984957, -91.965513], { opacity: 0.01 }); //opacity may be set to zero
marker.bindTooltip("Vermillion", {direction: 'center',permanent: true, className: "watershed-label", offset: [0, 0] });
marker.addTo(map);

var lamaskLayer = L.geoJson(lamask, {
	style: lamaskStyle,
}).addTo(map);
var lawrsLayer = L.geoJson(lawrs, {
	style: lawrsStyle,
	onEachFeature: onEachFeature,
}).addTo(map);
var lamaskLayer = L.geoJson(lamask, {
	style: lamaskStyle,
}).addTo(map);


var info1 = L.control({
	position: 'topleft'
});

info1.onAdd = function (map) {
	this._div = L.DomUtil.create('div', 'infoO');
	this.update();
	return this._div;
};

info1.update = function (props) {
	this._div.innerHTML = "<span class='innerLawrs'>" + '<h1><u>Watershed Study</u></h1>' + (props ?
		'<h2><strong>' +'</strong></h2>'+props.report_url+'<br>'+ 'Total Population: ' + props.hmwa1 + '<br>' + 'IA Registrations: ' + props.hmwa2 + '<br>'+ 'IA Dollar Amount: ' + props.hmwa3 + '<br>'+ 'NFIP Claims: ' + props.hmwa4 + '<br>'+ 'NFIP Claims Dollar Amount: ' + props.hmwa5 + '<br>'+ 'IA Registrants w/NFIP Insurance: ' + props.hmwa6 + '<br>'+ 'NFIP Policies: ' + props.hmwa7 + '<br>'+ 'NFIP Historical Claims: ' + props.hmwa8 + '<br>'+ 'NFIP Historical Dollar Amount: ' + props.hmwa9 + '<br>'+ 'Structures in SFHA: ' + props.hmwa10 + '<br>'+ 'Repetitive Loss Properties: ' + props.hmwa11 + '<br>'+ 'Severe Repetitive Loss Properties: ' + props.hmwa12 + '<br>'+ 'Stream Mileage**: ' + props.hmwa13 + '<br>'+ '115th Congressional Districts: ' + props.hmwa14 + '<br>'+ 'Tribal Lands: ' + props.hmwa15 : 'click watershed to download report.');
};

info1.addTo(map);
var mainreport = L.control({
	position: 'topright'
});
mainreport.onAdd = function (map) {
	this._div = L.DomUtil.create('div', 'infoO');
	this.update();
	return this._div;
};
mainreport.update = function (props) {
	this._div.innerHTML =  '<span id="lawrH"><h4>Louisiana Watershed <br>&nbsp;&nbsp;&nbsp;&nbsp;Resiliency Study</h></span>'+'<div class="mainreport"><a href="http://fema.maps.arcgis.com/sharing/rest/content/items/0b70f40a243849db903d0c650a24f74d/data" target="_blank"><img class="imgMain" src="http://fema.maps.arcgis.com/sharing/rest/content/items/397539b26d5146518fd5246c5bdeb479/data"></a></div>';
};
mainreport.addTo(map);
var downloadData = L.control({
	position: 'bottomright'
});
downloadData.onAdd = function (map) {
	this._div = L.DomUtil.create('div', 'infoO');
	this.update();
	return this._div;
};
downloadData.update = function (props) {
	this._div.innerHTML =  '<span id="lawrH"><h4>Louisiana Watershed <br>&nbsp;&nbsp;&nbsp;&nbsp;Data</h></span>'+'<div class="dldata"><a href="http://fema.maps.arcgis.com/home/item.html?id=b9e679def29c48d5b204bc798abb0748" target="_blank"><img class="imgMain" src="http://www.pngall.com/wp-content/uploads/2/Download-Button-PNG-Image.png"></a></div>';
};
downloadData.addTo(map);

var overlayMaps = {};
L.control.layers(baseMaps, overlayMaps, {
	collapsed: false,
	position: 'topright'
}).addTo(map);
