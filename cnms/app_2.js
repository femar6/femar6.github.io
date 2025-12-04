// ===============================
// Dash animation for dashed AOI outline
// ===============================
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

// ===============================
// URLs / Global State
// ===============================
const cntyUrl = "https://services.arcgis.com/XG15cJAlne2vxtgt/arcgis/rest/services/watch_designated_cnty/FeatureServer/0";
const huc8Url = "https://services.arcgis.com/XG15cJAlne2vxtgt/arcgis/rest/services/r6_huc8_cnms/FeatureServer/0";
const comUrl = "https://services.arcgis.com/XG15cJAlne2vxtgt/arcgis/rest/services/R6_census_community/FeatureServer/0";

const streamsUrl = "https://services.arcgis.com/XG15cJAlne2vxtgt/arcgis/rest/services/R6_cnms_S_Studies/FeatureServer/0";
const UnmappedStreamsUrl = "https://services.arcgis.com/XG15cJAlne2vxtgt/arcgis/rest/services/R6_cnms_S_Unmapped_BsLn/FeatureServer/0";

// app state: separates "mode" from the SQL where clause used for CNMS
const appState = {
    mode: null,          // 0 = county, 1 = HUC8, 2 = community
    whereClause: "",     // CNMS WHERE clause for streamsUrl
    titleName: ""        // Name for table title
};

let oldId = null;        // for hover highlight tracking

// ===============================
// Map + base layers
// ===============================
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
const ble_1per = L.esri.dynamicMapLayer({
    url: "https://txgeo.usgs.gov/arcgis/rest/services/FEMA_EBFE/EBFE/MapServer",
    layers: [12],
    opacity: 0.35
});

const baseMapLayers = L.layerGroup([]).addTo(map);
const groupLayers = L.layerGroup([]).addTo(map);
const supportLayers = L.layerGroup([]).addTo(map);
const selectedAoi = L.layerGroup([]).addTo(map);
const selectedData = L.layerGroup([]).addTo(map);
const results = L.layerGroup().addTo(map);

const googleRoad = L.tileLayer('https://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}', {
    maxZoom: 21,
    attribution: '&copy; <a href="https://www.google.com">Google</a>',
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});
const google_terrain = L.tileLayer('https://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}', {
    attribution: '&copy; <a href="https://www.google.com">Google</a>',
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});
var google_hybrid = L.tileLayer('https://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
    attribution: '&copy; <a href="https://www.google.com">Google</a>',
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
}).addTo(baseMapLayers);

const Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}');

var USGS_USTopo = L.tileLayer('https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles courtesy of the <a href="https://usgs.gov/">U.S. Geological Survey</a>'
});
var USGS_USImageryTopo = L.tileLayer('https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryTopo/MapServer/tile/{z}/{y}/{x}', {
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

// ===============================
// Basemap tray HTML
// ===============================
var legendCtrl = L.control({ position: 'bottomright' });

const baseMaps = document.createElement("div");
baseMaps.innerHTML = `
<div id='baseMapsid' class='basemapsContainer basemapTray hide'>
  <div style='width:100%;height:100%;background-color:rgb(196, 192, 192);padding:0.3rem;'>
    <p style='margin:0px 0px 5px 0px;'><b>Select a base map:</b></p>
    <hr>
    <div id='basemap1' class='basemaps basemapSelected'>
      <img class='basemapImg' src='https://mt1.google.com/vt/lyrs=s,h&x=30186&y=52699&z=17'>
      <div class='basemapLabel'>Google Imagery</div>
    </div>
    <div id='basemap2' class='basemaps'>
      <img class='basemapImg' src='https://mt1.google.com/vt/lyrs=p&x=30186&y=52699&z=17'>
      <div class='basemapLabel'>Google Terrain</div>
    </div>
    <div id='basemap3' class='basemaps'>
      <img class='basemapImg' src='https://mt0.google.com/vt/lyrs=m&hl=en&x=30186&y=52699&z=17'>
      <div class='basemapLabel'>Google Roads</div>
    </div>
    <br>
    <div id='basemap4' class='basemaps'>
      <img class='basemapImg' src='https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/18/105398/60373'>
      <div class='basemapLabel'>ESRI Imagery</div>
    </div>
    <div id='basemap5' class='basemaps'>
      <img class='basemapImg' src='https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/16/26349/15093'>
      <div class='basemapLabel'>USGS Topo</div>
    </div>
    <div id='basemap6' class='basemaps'>
      <img class='basemapImg' src='https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryTopo/MapServer/tile/16/26349/15093'>
      <div class='basemapLabel'>USGS Imagery</div>
    </div>
    <br>
    <div id='basemap7' class='basemaps'>
      <img class='basemapImg' src='https://tileserver.memomaps.de/tilegen/17/30186/52699.png'>
      <div class='basemapLabel'>ÖPNVKarte</div>
    </div>
    <div id='basemap8' class='basemaps'>
      <img class='basemapImg' src='https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/17/30186/52699.png'>
      <div class='basemapLabel'>Stadia Dark</div>
    </div>
    <div id='basemap9' class='basemaps'>
      <img class='basemapImg' src='https://c.tile.opentopomap.org/15/7546/13174.png'>
      <div class='basemapLabel'>OSM OpenTopo</div>
    </div>
    <hr>
    <button id='closeBasemaps' class='baseMap-layersClose'>X</button>
  </div>
</div>
`;
document.body.appendChild(baseMaps);

// ===============================
// AOI base layers
// ===============================
var style1 = {
    color: 'white',
    fillColor: 'white',
    dashArray: 3,
    fillOpacity: 0.15,
    weight: 1
};

const cntyLayer = L.esri.featureLayer({
    url: cntyUrl,
    simplifyFactor: 0.35,
    precision: 5,
    style: style1
});

const huc8Layer = L.esri.featureLayer({
    url: huc8Url,
    simplifyFactor: 0.35,
    precision: 5,
    style: style1
});

const comLayer = L.esri.featureLayer({
    url: comUrl,
    simplifyFactor: 0.35,
    precision: 5,
    style: style1
});

var myStyle = {
    color: "black",
    weight: 2,
    fillOpacity: 0.65
};

// state_mask is assumed to be defined globally
L.geoJSON(state_mask, {
    style: myStyle,
    interactive: false
}).addTo(map);

// ===============================
// Mode selection buttons
// ===============================
document.getElementById("queryCnty").addEventListener("click", function () {
    document.querySelector(".splash").classList.add("hide");
    document.querySelector(".splash-bg").classList.add("hide");

    groupLayers.clearLayers();
    groupLayers.addLayer(cntyLayer);

    appState.mode = 0;
    appState.whereClause = "";
    appState.titleName = "";

    searchControlCnty.addTo(map);
    searchControlHuc8.removeFrom(map);
    searchControlCom.removeFrom(map);

    infoCtrl.addTo(map);
});

document.getElementById("queryHuc8").addEventListener("click", function () {
    document.querySelector(".splash").classList.add("hide");
    document.querySelector(".splash-bg").classList.add("hide");

    groupLayers.clearLayers();
    groupLayers.addLayer(huc8Layer);

    appState.mode = 1;
    appState.whereClause = "";
    appState.titleName = "";

    searchControlCnty.removeFrom(map);
    searchControlHuc8.addTo(map);
    searchControlCom.removeFrom(map);

    infoCtrl.addTo(map);
});

document.getElementById("queryCom").addEventListener("click", function () {
    document.querySelector(".splash").classList.add("hide");
    document.querySelector(".splash-bg").classList.add("hide");

    groupLayers.clearLayers();
    groupLayers.addLayer(comLayer);

    appState.mode = 2;
    appState.whereClause = "";
    appState.titleName = "";

    searchControlCnty.removeFrom(map);
    searchControlHuc8.removeFrom(map);
    searchControlCom.addTo(map);

    infoCtrl.addTo(map);
});

// ===============================
// AOI highlight (yellow dashed outline + black mask)
// ===============================
function queryAoi(feature) {
    let aoiUrl, whereSelected, whereMask;

    if (appState.mode === 0) {
        aoiUrl = cntyUrl;
        whereSelected = "GEOID = '" + feature.properties.GEOID + "'";
        whereMask = "GEOID <> '" + feature.properties.GEOID + "'";
    } else if (appState.mode === 1) {
        aoiUrl = huc8Url;
        whereSelected = "OBJECTID = " + feature.properties.OBJECTID;
        whereMask = "OBJECTID <> " + feature.properties.OBJECTID;
    } else if (appState.mode === 2) {
        aoiUrl = comUrl;
        whereSelected = "OBJECTID = " + feature.properties.OBJECTID;
        whereMask = "OBJECTID <> " + feature.properties.OBJECTID;
    } else {
        return;
    }

    // Black mask for all non-selected
    L.esri.featureLayer({
        url: aoiUrl,
        where: whereMask,
        style: {
            color: 'black',
            fillColor: 'black',
            simplifyFactor: 0.35,
            precision: 5,
            fillOpacity: 0.65,
            interactive: false,
            weight: 0
        }
    }).addTo(selectedAoi);

    // Selected AOI outline
    L.esri.query({ url: aoiUrl })
        .where(whereSelected)
        .run(function (error, featureCollection) {
            if (error) {
                console.error(error);
                return;
            }

            map.createPane('aoiIndex');
            map.getPane('aoiIndex').style.zIndex = 750;

            const aoi_select = L.geoJSON(featureCollection).setStyle({
                color: 'yellow',
                dashArray: "3,12",
                dashSpeed: -35,
                fillOpacity: 0,
                weight: 3.5,
                pane: 'aoiIndex',
                interactive: false
            }).addTo(selectedAoi);

            map.fitBounds(aoi_select.getBounds().pad(0.05));
        });
}

// ===============================
// CNMS mapped streams + stats (from single query)
// ===============================
function queryCnmsMapped(feature, done) {
    // Build WHERE + title based on mode
    if (appState.mode === 0) {
        appState.whereClause = "CO_FIPS = '" + feature.properties.GEOID + "'";
        appState.titleName = feature.properties.NAME;
    } else if (appState.mode === 1) {
        appState.whereClause = "HUC8_KEY = " + feature.properties.HUC8;
        appState.titleName = feature.properties.HUC_NM + " (" + feature.properties.HUC8 + ")";
    } else if (appState.mode === 2) {
        appState.whereClause = "CID = '" + feature.properties.CID + "'";
        appState.titleName = feature.properties.COMMUNITY_ + ", " + feature.properties.STATE;
    } else {
        if (typeof done === 'function') done(null);
        return;
    }

    // Main CNMS query (single hit)
    L.esri.query({ url: streamsUrl })
        .where(appState.whereClause)
        .run(function (error, featureCollection) {
            if (error) {
                console.error(error);
                if (typeof done === 'function') done(null);
                return;
            }

            // Draw CNMS layer
            const cnms_ = L.geoJSON(featureCollection, {
                style: function (feat) {
                    const v = feat.properties.VALIDATION;
                    const s = feat.properties.STATUS_TYP;

                    if (v === 'ASSESSED' && s === 'BEING STUDIED') {
                        return { color: '#76FCED', weight: 2 };
                    } else if (v === 'ASSESSED' && s === 'DEFERRED') {
                        return { color: '#0AC4F8', weight: 2 };
                    } else if (v === 'ASSESSED' && s === 'TO BE STUDIED') {
                        return { color: '#008EF8', weight: 2 };
                    } else if (v === 'UNKNOWN' && s === 'BEING STUDIED') {
                        return { color: '#680397', weight: 2 };
                    } else if (v === 'UNKNOWN' && s === 'BEING ASSESSED') {
                        return { color: '#A012E2', weight: 2 };
                    } else if (v === 'UNKNOWN' && s === 'TO BE ASSESSED') {
                        return { color: '#AF4DDD', weight: 2 };
                    } else if (v === 'UNKNOWN' && s === 'DEFERRED') {
                        return { color: '#CB96E3', weight: 2 };
                    } else if (v === 'UNVERIFIED' && s === 'BEING STUDIED') {
                        return { color: 'orange', weight: 2 };
                    } else if (v === 'UNVERIFIED' && s === 'TO BE STUDIED') {
                        return { color: 'red', weight: 2 };
                    } else if (v === 'VALID' && s === 'BEING ASSESSED') {
                        return { color: 'lightgreen', weight: 2 };
                    } else if (v === 'VALID' && s === 'BEING STUDIED') {
                        return { color: 'lime', weight: 2 };
                    } else if (v === 'VALID' && s === 'NVUE COMPLIANT') {
                        return { color: 'green', weight: 2 };
                    } else {
                        return { color: 'white', weight: 2 };
                    }
                },
                onEachFeature: onEachCnmsFeature
            }).addTo(groupLayers);

            function resetHighlight(e) {
                cnms_.resetStyle(e.target);
            }

            function highlightFeature(e) {
                const layer = e.target;
                layer.setStyle({
                    weight: 5,
                    color: 'yellow'
                });
            }

            function onEachCnmsFeature(feature, layer) {
                layer.bindPopup(
                    "<span style='font-size:0.99rem;text-decoration: underline;position:absolute;top:0;left:0;padding:1px;background-color:#00264c;color:white;'>Existing Studies (Line): " +
                    feature.properties.REACH_ID + "</span><br>" +
                    feature.properties.CO_FIPS + "<br>" +
                    feature.properties.CID + "<br>" +
                    feature.properties.WTR_NM + "<br>" +
                    feature.properties.FLD_ZONE + "<br>" +
                    feature.properties.VALIDATION + "<br>" +
                    feature.properties.STATUS_TYP + "<br>" +
                    feature.properties.MILES + "<br>" +
                    feature.properties.SOURCE + "<br>" +
                    feature.properties.STATUS_DATE + "<br>" +
                    feature.properties.FY_FUNDED + "<br>" +
                    feature.properties.REASON + "<br>" +
                    feature.properties.HUC8_KEY + "<br>" +
                    feature.properties.STUDY_TYPE + "<br>" +
                    feature.properties.TIER + "<br>" +
                    feature.properties.WSEL_AVAIL + "<br>" +
                    feature.properties.DPTH_AVAIL + "<br>" +
                    feature.properties.BLE + "<br>" +
                    feature.properties.BLE_POC + "<br>" +
                    feature.properties.BLE_DATE + "<br>"
                );

                layer.bindTooltip(feature.properties.WTR_NM, {
                    className: 'majorRiversClass',
                    permanent: false,
                    offset: [10, 0],
                    sticky: true,
                    direction: 'right'
                });

                layer.on({
                    mouseover: highlightFeature,
                    mouseout: resetHighlight
                });
            }

            // ===============================
            // Stats calculation (single pass)
            // ===============================
            const stats = {
                totalMiles: 0,

                // Legend buckets 1–12
                legend1: 0,  // ASSESSED, BEING STUDIED
                legend2: 0,  // ASSESSED, DEFERRED
                legend3: 0,  // ASSESSED, TO BE STUDIED
                legend4: 0,  // UNKNOWN, BEING STUDIED
                legend5: 0,  // UNKNOWN, BEING ASSESSED
                legend6: 0,  // UNKNOWN, TO BE ASSESSED
                legend7: 0,  // UNKNOWN, DEFERRED
                legend8: 0,  // UNVERIFIED, BEING STUDIED
                legend9: 0,  // UNVERIFIED, TO BE STUDIED
                legend10: 0, // VALID, BEING ASSESSED
                legend11: 0, // VALID, BEING STUDIED
                legend12: 0, // VALID, NVUE COMPLIANT

                // Zone / comp stats
                aValid: 0,
                aComp: 0,
                aeValid: 0,
                aeComp: 0,
                aeFwValid: 0,
                aeFwComp: 0
            };

            for (let i = 0; i < featureCollection.features.length; i++) {
                const f = featureCollection.features[i];
                const miles = f.properties.MILES;
                if (!miles || miles <= 0) continue;

                const v = f.properties.VALIDATION;
                const s = f.properties.STATUS_TYP;
                const z = f.properties.FLD_ZONE;
                const fw = f.properties.FLOODWAY;

                stats.totalMiles += miles;

                // Legend buckets
                if (v === 'ASSESSED' && s === 'BEING STUDIED') stats.legend1 += miles;
                else if (v === 'ASSESSED' && s === 'DEFERRED') stats.legend2 += miles;
                else if (v === 'ASSESSED' && s === 'TO BE STUDIED') stats.legend3 += miles;
                else if (v === 'UNKNOWN' && s === 'BEING STUDIED') stats.legend4 += miles;
                else if (v === 'UNKNOWN' && s === 'BEING ASSESSED') stats.legend5 += miles;
                else if (v === 'UNKNOWN' && s === 'TO BE ASSESSED') stats.legend6 += miles;
                else if (v === 'UNKNOWN' && s === 'DEFERRED') stats.legend7 += miles;
                else if (v === 'UNVERIFIED' && s === 'BEING STUDIED') stats.legend8 += miles;
                else if (v === 'UNVERIFIED' && s === 'TO BE STUDIED') stats.legend9 += miles;
                else if (v === 'VALID' && s === 'BEING ASSESSED') stats.legend10 += miles;
                else if (v === 'VALID' && s === 'BEING STUDIED') stats.legend11 += miles;
                else if (v === 'VALID' && s === 'NVUE COMPLIANT') stats.legend12 += miles;

                // Zone / comp stats
                if (z === 'A') {
                    stats.aComp += miles;
                    if (v === 'VALID') stats.aValid += miles;
                }
                if (z === 'AE') {
                    stats.aComp = stats.aComp; // leave A alone
                    stats.aeComp += miles;
                    if (v === 'VALID') stats.aeValid += miles;

                    if (fw === 'T') {
                        stats.aeFwComp += miles;
                        if (v === 'VALID') stats.aeFwValid += miles;
                    }
                }
            }

            // ===============================
            // Update DOM
            // ===============================

            // Table title
            document.getElementById("table-title").innerHTML =
                "<b>" + appState.titleName + " | Total Mapped Miles: " + stats.totalMiles.toFixed(1) + "</b>";

            // Legend numbers
            document.getElementById("legendNum1").innerHTML = stats.legend1.toFixed(1);
            document.getElementById("legendNum2").innerHTML = stats.legend2.toFixed(1);
            document.getElementById("legendNum3").innerHTML = stats.legend3.toFixed(1);
            document.getElementById("legendNum4").innerHTML = stats.legend4.toFixed(1);
            document.getElementById("legendNum5").innerHTML = stats.legend5.toFixed(1);
            document.getElementById("legendNum6").innerHTML = stats.legend6.toFixed(1);
            document.getElementById("legendNum7").innerHTML = stats.legend7.toFixed(1);
            document.getElementById("legendNum8").innerHTML = stats.legend8.toFixed(1);
            document.getElementById("legendNum9").innerHTML = stats.legend9.toFixed(1);
            document.getElementById("legendNum10").innerHTML = stats.legend10.toFixed(1);
            document.getElementById("legendNum11").innerHTML = stats.legend11.toFixed(1);
            document.getElementById("legendNum12").innerHTML = stats.legend12.toFixed(1);

            // Zone A / AE / Floodway table cells
            document.getElementById("a_table_valid").innerHTML = stats.aValid.toFixed(1);
            document.getElementById("a_table_atcomp_valid").innerHTML = stats.aComp.toFixed(1);

            document.getElementById("ae_table_valid").innerHTML = stats.aeValid.toFixed(1);
            document.getElementById("ae_table_atcomp_valid").innerHTML = stats.aeComp.toFixed(1);

            document.getElementById("aewFw_table_valid").innerHTML = stats.aeFwValid.toFixed(1);
            document.getElementById("aewFw_table_atcomp_valid").innerHTML = stats.aeFwComp.toFixed(1);

            // Deltas + unknown/unverified columns
            const aZoneDelta = stats.aComp - stats.aValid;
            const aeZoneDelta = stats.aeComp - stats.aeValid;
            const aewFwDelta = stats.aeFwComp - stats.aeFwValid;

            document.getElementById("a_table_delta_valid").innerHTML = "+" + aZoneDelta.toFixed(1);
            document.getElementById("a_table_unk_unv").innerHTML = aZoneDelta.toFixed(1);

            document.getElementById("ae_table_delta_valid").innerHTML = "+" + aeZoneDelta.toFixed(1);
            document.getElementById("ae_table_unk_unv").innerHTML = aeZoneDelta.toFixed(1);

            document.getElementById("aewFw_table_delta_valid").innerHTML = "+" + aewFwDelta.toFixed(1);
            document.getElementById("aewFw_table_unk_unv").innerHTML = aewFwDelta.toFixed(1);

            if (typeof done === 'function') done(stats);
        });
}

// ===============================
// Unmapped streams query
// ===============================
function queryUnmapped(feature, done) {
    let whereUnmapped;

    if (appState.mode === 0) {
        // County: use county FIPS (GEOID)
        whereUnmapped = "CO_FIPS = '" + feature.properties.GEOID + "'";
    } else if (appState.mode === 1) {
        whereUnmapped = "HUC8_KEY = " + feature.properties.HUC8;
    } else if (appState.mode === 2) {
        whereUnmapped = "CID = '" + feature.properties.CID + "'";
    } else {
        if (typeof done === 'function') done(0);
        return;
    }

    L.esri.query({ url: UnmappedStreamsUrl })
        .where(whereUnmapped)
        .run(function (error, featureCollection) {
            if (error) {
                console.error(error);
                if (typeof done === 'function') done(0);
                return;
            }

            const unmapped_ = L.geoJSON(featureCollection, {
                style: {
                    color: '#4f5153',
                    opacity: 1
                },
                onEachFeature: onEachUnmappedFeature
            }).addTo(groupLayers);

            function resetHighlight(e) {
                unmapped_.resetStyle(e.target);
            }

            function highlightFeature(e) {
                const layer = e.target;
                layer.setStyle({
                    weight: 5,
                    color: 'yellow'
                });
            }

            function onEachUnmappedFeature(feature, layer) {
                layer.bindPopup(
                    "<span style='font-size:0.99rem;text-decoration: underline;position:absolute;top:0;left:0;padding:1px;background-color:#00264c;color:white;'>Existing Studies (Line): " +
                    feature.properties.REACH_ID + "</span><br>" +
                    feature.properties.CO_FIPS + "<br>" +
                    feature.properties.CID + "<br>" +
                    feature.properties.WTR_NM + "<br>" +
                    feature.properties.FLD_ZONE + "<br>" +
                    feature.properties.VALIDATION + "<br>" +
                    feature.properties.STATUS_TYP + "<br>" +
                    feature.properties.MILES + "<br>" +
                    feature.properties.SOURCE + "<br>" +
                    feature.properties.STATUS_DATE + "<br>" +
                    feature.properties.FY_FUNDED + "<br>" +
                    feature.properties.REASON + "<br>" +
                    feature.properties.HUC8_KEY + "<br>" +
                    feature.properties.STUDY_TYPE + "<br>" +
                    feature.properties.TIER + "<br>" +
                    feature.properties.WSEL_AVAIL + "<br>" +
                    feature.properties.DPTH_AVAIL + "<br>" +
                    feature.properties.BLE + "<br>" +
                    feature.properties.BLE_POC + "<br>" +
                    feature.properties.BLE_DATE + "<br>"
                );

                layer.bindTooltip(feature.properties.WTR_NM, {
                    className: 'majorRiversClass',
                    permanent: false,
                    offset: [10, 0],
                    sticky: true,
                    direction: 'right'
                });

                layer.on({
                    mouseover: highlightFeature,
                    mouseout: resetHighlight
                });
            }

            let sumTotal = 0;
            for (let i = 0; i < featureCollection.features.length; i++) {
                const miles = featureCollection.features[i].properties.MILES;
                if (!miles || miles <= 0) continue;
                sumTotal += miles;
            }

            document.getElementById("notmapped_table_atcomp_valid").innerHTML = sumTotal.toFixed(1);
            document.getElementById("notmapped_table_delta_valid").innerHTML = "+" + sumTotal.toFixed(1);
            document.getElementById("legendNum13").innerHTML = sumTotal.toFixed(1);

            if (typeof done === 'function') done(sumTotal);
        });
}

// ===============================
// Main calculation handler (click AOI)
// ===============================
function calculations_(evt) {
    legendCtrl.addTo(map);
    document.querySelector(".splash-bg").classList.remove("hide");
    map.removeControl(infoCtrl);

    // Loader
    const loading = document.createElement("DIV");
    loading.innerHTML = `
    <div class="loadnm bounded-wave-loader">
      <svg xmlns="http://www.w3.org/2000/svg" width="960" height="80" fill="#00264c" viewbox="0 0 120 10">
        <path d="M0,5 C20,-10 40,20 60,5 v5 H0"/>
        <path transform="translate(60)" d="M0,5 C20,-10 40,20 60,5 v5 H0"/>
      </svg>
      <span class="loadLadel"></span>
    </div>`;
    document.body.appendChild(loading);
    document.querySelector(".loadLadel").innerHTML = "Calculating CNMS...";

    // Clear previous selections
    selectedAoi.clearLayers();
    selectedData.clearLayers();
    groupLayers.clearLayers();
    results.clearLayers();

    // AOI highlight
    queryAoi(evt.layer.feature);

    // Run CNMS + Unmapped, then hide loader when both done
    let cnmsDone = false;
    let unmappedDone = false;

    function checkDone() {
        if (cnmsDone && unmappedDone) {
            document.querySelector(".splash-bg").classList.add("hide");
            document.body.removeChild(loading);

            document.querySelector(".table-container").classList.remove("hide");

            // Slide-in legend numbers
            document.querySelector(".legend").style.left = 0;
            document.querySelector(".legend").style.transition = "all 0.25s";

            const nodeList = document.querySelectorAll(".legendNum");
            nodeList.forEach(function (n) {
                n.style.transition = "all 0.5s";
                n.style.right = 0;
            });
        }
    }

    queryCnmsMapped(evt.layer.feature, function () {
        document.querySelector(".loadLadel").innerHTML = "Calculating Unmapped...";
        cnmsDone = true;
        checkDone();
    });

    queryUnmapped(evt.layer.feature, function () {
        unmappedDone = true;
        checkDone();
    });
}

cntyLayer.on('click', function (evt) {
    calculations_(evt);
    searchControlCnty.removeFrom(map);
});
huc8Layer.on('click', function (evt) {
    calculations_(evt);
    searchControlHuc8.removeFrom(map);
});
comLayer.on('click', function (evt) {
    calculations_(evt);
    searchControlCom.removeFrom(map);
});

// ===============================
// Info control (hover pane)
// ===============================
var infoCtrl = L.control({ position: 'topright' });

infoCtrl.onAdd = function () {
    this._div = L.DomUtil.create('div', 'info-pane');
    this.addinfoCtrl();
    return this._div;
};

infoCtrl.addinfoCtrl = function () {
    this._div.innerHTML = `<div id="info-pane"></div>`;
};

huc8Layer.on('mouseout', function () {
    document.getElementById('info-pane').innerHTML = '';
    document.getElementById('info-pane').style.padding = 0;
    if (oldId !== null) huc8Layer.resetFeatureStyle(oldId);
});

huc8Layer.on('mouseover', function (e) {
    document.getElementById('info-pane').style.padding = '0.95rem';
    oldId = e.layer.feature.id;
    document.getElementById('info-pane').innerHTML =
        "<span class='hucTitle'>" +
        e.layer.feature.properties.HUC_NM + ' (' + e.layer.feature.properties.HUC8 + ')</span>' +
        "<span style='font-size:0.95rem;margin-left:1rem;padding:-bottom:0.75rem;padding:-top:0.75rem;'>" +
        "Population: " + e.layer.feature.properties.RM_POP.toLocaleString("en-US") +
        " | SQ. Miles: " + e.layer.feature.properties.AR_SQMI.toLocaleString("en-US") +
        "</span>";
    huc8Layer.setFeatureStyle(e.layer.feature.id, {
        color: 'white',
        fillColor: 'red',
        fillOpacity: 0.75,
        dashArray: 1,
        weight: 3,
        opacity: 1
    });
});

cntyLayer.on('mouseout', function () {
    document.getElementById('info-pane').innerHTML = '';
    document.getElementById('info-pane').style.padding = 0;
    if (oldId !== null) cntyLayer.resetFeatureStyle(oldId);
});

cntyLayer.on('mouseover', function (e) {
    document.getElementById('info-pane').style.padding = '0.95rem';
    oldId = e.layer.feature.id;
    document.getElementById('info-pane').innerHTML =
        "<span class='hucTitle'>" + e.layer.feature.properties.NAME + "</span>";
    cntyLayer.setFeatureStyle(e.layer.feature.id, {
        color: 'white',
        fillColor: 'red',
        fillOpacity: 0.75,
        dashArray: 1,
        weight: 3,
        opacity: 1
    });
});

comLayer.on('mouseout', function () {
    document.getElementById('info-pane').innerHTML = '';
    document.getElementById('info-pane').style.padding = 0;
    if (oldId !== null) comLayer.resetFeatureStyle(oldId);
});

comLayer.on('mouseover', function (e) {
    document.getElementById('info-pane').style.padding = '0.95rem';
    oldId = e.layer.feature.id;
    document.getElementById('info-pane').innerHTML =
        "<span class='hucTitle'>" + e.layer.feature.properties.COMMUNITY_ + "</span>";
    comLayer.setFeatureStyle(e.layer.feature.id, {
        color: 'white',
        fillColor: 'red',
        fillOpacity: 0.75,
        dashArray: 1,
        weight: 3,
        opacity: 1
    });
});

// ===============================
// Geosearch providers
// ===============================
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
    expanded: true
});

searchControlCnty.on('results', function (data) {
    results.clearLayers();
    if (!groupLayers.hasLayer(cntyLayer)) {
        groupLayers.addLayer(cntyLayer);
        groupLayers.removeLayer(huc8Layer);
        groupLayers.removeLayer(comLayer);
        infoCtrl.addTo(map);
    }
    for (let i = data.results.length - 1; i >= 0; i--) {
        results.addLayer(L.marker(data.results[i].latlng));
    }
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
    expanded: true
});

searchControlHuc8.on('results', function (data) {
    results.clearLayers();
    if (!groupLayers.hasLayer(huc8Layer)) {
        groupLayers.removeLayer(cntyLayer);
        groupLayers.addLayer(huc8Layer);
        groupLayers.removeLayer(comLayer);
        infoCtrl.addTo(map);
    }
    for (let i = data.results.length - 1; i >= 0; i--) {
        results.addLayer(L.marker(data.results[i].latlng));
    }
});

const comProvider = L.esri.Geocoding.featureLayerProvider({
    url: comUrl,
    searchFields: ['COMMUNITY_', 'STATE', 'CID'],
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
    expanded: true
});

searchControlCom.on('results', function (data) {
    results.clearLayers();
    if (!groupLayers.hasLayer(comLayer)) {
        groupLayers.removeLayer(cntyLayer);
        groupLayers.removeLayer(huc8Layer);
        groupLayers.addLayer(comLayer);
        infoCtrl.addTo(map);
    }
    for (let i = data.results.length - 1; i >= 0; i--) {
        results.addLayer(L.marker(data.results[i].latlng));
    }
});

// ===============================
// Table copy / splash / trays
// ===============================
let selectTable = document.querySelector(".table-container");
selectTable.addEventListener("mouseover", function () {
    document.getElementById("copyTable").classList.remove("hide");
});
selectTable.addEventListener("mouseout", function () {
    document.getElementById("copyTable").classList.add("hide");
});
selectTable.onclick = function () {
    const txt = document.getElementById("table").innerText;
    navigator.clipboard.writeText(txt);
    alert("YOU HAVE CLIPPED TABLE - CTRL V to Paste");
};

document.querySelector(".splashBtn").onclick = function () {
    window.location.reload();
};

document.querySelector(".layersTrayBtn").onclick = function () {
    document.querySelector(".layersTray").classList.remove("hide");
    document.querySelector(".basemapTray").classList.add("hide");
};
document.querySelector(".layersTrayBtn").addEventListener("mouseover", function () {
    const layerTooltip = document.createElement("div");
    layerTooltip.innerHTML =
        `<div id="layersTooltip" style="border-radius: 6px;padding:0.25rem 2rem;font-size:1.25rem;position:absolute;z-index:750;top:22.35%;left:2.5%;background-color:#337ab7;color:white;"><b>Layers</b></div>`;
    document.body.appendChild(layerTooltip);
});
document.querySelector(".layersTrayBtn").addEventListener("mouseout", function () {
    const el = document.getElementById("layersTooltip");
    if (el) el.remove();
});

document.querySelector(".basemapTrayBtn").addEventListener("mouseover", function () {
    const basemapTooltip = document.createElement("div");
    basemapTooltip.innerHTML =
        `<div id="basemapTooltip" style="border-radius: 6px;padding:0.25rem 2rem;font-size:1.25rem;position:absolute;z-index:750;top:17.5%;left:2.5%;background-color:#337ab7;color:white;"><b>Base Maps</b></div>`;
    document.body.appendChild(basemapTooltip);
});
document.querySelector(".basemapTrayBtn").addEventListener("mouseout", function () {
    const el = document.getElementById("basemapTooltip");
    if (el) el.remove();
});

document.querySelector(".splashBtn").addEventListener("mouseover", function () {
    const splashTooltip = document.createElement("div");
    splashTooltip.innerHTML =
        `<div id="splashTooltip" style="border-radius: 6px;padding:0.25rem 2rem;font-size:1.25rem;position:absolute;z-index:750;bottom:25%;left:2.5%;background-color:#337ab7;color:white;"><b>Queries</b></div>`;
    document.body.appendChild(splashTooltip);
});
document.querySelector(".splashBtn").addEventListener("mouseout", function () {
    const el = document.getElementById("splashTooltip");
    if (el) el.remove();
});

document.querySelector(".basemapTrayBtn").onclick = function () {
    document.querySelector(".basemapTray").classList.remove("hide");
    document.querySelector(".layersTray").classList.add("hide");
};
document.getElementById("closeLayers").onclick = function () {
    document.querySelector(".layersTray").classList.add("hide");
    document.querySelector(".basemapTray").classList.add("hide");
};
document.getElementById("closeBasemaps").onclick = function () {
    document.querySelector(".layersTray").classList.add("hide");
    document.querySelector(".basemapTray").classList.add("hide");
};
document.querySelector(".leaflet-control-container").addEventListener("mouseover", function () {
    document.querySelector(".layersTray").classList.add("hide");
    document.querySelector(".basemapTray").classList.add("hide");
});

// ===============================
// Support layer toggles
// ===============================
document.getElementById("nfhl").onclick = function () {
    if (supportLayers.hasLayer(nfhl)) {
        supportLayers.removeLayer(nfhl);
        document.getElementById("nfhl").classList.remove("selected");
    } else {
        supportLayers.addLayer(nfhl);
        document.getElementById("nfhl").classList.add("selected");
    }
};

document.getElementById("prelim").onclick = function () {
    if (supportLayers.hasLayer(prelim)) {
        supportLayers.removeLayer(prelim);
        document.getElementById("prelim").classList.remove("selected");
    } else {
        supportLayers.addLayer(prelim);
        document.getElementById("prelim").classList.add("selected");
    }
};

document.getElementById("draft").onclick = function () {
    if (supportLayers.hasLayer(draft)) {
        supportLayers.removeLayer(draft);
        document.getElementById("draft").classList.remove("selected");
    } else {
        supportLayers.addLayer(draft);
        document.getElementById("draft").classList.add("selected");
    }
};

document.getElementById("ble_1per").onclick = function () {
    document.getElementById("map").classList.remove("crosshair");
    if (supportLayers.hasLayer(ble_1per)) {
        supportLayers.removeLayer(ble_1per);
        document.getElementById("ble_1per").classList.remove("selected");
        document.querySelector(".layers-container > button").classList.add("hide");
        map.off("click", getbleReport);
        document.querySelector(".layers-container > button").style.background = "steelblue";
    } else {
        supportLayers.addLayer(ble_1per);
        document.getElementById("ble_1per").classList.add("selected");
        document.querySelector(".layers-container > button").classList.remove("hide");
    }
};

const stateCityGroup = L.layerGroup([]);
const okCity = L.esri.featureLayer({
    url: "https://owrb.csa.ou.edu/server/rest/services/Base/SDE_State_County_PLSS/MapServer/1"
}).addTo(stateCityGroup);
const txCity = L.esri.featureLayer({
    url: "https://services.arcgis.com/KTcxiTD9dsQw4r7Z/arcgis/rest/services/TxDOT_City_Boundaries/FeatureServer/0"
}).addTo(stateCityGroup);

document.getElementById("ok_tx_city").onclick = function () {
    if (supportLayers.hasLayer(stateCityGroup)) {
        supportLayers.removeLayer(stateCityGroup);
    } else {
        supportLayers.addLayer(stateCityGroup);
    }
};

// BLE report click
function getbleReport(e) {
    window.open("https://webapps.usgs.gov/infrm/estBFE/report.html?lat=" + e.latlng.lat + "&lng=" + e.latlng.lng);
    map.off("click", getbleReport);
    document.querySelector(".layers-container > button").style.background = "steelblue";
    document.getElementById("map").classList.remove("crosshair");
}

document.querySelector(".layers-container > button").onclick = function () {
    document.querySelector(".layers-container > button").style.background = "red";
    document.getElementById("map").classList.add("crosshair");
    map.on("click", getbleReport);
};

// ===============================
// Legend control HTML
// ===============================
legendCtrl.onAdd = function () {
    this._div = L.DomUtil.create('div', 'legend');
    this.addlegendCtrl();
    return this._div;
};

legendCtrl.addlegendCtrl = function () {
    this._div.innerHTML =
        `<div class="legend">
            <span style="font-size:1rem;">EXPLANATION
                <span style='float:right;font-size:0.65rem;margin-top:1rem;'>(miles)</span>
                <hr>
            </span>
            <span style='font-size:0.75rem;'>ASSESSED, BEING STUDIED&nbsp;&nbsp;
                <svg style="margin-left:0.8rem;" height='12' width='75'>
                    <line x1='0' y1='5' x2='75' y2='5' style='stroke:#76FCED;stroke-width:5' />
                </svg>
            </span><span class='legendNum' id='legendNum1'></span>
            <span style='font-size:0.75rem;'>ASSESSED, DEFERED&nbsp;&nbsp;
                <svg style="margin-left:3.15rem;" height='10' width='75'>
                    <line x1='0' y1='5' x2='75' y2='5' style='stroke:#0AC4F8;stroke-width:5' />
                </svg>
            </span><span class='legendNum' id='legendNum2'></span>	
            <span style='font-size:0.75rem;'>ASSESSED, TO BE STUDIED&nbsp;&nbsp;
                <svg style="margin-left:1.05rem;" height='10' width='75'>
                    <line x1='0' y1='5' x2='75' y2='5' style='stroke:#008EF8;stroke-width:5' />
                </svg>
            </span><span class='legendNum' id='legendNum3'></span>
            <span style='font-size:0.75rem;'>UNKNOWN, BEING STUDIED&nbsp;&nbsp;
                <svg style="margin-left:0.69rem;" height='10' width='75'>
                    <line x1='0' y1='5' x2='75' y2='5' style='stroke:#680397;stroke-width:5' />
                </svg>
            </span><span class='legendNum' id='legendNum4'></span>			
            <span style='font-size:0.75rem;'>UNKNOWN, BEING ASSESSED&nbsp;&nbsp;
                <svg style="margin-left:0.15rem" height='10' width='75'>
                    <line x1='0' y1='5' x2='75' y2='5' style='stroke:#A012E2;stroke-width:5' />
                </svg>
            </span><span class='legendNum' id='legendNum5'></span>			
            <span style='font-size:0.75rem;'>UNKNOWN, TO BE ASSESSED&nbsp;&nbsp;
                <svg style="margin-left:0.15rem;" height='10' width='75'>
                    <line x1='0' y1='5' x2='75' y2='5' style='stroke:#AF4DDD;stroke-width:5' />
                </svg>
            </span><span class='legendNum' id='legendNum6'></span>			
            <span style='font-size:0.75rem;'>UNKNOWN, DEFERED&nbsp;&nbsp;
                <svg style="margin-left:2.9rem;" height='10' width='75'>
                    <line x1='0' y1='5' x2='75' y2='5' style='stroke:#CB96E3;stroke-width:5' />
                </svg>
            </span><span class='legendNum' id='legendNum7'></span>			
            <span style='font-size:0.75rem;'>UNVERIFIED, BEING STUDIED&nbsp;&nbsp;
                <svg style="margin-left:0.3rem;" height='10' width='75'>
                    <line x1='0' y1='5' x2='75' y2='5' style='stroke:orange;stroke-width:5' />
                </svg>
            </span><span class='legendNum' id='legendNum8'></span>			
            <span style='font-size:0.75rem;'>UNVERIFIED, TO BE STUDIED&nbsp;&nbsp;
                <svg style="margin-left:0.43rem;" height='10' width='75'>
                    <line x1='0' y1='5' x2='75' y2='5' style='stroke:red;stroke-width:5' />
                </svg>
            </span><span class='legendNum' id='legendNum9'></span>			
            <span style='font-size:0.75rem;'>VALID, BEING ASSESSED&nbsp;&nbsp;
                <svg style="margin-left:1.85rem;" height='10' width='75'>
                    <line x1='0' y1='5' x2='75' y2='5' style='stroke:lightgreen;stroke-width:5' />
                </svg>
            </span><span class='legendNum' id='legendNum10'></span>			
            <span style='font-size:0.75rem;'>VALID, BEING STUDIED&nbsp;&nbsp;
                <svg style="margin-left:2.5rem;" height='10' width='75'>
                    <line x1='0' y1='5' x2='75' y2='5' style='stroke:lime;stroke-width:5' />
                </svg>
            </span><span class='legendNum' id='legendNum11'></span>			
            <span style='font-size:0.75rem;'>VALID, NVUE COMPLIANT&nbsp;&nbsp;
                <svg style="margin-left:1.425rem;" height='10' width='75'>
                    <line x1='0' y1='5' x2='75' y2='5' style='stroke:green;stroke-width:5' />
                </svg>
            </span><span class='legendNum' id='legendNum12'></span>			
            <span style='font-size:0.75rem;'>UNMAPPED&nbsp;&nbsp;
                <svg style="margin-left:6.35rem;" height='10' width='75'>
                    <line x1='0' y1='5' x2='75' y2='5' style='stroke:gray;stroke-width:5' />
                </svg>
            </span><span class='legendNum' id='legendNum13'></span>			
        </div>`;
};
