var mask = omnivore.topojson('data/mask.json').on('ready', function () {
	mask.setStyle({
		fillColor: '#032951',
		color: 'black',
		fillOpacity: 0.6,
		weight: 1.5,
	})
}).addTo(map);
function fld_roadpt_eachLayer(layer) {
	var feature = layer.toGeoJSON();	
	var attr = layer.feature.properties;
	
var placesIcon = L.icon({
    iconUrl: layer.feature.properties.logo_url,
    iconSize: new L.Point(18, 18),
});
	layer.setIcon(placesIcon);
	var fld_roadptTooltip = layer;
	fld_roadptTooltip.bindTooltip(attr.descriptio, {
		className: 'label',
		permanent: false,
		offset: [-60, 20],
		direction: 'center'
	});	
	var fld_roadptPopup = layer;
	fld_roadptPopup.bindPopup("<span font-size='24px'><strong>" + attr.descriptio, {
	});
};

var fld_roadpt = omnivore.csv('data/FloodedRoads0825_0830.csv')
	.on('ready', function () {
    fld_roadpt.eachLayer(fld_roadpt_eachLayer);
	});

var fld_roadline = omnivore.topojson('data/fld_rd_line.json').on('ready', function () {
	fld_roadline.setStyle({
		color: 'red',
		weight: 3.5
	})
});

var interState = omnivore.topojson('data/interstate.json').on('ready', function () {
	interState.setStyle({
		color: 'green',
		weight: 3.5,
		dashArray: 5
	})
});
// var lyrnhdStyle = L.geoJson(null, {
// 	onEachFeature: onEachFeature,
// });
// var lyrnhd = omnivore.topojson('data/nhd.json')
// 	.on('ready', function () {
// 		lyrnhd.eachLayer(function (layer) {
// 			lyrnhd.setStyle({
// 				color: "blue",
// 				smoothFactor: 1,
// 				opacity: 0.8,
// 				weight: 2
// 			});
// 			var nhdTooltip = layer;

// 			nhdTooltip.bindTooltip(layer.feature.properties.GNIS_NAME, {
// 				className: 'watershedtoolClass',
// 				permanent: false,
// 				offset: [10, 0],
// 				sticky: true,
// 				direction: 'right'
// 			})
// 		});
// 	});

// var lyrnhdNull = omnivore.topojson('data/nhd_NULLs.json')
// 	.on('ready', function () {
// 		lyrnhdNull.setStyle({
// 			color: "lightblue",
// 			smoothFactor: 1,
// 			opacity: 0.8,
// 			weight: 1
// 		})
// 	});

// var huc10Bndy = omnivore.topojson('data/aransas_bay_huc10_bndy.json')
// 	.on('ready', function () {
// 		huc10Bndy.setStyle({
// 			color: "#e10000",
// 			opacity: 1,
// 			weight: 2,
// 			dashArray: "5 5"
// 		})
// 	});
// var huc10Label = omnivore.csv('data/aransas_bay_huc10_label.csv', null)
// 	.on('ready', function () {
// 		markerArray = [];
// 		this.eachLayer(function (marker) {
// 			marker.setIcon(L.icon({
// 				iconUrl: 'https://data.femadata.com/Region6/tspws/img/logo/closed.png',
// 				iconSize: 0
// 			}));
// 		});
// 		huc10Label.eachLayer(function (layer) {
// 			var huc10LabelTooltip = layer;
// 			huc10LabelTooltip.bindTooltip(layer.feature.properties.NAME, {
// 				className: 'huc10labelClass',
// 				permanent: true,
// 				offset: [0, 0],
// 				direction: 'center'
// 			});
// 		});
// 	});
// nhdGroup = L.layerGroup([lyrnhd, lyrnhdNull, huc10Bndy, huc10Label]);

var soviimageUrl = 'data/sovi.png',
    soviimageBounds = [[30.5873364382, -94.778532276], [29.9898068262, -94.0865405198]];
var soviLayer = L.imageOverlay(soviimageUrl, soviimageBounds,{opacity:0.7});

var drainageimageUrl = 'data/drainage.png',
    drainageimageBounds = [[30.5873364382, -94.778532276], [29.9898068262, -94.0865405198]];
var drainageLayer = L.imageOverlay(drainageimageUrl, drainageimageBounds,{opacity:0.7});

var fld_freqimageUrl = 'data/fld_freq.png',
    fld_freqimageBounds = [[30.5873364382, -94.778532276], [29.9898068262, -94.0865405198]];
var fld_freqLayer = L.imageOverlay(fld_freqimageUrl, fld_freqimageBounds,{opacity:0.7});

var harvey_fldimageUrl = 'data/harvey_fld.png',
    harvey_fldimageBounds = [[30.5873364382, -94.778532276], [29.9898068262, -94.0865405198]];
var harvey_fldLayer = L.imageOverlay(harvey_fldimageUrl, harvey_fldimageBounds,{opacity:0.7});

var hydrogrpimageUrl = 'data/hydrogrp.png',
    hydrogrpimageBounds = [[30.5873364382, -94.778532276], [29.9898068262, -94.0865405198]];
var hydrogrpLayer = L.imageOverlay(hydrogrpimageUrl, hydrogrpimageBounds,{opacity:0.7});

var hydricimageUrl = 'data/hydric.png',
    hydricimageBounds = [[30.5873364382, -94.778532276], [29.9898068262, -94.0865405198]];
var hydricLayer = L.imageOverlay(hydricimageUrl, hydricimageBounds,{opacity:0.7});

var sfhaimageUrl = 'data/sfha.png',
    sfhaimageBounds = [[30.5873364382, -94.778532276], [29.9898068262, -94.0865405198]];
var sfhaLayer = L.imageOverlay(sfhaimageUrl, sfhaimageBounds,{opacity:0.7});

var geologyimageUrl = 'data/geology.png',
    geologyimageBounds = [[30.5873364382, -94.778532276], [29.9898068262, -94.0865405198]];
var geologyLayer = L.imageOverlay(geologyimageUrl, geologyimageBounds,{opacity:0.7});

var nfip_claimsimageUrl = 'data/nfip_claims.png',
    nfip_claimsimageBounds = [[30.5873364382, -94.778532276], [29.9898068262, -94.0865405198]];
var nfip_claimsLayer = L.imageOverlay(nfip_claimsimageUrl, nfip_claimsimageBounds,{opacity:0.7});

var popimageUrl = 'data/pop1km.png',
    popimageBounds = [[30.5873364382, -94.778532276], [29.9898068262, -94.0865405198]];
var popLayer = L.imageOverlay(popimageUrl, popimageBounds,{opacity:0.7});

var waterbodiesimageUrl = 'data/waterbodies.png',
    waterbodiesimageBounds = [[30.5873364382, -94.778532276], [29.9898068262, -94.0865405198]];
var waterbodiesLayer = L.imageOverlay(waterbodiesimageUrl, waterbodiesimageBounds,{opacity:0.7});

var wetlandsimageUrl = 'data/wetlands.png',
    wetlandsimageBounds = [[30.5873364382, -94.778532276], [29.9898068262, -94.0865405198]];
var wetlandsLayer = L.imageOverlay(wetlandsimageUrl, wetlandsimageBounds,{opacity:0.7});

 var huc12Label = omnivore.csv('data/huc12pt.csv', null)
 	.on('ready', function () {
 		markerArray = [];
 		this.eachLayer(function (marker) {
 			marker.setIcon(L.icon({
 				iconUrl: 'https://data.femadata.com/Region6/tspws/img/logo/closed.png',
 				iconSize: 0
 			}));
 		});
 		huc12Label.eachLayer(function (layer) {
 			var huc12LabelTooltip = layer;
 			huc12LabelTooltip.bindTooltip(layer.feature.properties.NAME, {
 				className: 'huc12labelClass',
 				permanent: true,
 				offset: [0, 0],
 				direction: 'center'
 			});
 		});
 	});

var huc12imageUrl = 'data/huc12.png',
    huc12imageBounds = [[30.5873364382, -94.778532276], [29.9898068262, -94.0865405198]];
var huc12image = L.imageOverlay(huc12imageUrl, huc12imageBounds,{opacity:1.0});


var huc12Layer = L.layerGroup([huc12image, huc12Label]).addTo(map);

var elevimageUrl = 'data/elev.png',
    elevimageBounds = [[28.603069, -97.510244], [27.801212, -96.600126]];
var elevLayer = L.imageOverlay(elevimageUrl, elevimageBounds,{opacity:1.0});

var lndcvrimageUrl = 'data/lndcvr.png',
    lndcvrimageBounds = [[30.5873364382, -94.778532276], [29.9898068262, -94.0865405198]];
var lndcvrLayer = L.imageOverlay(lndcvrimageUrl, lndcvrimageBounds,{opacity:0.7});

var iaAppimageUrl = 'data/iaapp.png',
    iaAppimageBounds = [[30.5873364382, -94.778532276], [29.9898068262, -94.0865405198]];
var iaAppLayer = L.imageOverlay(iaAppimageUrl, iaAppimageBounds,{opacity:0.7});




