var fldHazLayer4 = L.tileLayer.wms('https://hazards.fema.gov/gis/nfhl/services/public/NFHLWMS/MapServer/WMSServer?', {
    layers: '4',
    transparent: true,
      opacity: 0.5,
    minZoom: 14,
    maxZoom: 18,
    format: 'image/png'
});
var fldHazLayer16 = L.tileLayer.wms('https://hazards.fema.gov/gis/nfhl/services/public/NFHLWMS/MapServer/WMSServer?', {
    layers: '16',
    transparent: true,
    minZoom: 14,
    maxZoom: 18,
    format: 'image/png'
});
var fldHazLayer28 = L.tileLayer.wms('https://hazards.fema.gov/gis/nfhl/services/public/NFHLWMS/MapServer/WMSServer?', {
    layers: '28',
    transparent: true,
    minZoom: 10,
    maxZoom: 13,
    format: 'image/png'
});
var fldHazLayer29 = L.tileLayer.wms('https://hazards.fema.gov/gis/nfhl/services/public/NFHLWMS/MapServer/WMSServer?', {
    layers: '29',
    transparent: true,
    minZoom: 10,
    maxZoom: 13,
    format: 'image/png'
});
var fldHazLayer32 = L.tileLayer.wms('https://hazards.fema.gov/gis/nfhl/services/public/NFHLWMS/MapServer/WMSServer?', {
    layers: '32',
    transparent: true,
     opacity: 0.2,
    minZoom: 0,
    maxZoom: 13,
    format: 'image/png'
});
var fldHazLayer = L.layerGroup([fldHazLayer4, fldHazLayer16, fldHazLayer28, fldHazLayer29, fldHazLayer32]);