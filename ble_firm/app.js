
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
const groupLayers = L.layerGroup([]).addTo(map);
// const supportLayers = L.layerGroup([]).addTo(map);
// const selectedAoi = L.layerGroup([]).addTo(map);

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
baseMaps.innerHTML = `<div id='baseMapsid' class='basemapsContainer basemapTray hide'><div style='width:100%;height:100%;background-color:rgb(196, 192, 192);padding:0.3rem;'><p style='margin:0px 0px 5px 0px;'><b>Select a base map:</b></p><hr><div id='basemap1' class='basemaps basemapSelected'><img class='basemapImg' src='http://mt1.google.com/vt/lyrs=s,h&x=30186&y=52699&z=17'><div class='basemapLabel'>Google Imagery</div></div><div id='basemap2' class='basemaps'><img class='basemapImg' src='http://mt1.google.com/vt/lyrs=p&x=30186&y=52699&z=17'><div class='basemapLabel'>Google Terrain</div></div><div id='basemap3' class='basemaps'><img class='basemapImg' src='http://mt0.google.com/vt/lyrs=m&hl=en&x=30186&y=52699&z=17'><div class='basemapLabel'>Google Roads</div></div><br><div id='basemap4' class='basemaps'><img class='basemapImg' src='https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/18/105398/60373'><div class='basemapLabel'>ESRI Imagery</div></div><div id='basemap5' class='basemaps'><img class='basemapImg' src='https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/16/26349/15093'><div class='basemapLabel'>USGS Topo</div></div><div id='basemap6' class='basemaps'><img class='basemapImg' src='https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryTopo/MapServer/tile/16/26349/15093'><div class='basemapLabel'>USGS Imagery</div></div><br><div id='basemap7' class='basemaps'><img class='basemapImg' src='https://tileserver.memomaps.de/tilegen/17/30186/52699.png'><div class='basemapLabel'>ÖPNVKarte</div></div><div id='basemap8' class='basemaps'><img class='basemapImg' src='https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/17/30186/52699.png'><div class='basemapLabel'>Stadia Dark</div></div><div id='basemap9' class='basemaps'><img class='basemapImg' src='https://c.tile.opentopomap.org/15/7546/13174.png'><div class='basemapLabel'>OSM OpenTopo</div></div><hr><button id='closeBasemaps' class='baseMap-layersClose'>X</button></div></div></div>`;
document.body.appendChild(baseMaps);

document.getElementById("queryCnty").onclick = function (e) {
    document.querySelector(".splash-bg").classList.add("hide");

    document.querySelector(".splash").classList.add("hide");
    // L.esri.featureLayer({url:"https://services.arcgis.com/XG15cJAlne2vxtgt/arcgis/rest/services/watch_designated_cnty/FeatureServer/0",where:"NAME = 'Choctaw'"}).addTo(map);
    map.setView([34,-95.55],11.5);
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

///// LEGEND
var legendCtrl = L.control({
    position: 'bottomright'
});
legendCtrl.onAdd = function (map) {
	this._div = L.DomUtil.create('div', 'legend'); // create a div with a class "info"
	this.addlegendCtrl();
	return this._div;
};
legendCtrl.addlegendCtrl = function (props) {
	this._div.innerHTML =
		`<span>I'm a Legend or something</span>`;
};



map.createPane('labels');
map.getPane('labels').style.zIndex = 675;
map.createPane('labels2');
map.getPane('labels2').style.zIndex = 680;


// const firmPanels = L.layerGroup([]).addTo(groupLayers);
// var panel1Url = "https://fema.maps.arcgis.com/sharing/rest/content/items/d87d3228970245b7a71711dbc0f757d3/data";
// imageBounds1 = [[33.9358333912523, -95.3703997207588], [33.7887557129813, -95.1921616572141]];
// var panel2Url = "https://fema.maps.arcgis.com/sharing/rest/content/items/46e701f2edb04c2eb853636158c3bc11/data";
// imageBounds2 = [[33.9376888995433, -95.585523091363], [33.7879441927954, -95.3333821464634]];
// var panel3Url = "https://fema.maps.arcgis.com/sharing/rest/content/items/61cb98bced154747b00eb81d6b7fdc61/data";
// imageBounds3 = [[33.9378874391243, -95.8026222715161], [33.786787245669, -95.5455264661366]];
// var panel4Url = "https://fema.maps.arcgis.com/sharing/rest/content/items/c181f7f6ec294bc39e0904af7a4d8157/data";
// imageBounds4 = [[33.9352318067832, -95.9419040223619], [33.7888531851597, -95.7642718585257]];
// var panel5Url = "https://fema.maps.arcgis.com/sharing/rest/content/items/a878ec55b50f4a1cb3b790e334e1c0ec/data";
// imageBounds5 = [[34.0727312430507, -96.0166251304936], [33.9233683837236, -95.7648595551692]];
// var panel6Url = "https://fema.maps.arcgis.com/sharing/rest/content/items/5a535643a49c4baa98d3bad331abc244/data";
// imageBounds6 = [[34.0741017981388, -95.8015113285925], [33.9239658378863, -95.5481221584213]];
// var panel7Url = "https://fema.maps.arcgis.com/sharing/rest/content/items/8236b65f16924188997bd65541b410d0/data";
// imageBounds7 = [[34.0750298143344, -95.5872511761848], [33.9236561188783, -95.3323175451596]];
// var panel8Url = "https://fema.maps.arcgis.com/sharing/rest/content/items/74068202f99e473187a661695e9e5ac0/data";
// imageBounds8 = [[34.0689022295341, -95.3665409878844], [33.9282929162981, -95.1215979329325]];
// var panel9Url = "https://fema.maps.arcgis.com/sharing/rest/content/items/687bc697111d475b807b6f5a9ace5852/data";
// imageBounds9 = [[34.2085134229022, -96.0155397639112], [34.0642524913613, -95.7695077527486]];
// var panel10Url = "https://fema.maps.arcgis.com/sharing/rest/content/items/ef120e00126d4005879ea8e9a8b5a20a/data";
// imageBounds10 = [[34.2106756545142, -95.8026490517666], [34.0603485519821, -95.5491608120561]];
// var panel11Url = "https://fema.maps.arcgis.com/sharing/rest/content/items/e463714af288446fb30e7e2f5cbd908b/data";
// imageBounds11 = [[34.2031635778731, -95.5861228642645], [34.0646541688486, -95.3353714294737]];
// var panel12Url = "https://fema.maps.arcgis.com/sharing/rest/content/items/5ea8add6516c4412a25685c73f188f47/data";
// imageBounds12 = [[34.2104437613851, -95.3707460676752], [34.0596373906257, -95.115805366481]];

// var panel13Url = "https://fema.maps.arcgis.com/sharing/rest/content/items/e843a9780d08426bba201150be662cbb/data";
// imageBounds13 = [[34.0283519005225, -95.2871518892081], [34.0085443737036, -95.2520745189395]];





// const firm1 = L.imageOverlay(panel4Url, imageBounds4).addTo(firmPanels);
// const firm2 = L.imageOverlay(panel3Url, imageBounds3).addTo(firmPanels);
// const firm3 = L.imageOverlay(panel2Url, imageBounds2).addTo(firmPanels);
// const firm4 = L.imageOverlay(panel1Url, imageBounds1).addTo(firmPanels);
// const firm5 = L.imageOverlay(panel5Url, imageBounds5).addTo(firmPanels);
// const firm6 = L.imageOverlay(panel6Url, imageBounds6).addTo(firmPanels);
// const firm7 = L.imageOverlay(panel7Url, imageBounds7).addTo(firmPanels);
// const firm8 = L.imageOverlay(panel8Url, imageBounds8).addTo(firmPanels);
// const firm9 = L.imageOverlay(panel9Url, imageBounds9).addTo(firmPanels);
// const firm10 = L.imageOverlay(panel10Url, imageBounds10).addTo(firmPanels);
// const firm11 = L.imageOverlay(panel11Url, imageBounds11).addTo(firmPanels);
// const firm12 = L.imageOverlay(panel12Url, imageBounds12).addTo(firmPanels);

// const firm13 = L.imageOverlay(panel13Url, imageBounds13).addTo(firmPanels);

const polLayer = L.esri.featureLayer({url:"https://services.arcgis.com/XG15cJAlne2vxtgt/arcgis/rest/services/Choctaw_S_Pol_Ar/FeatureServer/0",
simplifyFactor: 0.85,
precision: 5,
opacity:0.85,pane:"labels2",
style: function (feature) {
    var c;
    switch (feature.properties.D_BI_RT_NAME) {
      case 'Bluegrass Bike Tour':
        c = '#377EB8';
        break;
      default:
        c = 'orange';
    }
    return { color: c,fillOpacity:0};
}
}).addTo(groupLayers);
polLayer.bindPopup(function (layer) {
    return L.Util.template('<p><strong>Community Name:<br> {POL_NAME1}</strong></p>', layer.feature.properties);
  });
const scopingLines = L.esri.featureLayer({url:"https://services.arcgis.com/XG15cJAlne2vxtgt/arcgis/rest/services/Choctaw_ScopingLines_web/FeatureServer/0",
simplifyFactor: 0.85,
precision: 5,
opacity:0.85,pane:"labels2",
    style: function (feature) {
        var c;
        switch (feature.properties.D_BI_RT_NAME) {
          case 'Bluegrass Bike Tour':
            c = '#377EB8';
            break;
          default:
            c = 'red';
        }
        return { color: c};
}
});
const profileBasln = L.esri.featureLayer({url:"https://services.arcgis.com/XG15cJAlne2vxtgt/arcgis/rest/services/Choctaw_S_Profil_Basln_web/FeatureServer/0",
simplifyFactor: 0.75,
precision: 5
,opacity:0.85,pane:"labels2",
style: function (feature) {
    var c;
    switch (feature.properties.D_BI_RT_NAME) {
      case 'Bluegrass Bike Tour':
        c = '#377EB8';
        break;
      default:
        c = 'yellow';
    }
    return { color: c};
}
});

const firmPanels = L.esri.tiledMapLayer({
    url: 'https://tiles.arcgis.com/tiles/XG15cJAlne2vxtgt/arcgis/rest/services/Choctaw_firmPanels/MapServer',opacity:0.85,pane:"labels"
  });

const bleSfhaData = L.esri.tiledMapLayer({
    url: 'https://tiles.arcgis.com/tiles/XG15cJAlne2vxtgt/arcgis/rest/services/S_Fld_Haz_Ar_web_/MapServer',opacity:0.5,pane:"labels"
  }).addTo(groupLayers);  
  
document.getElementById("layer1").onclick = function (e) {
    if (groupLayers.hasLayer(bleSfhaData)) {
        groupLayers.removeLayer(bleSfhaData);
        document.getElementById("layer1").innerHTML = "OFF";
        document.getElementById("layer1").classList.add("button-off");
    } else {
        groupLayers.addLayer(bleSfhaData);
        document.getElementById("layer1").innerHTML = "ON";
        document.getElementById("layer1").classList.remove("button-off");
    }
}
document.getElementById("layer2").onclick = function (e) {
    if (groupLayers.hasLayer(polLayer)) {
        groupLayers.removeLayer(polLayer);
        document.getElementById("layer2").innerHTML = "OFF";
        document.getElementById("layer2").classList.add("button-off");
    } else {
        groupLayers.addLayer(polLayer);
        document.getElementById("layer2").innerHTML = "ON";
        document.getElementById("layer2").classList.remove("button-off");
    }
}
document.getElementById("layer3").onclick = function (e) {
    if (groupLayers.hasLayer(scopingLines)) {
        groupLayers.removeLayer(scopingLines);
        document.getElementById("layer3").innerHTML = "OFF";
        document.getElementById("layer3").classList.add("button-off");
    } else {
        groupLayers.addLayer(scopingLines);
        document.getElementById("layer3").innerHTML = "ON";
        document.getElementById("layer3").classList.remove("button-off");
    }
}
document.getElementById("layer4").onclick = function (e) {
    if (groupLayers.hasLayer(profileBasln)) {
        groupLayers.removeLayer(profileBasln);
        document.getElementById("layer4").innerHTML = "OFF";
        document.getElementById("layer4").classList.add("button-off");
    } else {
        groupLayers.addLayer(profileBasln);
        document.getElementById("layer4").innerHTML = "ON";
        document.getElementById("layer4").classList.remove("button-off");
    }
}
document.getElementById("layer5").onclick = function (e) {
    if (groupLayers.hasLayer(firmPanels)) {
        groupLayers.removeLayer(firmPanels);
        document.getElementById("layer5").innerHTML = "OFF";
        document.getElementById("layer5").classList.add("button-off");
    } else {
        groupLayers.addLayer(firmPanels);
        document.getElementById("layer5").innerHTML = "ON";
        document.getElementById("layer5").classList.remove("button-off");
    }
}