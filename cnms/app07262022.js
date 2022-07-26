// L.Path.mergeOptions({
// 	dashSpeed: 0
// });
var _originalBeforeAdd = L.Path.prototype.beforeAdd;

L.Path.include({

	beforeAdd: function (m) {
		_originalBeforeAdd.bind(this)(m);

		if (this.options.dashSpeed) {
			this._lastDashFrame = performance.now();
			this._dashFrame = L.Util.requestAnimFrame(this._onDashFrame.bind(this));
		}
	},

	_onDashFrame: function () {
		if (!this._renderer) {
			return;
		}

		var now = performance.now();
		var dashOffsetDelta = (now - this._lastDashFrame) * this.options.dashSpeed / 1000;

		this.options.dashOffset = Number(this.options.dashOffset || 0) + dashOffsetDelta;
		this._renderer._updateStyle(this);

		this._lastDashFrame = performance.now();

		this._dashFrame = L.Util.requestAnimFrame(this._onDashFrame.bind(this));
	}

});
const cntyUrl = "https://services.arcgis.com/XG15cJAlne2vxtgt/arcgis/rest/services/watch_designated_cnty/FeatureServer/0";
const huc8Url = "https://services.arcgis.com/XG15cJAlne2vxtgt/arcgis/rest/services/r6_huc8_cnms/FeatureServer/0";
const comUrl = "https://services.arcgis.com/XG15cJAlne2vxtgt/arcgis/rest/services/R6_census_community/FeatureServer/0";
const streamsUrl = "https://services.arcgis.com/XG15cJAlne2vxtgt/arcgis/rest/services/S_Studies_Ln06302022/FeatureServer/0";
const UnmappedStreamsUrl = "https://services.arcgis.com/XG15cJAlne2vxtgt/arcgis/rest/services/S_Unmapped_Ln06302022/FeatureServer/0";
let query = null;
let aoiUrl = null;
let objectid_ = null;

const map = L.map('map', {
    attributionControl: false,
    zoomControl: false,
    zoomSnap: 0.1,
    zoomDelta: 0.1,
    boxZoom: true,
    minZoom: 5
}).setView([31.6, -99.5], 6);
map.setMaxBounds(map.getBounds().pad(0.2));
const nfhl = L.esri.dynamicMapLayer({
    url: "https://hazards.fema.gov/gis/nfhl/rest/services/public/NFHL/MapServer/"
});
const prelim = L.esri.dynamicMapLayer({
    url: "https://hazards.fema.gov/gis/nfhl/rest/services/PrelimPending/Prelim_NFHL/MapServer"
});
const pending = L.esri.dynamicMapLayer({
    url: "https://hazards.fema.gov/gis/nfhl/rest/services/PrelimPending/Pending_NFHL/MapServer"
});
const draft = L.esri.dynamicMapLayer({
    url: "https://hazards.fema.gov/gis/nfhl/rest/services/AFHI/Draft_FIRM_DB/MapServer"
});

const baseMapLayers = L.layerGroup([]).addTo(map);
const groupLayers = L.layerGroup([]).addTo(map);
const supportLayers = L.layerGroup([]).addTo(map);
const selectedAoi = L.layerGroup([]).addTo(map);
const selectedData = L.layerGroup([]).addTo(map);
const results = L.layerGroup().addTo(map);
var google_hybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
    maxZoom: 21,
    attribution: '&copy; <a href="http://www.google.com">Google</a>',
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
}).addTo(baseMapLayers);
var OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,

    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
var Esri_DeLorme = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Specialty/DeLorme_World_Base_Map/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Copyright: &copy;2012 DeLorme',
	minZoom: 1,
	maxZoom: 11
});
var USGS_USImageryTopo = L.tileLayer('https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryTopo/MapServer/tile/{z}/{y}/{x}', {
	maxZoom: 20,
	attribution: 'Tiles courtesy of the <a href="https://usgs.gov/">U.S. Geological Survey</a>'
});
var Esri_WorldShadedRelief = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri',
	maxZoom: 13
});
var HikeBike_HillShading = L.tileLayer('https://tiles.wmflabs.org/hillshading/{z}/{x}/{y}.png', {
	maxZoom: 15,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
// var CartoDB_DarkMatterNoLabels = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png', {
// 	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
// 	subdomains: 'abcd',
// 	maxZoom: 20
// }).addTo(map);
document.getElementById("googleEarth").onclick = function(e){
    baseMapLayers.clearLayers();
    baseMapLayers.addLayer(google_hybrid);
}
document.getElementById("googleTerrain").onclick = function(e){
    baseMapLayers.clearLayers();
    baseMapLayers.addLayer(Esri_WorldShadedRelief);
}
document.getElementById("usgsTopoEarth").onclick = function(e){
    baseMapLayers.clearLayers();
    baseMapLayers.addLayer(HikeBike_HillShading);
}
var legendCtrl = L.control({
	position: 'bottomright'
});
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
const cntyLayer = L.esri.featureLayer({
    url: cntyUrl,
    // where: "STATE IN ( '48', '05', '40', '22', '35')",
    simplifyFactor: 0.35,
    precision: 5,
    style: style1,
});
const huc8Layer = L.esri.featureLayer({
    url: huc8Url,
    simplifyFactor: 0.35,
    precision: 5,
    style: style1,
});
const comLayer = L.esri.featureLayer({
    url: comUrl,
    simplifyFactor: 0.35,
    precision: 5,
    style: style1,
});
var myStyle = {
    "color": "black",
    "weight": 2,
    "fillOpacity": 0.65
};
L.geoJSON(state_mask, {
    style: myStyle,
    interactive: false
}).addTo(map);

document.getElementById("queryCnty").addEventListener("click", function (e) {
    document.querySelector(".splash").classList.add("hide");
    document.querySelector(".splash-bg").classList.add("hide");
    groupLayers.clearLayers();
    groupLayers.addLayer(cntyLayer);
    query = 0;
    aoiUrl = 0;
    objectid_ = 0;
    searchControlCnty.addTo(map);
    searchControlHuc8.remove(map);
    searchControlCom.remove(map);
});
document.getElementById("queryHuc8").addEventListener("click", function (e) {
    document.querySelector(".splash").classList.add("hide");
    document.querySelector(".splash-bg").classList.add("hide");
    groupLayers.clearLayers();
    groupLayers.addLayer(huc8Layer);
    query = 1;
    aoiUrl = 1;
    objectid_ = 1;
    searchControlCnty.remove(map);
    searchControlHuc8.addTo(map);
    searchControlCom.remove(map);
});
document.getElementById("queryCom").addEventListener("click", function (e) {
    document.querySelector(".splash").classList.add("hide");
    document.querySelector(".splash-bg").classList.add("hide");
    groupLayers.clearLayers();
    groupLayers.addLayer(comLayer);
    query = 2;
    aoiUrl = 2;
    objectid_ = 2;
    searchControlCnty.remove(map);
    searchControlHuc8.remove(map);
    searchControlCom.addTo(map);
});
var queryAoi = function queryaoi(feature) {
    if (objectid_ == 0) {
        objectid_ = "GEOID = " + feature.properties.GEOID;
        objectid_2 = "GEOID <> " + feature.properties.GEOID;
    } else if (query == 1) {
        objectid_ = "OBJECTID = " + feature.properties.OBJECTID;
        objectid_2 = "OBJECTID <> " + feature.properties.OBJECTID;
    } else if (query == 2) {
        objectid_ = "OBJECTID = " + feature.properties.OBJECTID;
        objectid_2 = "OBJECTID <> " + feature.properties.OBJECTID;
    }
    if (aoiUrl == 0) {
        aoiUrl = cntyUrl;
    } else if (query == 1) {
        aoiUrl = huc8Url;
    } else if (query == 2) {
        aoiUrl = comUrl;
    }




    L.esri.query({
        url: aoiUrl
    }).where(objectid_).run(function (error, featureCollection) {
        // var stripes = new L.StripePattern({
        //     spaceColor: 'yellow',
        //     spaceOpacity: 1,
        //     fillOpacity: 0,
        //     weight: 4,
        //     angle: 45
        // });
        // stripes.addTo(map);
        console.log(objectid_2)
        L.esri.featureLayer({url:aoiUrl,where:objectid_2,
            style:{color: 'black',
            fillColor: 'black',
            simplifyFactor: 0.35,
            precision: 5,
            fillOpacity: 0.65,
            weight: 0} 
            }).addTo(selectedAoi);
            map.createPane('aoiIndex');
            map.getPane('aoiIndex').style.zIndex = 750;
        var aoi_select = L.geoJSON(featureCollection).setStyle({
            color: 'yellow',
                dashArray: "3,12",
            dashSpeed: -35,
            fillOpacity: 0,
            // fillPattern: stripes,
             weight: 3.5,
            pane: 'aoiIndex',
            interactive: false,
        }).addTo(selectedAoi);

        map.fitBounds(aoi_select.getBounds().pad(0.05));
    });


};
var queryCnmsMapped = function (feature) {
    let titleName = null;
    if (query == 0) {
        query = "CO_FIPS = '" + feature.properties.GEOID + "'";
        titleName = feature.properties.NAME;
    } else if (query == 1) {
        query = "HUC8_KEY = " + feature.properties.HUC8;
        titleName = feature.properties.HUC_NM + " (" + feature.properties.HUC8 + ")";
    } else if (query == 2) {
        query = "CID = '" + feature.properties.CID + "'"
        titleName = feature.properties.COMMUNITY_ + ", " + feature.properties.STATE;
    }
    var streamsQueryAll = L.esri.query({
        url: streamsUrl
    }).where(query).run(function (error, featureCollection) {
        var cnms_ = L.geoJSON(featureCollection, {
            style: function (feature) {
                if (feature.properties.VALIDATION === 'ASSESSED' && feature.properties.STATUS_TYP === 'BEING STUDIED') {
                    return {
                        color: '#76FCED',
                        weight: 2
                    };
                } else if (feature.properties.VALIDATION === 'ASSESSED' && feature.properties.STATUS_TYP === 'DEFERRED') {
                    return {
                        color: '#0AC4F8',
                        weight: 2
                    };
                } else if (feature.properties.VALIDATION === 'ASSESSED' && feature.properties.STATUS_TYP === 'TO BE STUDIED') {
                    return {
                        color: '#008EF8',
                        weight: 2
                    };
                } else if (feature.properties.VALIDATION === 'UNKNOWN' && feature.properties.STATUS_TYP === 'BEING STUDIED') {
                    return {
                        color: '#680397',
                        weight: 2
                    };
                } else if (feature.properties.VALIDATION === 'UNKNOWN' && feature.properties.STATUS_TYP === 'BEING ASSESSED') {
                    return {
                        color: '#A012E2',
                        weight: 2
                    };
                } else if (feature.properties.VALIDATION === 'UNKNOWN' && feature.properties.STATUS_TYP === 'TO BE ASSESSED') {
                    return {
                        color: '#AF4DDD',
                        weight: 2
                    };
                } else if (feature.properties.VALIDATION === 'UNKNOWN' && feature.properties.STATUS_TYP === 'DEFERRED') {
                    return {
                        color: '#CB96E3',
                        weight: 2
                    };
                } else if (feature.properties.VALIDATION === 'UNVERIFIED' && feature.properties.STATUS_TYP === 'BEING STUDIED') {
                    return {
                        color: 'orange',
                        weight: 2
                    };
                } else if (feature.properties.VALIDATION === 'UNVERIFIED' && feature.properties.STATUS_TYP === 'TO BE STUDIED') {
                    return {
                        color: 'red',
                        weight: 2
                    };
                } else if (feature.properties.VALIDATION === 'VALID' && feature.properties.STATUS_TYP === 'BEING ASSESSED') {
                    return {
                        color: 'lightgreen',
                        weight: 2
                    };
                } else if (feature.properties.VALIDATION === 'VALID' && feature.properties.STATUS_TYP === 'BEING STUDIED') {
                    return {
                        color: 'lime',
                        weight: 2
                    };
                } else if (feature.properties.VALIDATION === 'VALID' && feature.properties.STATUS_TYP === 'NVUE COMPLIANT') {
                    return {
                        color: 'green',
                        weight: 2
                    };
                } else {
                    return {
                        color: 'white',
                        weight: 2
                    };
                }
            }
        }).addTo(groupLayers);
        let sumTotal = 0;
        for (let i = 0; i < featureCollection.features.length; i++) {
            if (featureCollection.features[i].properties.MILES > 0) {
                sumTotal += featureCollection.features[i].properties.MILES;
            } else {
                sumTotal = 0;
            }
        }
        // let newTotal = sumTotal.toFixed(1);
        document.getElementById("table-title").innerHTML = "<b>" + titleName + " | Total Mapped Miles: " + sumTotal.toFixed(1) + "</b>";

    });
    setTimeout(function(e){

    
	L.esri.query({
		url: streamsUrl
	}).where(query
		+"AND VALIDATION = 'ASSESSED' AND STATUS_TYP = 'BEING STUDIED'"
	).run(function (error, featureCollection) {
		var assessedBeingStudied = 0;

		for (var i = 0; i < featureCollection.features.length; i++) {
			if (featureCollection.features[i].properties.MILES > 0) {
				assessedBeingStudied += featureCollection.features[i].properties.MILES;
			} else {
				assessedBeingStudied = 0;
			}
		}
		var assessedBeingStudied_ = document.getElementById("legendNum1");
		assessedBeingStudied_.innerHTML = assessedBeingStudied.toFixed(1);
	});
	L.esri.query({
		url: streamsUrl
	}).where(query
		+"AND VALIDATION = 'ASSESSED' AND STATUS_TYP = 'DEFERRED'"
	).run(function (error, featureCollection) {
		var assessedDefered = 0;

		for (var i = 0; i < featureCollection.features.length; i++) {
			if (featureCollection.features[i].properties.MILES > 0) {
				assessedDefered += featureCollection.features[i].properties.MILES;
			} else {
				assessedDefered = 0;
			}
		}
		var assessedDefered_ = document.getElementById("legendNum2");
		assessedDefered_.innerHTML = assessedDefered.toFixed(1);
	});
	L.esri.query({
		url: streamsUrl
	}).where(query
		+"AND VALIDATION = 'ASSESSED' AND STATUS_TYP = 'TO BE STUDIED'"
	).run(function (error, featureCollection) {
		var assessedTobestudied = 0;

		for (var i = 0; i < featureCollection.features.length; i++) {
			if (featureCollection.features[i].properties.MILES > 0) {
				assessedTobestudied += featureCollection.features[i].properties.MILES;
			} else {
				assessedTobestudied = 0;
			}
		}
		var assessedTobestudied_ = document.getElementById("legendNum3");
		assessedTobestudied_.innerHTML = assessedTobestudied.toFixed(1);

	});
	L.esri.query({
		url: streamsUrl
	}).where(query
		+"AND VALIDATION = 'UNKNOWN' AND STATUS_TYP = 'BEING STUDIED'"
	).run(function (error, featureCollection) {
		var unkBeingstudied = 0;

		for (var i = 0; i < featureCollection.features.length; i++) {
			if (featureCollection.features[i].properties.MILES > 0) {
				unkBeingstudied += featureCollection.features[i].properties.MILES;
			} else {
				unkBeingstudied = 0;
			}
		}
		var unkBeingstudied_ = document.getElementById("legendNum4");
		unkBeingstudied_.innerHTML = unkBeingstudied.toFixed(1);
	});
	L.esri.query({
		url: streamsUrl
	}).where(query
		+"AND VALIDATION = 'UNKNOWN' AND STATUS_TYP = 'BEING ASSESSED'"
	).run(function (error, featureCollection) {
		var unkBeingassessed = 0;

		for (var i = 0; i < featureCollection.features.length; i++) {
			if (featureCollection.features[i].properties.MILES > 0) {
				unkBeingassessed += featureCollection.features[i].properties.MILES;
			} else {
				unkBeingassessed = 0;
			}
		}
		var unkBeingassessed_ = document.getElementById("legendNum5");
		unkBeingassessed_.innerHTML = unkBeingassessed.toFixed(1);

	});
	L.esri.query({
		url: streamsUrl
	}).where(query
		+"AND VALIDATION = 'UNKNOWN' AND STATUS_TYP = 'TO BE ASSESSED'"
	).run(function (error, featureCollection) {
		var unkTobeassessed = 0;

		for (var i = 0; i < featureCollection.features.length; i++) {
			if (featureCollection.features[i].properties.MILES > 0) {
				unkTobeassessed += featureCollection.features[i].properties.MILES;
			} else {
				unkTobeassessed = 0;
			}
		}
		var unkTobeassessed_ = document.getElementById("legendNum6");
		unkTobeassessed_.innerHTML = unkTobeassessed.toFixed(1);
	});
	L.esri.query({
		url: streamsUrl
	}).where(query
		+"AND VALIDATION = 'UNKNOWN' AND STATUS_TYP = 'DEFERRED'"
	).run(function (error, featureCollection) {
		var unkDeferred = 0;

		for (var i = 0; i < featureCollection.features.length; i++) {
			if (featureCollection.features[i].properties.MILES > 0) {
				unkDeferred += featureCollection.features[i].properties.MILES;
			} else {
				unkDeferred = 0;
			}
		}
		var unkDeferred_ = document.getElementById("legendNum7");
		unkDeferred_.innerHTML = unkDeferred.toFixed(1);
	});
	L.esri.query({
		url: streamsUrl
	}).where(query
		+"AND VALIDATION = 'UNVERIFIED' AND STATUS_TYP = 'BEING STUDIED'"
	).run(function (error, featureCollection) {
		var unverfiedBeingstudied = 0;

		for (var i = 0; i < featureCollection.features.length; i++) {
			if (featureCollection.features[i].properties.MILES > 0) {
				unverfiedBeingstudied += featureCollection.features[i].properties.MILES;
			} else {
				unverfiedBeingstudied = 0;
			}
		}
		var unverfiedBeingstudied_ = document.getElementById("legendNum8");
		unverfiedBeingstudied_.innerHTML = unverfiedBeingstudied.toFixed(1);
	});
	L.esri.query({
		url: streamsUrl
	}).where(query
		+"AND VALIDATION = 'UNVERIFIED' AND STATUS_TYP = 'TO BE STUDIED'"
	).run(function (error, featureCollection) {
		var unverfiedTobe = 0;

		for (var i = 0; i < featureCollection.features.length; i++) {
			if (featureCollection.features[i].properties.MILES > 0) {
				unverfiedTobe += featureCollection.features[i].properties.MILES;
			} else {
				unverfiedTobe = 0;
			}
		}
		var unverfiedTobe_ = document.getElementById("legendNum9");
		unverfiedTobe_.innerHTML = unverfiedTobe.toFixed(1);
	});	
	L.esri.query({
		url: streamsUrl
	}).where(query
		+"AND VALIDATION = 'VALID' AND STATUS_TYP = 'BEING ASSESSED'"
	).run(function (error, featureCollection) {
		var validBeingassessed = 0;

		for (var i = 0; i < featureCollection.features.length; i++) {
			if (featureCollection.features[i].properties.MILES > 0) {
				validBeingassessed += featureCollection.features[i].properties.MILES;
			} else {
				validBeingassessed = 0;
			}
		}
		var validBeingassessed_ = document.getElementById("legendNum10");
		validBeingassessed_.innerHTML = validBeingassessed.toFixed(1);
	});
	L.esri.query({
		url: streamsUrl
	}).where(query
		+"AND VALIDATION = 'VALID' AND STATUS_TYP = 'BEING STUDIED'"
	).run(function (error, featureCollection) {
		var validBeingstudied = 0;

		for (var i = 0; i < featureCollection.features.length; i++) {
			if (featureCollection.features[i].properties.MILES > 0) {
				validBeingstudied += featureCollection.features[i].properties.MILES;
			} else {
				validBeingstudied = 0;
			}
		}
		var validBeingstudied_ = document.getElementById("legendNum11");
		validBeingstudied_.innerHTML = validBeingstudied.toFixed(1);
	});			
	L.esri.query({
		url: streamsUrl
	}).where(query
		+"AND VALIDATION = 'VALID' AND STATUS_TYP = 'NVUE COMPLIANT'"
	).run(function (error, featureCollection) {
		var validNvuecompliant = 0;

		for (var i = 0; i < featureCollection.features.length; i++) {
			if (featureCollection.features[i].properties.MILES > 0) {
				validNvuecompliant += featureCollection.features[i].properties.MILES;
			} else {
				validNvuecompliant = 0;
			}
		}
		var validNvuecompliant_ = document.getElementById("legendNum12");
		validNvuecompliant_.innerHTML = validNvuecompliant.toFixed(1);
	});
},7000)																					
}

const queryValidA = function (feature) {
    var test = L.esri.query({
        url: streamsUrl
    });
    test.where(query +
        " AND VALIDATION = 'VALID' AND FLD_ZONE = 'A'"
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
        document.getElementById("a_table_valid").innerHTML = sumTotal_validA.toFixed(1);
        // .toLocaleString("en-US").slice(0, -2);
    });
}
var queryValidAe = function (feature) {
    L.esri.query({
        url: streamsUrl
    }).where(query +
        " AND VALIDATION = 'VALID' AND FLD_ZONE = 'AE'"
    ).run(function (error, featureCollection) {
        var sumTotal_validAe = 0;
        for (var i = 0; i < featureCollection.features.length; i++) {
            if (featureCollection.features[i].properties.MILES > 0) {
                sumTotal_validAe += featureCollection.features[i].properties.MILES;
            } else {
                sumTotal_validAe = 0;
            }
        }

        document.getElementById("ae_table_valid").innerHTML = sumTotal_validAe.toFixed(1);
        // .toLocaleString("en-US").slice(0, -2);
    });
}

var queryCompA = function (feature) {
    L.esri.query({
        url: streamsUrl
    }).where(query +
        " AND FLD_ZONE = 'A'"
    ).run(function (error, featureCollection) {
        var sumTotal4 = 0;
        for (var i = 0; i < featureCollection.features.length; i++) {
            if (featureCollection.features[i].properties.MILES > 0) {
                sumTotal4 += featureCollection.features[i].properties.MILES;
            } else {
                sumTotal4 = 0;
            }
        }

        document.getElementById("a_table_atcomp_valid").innerHTML = sumTotal4.toFixed(1);
        // .toLocaleString("en-US").slice(0, -2);
    });

}
var queryCompAe = function (feature) {
L.esri.query({
        url: streamsUrl
    }).where(query +
        " AND FLD_ZONE = 'AE'"
    ).run(function (error, featureCollection) {
        var sumTotal = 0;
        for (var i = 0; i < featureCollection.features.length; i++) {
            if (featureCollection.features[i].properties.MILES > 0) {
                sumTotal += featureCollection.features[i].properties.MILES;
            } else {
                sumTotal = 0;
            }
        }
        document.getElementById("ae_table_atcomp_valid").innerHTML = sumTotal.toFixed(1);
        // .toLocaleString("en-US").slice(0, -2);
    });
}




var queryEffAeFldway = function (feature) {
    L.esri.query({
        url: streamsUrl
    }).where(query +
        " AND VALIDATION = 'VALID' AND FLD_ZONE = 'AE' AND FLOODWAY = 'T'"
    ).run(function (error, featureCollection) {
        var sumTotal = 0;
        for (var i = 0; i < featureCollection.features.length; i++) {
            if (featureCollection.features[i].properties.MILES > 0) {
                sumTotal += featureCollection.features[i].properties.MILES;
            } else {
                sumTotal = 0;
            }
        }
        document.getElementById("aewFw_table_valid").innerHTML = sumTotal.toFixed(1);
        // .toLocaleString("en-US").slice(0, -2);
    });
}
var queryEffAeCompFldway = function (feature) {
    L.esri.query({
        url: streamsUrl
    }).where(query +
        " AND FLD_ZONE = 'AE' AND FLOODWAY = 'T'"
    ).run(function (error, featureCollection) {
        var sumTotal = 0;
        for (var i = 0; i < featureCollection.features.length; i++) {
            if (featureCollection.features[i].properties.MILES > 0) {
                sumTotal += featureCollection.features[i].properties.MILES;
            } else {
                sumTotal = 0;
            }
        }
        document.getElementById("aewFw_table_atcomp_valid").innerHTML = sumTotal.toFixed(1);
        // .toLocaleString("en-US").slice(0, -2);
    });
}



var queryUnmapped = function (feature) {
    if (query == 0) {
        query = "CO_FIPS = '" + feature.properties.GEOID + "'";
    } else if (query == 1) {
        query = "HUC8_KEY = " + feature.properties.HUC8 + "'";
    } else if (query == 2) {
        query = "CID = '" + feature.properties.CID + "'"
        titleName = feature.properties.COMMUNITY_ + ", " + feature.properties.STATE;
    }
    var streamsQueryAll = L.esri.query({
        url: UnmappedStreamsUrl
    }).where(query).run(function (error, featureCollection) {
        var steams_ = L.geoJSON(featureCollection, {
            style: {
                color: '#4f5153',
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

        document.getElementById("notmapped_table_atcomp_valid").innerHTML = sumTotal.toFixed(1);
        // .toLocaleString("en-US").slice(0, -2);
        document.getElementById("notmapped_table_delta_valid").innerHTML = "+" + sumTotal.toFixed(1);
        // .toLocaleString("en-US").slice(0, -2);
        setTimeout(function(e){
        document.getElementById("legendNum13").innerHTML = sumTotal.toFixed(1);
    },7000);
    });
}
function calculations_(evt){
     document.querySelector(".splash-bg").classList.remove("hide");
    legendCtrl.addTo(map);

    var loading = document.createElement("DIV");
    loading.innerHTML = '<span class="loadnm" style="position:absolute;z-index:1005;bottom:50%;left:25%;color:white;font-size:6rem;"></span>'
    document.body.appendChild(loading);
    document.querySelector(".loadnm").innerHTML = "Calculating CNMS...";
    queryAoi(evt.layer.feature);
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
    queryCnmsMapped(evt.layer.feature);
    queryValidA(evt.layer.feature);
    queryValidAe(evt.layer.feature);
    queryCompA(evt.layer.feature);
    queryCompAe(evt.layer.feature);
    queryEffAeFldway(evt.layer.feature);
    queryEffAeCompFldway(evt.layer.feature);
    queryUnmapped(evt.layer.feature);
    setTimeout(function(e){
        document.querySelector(".loadnm").innerHTML = "Calculating Zone A Validation";
        let aTableAtValid_value = document.getElementById("a_table_valid").innerHTML;
        document.querySelector(".loadnm").innerHTML = "Calculating Zone A COMP";
        let aTableAtCompValid_value = document.getElementById("a_table_atcomp_valid").innerHTML;

        document.querySelector(".loadnm").innerHTML = "Calculating Zone AE Validation";
        let aeTableAtValid_value = document.getElementById("ae_table_valid").innerHTML;
        document.querySelector(".loadnm").innerHTML = "Calculating Zone AE COMP";
        let aeTableAtCompValid_value = document.getElementById("ae_table_atcomp_valid").innerHTML;

        document.querySelector(".loadnm").innerHTML = "Calculating Zone AE COMP Floodways";
        let aewFwTableAtValid_value = document.getElementById("aewFw_table_valid").innerHTML;
        document.querySelector(".loadnm").innerHTML = "Calculating Zone AE Floodways";
        let aewFwTableAtComp_value = document.getElementById("aewFw_table_atcomp_valid").innerHTML;
        
        let aZoneValue = aTableAtCompValid_value - aTableAtValid_value;
        let aeZoneValue = aeTableAtCompValid_value - aeTableAtValid_value;
        let aewFwValue = aewFwTableAtComp_value - aewFwTableAtValid_value;
        setTimeout(function(e){
            document.getElementById("a_table_delta_valid").innerHTML = "+"+aZoneValue.toFixed(1);;
            document.getElementById("a_table_unk_unv").innerHTML = aZoneValue.toFixed(1);;
            document.getElementById("ae_table_unk_unv").innerHTML = aeZoneValue.toFixed(1);;
            document.getElementById("ae_table_delta_valid").innerHTML = "+"+aeZoneValue.toFixed(1);;
            document.getElementById("aewFw_table_unk_unv").innerHTML = aewFwValue.toFixed(1);
            document.getElementById("aewFw_table_delta_valid").innerHTML = "+"+aewFwValue.toFixed(1);

            let newaZoneValue = aTableAtValid_value;
            document.getElementById("a_table_valid").innerHTML = aTableAtValid_value;
            document.querySelector(".loadnm").innerHTML = "Calculating Unmapped";
            document.querySelector(".table-container").classList.remove("hide");
            document.querySelector(".splash-bg").classList.add("hide");
            
            document.body.removeChild(loading);
        },3000);
    },5000);   
}
// function calculationsSearch_(data){
//     legendCtrl.addTo(map);
//     var loading = document.createElement("DIV");
//     loading.innerHTML = '<span class="loadnm" style="position:absolute;z-index:1005;bottom:50%;left:25%;color:white;font-size:6rem;"></span>'
//     document.body.appendChild(loading);
//     document.querySelector(".loadnm").innerHTML = "Calculating CNMS...";
//     query = 1;
//     aoiUrl = 1;
//     objectid_ = 1;
//     selectTable.classList.add("hide");
//     results.clearLayers();
//     groupLayers.clearLayers();
//     selectedData.clearLayers();
//     selectedAoi.clearLayers();
//     groupLayers.addLayer(huc8Layer);
//     let aoiId = data.results[0].geojson.properties.HUC8;
//     L.esri.query({
//         url: huc8Url
//     }).where("HUC8 = " + aoiId).run(function (error, featureCollection) {
//         L.esri.featureLayer({url:huc8Url,where:"HUC8 <> " + aoiId,
//         style:{color: 'black',
//         fillColor: 'black',
//         simplifyFactor: 0.35,
//         precision: 5,
//         fillOpacity: 0.65,
//         interactive: false,
//         weight: 0} 
//         }).addTo(selectedAoi);
//         var aoi_select = L.geoJSON(featureCollection).setStyle({
//             color: 'yellow',
//                 dashArray: "3,12",
//             dashSpeed: -35,
//             fillOpacity: 0,
//             pane: 'aoiIndex',
//               weight: 3.5,
//             interactive: false,
//         }).addTo(selectedAoi);
//         map.fitBounds(aoi_select.getBounds().pad(0.05));
//     });
//     queryCnmsMapped(data.results[0].geojson);
//     queryValidA(data.results[0].geojson);
//     queryValidAe(data.results[0].geojson);
//     queryCompA(data.results[0].geojson);
//     queryCompAe(data.results[0].geojson);
//     queryEffAeFldway(data.results[0].geojson);
//     queryEffAeCompFldway(data.results[0].geojson);
//     queryUnmapped(data.results[0].geojson); 


//     setTimeout(function () {
//         document.querySelector(".table-container").classList.remove("hide");
//     }, 2000);

//     var selectedGroupnumbersAoi = selectedAoi.getLayers();
//     if (selectedGroupnumbersAoi.length >= 1) {
//         selectedAoi.clearLayers();
//     }
//     var selectedGroupnumbersData = selectedData.getLayers();
//     if (selectedGroupnumbersData.length >= 1) {
//         selectedData.clearLayers();
//     }
//     groupLayers.clearLayers();
//     results.clearLayers();

//     setTimeout(function(data){
//         document.querySelector(".loadnm").innerHTML = "Calculating Zone A Validation";
//         let aTableAtValid_value = document.getElementById("a_table_valid").innerHTML;
//         document.querySelector(".loadnm").innerHTML = "Calculating Zone A COMP";
//         let aTableAtCompValid_value = document.getElementById("a_table_atcomp_valid").innerHTML;

//         document.querySelector(".loadnm").innerHTML = "Calculating Zone AE Validation";
//         let aeTableAtValid_value = document.getElementById("ae_table_valid").innerHTML;
//         document.querySelector(".loadnm").innerHTML = "Calculating Zone AE COMP";
//         let aeTableAtCompValid_value = document.getElementById("ae_table_atcomp_valid").innerHTML;

//         document.querySelector(".loadnm").innerHTML = "Calculating Zone AE COMP Floodways";
//         let aewFwTableAtValid_value = document.getElementById("aewFw_table_valid").innerHTML;
//         document.querySelector(".loadnm").innerHTML = "Calculating Zone AE Floodways";
//         let aewFwTableAtComp_value = document.getElementById("aewFw_table_atcomp_valid").innerHTML;
        
//         let aZoneValue = aTableAtCompValid_value - aTableAtValid_value;
//         let aeZoneValue = aeTableAtCompValid_value - aeTableAtValid_value;
//         let aewFwValue = aewFwTableAtComp_value - aewFwTableAtValid_value;
//         setTimeout(function(data){
//             document.getElementById("a_table_delta_valid").innerHTML = "+"+aZoneValue.toFixed(1);;
//             document.getElementById("a_table_unk_unv").innerHTML = aZoneValue.toFixed(1);;
//             document.getElementById("ae_table_unk_unv").innerHTML = aeZoneValue.toFixed(1);;
//             document.getElementById("ae_table_delta_valid").innerHTML = "+"+aeZoneValue.toFixed(1);;
//             document.getElementById("aewFw_table_unk_unv").innerHTML = aewFwValue.toFixed(1);
//             document.getElementById("aewFw_table_delta_valid").innerHTML = "+"+aewFwValue.toFixed(1);

//             let newaZoneValue = aTableAtValid_value;
//             document.getElementById("a_table_valid").innerHTML = aTableAtValid_value;
//             document.querySelector(".loadnm").innerHTML = "Calculating Unmapped";
//             document.querySelector(".table-container").classList.remove("hide");
//             document.querySelector(".splash-bg").classList.add("hide");
            
//             document.body.removeChild(loading);
//         },3000);
//     },5000);   
// }
cntyLayer.on('click', function (evt) {
    calculations_(evt);
});
huc8Layer.on('click', function (evt) {
    calculations_(evt);
});
comLayer.on('click', function (evt) {
    calculations_(evt);
});
///////////// SEARCH CONTROL
// document.querySelector(".geocoder-control").addEventListener("click", function(e){
//     document.querySelector(".layerTray").classList.add("hide");
// });

var cntyProvider = L.esri.Geocoding.featureLayerProvider({
    url: cntyUrl,
    searchFields: ['NAME'],
    label: 'County or Parish',
    bufferRadius: 5,
    maxResults: 100,
    formatSuggestion: function (feature) {
        return feature.properties.NAME;
    }
});
cntyProvider.orderBy("NAME", "DESC");
var searchControlCnty = L.esri.Geocoding.geosearch({
    placeholder: 'Enter County or Parish Name',
    providers: [cntyProvider],
    expanded: true,
});

searchControlCnty.on('results', function (data) {
    legendCtrl.addTo(map);
    query = 0;
    aoiUrl = 0;
    objectid_ = 0;
    results.clearLayers();
    groupLayers.clearLayers();
    selectedData.clearLayers();
    selectedAoi.clearLayers();
    selectTable.classList.add("hide");
    groupLayers.addLayer(cntyLayer);

    // for (var i = data.results.length - 1; i >= 0; i--) {
    //     results.addLayer(L.marker(data.results[i].latlng));
    // }
    let aoiId = data.results[0].geojson.properties.GEOID;
    console.log(aoiId);
    L.esri.query({
        url: cntyUrl
    }).where("GEOID = " + aoiId).run(function (error, featureCollection) {
        // var stripes = new L.StripePattern({
        //     spaceColor: 'yellow',
        //     spaceOpacity: 1,
        //     fillOpacity: 0,
        //     weight: 4,
        //     angle: 45
        // });
        // stripes.addTo(map);
        L.esri.featureLayer({url:cntyUrl,where:"GEOID <> " + aoiId,
        style:{color: 'black',
        fillColor: 'black',
        simplifyFactor: 0.35,
        precision: 5,
        fillOpacity: 0.65,
        interactive: false,
        weight: 0} 
    }).addTo(selectedAoi);
        var aoi_select = L.geoJSON(featureCollection).setStyle({
            color: 'yellow',
                dashArray: "3,12",
            dashSpeed: -35,
            fillOpacity: 0,
            // fillPattern: stripes,
            pane: 'aoiIndex',
              weight: 3.5,
            interactive: false,
        }).addTo(selectedAoi);
        map.fitBounds(aoi_select.getBounds().pad(0.05));
    });

    queryCnmsMapped(data.results[0].geojson);
    queryValidA(data.results[0].geojson);
    queryValidAe(data.results[0].geojson);
    queryCompA(data.results[0].geojson);
    queryCompAe(data.results[0].geojson);
    queryEffAeFldway(data.results[0].geojson);
    queryEffAeCompFldway(data.results[0].geojson);
    queryUnmapped(data.results[0].geojson); 
    setTimeout(function () {
        document.querySelector(".table-container").classList.remove("hide");
    }, 2000);

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

var huc8Provider = L.esri.Geocoding.featureLayerProvider({
    url: huc8Url,
    searchFields: ['HUC8', 'HUC_NM'],
    label: 'Subbasins (HUC-8)',
    bufferRadius: 5,
    maxResults: 100,
    formatSuggestion: function (feature) {
        return feature.properties.HUC_NM + " (" + feature.properties.HUC8 + ")";
    }
});

huc8Provider.orderBy("HUC_NM", "DESC");

var searchControlHuc8 = L.esri.Geocoding.geosearch({
    placeholder: 'Enter Subbasin Name or HUC-8 code',
    providers: [huc8Provider],
    expanded: true,

});
searchControlHuc8.on('results', function (data) {
	selectedData.clearLayers();
	selectedAoi.clearLayers();
	results.clearLayers();
	if (groupLayers.hasLayer(huc8Layer)) {

	} else {
		groupLayers.removeLayer(cntyLayer);
		groupLayers.addLayer(huc8Layer);
		huc8Ctrl.addTo(map);
	}
	for (var i = data.results.length - 1; i >= 0; i--) {
		results.addLayer(L.marker(data.results[i].latlng));
	}
});





const comProvider = L.esri.Geocoding.featureLayerProvider({
    url: comUrl,
    searchFields: ['COMMUNITY_','STATE','CID'],
    label: 'Enter Community Name',
    bufferRadius: 5,
    maxResults: 100,
    formatSuggestion: function (feature) {
        return feature.properties.COMMUNITY_ + ", " + feature.properties.STATE;
    }
});
comProvider.orderBy("COMMUNITY_", "DESC");
const searchControlCom = L.esri.Geocoding.geosearch({
    placeholder: 'Enter Community Name',
    providers: [comProvider],
    expanded: true,
});
searchControlCom.on('results', function (data) {
    legendCtrl.addTo(map);
    query = 2;
    aoiUrl = 2;
    objectid_ = 2;
    selectTable.classList.add("hide");
    results.clearLayers();
    groupLayers.clearLayers();
    selectedData.clearLayers();
    selectedAoi.clearLayers();
    // groupLayers.addLayer(comLayer);
    // for (var i = data.results.length - 1; i >= 0; i--) {
    //   console.dir(data.results[0].geojson.properties.OBJECTID);
    //   results.addLayer(L.marker(data.results[i].latlng));
    // }
    let aoiId = data.results[0].geojson.properties.OBJECTID;

    console.log(aoiId);
    L.esri.query({
        url: comUrl
    }).where("OBJECTID = " + aoiId).run(function (error, featureCollection) {
        // var stripes = new L.StripePattern({
        //     spaceColor: 'yellow',
        //     spaceOpacity: 1,
        //     fillOpacity: 0,
        //     weight: 4,
        //     angle: 45
        // });
        // stripes.addTo(map);
        L.esri.featureLayer({url:comUrl,where:"OBJECTID <> " + aoiId,
        style:{color: 'black',
        fillColor: 'black',
        simplifyFactor: 0.35,
        precision: 5,
        fillOpacity: 0.65,
        interactive: false,
        weight: 0} 
        }).addTo(selectedAoi);
        var aoi_select = L.geoJSON(featureCollection).setStyle({
            color: 'yellow',
                dashArray: "3,12",
            dashSpeed: -35,
            fillOpacity: 0,
            pane: 'aoiIndex',
            // fillPattern: stripes,
              weight: 3.5,
            interactive: false,
        }).addTo(selectedAoi);
        map.fitBounds(aoi_select.getBounds().pad(0.05));
    });
    queryCnmsMapped(data.results[0].geojson);
    queryValidA(data.results[0].geojson);
    queryValidAe(data.results[0].geojson);
    queryCompA(data.results[0].geojson);
    queryCompAe(data.results[0].geojson);
    queryEffAeFldway(data.results[0].geojson);
    queryEffAeCompFldway(data.results[0].geojson);
    queryUnmapped(data.results[0].geojson); 
    setTimeout(function () {
        document.querySelector(".table-container").classList.remove("hide");
    }, 2000);

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
let selectTable = document.querySelector(".table-container");
selectTable.onclick = function (e) {
    // function CopyToClipboard(containerid) {
    //     if (document.selection) {
    //         var range = document.body.createTextRange();
    //         range.moveToElementText(document.getElementById(containerid));
    //         range.select().createTextRange();
    //         document.execCommand("copy");
    //     } else if (window.getSelection) {
    //         var range = document.createRange();
    //         range.selectNode(document.getElementById(containerid));
    //         window.getSelection().addRange(range);
    //         document.execCommand("copy");
    //     }
    // }
    // CopyToClipboard('table');
    function jscut() {
        var txt = document.getElementById("table").innerText;
        navigator.clipboard.writeText(txt);
        // .then(() => { document.getElementById("demoD").value = ""; });
    }
    jscut();
    alert("YOU HAVE CLIPPED TABLE - CTRL V to Paste");
}
document.querySelector(".splashBtn").onclick = function (e) {
    // map.setView([31.6, -99], 6);
    // document.querySelector(".splash").classList.remove("hide");
    // document.querySelector(".splash-bg").classList.remove("hide");
    // map.removeControl(legendCtrl);
    // groupLayers.clearLayers();
    // selectedAoi.clearLayers();
    // selectedData.clearLayers();
    // results.clearLayers();
    // selectTable.classList.add("hide");
    // document.querySelector(".layersTray").classList.add("hide");
    // document.querySelector(".basemapTray").classList.add("hide");
    window.location.reload();
}
document.querySelector(".layersTrayBtn").onclick = function (e) {
    document.querySelector(".layersTray").classList.remove("hide");
    document.querySelector(".basemapTray").classList.add("hide");


}
document.querySelector(".layersTrayBtn").addEventListener("mouseover", function (e) {
    var layerTooltip = document.createElement("div");
    layerTooltip.innerHTML = `<div id="layersTooltip" style="border-radius: 6px;padding:0.25rem 2rem 0.25rem 2rem;font-size:1.25rem;position:absolute;z-index:750;top:22.35%;left:2.5%;background-color:#337ab7;color:white;"><b>Layers</b></div>`;
    document.body.appendChild(layerTooltip);

});
document.querySelector(".layersTrayBtn").addEventListener("mouseout", function (e) {
    document.getElementById("layersTooltip").remove();
});
document.querySelector(".basemapTrayBtn").addEventListener("mouseover", function (e) {
    var basemapTooltip = document.createElement("div");
    basemapTooltip.innerHTML = `<div id="basemapTooltip" style="border-radius: 6px;padding:0.25rem 2rem 0.25rem 2rem;font-size:1.25rem;position:absolute;z-index:750;top:17.5%;left:2.5%;background-color:#337ab7;color:white;"><b>Base Maps</b></div>`;
    document.body.appendChild(basemapTooltip);
});
document.querySelector(".basemapTrayBtn").addEventListener("mouseout", function (e) {
    document.getElementById("basemapTooltip").remove();
});

document.querySelector(".splashBtn").addEventListener("mouseover", function (e) {
    var splashTooltip = document.createElement("div");
    splashTooltip.innerHTML = `<div id="splashTooltip" style="border-radius: 6px;padding:0.25rem 2rem 0.25rem 2rem;font-size:1.25rem;position:absolute;z-index:750;bottom:25%;left:2.5%;background-color:#337ab7;color:white;"><b>Queries</b></div>`;
    document.body.appendChild(splashTooltip);

});
document.querySelector(".splashBtn").addEventListener("mouseout", function (e) {
    document.getElementById("splashTooltip").remove();
});
document.querySelector(".basemapTrayBtn").onclick = function (e) {
    document.querySelector(".basemapTray").classList.remove("hide");
    document.querySelector(".layersTray").classList.add("hide");
}
document.getElementById("closeLayers").onclick = function (e) {
    document.querySelector(".layersTray").classList.add("hide");
    document.querySelector(".basemapTray").classList.add("hide");
}
document.getElementById("closeBasemaps").onclick = function (e) {
    document.querySelector(".layersTray").classList.add("hide");
    document.querySelector(".basemapTray").classList.add("hide");
}
document.querySelector(".leaflet-control-container").addEventListener("mouseover", function (e) {
    document.querySelector(".layersTray").classList.add("hide");
    document.querySelector(".basemapTray").classList.add("hide");
});
document.getElementById("nfhl").onclick = function (e) {
    if(supportLayers.hasLayer(nfhl)){
        supportLayers.removeLayer(nfhl);
        document.getElementById("nfhl").classList.remove("selected");
    }else {
        supportLayers.addLayer(nfhl);
        document.getElementById("nfhl").classList.add("selected");
    }
}
document.getElementById("prelim").onclick = function (e) {

    if(supportLayers.hasLayer(prelim)){
        supportLayers.removeLayer(prelim);
        document.getElementById("prelim").classList.remove("selected");
    }else {
        supportLayers.addLayer(prelim);
        document.getElementById("prelim").classList.add("selected");
    }
}
document.getElementById("pending").onclick = function (e) {
    if(supportLayers.hasLayer(pending)){
        supportLayers.removeLayer(pending);
        document.getElementById("pending").classList.remove("selected");
    }else {
        supportLayers.addLayer(pending);
        document.getElementById("pending").classList.add("selected");
    }
}
document.getElementById("draft").onclick = function (e) {
    if(supportLayers.hasLayer(draft)){
        supportLayers.removeLayer(draft);
        document.getElementById("draft").classList.remove("selected");
    }else {
        supportLayers.addLayer(draft);
        document.getElementById("draft").classList.add("selected");
    }
}
///// LEGEND
legendCtrl.onAdd = function (map) {
	this._div = L.DomUtil.create('div', 'legend'); // create a div with a class "info"
	this.addlegendCtrl();
	return this._div;
};
legendCtrl.addlegendCtrl = function (props) {
	this._div.innerHTML =
		`<div class="legend"><span style="font-size:1rem;">EXPLANATION<span style='float:right;font-size:0.65rem;margin-top:1rem;'>(miles)</span><hr></span><span style='font-size:0.75rem;'>ASSESSED, BEING STUDIED&nbsp;&nbsp;<svg style="margin-left:0.9rem;" height='12' width='75'><line x1='0' y1='5' x2='75' y2='5' style='stroke:#76FCED;stroke-width:5' /></svg></span><span class='legendNum' id='legendNum1'></span>
		<span style='font-size:0.75rem;'>ASSESSED, DEFERED&nbsp;&nbsp;<svg style="margin-left:3.15rem;" height='10' width='75'><line x1='0' y1='5' x2='75' y2='5' style='stroke:#0AC4F8;stroke-width:5' /></svg></span><span class='legendNum' id='legendNum2'></span>	
		<span style='font-size:0.75rem;'>ASSESSED, TO BE STUDIED&nbsp;&nbsp;<svg style="margin-left:1.05rem;" height='10' width='75'><line x1='0' y1='5' x2='75' y2='5' style='stroke:#008EF8;stroke-width:5' /></svg></span><span class='legendNum' id='legendNum3'></span>
		<span style='font-size:0.75rem;'>UNKNOWN, BEING STUDIED&nbsp;&nbsp;<svg style="margin-left:0.69rem;" height='10' width='75'><line x1='0' y1='5' x2='75' y2='5' style='stroke:#680397;stroke-width:5' /></svg></span><span class='legendNum' id='legendNum4'></span>			
		<span style='font-size:0.75rem;'>UNKNOWN, BEING ASSESSED&nbsp;&nbsp;<svg style="" height='10' width='75'><line x1='0' y1='5' x2='75' y2='5' style='stroke:#A012E2;stroke-width:5' /></svg></span><span class='legendNum' id='legendNum5'></span>			
		<span style='font-size:0.75rem;'>UNKNOWN, TO BE ASSESSED&nbsp;&nbsp;<svg style="margin-left:0.15rem;" height='10' width='75'><line x1='0' y1='5' x2='75' y2='5' style='stroke:#AF4DDD;stroke-width:5' /></svg></span><span class='legendNum' id='legendNum6'></span>			
		<span style='font-size:0.75rem;'>UNKNOWN, DEFERED&nbsp;&nbsp;<svg style="margin-left:2.9rem;" height='10' width='75'><line x1='0' y1='5' x2='75' y2='5' style='stroke:#CB96E3;stroke-width:5' /></svg></span><span class='legendNum' id='legendNum7'></span>			
		<span style='font-size:0.75rem;'>UNVERIFIED, BEING STUDIED&nbsp;&nbsp;<svg style="margin-left:0.3rem;" height='10' width='75'><line x1='0' y1='5' x2='75' y2='5' style='stroke:orange;stroke-width:5' /></svg></span><span class='legendNum' id='legendNum8'></span>			
		<span style='font-size:0.75rem;'>UNVERIFIED, TO BE STUDIED&nbsp;&nbsp;<svg style="margin-left:0.43rem;" height='10' width='75'><line x1='0' y1='5' x2='75' y2='5' style='stroke:red;stroke-width:5' /></svg></span><span class='legendNum' id='legendNum9'></span>			
		<span style='font-size:0.75rem;'>VALID, BEING ASSESSED&nbsp;&nbsp;<svg style="margin-left:1.85rem;" height='10' width='75'><line x1='0' y1='5' x2='75' y2='5' style='stroke:lightgreen;stroke-width:5' /></svg></span><span class='legendNum' id='legendNum10'></span>			
		<span style='font-size:0.75rem;'>VALID, BEING STUDIED&nbsp;&nbsp;<svg style="margin-left:2.5rem;" height='10' width='75'><line x1='0' y1='5' x2='75' y2='5' style='stroke:lime;stroke-width:5' /></svg></span><span class='legendNum' id='legendNum11'></span>			
		<span style='font-size:0.75rem;'>VALID, NVUE COMPLIANT&nbsp;&nbsp;<svg style="margin-left:1.425rem;" height='10' width='75'><line x1='0' y1='5' x2='75' y2='5' style='stroke:green;stroke-width:5' /></svg></span><span class='legendNum' id='legendNum12'></span>			
		<span style='font-size:0.75rem;'>UNMAPPED&nbsp;&nbsp;<svg style="margin-left:6.35rem;" height='10' width='75'><line x1='0' y1='5' x2='75' y2='5' style='stroke:gray;stroke-width:5' /></svg></span><span class='legendNum' id='legendNum13'></span>			
		</div>`;
};