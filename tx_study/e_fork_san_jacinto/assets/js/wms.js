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
var noaaPortAransas20170829b_DMCImageryLayer = L.tileLayer('https://stormscdn.ngs.noaa.gov/20170829b-rgb/{z}/{x}/{y}', {
    maxZoom: 18,
    attribution: 'NOAA'
});
                                                    //https://stormscdn.ngs.noaa.gov/20170830-rgb
var noaaHouston20170830_DMCImageryLayer = L.tileLayer('https://stormscdn.ngs.noaa.gov/20170830-rgb/{z}/{x}/{y}', {
    maxZoom: 18,
    attribution: 'NOAA'
});
var noaaHouston20170831_DMCImageryLayer = L.tileLayer('https://stormscdn.ngs.noaa.gov/20170831a-rgb/{z}/{x}/{y}', {
    maxZoom: 18,
    attribution: 'NOAA'
});

var noaaHouston20170831b_DMCImageryLayer = L.tileLayer('https://stormscdn.ngs.noaa.gov/20170831b-rgb/{z}/{x}/{y}', {
    maxZoom: 18,
    attribution: 'NOAA'
});
   //noaaHouston20170901a_DMCImageryLayer
var noaaHouston20170901a_DMCImageryLayer = L.tileLayer('https://stormscdn.ngs.noaa.gov/20170901a-rgb/{z}/{x}/{y}', {
    maxZoom: 18,
    attribution: 'NOAA'
});

var noaaHouston20170901b_DMCImageryLayer = L.tileLayer('https://stormscdn.ngs.noaa.gov/20170901b-rgb/{z}/{x}/{y}', {
    maxZoom: 18,
    attribution: 'NOAA'
});

var noaaHouston20170901c_DMCImageryLayer = L.tileLayer('https://stormscdn.ngs.noaa.gov/20170901c-rgb/{z}/{x}/{y}', {
    maxZoom: 18,
    attribution: 'NOAA'
});

var noaaHouston20170902a_DMCImageryLayer = L.tileLayer('https://stormscdn.ngs.noaa.gov/20170902a-rgb/{z}/{x}/{y}', {
    maxZoom: 18,
    attribution: 'NOAA'
});

var noaaHouston20170902b_DMCImageryLayer = L.tileLayer('https://stormscdn.ngs.noaa.gov/20170902b-rgb/{z}/{x}/{y}', {
    maxZoom: 18,
    attribution: 'NOAA'
});

var noaaHouston20170902c_DMCImageryLayer = L.tileLayer('https://stormscdn.ngs.noaa.gov/20170902c-rgb/{z}/{x}/{y}', {
    maxZoom: 18,
    attribution: 'NOAA'
});
var noaaImagery = L.layerGroup([noaaPortAransas20170829b_DMCImageryLayer,noaaHouston20170830_DMCImageryLayer,
noaaHouston20170831_DMCImageryLayer,noaaHouston20170901a_DMCImageryLayer,noaaHouston20170901b_DMCImageryLayer,
noaaHouston20170901c_DMCImageryLayer,noaaHouston20170902a_DMCImageryLayer,noaaHouston20170902b_DMCImageryLayer,
noaaHouston20170902c_DMCImageryLayer]);