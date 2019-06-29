
let esf1Layer =  L.esri.featureLayer({
  url:'https://services.arcgis.com/XG15cJAlne2vxtgt/arcgis/rest/services/ESF/FeatureServer/0',
  pointToLayer: function (geojson, latlng) {
    return L.marker(latlng, {
    });
  },
});
M.addLayer(esf1Layer);
let esf2Layer =  L.esri.featureLayer({
  url:'https://services.arcgis.com/XG15cJAlne2vxtgt/arcgis/rest/services/ESF/FeatureServer/1',
  pointToLayer: function (geojson, latlng) {
    return L.marker(latlng, {
    });
  },
});
M.addLayer(esf2Layer);
let esf3Layer =  L.esri.featureLayer({
  url:'https://services.arcgis.com/XG15cJAlne2vxtgt/arcgis/rest/services/ESF/FeatureServer/2',
  pointToLayer: function (geojson, latlng) {
    return L.marker(latlng, {
    });
  },
});
M.addLayer(esf3Layer);
let esf4Layer =  L.esri.featureLayer({
  url:'https://services.arcgis.com/XG15cJAlne2vxtgt/arcgis/rest/services/ESF/FeatureServer/3',
  pointToLayer: function (geojson, latlng) {
    return L.marker(latlng, {
    });
  },
});
M.addLayer(esf4Layer);
let esf6Layer =  L.esri.featureLayer({
  url:'https://services.arcgis.com/XG15cJAlne2vxtgt/arcgis/rest/services/ESF/FeatureServer/5',
  pointToLayer: function (geojson, latlng) {
    return L.marker(latlng, {
    });
  },
});
M.addLayer(esf6Layer);
let esf7Layer =  L.esri.featureLayer({
  url:'https://services.arcgis.com/XG15cJAlne2vxtgt/arcgis/rest/services/ESF/FeatureServer/6',
  pointToLayer: function (geojson, latlng) {
    return L.marker(latlng, {
    });
  },
});
M.addLayer(esf7Layer);
let esf8Layer =  L.esri.featureLayer({
  url:'https://services.arcgis.com/XG15cJAlne2vxtgt/arcgis/rest/services/ESF/FeatureServer/7',
  pointToLayer: function (geojson, latlng) {
    return L.marker(latlng, {
    });
  },
});
M.addLayer(esf8Layer);
let esf9Layer =  L.esri.featureLayer({
  url:'https://services.arcgis.com/XG15cJAlne2vxtgt/arcgis/rest/services/ESF/FeatureServer/8',
  pointToLayer: function (geojson, latlng) {
    return L.marker(latlng, {
    });
  },
});
M.addLayer(esf9Layer);
let esf10Layer =  L.esri.featureLayer({
  url:'https://services.arcgis.com/XG15cJAlne2vxtgt/arcgis/rest/services/ESF/FeatureServer/9',
  pointToLayer: function (geojson, latlng) {
    return L.marker(latlng, {
    });
  },
});
M.addLayer(esf10Layer);
let esf11Layer =  L.esri.featureLayer({
  url:'https://services.arcgis.com/XG15cJAlne2vxtgt/arcgis/rest/services/ESF/FeatureServer/10',
  pointToLayer: function (geojson, latlng) {
    return L.marker(latlng, {
    });
  },
});
M.addLayer(esf11Layer);
let esf12Layer =  L.esri.featureLayer({
  url:'https://services.arcgis.com/XG15cJAlne2vxtgt/arcgis/rest/services/ESF/FeatureServer/11',
  pointToLayer: function (geojson, latlng) {
    return L.marker(latlng, {
    });
  },
});
M.addLayer(esf12Layer);
let esf13Layer =  L.esri.featureLayer({
  url:'https://services.arcgis.com/XG15cJAlne2vxtgt/arcgis/rest/services/ESF/FeatureServer/12',
  pointToLayer: function (geojson, latlng) {
    return L.marker(latlng, {
    });
  },
});
M.addLayer(esf13Layer);

let esfGroup = L.layerGroup([esf1Layer,esf2Layer,esf3Layer,esf4Layer,esf6Layer,esf7Layer,esf8Layer,esf9Layer,esf10Layer,esf11Layer,esf12,esfLayer13]);
M.fitBounds(esfGroup);
