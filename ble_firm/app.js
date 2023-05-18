const map = L.map('map', {
  attributionControl: false,
  zoomControl: false,
  zoomSnap: 0.1,
  zoomDelta: 0.1,
  boxZoom: true,
  minZoom: 5
}).setView([31.6, -99.5], 6);
map.setMaxBounds(map.getBounds().pad(0.2));


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
// document.querySelector(".layersTrayBtn").addEventListener("mouseover", function (e) {
//     var layerTooltip = document.createElement("div");
//     layerTooltip.innerHTML = `<div id="layersTooltip" style="border-radius: 6px;padding:0.25rem 2rem 0.25rem 2rem;font-size:1.25rem;position:absolute;z-index:750;top:22.35%;left:2.5%;background-color:#337ab7;color:white;"><b>Layers</b></div>`;
//     document.body.appendChild(layerTooltip);

// });
// document.querySelector(".layersTrayBtn").addEventListener("mouseout", function (e) {
//     document.getElementById("layersTooltip").remove();
// });
// document.querySelector(".basemapTrayBtn").addEventListener("mouseover", function (e) {
//     var basemapTooltip = document.createElement("div");
//     basemapTooltip.innerHTML = `<div id="basemapTooltip" style="border-radius: 6px;padding:0.25rem 2rem 0.25rem 2rem;font-size:1.25rem;position:absolute;z-index:750;top:17.5%;left:2.5%;background-color:#337ab7;color:white;"><b>Base Maps</b></div>`;
//     document.body.appendChild(basemapTooltip);
// });
// document.querySelector(".basemapTrayBtn").addEventListener("mouseout", function (e) {
//     document.getElementById("basemapTooltip").remove();
// });

// document.querySelector(".splashBtn").addEventListener("mouseover", function (e) {
//     var splashTooltip = document.createElement("div");
//     splashTooltip.innerHTML = `<div id="splashTooltip" style="border-radius: 6px;padding:0.25rem 2rem 0.25rem 2rem;font-size:1.25rem;position:absolute;z-index:750;bottom:25%;left:2.5%;background-color:#337ab7;color:white;"><b>Queries</b></div>`;
//     document.body.appendChild(splashTooltip);

// });
// document.querySelector(".splashBtn").addEventListener("mouseout", function (e) {
//     document.getElementById("splashTooltip").remove();
// });
document.querySelector(".basemapTrayBtn").onclick = function (e) {
  document.querySelector(".basemapTray").classList.remove("hide");
  document.getElementById("layerTray").classList.add("hide");
}
// document.getElementById("closeLayers2").onclick = function (e) {
//     document.querySelector(".layersTray").classList.add("hide");
//     document.querySelector(".basemapTray").classList.add("hide");
// }
document.getElementById("closeBasemaps").onclick = function (e) {
  document.getElementById("layerTray").classList.add("hide");
  document.querySelector(".basemapTray").classList.add("hide");
}
// document.querySelector(".leaflet-control-container").addEventListener("mouseover", function (e) {
//     document.querySelector(".layersTray").classList.add("hide");
//     document.querySelector(".basemapTray").classList.add("hide");
// });


// map.createPane('labels');
// map.getPane('labels').style.zIndex = 675;
// map.createPane('labels2');
// map.getPane('labels2').style.zIndex = 680;
// const items = ["Choctaw", "Harper", "Latimer", "Love", "Pushmataha", "Trinity"];

// function search() {
//   var query = document.getElementById('search-box').value.toLowerCase();
//   document.getElementById('results-list').innerHTML = '';
//   for (var i = 0; i < items.length; i++) {
//     var item = items[i];
//     if (item.toLowerCase().indexOf(query) !== -1) {
//       var resultItem = document.createElement('li');
//       resultItem.textContent = item;
//       resultItem.setAttribute('id', item);
//       document.getElementById('results-list').appendChild(resultItem);
//       (function (text) {
//         document.querySelector('#' + text).addEventListener('click', function () {
//           if (text == "Choctaw") {
//             map.setView([34, -95.55], 11);
//             document.getElementById("UtilDialog").classList.remove("show");
//             setTimeout(function () {
//               document.querySelector(".modal").style = "display:none";
//             }, 750)

//           } else if (text == "Harper") {
//             map.setView([36.82959180923689, -99.63055335115429], 12);
//             document.getElementById("UtilDialog").classList.remove("show");
//             setTimeout(function () {
//               document.querySelector(".modal").style = "display:none";
//             }, 750)
//           } else if (text == "Latimer") {
//             map.setView([34.87231196866829, -95.25671380632579], 12);
//             document.getElementById("UtilDialog").classList.remove("show");
//             setTimeout(function () {
//               document.querySelector(".modal").style = "display:none";
//             }, 750)
//           } else if (text == "Love") {
//             map.setView([33.98610403918645, -97.22297071856153], 12);
//             document.getElementById("UtilDialog").classList.remove("show");
//             setTimeout(function () {
//               document.querySelector(".modal").style = "display:none";
//             }, 750)
//           } else if (text == "Pushmataha") {
//             map.setView([34.48173274712084, -95.30996464363149], 12);
//             document.getElementById("UtilDialog").classList.remove("show");
//             setTimeout(function () {
//               document.querySelector(".modal").style = "display:none";
//             }, 750)
//           } else if (text == "Trinity") {
//             map.setView([31.09792847231909, -95.11758881648315], 12);
//             document.getElementById("UtilDialog").classList.remove("show");
//             setTimeout(function () {
//               document.querySelector(".modal").style = "display:none";
//             }, 750)
//           }
//         });
//       })(item);
//     }
//   }
// }
// document.getElementById('search-box').addEventListener('input', search);
// const searchBox = document.getElementById("search-box");
// const resultsList = document.getElementById("results-list");
// searchBox.addEventListener("input", showResultsList);
// document.addEventListener("click", hideResultsList);

// function showResultsList() {
//   resultsList.style.display = "block";
// }

// function hideResultsList(event) {
//   if (event.target !== searchBox && !resultsList.contains(event.target)) {
//     resultsList.style.display = "none";
//   }
// }
function zoomToCounty() {
  var dropdown = document.getElementById('county-dropdown');
  var selectedCounty = dropdown.value;

  if (selectedCounty === "Choctaw") {
    map.setView([34, -95.55], 11);
  } else if (selectedCounty === "Harper") {
    map.setView([36.82959180923689, -99.63055335115429], 12);
  } else if (selectedCounty === "Latimer") {
    map.setView([34.87231196866829, -95.25671380632579], 12);
  } else if (selectedCounty === "Love") {
    map.setView([33.98610403918645, -97.22297071856153], 12);
  } else if (selectedCounty === "Pushmataha") {
    map.setView([34.48173274712084, -95.30996464363149], 12);
  } else if (selectedCounty === "Trinity") {
    map.setView([31.09792847231909, -95.11758881648315], 12);
  }

  document.getElementById("UtilDialog").classList.remove("show");
  setTimeout(function () {
    document.querySelector(".modal").style = "display:none";
  }, 750);

  // Remove the "Select a County" option from the dropdown
  dropdown.remove(0);
}

const allLayers = L.layerGroup().addTo(map);
const bleLayer = L.esri.Vector.vectorTileLayer(
  "https://tiles.arcgis.com/tiles/XG15cJAlne2vxtgt/arcgis/rest/services/BLEtoFIRMSFHA/VectorTileServer", {
    style: (feature) => {
      return {
        "version": 8,
        "sources": {
          "my-vector-tiles": {
            "type": "vector",
            "tiles": [
              "https://tiles.arcgis.com/tiles/XG15cJAlne2vxtgt/arcgis/rest/services/BLEtoFIRMSFHA/VectorTileServer/tile/{z}/{y}/{x}"
            ]
          }
        },
        "layers": [{
          "id": "BLE_SFHA/X/1",
          "type": "fill",
          "source": "my-vector-tiles",
          "source-layer": "BLE_SFHA",
          "paint": {
            "fill-color": "#A900E6",
            "fill-opacity": 0.5
          },
          "filter": ["==", "_symbol", 1]
        }, {
          "id": "BLE_SFHA/<all other values>",
          "type": "fill",
          "source": "my-vector-tiles",
          "source-layer": "BLE_SFHA",
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
  url: 'https://tiles.arcgis.com/tiles/XG15cJAlne2vxtgt/arcgis/rest/services/geo_ref_firms/MapServer',
  opacity: 1
}).addTo(allLayers);
// Streams
const eff_scop_stream = L.esri.Vector.vectorTileLayer(
  "https://vectortileservices.arcgis.com/XG15cJAlne2vxtgt/arcgis/rest/services/PIR_Stream_Centerline/VectorTileServer"
);
const pir_stream_cent = L.esri.Vector.vectorTileLayer(
  "https://tiles.arcgis.com/tiles/XG15cJAlne2vxtgt/arcgis/rest/services/BLE_PBL/VectorTileServer");
const cityLimits_ = L.geoJson(cityLimits, {
  style: {
    color: "orange", // set line color to orange
    weight: 5, // set line weight to 5 pixels
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
    var currentFilter = 'BLE_FLD_ZO';

    function updateFilteredFeatures() {
      filteredFeatures.length = 0;
      layer.features.forEach(function (feature) {
        if (currentFilter === 'FLD_ZONE') {
          if (feature.properties.FLD_ZONE === 'yes') {
            filteredFeatures.push(feature);
          }
        } else if (currentFilter === 'BLE_FLD_ZO') {
          if (feature.properties.BLE_FLD_ZO === 'yes') {
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
      updateDataCount();
    }
    updateFilteredFeatures();
    // var filterButton = document.getElementById('toggle-button');
    // filterButton.addEventListener('click', function () {
    //   if (currentFilter === 'FLD_ZONE') {
    //     currentFilter = 'BLE_FLD_ZO';
    //   } else if (currentFilter === 'BLE_FLD_ZO') {
    //     currentFilter = 'FLD_ZONE';
    //   }
    //   updateFilteredFeatures();
    // });

    function jsonPointsToArray(features) {
      let featureGeometriesArray = [];
      features.forEach(function (f) {
        featureGeometriesArray.push([f.geometry.coordinates[1], f.geometry.coordinates[0]])
      });
      return featureGeometriesArray;
    }

    // function updateDataCount() {
    //   var bounds = map.getBounds();
    //   var count1 = 0;
    //   var count2 = 0;
    //   filteredFeatures.forEach(function (feature) {
    //     if (bounds.contains(L.latLng(feature.geometry.coordinates[1], feature.geometry.coordinates[0]))) {
    //       if (feature.properties.FLD_ZONE === 'yes') {
    //         count1++;
    //       }
    //       if (feature.properties.BLE_FLD_ZO === 'yes') {
    //         count2++;
    //       }
    //     }
    //   });
    //   var diff = count2 - count1;
      // dataCount = count2 + " | " + count1 + " | " + diff;
      // document.getElementById("value").innerHTML = dataCount;
      //const svg = "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'><path fill='#c0c0c0' d='M464 416h-416c-26.4 0-48-21.6-48-48v-256c0-26.4 21.6-48 48-48h128v32h-128v256h416v-256h-128v-32h128c26.4 0 48 21.6 48 48v256c0 26.4-21.6 48-48 48z'></path><path fill='#808080' d='M320 320h-128v-96h-96v128h-32v-192c0-17.6 14.4-32 32-32h192c17.6 0 32 14.4 32 32v192h-32z'></path><path fill='#fff' d='M288 288h-64v-64h-64v64h-32v-96c0-8.8 7.2-16 16-16h64c8.8 0 16 7.2 16 16v96h-32z'></path></svg>";
    //   const svg = "";
    //   var tableHTML = "<table><tr><th>" + svg + " BLE</th><th>" + svg + "Paper</th><th>Increase</th></tr>";
    //   tableHTML += "<tr><td>" + count2.toLocaleString() + "</td><td>" + count1.toLocaleString() + "</td><td> + " + diff.toLocaleString() + "</td></tr></table>";
    //   document.getElementById("value").innerHTML = tableHTML;
    // }
    // map.on('moveend', function () {
    //   updateDataCount();
    // });
    var input7 = document.querySelector('input[type="checkbox"][data-layer-id="structures"]');
    input7.onchange = function () {
      if (this.checked) {
        heat.addTo(allLayers);
        document.getElementById("structureTable").classList.remove("hide");
      } else {
        heat.removeFrom(allLayers);
        document.getElementById("structureTable").classList.add("hide");
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
function clearMap() {
  allLayers.clearLayers();
  input.checked = false;
  input2.checked = false;
  input3.checked = false;
  input4.checked = false;
  input5.checked = false;
  input6.checked = false;
  input7.checked = false;
  input8.checked = false;
}

function closeLayerTray() {
  document.querySelector(".card").classList.add("hide");
}