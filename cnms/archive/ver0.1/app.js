const cntyUrl = "https://tigerweb.geo.census.gov/arcgis/rest/services/TIGERweb/State_County/MapServer/19";
const streamsUrl = "https://services.arcgis.com/XG15cJAlne2vxtgt/arcgis/rest/services/S_Studies_Ln0930201/FeatureServer/0";
const UnmappedStreamsUrl = "https://services.arcgis.com/XG15cJAlne2vxtgt/arcgis/rest/services/S_Unmapped_Ln06302021/FeatureServer/0";

const map = L.map('map', {
    attributionControl: false,
    zoomSnap: 0.1,
    zoomDelta: 0.1
}).setView([32, -99], 6);

const groupLayers = L.layerGroup([]).addTo(map);
const selectedAoi = L.layerGroup([]).addTo(map);
const selectedData = L.layerGroup([]).addTo(map);
const results = L.layerGroup().addTo(map);

var google_hybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
    maxZoom: 21,
    attribution: '&copy; <a href="http://www.google.com">Google</a>',
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
}).addTo(map);

var style1 = {
    color: 'white',
    fillColor: 'white',
    dashArray: 3,
    fillOpacity: 0.15,
    weight: 1
};
var style2 = {
    color: 'black',
    fillColor: 'black',
    dashArray: 3,
    fillOpacity: 0.15,
    weight: 1
};
var cntyLayer = L.esri.featureLayer({
    url: cntyUrl,
    where: "STATE IN ( '48', '05', '40', '22', '35')",
    simplifyFactor: 0.35,
    precision: 5,
    style: style1,
});
document.getElementById("queryCnty").addEventListener("click", function (e) {
    document.querySelector(".splash").classList.add("hide");
    document.querySelector(".splash-bg").classList.add("hide");
    groupLayers.addLayer(cntyLayer);
});









var queryAoiCnty = function queryaoiCnty(feature) {
    cntyAoi_ = L.esri.query({
        url: cntyUrl
    }).where("OID = " + feature.properties.OID + "").run(function (error, featureCollection) {
        var aoi_select = L.geoJSON(featureCollection).setStyle({
            color: 'yellow',
            fillOpacity: 0.0,
            stroke: 5,
            interactive: false,
        }).addTo(selectedAoi);
        map.fitBounds(aoi_select.getBounds().pad(0.05));
    });
};    
var queryCnmsMapped = function (feature) {
    var streamsQueryAll = L.esri.query({
        url: streamsUrl
    }).where("CO_FIPS = '" + feature.properties.GEOID + "'").run(function (error, featureCollection) {
        var cnms_ = L.geoJSON(featureCollection).addTo(groupLayers);
        console.log(featureCollection.features);
        var sumTotal = 0;
        for (var i = 0; i < featureCollection.features.length; i++) {
            if (featureCollection.features[i].properties.MILES > 0) {
                sumTotal += featureCollection.features[i].properties.MILES;
            } else {
                sumTotal = 0;
            }
        }
        var totalTitleCnty = document.querySelector(".titleTotalAll");
        totalTitleCnty.innerHTML = "<b><span style='font-size:1.075rem;'>" + feature.properties
            .BASENAME + "</span><br><br>Total Miles Effective: <br></b>" + sumTotal;

    });
}

var queryCnty_validA = function(feature) {
    var test = L.esri.query({
        url: streamsUrl
    });
    test.where("CO_FIPS = '" + feature.properties.GEOID +
        "' AND VALIDATION = 'VALID' AND FLD_ZONE = 'A'"
    );
    test.run(function (error, featureCollection) {
        var sumTotal_validA = 0;
        for (var i = 0; i < featureCollection.features.length; i++) {
            if (featureCollection.features[i].properties.MILES > 0) {
                sumTotal_validA += featureCollection.features[i].properties.MILES;
            } else {
                sumTotal_validA = 0;
            }
        }
        var validATotal = document.querySelector(".validATotal");
        validATotal.innerHTML = "<hr><b>Effective (miles) Valid A zone: <br></b><span id='sum2'>" +
            sumTotal_validA + "</span>";
        document.getElementById("a_table_valid").innerHTML = sumTotal_validA.toFixed(1);
    });
}
var queryCnty_validAe = function (feature) {
	L.esri.query({
		url: streamsUrl
	}).where("CO_FIPS = '" + feature.properties.GEOID +
		"' AND VALIDATION = 'VALID' AND FLD_ZONE = 'AE'"
	).run(function (error, featureCollection) {
		var sumTotal_validAe = 0;
		for (var i = 0; i < featureCollection.features.length; i++) {
			if (featureCollection.features[i].properties.MILES > 0) {
				sumTotal_validAe += featureCollection.features[i].properties.MILES;
			} else {
				sumTotal_validAe = 0;
			}
		}
		var validAeTotal = document.querySelector(".validAeTotal");
		validAeTotal.innerHTML = "<hr><b>Effective (miles) Valid AE zone: <br></b><span id='sum3'>" + sumTotal_validAe + "</span>";

		document.getElementById("ae_table_valid").innerHTML = sumTotal_validAe.toFixed(1);
	});
}

var queryCnty_CompA = function (feature) {
	L.esri.query({
		url: streamsUrl
	}).where("CO_FIPS = '" + feature.properties.GEOID +
		"' AND FLD_ZONE = 'A'"
	).run(function (error, featureCollection) {
		var sumTotal4 = 0;
		for (var i = 0; i < featureCollection.features.length; i++) {
			if (featureCollection.features[i].properties.MILES > 0) {
				sumTotal4 += featureCollection.features[i].properties.MILES;
			} else {
				sumTotal4 = 0;
			}
		}
		var compATotal = document.querySelector(".compATotal");
		compATotal.innerHTML = "<hr><b>At Completion (miles) Valid A Zone: <br></b>" + "<span id='sum4'>" + sumTotal4 + "</span>";		

		document.getElementById("a_table_atcomp_valid").innerHTML = sumTotal4.toFixed(1);
	});

}
var queryCnty_CompAe = function (feature) {
	L.esri.query({
		url: streamsUrl
	}).where("CO_FIPS = '" + feature.properties.GEOID +
		"' AND FLD_ZONE = 'AE'"
	).run(function (error, featureCollection) {
		var sumTotal = 0;
		for (var i = 0; i < featureCollection.features.length; i++) {
			if (featureCollection.features[i].properties.MILES > 0) {
				sumTotal += featureCollection.features[i].properties.MILES;
			} else {
				sumTotal = 0;
			}
		}
		var compAeTotal = document.querySelector(".compAeTotal");
		compAeTotal.innerHTML = "<hr><b>At Completion (miles) Valid AE Zone: <br></b>" + "<span id='sum5'>" + sumTotal + "</span>";
		document.getElementById("ae_table_atcomp_valid").innerHTML = sumTotal.toFixed(1);
	});
}
var queryCntyeffAeFldway = function (feature) {
	L.esri.query({
		url: streamsUrl
	}).where("CO_FIPS = '" + feature.properties.GEOID +
		"' AND VALIDATION = 'VALID' AND FLD_ZONE = 'AE' AND FLDYWAY = 1"
	).run(function (error, featureCollection) {
		var sumTotal = 0;
		for (var i = 0; i < featureCollection.features.length; i++) {
			if (featureCollection.features[i].properties.MILES > 0) {
				sumTotal += featureCollection.features[i].properties.MILES;
			} else {
				sumTotal = 0;
			}
		}
		var effAeFldwayTotal = document.querySelector(".effAeFldwayTotal");
		effAeFldwayTotal.innerHTML = "<hr><b>Effective (miles) Valid AE zone with Floodway: <br></b>" + "<span id='sum6'>" + sumTotal + "</span>";
		document.getElementById("aewFw_table_valid").innerHTML = sumTotal.toFixed(1);
	});
}
var queryCntyeffAeCompFldway = function (feature) {
	L.esri.query({
		url: streamsUrl
	}).where("CO_FIPS = '" + feature.properties.GEOID +
		"' AND FLD_ZONE = 'AE' AND FLDYWAY = 1"
	).run(function (error, featureCollection) {
		var sumTotal = 0;
		for (var i = 0; i < featureCollection.features.length; i++) {
			if (featureCollection.features[i].properties.MILES > 0) {
				sumTotal += featureCollection.features[i].properties.MILES;
			} else {
				sumTotal = 0;
			}
		}
		var effAeCompFldwayTotal = document.querySelector(".effAeCompFldwayTotal");
		effAeCompFldwayTotal.innerHTML = "<hr><b>At Completion (miles) Valid AE Zone with Floodway: <br></b>" + "<span id='sum7'>" + sumTotal + "</span>";

		document.getElementById("aewFw_table_atcomp_valid").innerHTML = sumTotal.toFixed(1);
	});
}
var queryUnmappedCnty = function (feature) {
	var streamsQueryAll = L.esri.query({
		url: UnmappedStreamsUrl
	}).where("CO_FIPS = '" + feature.properties.GEOID+"'").run(function (error, featureCollection) {
		var steams_ = L.geoJSON(featureCollection, {
			style: {
				color: 'gray',
				opacity: 1
			},

			// onEachFeature: onEachFeature
		}).addTo(selectedData);

        var sumTotal = 0;
		for (var i = 0; i < featureCollection.features.length; i++) {
			if (featureCollection.features[i].properties.MILES > 0) {
				sumTotal += featureCollection.features[i].properties.MILES;
			} else {
				sumTotal = 0;
			}
		}
		var unmappedTotal = document.querySelector(".unmappedTotal");
		// var test7 = document.getElementById("legendNum13");
		unmappedTotal.innerHTML = "<hr><b>At Completion (miles) Valid Not Mapped: <br></b>" + sumTotal;
		unmappedTotal.innerHTML = sumTotal.toFixed(1);
		document.getElementById("notmapped_table_atcomp_valid").innerHTML = sumTotal.toFixed(1);
		document.getElementById("notmapped_table_delta_valid").innerHTML = "+" +sumTotal.toFixed(1);


    });
}












cntyLayer.on('click', function (evt) {
    queryAoiCnty(evt.layer.feature);
    queryCnmsMapped(evt.layer.feature);
    queryCnty_validA(evt.layer.feature);
    queryCnty_validAe(evt.layer.feature);
    queryCnty_CompA(evt.layer.feature);
    queryCnty_CompAe(evt.layer.feature);
    queryCntyeffAeFldway(evt.layer.feature);
    queryCntyeffAeCompFldway(evt.layer.feature);
    queryUnmappedCnty(evt.layer.feature);

    setTimeout(function(){
    document.querySelector(".table-container").classList.remove("hide");
    },2000);

    var selectedGroupnumbersAoi = selectedAoi.getLayers();
    if (selectedGroupnumbersAoi.length >= 1) {
        selectedAoi.clearLayers();
    }
    var selectedGroupnumbersData = selectedData.getLayers();
    if (selectedGroupnumbersData.length >= 1) {
        selectedData.clearLayers();
    }
    groupLayers.clearLayers();
    results.clearLayers();
});

///////////// SEARCH CONTROL
var cntyProvider = L.esri.Geocoding.featureLayerProvider({
    url: cntyUrl,
    searchFields: ['BASENAME'],
    label: 'County or Parish',
    bufferRadius: 5,
    maxResults: 100,
    formatSuggestion: function (feature) {
        return feature.properties.NAME;
    }
});
cntyProvider.orderBy("BASENAME", "DESC");
var searchControlCnty = L.esri.Geocoding.geosearch({
    placeholder: 'Enter County or Parish Name',
    providers: [cntyProvider],
    expanded: true,
}).addTo(map);

searchControlCnty.on('results', function (data) {
    results.clearLayers();
    if (groupLayers.hasLayer(cntyLayer)) {

    } else {
        groupLayers.removeLayer(cntyLayer);
        groupLayers.addLayer(cntyLayer);

    }
    for (var i = data.results.length - 1; i >= 0; i--) {
        results.addLayer(L.marker(data.results[i].latlng));
    }
});