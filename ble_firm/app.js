const map = L.map('map', {
  attributionControl: false,
  zoomControl: false,
  zoomSnap: 0.1,
  zoomDelta: 0.1,
  boxZoom: true,
  minZoom: 5
}).setView([31.6, -95.5], 6);
map.setMaxBounds(map.getBounds().pad(0.2));
let communityTableControl_ = false;
let countyTableControl_ = true;
const baseMapLayers = L.layerGroup([]).addTo(map);


const googleRoad = L.tileLayer('https://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}', {
  maxZoom: 21,
  attribution: '&copy; <a href="https://www.google.com">Google</a>',
  subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});
const google_terrain = L.tileLayer('https://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}', {
  // maxZoom: 21,
  attribution: '&copy; <a href="https://www.google.com">Google</a>',
  subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});
var google_hybrid = L.tileLayer('https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
  // maxZoom: 21,
  attribution: '&copy; <a href="https://www.google.com">Google</a>',
  subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
}).addTo(baseMapLayers);
const Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}');

var USGS_USTopo = L.tileLayer('https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}', {
  // maxZoom: 20,
  attribution: 'Tiles courtesy of the <a href="https://usgs.gov/">U.S. Geological Survey</a>'
});
var USGS_USImageryTopo = L.tileLayer('https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryTopo/MapServer/tile/{z}/{y}/{x}', {
  // maxZoom: 20,
  attribution: 'Tiles courtesy of the <a href="https://usgs.gov/">U.S. Geological Survey</a>'
});
const OPNVKarte = L.tileLayer('https://tileserver.memomaps.de/tilegen/{z}/{x}/{y}.png', {
  maxZoom: 18,
  attribution: 'Map <a href="https://memomaps.de/">memomaps.de</a> <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
const Stadia_AlidadeSmoothDark = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
});
map.createPane('labels');
map.getPane('labels').style.zIndex = 675;
map.getPane('labels').style.pointerEvents = 'none';

const Stamen_TerrainLabels = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain-labels/{z}/{x}/{y}{r}.{ext}', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 18,
  ext: 'png',
  pane: 'labels'
});
const OpenTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png');
const baseMaps = document.createElement("div");
baseMaps.innerHTML = `<div id='baseMapsid' class='basemapsContainer basemapTray hide'><div style='width:100%;height:100%;background-color:rgb(255, 255, 255);padding:0.3rem;'><p style='margin:0px 0px 5px 0px;'><b>Select a base map:</b></p><hr><div id='basemap1' class='basemaps basemapSelected'><img class='basemapImg' src='http://mt1.google.com/vt/lyrs=s,h&x=30186&y=52699&z=17'><div class='basemapLabel'>Google Imagery</div></div><div id='basemap2' class='basemaps'><img class='basemapImg' src='http://mt1.google.com/vt/lyrs=p&x=30186&y=52699&z=17'><div class='basemapLabel'>Google Terrain</div></div><div id='basemap3' class='basemaps'><img class='basemapImg' src='http://mt0.google.com/vt/lyrs=m&hl=en&x=30186&y=52699&z=17'><div class='basemapLabel'>Google Roads</div></div><br><div id='basemap4' class='basemaps'><img class='basemapImg' src='https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/18/105398/60373'><div class='basemapLabel'>ESRI Imagery</div></div><div id='basemap5' class='basemaps'><img class='basemapImg' src='https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/16/26349/15093'><div class='basemapLabel'>USGS Topo</div></div><div id='basemap6' class='basemaps'><img class='basemapImg' src='https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryTopo/MapServer/tile/16/26349/15093'><div class='basemapLabel'>USGS Imagery</div></div><br><div id='basemap7' class='basemaps'><img class='basemapImg' src='https://tileserver.memomaps.de/tilegen/17/30186/52699.png'><div class='basemapLabel'>ÖPNVKarte</div></div><div id='basemap8' class='basemaps'><img class='basemapImg' src='https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/17/30186/52699.png'><div class='basemapLabel'>Stadia Dark</div></div><div id='basemap9' class='basemaps'><img class='basemapImg' src='https://c.tile.opentopomap.org/15/7546/13174.png'><div class='basemapLabel'>OSM OpenTopo</div></div><hr><button id='closeBasemaps' class='baseMap-layersClose'>X</button></div></div></div>`;
document.body.appendChild(baseMaps);



document.querySelector(".splashBtn").onclick = function (e) {
  window.location.reload();
}
document.querySelector(".layersTrayBtn").onclick = function (e) {
  document.getElementById("layerTray").classList.remove("hide");
  document.querySelector(".basemapTray").classList.add("hide");
}

document.querySelector(".basemapTrayBtn").onclick = function (e) {
  document.querySelector(".basemapTray").classList.remove("hide");
  document.getElementById("layerTray").classList.add("hide");
}

document.getElementById("closeBasemaps").onclick = function (e) {
  document.getElementById("layerTray").classList.add("hide");
  document.querySelector(".basemapTray").classList.add("hide");
}

function zoomToCounty() {
  var dropdown = document.getElementById('county-dropdown');
  var selectedCounty = dropdown.value;

  if (selectedCounty === "Choctaw") {
    map.setView([34, -95.55], 11);
  } else if (selectedCounty === "Camp") {
    map.setView([32.98500890780826, -94.93490109384865], 11);
  } else if (selectedCounty === "Morris") {
    map.setView([33.11900756529249, -94.73601863456466], 11); 
  } else if (selectedCounty === "Madison") {
    map.setView([36.033107316746, -93.72651939809032], 11); 
  } else if (selectedCounty === "Panola") {
    map.setView([32.181645, -94.323686], 11);         
  } else if (selectedCounty === "Harper") {
    map.setView([36.82959180923689, -99.63055335115429], 11);
  } else if (selectedCounty === "Latimer") {
    map.setView([34.87231196866829, -95.25671380632579], 11);
  } else if (selectedCounty === "Love") {
    map.setView([33.98610403918645, -97.22297071856153], 11);
  } else if (selectedCounty === "Pike") {
    map.setView([34.17165832512154, -93.64440539091959], 11);
  } else if (selectedCounty === "Polk") {
    map.setView([34.53477274742985, -94.21215371827834], 11);
  } else if (selectedCounty === "Pushmataha") {
    map.setView([34.48173274712084, -95.30996464363149], 11);
  } else if (selectedCounty === "Trinity") {
    map.setView([31.09792847231909, -95.11758881648315], 11);
  } else if (selectedCounty === "Freestone") {
    map.setView([31.70395670549604, -96.14784140155388], 11);
  } else if (selectedCounty === "Sabine") {
    map.setView([31.37251240746822, -93.85488557644267], 11);
  } else if (selectedCounty === "Sevier") {
    map.setView([33.98730650947136, -94.2371081518305], 11);
  } else if (selectedCounty === "San Augustine") {
    map.setView([31.40825510597208, -94.16545518643422], 11);
  } else if (selectedCounty === "Shelby") {
    map.setView([31.806832020550743, -94.1223292716277], 11);
  }
  document.getElementById("UtilDialog").classList.remove("show");
  setTimeout(function () {
    document.querySelector(".modal").style = "display:none";
  }, 750);
  dropdown.remove(0);
}

function closeModal() {
  var modal = document.getElementById("UtilDialog");

  // Add a fade-out effect before removing the "show" class
  modal.classList.add("fade");
  setTimeout(function () {
    modal.classList.remove("show");
  }, 250);

  // Hide the modal after the fade-out animation completes
  setTimeout(function () {
    modal.style.display = "none";
  }, 250);
}
const allLayers = L.layerGroup().addTo(map);
const bleLayer = L.esri.Vector.vectorTileLayer(
  // "https://tiles.arcgis.com/tiles/XG15cJAlne2vxtgt/arcgis/rest/services/status_study01312024/VectorTileServer", {
  //  "https://tiles.arcgis.com/tiles/XG15cJAlne2vxtgt/arcgis/rest/services/status_study01312024/VectorTileServer", {
    "https://tiles.arcgis.com/tiles/XG15cJAlne2vxtgt/arcgis/rest/services/BLE_2_FIRM_Layer04052024/VectorTileServer", {
  style: (feature) => {
      return {
        "version": 8,
        "sources": {
          "my-vector-tiles": {
            "type": "vector",
            "tiles": [
              "https://tiles.arcgis.com/tiles/XG15cJAlne2vxtgt/arcgis/rest/services/BLE_2_FIRM_Layer04052024/VectorTileServer/tile/{z}/{y}/{x}"
            ]
          }
        },
        "layers": [{
          "id": "BLE2FIRM_Layer04052024/X/1",
          "type": "fill",
          "source": "my-vector-tiles",
          "source-layer": "BLE2FIRM_Layer04052024",
          "paint": {
            "fill-color": "#A900E6",
            "fill-opacity": 0.5
          },
          "filter": ["==", "_symbol", 1]
        }, {
          "id": "BLE2FIRM_Layer04052024/A/1",
          "type": "fill",
          "source": "my-vector-tiles",
          "source-layer": "BLE2FIRM_Layer04052024",
          "paint": {
            "fill-color": "#00C5FF",
            "fill-opacity": 0.5
          },
          "filter": ["!=", "_symbol", 1]
        }]
      };
    }
  }
).addTo(allLayers);
const Geo_Referenced_FIRMs = L.esri.tiledMapLayer({
  // url: 'https://tiles.arcgis.com/tiles/XG15cJAlne2vxtgt/arcgis/rest/services/geo_ref_firms05232023/MapServer',
  // url: 'https://tiles.arcgis.com/tiles/XG15cJAlne2vxtgt/arcgis/rest/services/geo_ref_firms09052023/MapServer',
  url: 'https://tiles.arcgis.com/tiles/XG15cJAlne2vxtgt/arcgis/rest/services/BLE2FIRM_geo_ref_firms/MapServer',
  

  opacity: 1
}).addTo(allLayers);


// Streams
const eff_scop_stream = L.esri.Vector.vectorTileLayer(
  // "https://tiles.arcgis.com/tiles/XG15cJAlne2vxtgt/arcgis/rest/services/Scoping_Lines09052023/VectorTileServer"
  "https://vectortileservices.arcgis.com/XG15cJAlne2vxtgt/arcgis/rest/services/BLE2FIRM_Scoping_Lines/VectorTileServer"
);
const pir_stream_cent = L.esri.Vector.vectorTileLayer(
  // "https://tiles.arcgis.com/tiles/XG15cJAlne2vxtgt/arcgis/rest/services/BLE_PBL09052023/VectorTileServer");
  "https://tiles.arcgis.com/tiles/XG15cJAlne2vxtgt/arcgis/rest/services/BLE2FIRM_PBL/VectorTileServer");
const cityLimits_ = L.geoJson(cityLimits, {
  style: {
    color: "orange", // set line color to orange
    weight: 3, // set line weight to 5 pixels
    fillOpacity: 0, // set fill opacity to 0 to hide the fill
    opacity: 1
  }
}).addTo(allLayers);
const PIR_Limit_Lines = L.geoJson(pirLimitLines, {
  style: {
    color: "black", // set line color to orange
    weight: 5, // set line weight to 5 pixels
    opacity: 1 // set initial opacity to 1
  }
});
const nfhl = L.esri.dynamicMapLayer({
  url: "https://hazards.fema.gov/gis/nfhl/rest/services/public/NFHL/MapServer/"
});
var heat = null;
var data = omnivore.csv('data.csv')
  .on('ready', function () {
    var layer = data.toGeoJSON();
    var filteredFeatures = [];
    var filteredFeatures2 = [];
    var currentFilter = 'BLE_A_ZONE';
    var communityTableControl;
    var countyTableControl;

    function updateFilteredFeatures() {
      filteredFeatures.length = 0;
      layer.features.forEach(function (feature) {
        if (currentFilter === 'CORELOGIC') {
          if (feature.properties.CORELOGIC == 1) {
            filteredFeatures.push(feature);

          }

        } else if (currentFilter === 'BLE_A_ZONE') {
          if (feature.properties.BLE_A_ZONE == 1) {
            filteredFeatures.push(feature);
          }
        }
      });

      var popHeatPoints = jsonPointsToArray(filteredFeatures);
      if (heat) {
        allLayers.removeLayer(heat);
      }
      heat = L.heatLayer(popHeatPoints, {
        radius: 10,
        minOpacity: 0.5,
        blur: 10
      }).addTo(allLayers);
      // updateDataCount();
    }

    function updateFilteredFeatures2() {
      filteredFeatures2.length = 0;
      layer.features.forEach(function (feature) {
        filteredFeatures2.push(feature);
      });
      updateDataCount();
    }
    updateFilteredFeatures();
    updateFilteredFeatures2();

    function jsonPointsToArray(features) {
      let featureGeometriesArray = [];
      features.forEach(function (f) {
        featureGeometriesArray.push([f.geometry.coordinates[1], f.geometry.coordinates[0]])
      });
      return featureGeometriesArray;
    }


    function updateDataCount() {
      var bounds = map.getBounds();
      var communityCount1 = 0;
      var communityCount2 = 0;
      var communityCounts = {};
      var countyCount1 = 0;
      var countyCount2 = 0;
      var countyCounts = {};

      filteredFeatures2.forEach(function (feature) {
        if (bounds.contains(L.latLng(feature.geometry.coordinates[1], feature.geometry.coordinates[0]))) {
          if (feature.properties.CORELOGIC == 1) {
            communityCount1++;
            countyCount1++;
          }
          if (feature.properties.BLE_A_ZONE == 1) {
            communityCount2++;
            countyCount2++;
          }
          var community = feature.properties.POL_NAME2;
          var county = feature.properties.CNTY;

          if (!communityCounts[community]) {
            communityCounts[community] = {
              CORELOGIC: 0,
              BLE_A_ZONE: 0
            };
          }
          if (!countyCounts[county]) {
            countyCounts[county] = {
              CORELOGIC: 0,
              BLE_A_ZONE: 0
            };
          }

          if (feature.properties.CORELOGIC == 1) {
            communityCounts[community].CORELOGIC++;
          }
          if (feature.properties.BLE_A_ZONE == 1) {
            communityCounts[community].BLE_A_ZONE++;
          }
          if (feature.properties.CORELOGIC == 1) {
            countyCounts[county].CORELOGIC++;
          }
          if (feature.properties.BLE_A_ZONE == 1) {
            countyCounts[county].BLE_A_ZONE++;
          }
        }
      });

      var communityTotals = {};
      var countyTotals = {};
      var communities = Object.keys(communityCounts);
      communities.sort();
      communities.forEach(function (community) {
        communityTotals[community] = {
          CORELOGIC: communityCounts[community].CORELOGIC,
          BLE_A_ZONE: communityCounts[community].BLE_A_ZONE
        };
      });
      var county = Object.keys(countyCounts);
      county.forEach(function (county) {
        countyTotals[county] = {
          CORELOGIC: countyCounts[county].CORELOGIC,
          BLE_A_ZONE: countyCounts[county].BLE_A_ZONE
        };
      });




      if (communityTableControl) {
        communityTableControl.remove();
      }
      var CommunityTableControl = L.Control.extend({
        onAdd: function (map) {
          var container = L.DomUtil.create('div', 'structure-table-com');
          var tableHTML = "<span style='background-color:#005287;padding:0.5rem;font-size:0.95rem;'><button class='testCom'>Community</button>Buildings in 1% annual chance floodplain | Source: FEMA/ORNL<button onclick='tableCloseCom_btn()' style='background-color:white;color:red;font-weight:900;border-radius:1rem;'>x</button></span><table class='building-table-com'><tr><th>Geography (left-click to zoom-in/out)<br></th><th>BLE</th><th>Paper</th></tr>";
          tableHTML += "<tr onclick='map.setView([31.6, -95.5], 6)'>";
          tableHTML += "<td><b>Region wide extent</b></td>";
          tableHTML += "<td>" + communityCount2.toLocaleString() + "</td>";
          tableHTML += "<td>" + communityCount1.toLocaleString() + "</td>";
          tableHTML += "</tr>";
          communities.forEach(function (community) {
            tableHTML += "<tr class='community-row' onclick='fitBoundsToFeature(event)' data-community='" + community + "'>";
            tableHTML += "<td>" + community + "</td>";
            tableHTML += "<td>" + communityCounts[community].BLE_A_ZONE.toLocaleString() + "</td>";
            tableHTML += "<td>" + communityCounts[community].CORELOGIC.toLocaleString() + "</td>";
            tableHTML += "</tr>";
          });
          tableHTML += "</table>";
          container.innerHTML = tableHTML;
          L.DomEvent.disableClickPropagation(container);
          return container;
        }
      });
      communityTableControl = new CommunityTableControl();

      if (countyTableControl) {
        countyTableControl.remove();
      }
      var CountyTableControl = L.Control.extend({
        onAdd: function (map) {
          var container = L.DomUtil.create('div', 'structure-table-cnty');
          var tableHTML = "<span style='background-color:#005287;padding:0.5rem;font-size:0.95rem;'><button class='testCnty'>County</button>Buildings in 1% annual chance floodplain | Source: FEMA/ORNL<button onclick='tableCloseCnty_btn()' style='background-color:white;color:red;font-weight:900;border-radius:1rem;'>x</button></span><table class='building-table-county'><tr><th>Geography (left-click to zoom-in/out)<br></th><th>BLE</th><th>Paper</th></tr>";
          tableHTML += "<tr onclick='map.setView([31.6, -95.5], 6)'>";
          tableHTML += "<td><b>Region wide extent</b></td>";
          tableHTML += "<td>" + countyCount2.toLocaleString() + "</td>";
          tableHTML += "<td>" + countyCount1.toLocaleString() + "</td>";
          tableHTML += "</tr>";
          county.forEach(function (county) {
            tableHTML += "<tr class='community-row' onclick='fitBoundsToFeature(event)' data-county='" + county + "'>";
            tableHTML += "<td>" + county + "</td>";
            tableHTML += "<td>" + countyCounts[county].BLE_A_ZONE.toLocaleString() + "</td>";
            tableHTML += "<td>" + countyCounts[county].CORELOGIC.toLocaleString() + "</td>";
            tableHTML += "</tr>";
          });
          tableHTML += "</table>";
          container.innerHTML = tableHTML;
          L.DomEvent.disableClickPropagation(container);
          return container;
        }      
      });
      countyTableControl = new CountyTableControl();



      var communityRows = document.getElementsByClassName('community-row');
      for (var i = 0; i < communityRows.length; i++) {
        communityRows[i].addEventListener('click', flyToFeature);
      }





      countyTableControl.addTo(map);
      communityTableControl.addTo(map);
      // alert("County " + countyTableControl_)
      // alert("Community " + communityTableControl_)
      if(countyTableControl_ == true){
        document.querySelector(".structure-table-com").classList.add("hide");
        document.querySelector(".structure-table-cnty").classList.remove("hide");
      }
      if(communityTableControl_ == true){
        document.querySelector(".structure-table-com").classList.remove("hide");
        document.querySelector(".structure-table-cnty").classList.add("hide");
      }

      document.querySelector(".testCnty").onclick = function(){
          document.querySelector(".structure-table-com").classList.remove("hide");
          document.querySelector(".structure-table-cnty").classList.add("hide");
          communityTableControl_ = true;
          countyTableControl_ = false;
      }
      document.querySelector(".testCom").onclick = function(){
          document.querySelector(".structure-table-com").classList.add("hide");
          document.querySelector(".structure-table-cnty").classList.remove("hide");
          communityTableControl_ = false;
          countyTableControl_ = true;
      }

    } /// updateDataCount
    
    map.on('moveend', function () {
      updateDataCount();
      if(tableHidden == true){
        document.querySelector(".structure-table-com").classList.add("hide");
        document.querySelector(".structure-table-cnty").classList.add("hide");
      }
    });


    function flyToFeature(event) {
      var community = event.currentTarget.dataset.community;
      if (community) {
        var feature = filteredFeatures2.find(function (f) {
          return f.properties.POL_NAME2 === community;
        });
        if (feature) {
          map.setView([feature.geometry.coordinates[1] + 0.015, feature.geometry.coordinates[0]], 15);
        }
      }
      var county = event.currentTarget.dataset.county;
      if (county) {
        var feature = filteredFeatures2.find(function (f) {
          return f.properties.CNTY === county;
        });
        if (feature) {
          map.setView([feature.geometry.coordinates[1] + 0.015, feature.geometry.coordinates[0]], 15);
        }
      }
    }

    let tableHidden = false;

    var input7 = document.querySelector('input[type="checkbox"][data-layer-id="structures"]');
    input7.onchange = function () {
      if (this.checked) {
        heat.addTo(allLayers);
        if (countyTableControl_ == true) {
          document.querySelector(".structure-table-com").classList.add("hide");
          document.querySelector(".structure-table-cnty").classList.remove("hide");
        } else if (countyTableControl_ == false) {
          document.querySelector(".structure-table-com").classList.remove("hide");
          document.querySelector(".structure-table-cnty").classList.add("hide");

        }
        tableHidden = false;
      } else {
        heat.removeFrom(allLayers);

        document.querySelector(".structure-table-com").classList.add("hide");
        document.querySelector(".structure-table-cnty").classList.add("hide");
        tableHidden = true;

      }
    };

  });

var input = document.querySelector('input[type="checkbox"][data-layer-id="extent1-02"]');
input.onchange = function () {
  if (this.checked) {
    bleLayer.addTo(allLayers);
  } else {
    bleLayer.removeFrom(allLayers);
  }
};
var input2 = document.querySelector('input[type="checkbox"][data-layer-id="eff-scop-stream"]');
input2.onchange = function () {
  if (this.checked) {
    eff_scop_stream.addTo(allLayers);
  } else {
    eff_scop_stream.removeFrom(allLayers);
  }
};
eff_scop_stream.setOpacity = function (opacity) {
  this.setStyle({
    opacity: opacity
  });
};
var input3 = document.querySelector('input[type="checkbox"][data-layer-id="pir-stream-cent"]');
input3.onchange = function () {
  if (this.checked) {
    pir_stream_cent.addTo(allLayers);
  } else {
    pir_stream_cent.removeFrom(allLayers);
  }
};
var input4 = document.querySelector('input[type="checkbox"][data-layer-id="PIR-Limit-Lines"]');
input4.onchange = function () {
  if (this.checked) {
    PIR_Limit_Lines.addTo(allLayers);
  } else {
    PIR_Limit_Lines.removeFrom(allLayers);
  }
};
PIR_Limit_Lines.setOpacity = function (opacity) {
  this.setStyle({
    opacity: opacity
  });
};
var input5 = document.querySelector('input[type="checkbox"][data-layer-id="Geo-Referenced-FIRMs"]');
input5.onchange = function () {
  if (this.checked) {
    Geo_Referenced_FIRMs.addTo(allLayers);
  } else {
    Geo_Referenced_FIRMs.removeFrom(allLayers);
  }
};
var input6 = document.querySelector('input[type="checkbox"][data-layer-id="city-Limits"]');
input6.onchange = function () {
  if (this.checked) {
    cityLimits_.addTo(allLayers);
  } else {
    cityLimits_.removeFrom(allLayers);
  }
};
cityLimits_.setOpacity = function (opacity) {
  this.setStyle({
    opacity: opacity
  });
};
var input8 = document.querySelector('input[type="checkbox"][data-layer-id="DFIRM"]');
input8.onchange = function () {
  if (this.checked) {
    nfhl.addTo(allLayers);
  } else {
    nfhl.removeFrom(allLayers);
  }
};

function closeLayerTray() {
  document.querySelector(".card").classList.add("hide");
}

function tableCloseCom_btn() {
  var table = document.querySelector('.building-table-com');

  if (table.style.visibility === 'hidden') {
    table.style.visibility = 'visible'; // Show the table
  } else {
    table.style.visibility = 'hidden'; // Hide the table
  }
}

function tableCloseCnty_btn() {
  var table = document.querySelector('.building-table-county');

  if (table.style.visibility === 'hidden') {
    table.style.visibility = 'visible'; // Show the table
  } else {
    table.style.visibility = 'hidden'; // Hide the table
  }
}