//Airports
function airportpt_eachLayer(layer) {var feature = layer.toGeoJSON();var attr = layer.feature.properties;
var placesIcon = L.icon({iconUrl: layer.feature.properties.logo_url,iconSize: new L.Point(24, 24),});layer.setIcon(placesIcon);
var airportptTooltip = layer;
airportptTooltip.bindTooltip(attr.FullName, {className: 'label',permanent: false,offset: [-20, 20],direction: 'center'});
var airportptPopup = layer;
airportptPopup.bindPopup("<span font-size='24px'><strong>" + attr.FullName+'</strong></span><br> City: '+attr.City+'<br>County: '+attr.County+'<br>SFHA: '+attr.In_SFHA);
};
var airportpt = omnivore.csv('data/airports.csv').on('ready', function () {airportpt.eachLayer(airportpt_eachLayer);
});
// AM Towers
function amTower_eachLayer(layer) {var feature = layer.toGeoJSON();var attr = layer.feature.properties;
var placesIcon = L.icon({iconUrl: layer.feature.properties.logo_url,iconSize: new L.Point(24, 24),});layer.setIcon(placesIcon);
var amTowerTooltip = layer;
amTowerTooltip.bindTooltip("AM Tower", {className: 'label',permanent: false,offset: [-20, 20],direction: 'center'
});
var amTowerPopup = layer;
amTowerPopup.bindPopup("<span font-size='24px'>AM Tower<strong>" + attr.City + "</strong></span>"+'<br>SFHA: '+attr.In_SFHA);
};
var amTower = omnivore.csv('data/am_towers.csv').on('ready', function () {amTower.eachLayer(amTower_eachLayer);
});
//Antenna
function antenna_eachLayer(layer) {var feature = layer.toGeoJSON();var attr = layer.feature.properties;
var placesIcon = L.icon({iconUrl: layer.feature.properties.logo_url,iconSize: new L.Point(24, 24),});layer.setIcon(placesIcon);
var antennaTooltip = layer;
antennaTooltip.bindTooltip("Antenna", {className: 'label',permanent: false,offset: [-20, 20],direction: 'center'});
var antennaPopup = layer;
antennaPopup.bindPopup("<span font-size='24px'><strong>Antenna</strong></span>"+'<br>SFHA: '+attr.In_SFHA);
};
var antenna = omnivore.csv('data/antenna.csv').on('ready', function () {antenna.eachLayer(antenna_eachLayer);
});
// Cell Tower
function cell_eachLayer(layer) {var feature = layer.toGeoJSON();var attr = layer.feature.properties;
var placesIcon = L.icon({iconUrl: layer.feature.properties.logo_url,iconSize: new L.Point(24, 24),});layer.setIcon(placesIcon);
var cellTooltip = layer;
cellTooltip.bindTooltip("Cellular Tower", {className: 'label',permanent: false,offset: [-20, 20],direction: 'center'});
var cellPopup = layer;
cellPopup.bindPopup("<span font-size='24px'><strong>Cellular Tower</strong></span>"+'<br>SFHA: '+attr.In_SFHA);
};
var cell = omnivore.csv('data/cellular.csv').on('ready', function () {cell.eachLayer(cell_eachLayer);
});
//College and Universities
function  collegeUniv_eachLayer(layer) {var feature = layer.toGeoJSON();var attr = layer.feature.properties;
var placesIcon = L.icon({iconUrl: layer.feature.properties.logo_url,iconSize: new L.Point(24, 24),});layer.setIcon(placesIcon);
var  collegeUnivTooltip = layer;
collegeUnivTooltip.bindTooltip(attr.NAME, {className: 'label',permanent: false,offset: [-20, 20],direction: 'center'});
var  collegeUnivPopup = layer;
collegeUnivPopup.bindPopup("<span font-size='24px'><strong>" + attr.NAME + "</strong></span>" + "<br>" + attr.ADDRESS + "<br>" + attr.phone);
};
var collegeUniv = omnivore.csv('data/college_univ.csv').on('ready', function () {collegeUniv.eachLayer( collegeUniv_eachLayer);
});
// Electric Substations
function subStations_eachLayer(layer) {var feature = layer.toGeoJSON();var attr = layer.feature.properties;
var placesIcon = L.icon({iconUrl: layer.feature.properties.logo_url,iconSize: new L.Point(24, 24),});layer.setIcon(placesIcon);
var subStationsTooltip = layer;
subStationsTooltip.bindTooltip("Electrical Substation", {className: 'label',permanent: false,offset: [-20,20],direction: 'center'});
var subStationsPopup = layer;
subStationsPopup.bindPopup("<span font-size='24px'><strong>Electrical Substation</strong></span><br> City: "+attr.City+'<br>SFHA: '+attr.In_SFHA);
};
var subStations = omnivore.csv('data/substations.csv').on('ready', function () {subStations.eachLayer(subStations_eachLayer);
});
// EMS
function ems_eachLayer(layer) {var feature = layer.toGeoJSON();var attr = layer.feature.properties;
var placesIcon = L.icon({iconUrl: layer.feature.properties.logo_url,iconSize: new L.Point(24, 24),});layer.setIcon(placesIcon);
var emsptTooltip = layer;
emsptTooltip.bindTooltip("EMS", {className: 'label',permanent: false,offset: [-20, 20],direction: 'center'});
var emsptPopup = layer;
emsptPopup.bindPopup("<span font-size='24px'><strong>Emergency Medical Services</strong></span><br> City: "+attr.City+'<br>County: '+attr.County+'<br>SFHA: '+attr.In_SFHA);
};
var emsStations = omnivore.csv('data/ems.csv').on('ready', function () {emsStations.eachLayer(ems_eachLayer);
});
// FIRE STATIONS
function fireS_eachLayer(layer) {var feature = layer.toGeoJSON();var attr = layer.feature.properties;
var placesIcon = L.icon({iconUrl: layer.feature.properties.logo_url,iconSize: new L.Point(24, 24),});layer.setIcon(placesIcon);
var fireSptTooltip = layer;
fireSptTooltip.bindTooltip("Fire Station", {className: 'label',permanent: false,offset: [-20, 20],direction: 'center'});
var fireSptPopup = layer;
fireSptPopup.bindPopup("<span font-size='24px'><strong>Fire Station</strong></span><br> City: "+attr.City+'<br>County: '+attr.County+'<br>SFHA: '+attr.In_SFHA);
};
var fireStations = omnivore.csv('data/fire.csv').on('ready', function () {fireStations.eachLayer(fireS_eachLayer);
});
//Ferry
function ferry_eachLayer(layer) {var feature = layer.toGeoJSON();var attr = layer.feature.properties;
var placesIcon = L.icon({iconUrl: layer.feature.properties.logo_url,iconSize: new L.Point(24, 24),});layer.setIcon(placesIcon);
var ferryTooltip = layer;
ferryTooltip.bindTooltip("Ferry", {className: 'label',permanent: false,offset: [-20, 20],direction: 'center'});
var ferryPopup = layer;
ferryPopup.bindPopup("<span font-size='24px'><strong>Ferry</strong></span><br> City: "+attr.City+'<br>SFHA: '+attr.In_SFHA);
};
var ferry = omnivore.csv('data/ferry.csv').on('ready', function () {ferry.eachLayer(ferry_eachLayer);
});
// FM Towers
function fmTower_eachLayer(layer) {var feature = layer.toGeoJSON();var attr = layer.feature.properties;
var placesIcon = L.icon({iconUrl: layer.feature.properties.logo_url,iconSize: new L.Point(24, 24),});layer.setIcon(placesIcon);
var fmTowerTooltip = layer;
fmTowerTooltip.bindTooltip("FM Tower", {className: 'label',permanent: false,offset: [-20, 20],direction: 'center'});
var fmTowerPopup = layer;
fmTowerPopup.bindPopup("<span font-size='24px'><strong>FM Tower</strong></span><br> City: "+attr.City+'<br>SFHA: '+attr.In_SFHA);
};
var fmTower = omnivore.csv('data/fm_towers.csv').on('ready', function () {fmTower.eachLayer(fmTower_eachLayer);
});
//Generating Units
function  genUnits_eachLayer(layer) {var feature = layer.toGeoJSON();var attr = layer.feature.properties;
var placesIcon = L.icon({iconUrl: layer.feature.properties.logo_url,iconSize: new L.Point(24, 24),});layer.setIcon(placesIcon);
var  genUnitsTooltip = layer;
genUnitsTooltip.bindTooltip("Generator Unit "+attr.Name_1, {className: 'label',permanent: false,offset: [-20, 20],direction: 'center'});
var  genUnitsPopup = layer;
genUnitsPopup.bindPopup("<span font-size='24px'><strong>Generator Unit "+attr.Name_1+"</strong></span><br> City: "+attr.City+'<br>SFHA: '+attr.In_SFHA);
};
var genUnits = omnivore.csv('data/gen_units.csv').on('ready', function () {genUnits.eachLayer(genUnits_eachLayer);
});
//Government Buildings
function  govBldg_eachLayer(layer) {var feature = layer.toGeoJSON();var attr = layer.feature.properties;
var placesIcon = L.icon({iconUrl: layer.feature.properties.logo_url,iconSize: new L.Point(24, 24),});layer.setIcon(placesIcon);
var  govBldgTooltip = layer;
govBldgTooltip.bindTooltip("Government Building", {className: 'label',permanent: false,offset: [-20, 20],direction: 'center'});
var  govBldgPopup = layer;
govBldgPopup.bindPopup("<span font-size='24px'><strong>Government Building</strong></span><br> City: "+attr.City+'<br>County: '+attr.County+'<br>SFHA: '+attr.In_SFHA);
};
var govBldg = omnivore.csv('data/gov_buildings.csv').on('ready', function () {govBldg.eachLayer(govBldg_eachLayer);
});
//Heliports
function heliP_eachLayer(layer) {var feature = layer.toGeoJSON();var attr = layer.feature.properties;
var placesIcon = L.icon({iconUrl: layer.feature.properties.logo_url,iconSize: new L.Point(24, 24),});layer.setIcon(placesIcon);
var heliPTooltip = layer;
heliPTooltip.bindTooltip("Heliport", {className: 'label',permanent: false,offset: [-20, 20],direction: 'center'});
var heliPPopup = layer;
heliPPopup.bindPopup("<span font-size='24px'><strong>"+attr.Name_1+"</strong></span><br>SFHA: "+attr.In_SFHA);
};
var heliP = omnivore.csv('data/heliports.csv').on('ready', function () {heliP.eachLayer(heliP_eachLayer);
});
// Hospitals
function hosp_eachLayer(layer) {var feature = layer.toGeoJSON();var attr = layer.feature.properties;
var placesIcon = L.icon({iconUrl: layer.feature.properties.logo_url,iconSize: new L.Point(24, 24),});layer.setIcon(placesIcon);
var hospitalsptTooltip = layer;
hospitalsptTooltip.bindTooltip("Hospital", {className: 'label',permanent: false,offset: [-20, 20],direction: 'center'});
var hospitalsptPopup = layer;
hospitalsptPopup.bindPopup("<span font-size='24px'><strong>Hospital</strong></span><br> City: "+attr.City+'<br>SFHA: '+attr.In_SFHA);
};
var hospitalsLayer = omnivore.csv('data/hospitals.csv').on('ready', function () {hospitalsLayer.eachLayer(hosp_eachLayer);
});
// Hurrevac
var hurrevac = omnivore.topojson('data/hurrevac.json').on('ready', function () {hurrevac.setStyle({color: 'darkblue',weight: 5})
});
//Landfills
function landfills_eachLayer(layer) {var feature = layer.toGeoJSON();var attr = layer.feature.properties;
var placesIcon = L.icon({iconUrl: layer.feature.properties.logo_url,iconSize: new L.Point(24, 24),});layer.setIcon(placesIcon);
var landfillsTooltip = layer;
landfillsTooltip.bindTooltip("Landfill", {className: 'label',permanent: false,offset: [-20, 20],direction: 'center'});
var landfillsPopup = layer;
landfillsPopup.bindPopup("<span font-size='24px'><strong>Landfill</strong></span><br> City: "+attr.City+'<br>County: '+attr.County+'<br>SFHA: '+attr.In_SFHA);
};
var landfills = omnivore.csv('data/landfills.csv').on('ready', function () {landfills.eachLayer(landfills_eachLayer);
});
//Local EOCs
function eoc_eachLayer(layer) {var feature = layer.toGeoJSON();var attr = layer.feature.properties;
var placesIcon = L.icon({iconUrl: layer.feature.properties.logo_url,iconSize: new L.Point(24, 24),});layer.setIcon(placesIcon);
var eocptTooltip = layer;
eocptTooltip.bindTooltip("EOC", {className: 'label',permanent: false,offset: [-20, 20],direction: 'center'});
var eocptPopup = layer;
eocptPopup.bindPopup("<span font-size='24px'><strong>Local Emergency Operations Center</strong></span><br> City: "+attr.City+'<br>County: '+attr.County+'<br>SFHA: '+attr.In_SFHA);
};
var localEoc = omnivore.csv('data/eoc.csv').on('ready', function () {localEoc.eachLayer(eoc_eachLayer);
});
//Major Ports
function  majPort_eachLayer(layer) {var feature = layer.toGeoJSON();var attr = layer.feature.properties;
var placesIcon = L.icon({iconUrl: layer.feature.properties.logo_url,iconSize: new L.Point(24, 24),});layer.setIcon(placesIcon);
var  majPortTooltip = layer;
majPortTooltip.bindTooltip("Major Port", {className: 'label',permanent: false,offset: [-20, 20],direction: 'center'});
var  majPortPopup = layer;
majPortPopup.bindPopup("<span font-size='24px'><strong>Major Port</strong></span>"+'<br>SFHA: '+attr.In_SFHA);
};
var majPort = omnivore.csv('data/major_ports.csv').on('ready', function () {majPort.eachLayer(majPort_eachLayer);
});
//Military Base
function  military_eachLayer(layer) {var feature = layer.toGeoJSON();var attr = layer.feature.properties;
var placesIcon = L.icon({iconUrl: layer.feature.properties.logo_url,iconSize: new L.Point(24, 24),});layer.setIcon(placesIcon);
var  militaryTooltip = layer;
militaryTooltip.bindTooltip(attr.NAME, {className: 'label',permanent: false,offset: [-60, 20],direction: 'center'});
var  militaryPopup = layer;
militaryPopup.bindPopup("<span font-size='24px'><strong>" + attr.NAME + "</strong></span>" + "<br>" + attr.ADDRESS + "<br>" + attr.phone);
};
var military = omnivore.csv('data/military.csv').on('ready', function () {military.eachLayer(majPort_eachLayer);
});
// Police Stations
function police_eachLayer(layer) {var feature = layer.toGeoJSON();var attr = layer.feature.properties;
var placesIcon = L.icon({iconUrl: layer.feature.properties.logo_url,iconSize: new L.Point(24, 24),});layer.setIcon(placesIcon);
var policeptTooltip = layer;
policeptTooltip.bindTooltip(attr.Name_1, {className: 'label',permanent: false,offset: [-20, 20],direction: 'center'});
var policeptPopup = layer;policeptPopup.bindPopup("<span font-size='24px'><strong>"+attr.Name_1+"</strong></span><br> City: "+attr.City+'<br>County: '+attr.County+'<br>SFHA: '+attr.In_SFHA);
};
var policeStations = omnivore.csv('data/police.csv').on('ready', function () {policeStations.eachLayer(police_eachLayer);
});
//Power Plants
function  p_plant_eachLayer(layer) {var feature = layer.toGeoJSON();var attr = layer.feature.properties;
var placesIcon = L.icon({iconUrl: layer.feature.properties.logo_url,iconSize: new L.Point(24, 24),});layer.setIcon(placesIcon);
var  p_plantTooltip = layer;
p_plantTooltip.bindTooltip("Power Plant", {className: 'label',permanent: false,offset: [-60, 20],direction: 'center'});
var  p_plantPopup = layer;
p_plantPopup.bindPopup("<span font-size='24px'><strong>"+attr.Name_1+"</strong></span><br> City: "+attr.City+'<br>'+attr.In_SFHA);
};
var p_plant = omnivore.csv('data/power_plants.csv').on('ready', function () {p_plant.eachLayer(p_plant_eachLayer);
});
// Primary Bridges
function  p_bridges_eachLayer(layer) {var feature = layer.toGeoJSON();var attr = layer.feature.properties;
var placesIcon = L.icon({iconUrl: layer.feature.properties.logo_url,iconSize: new L.Point(24, 24),});layer.setIcon(placesIcon);
var  p_bridgesTooltip = layer;
p_bridgesTooltip.bindTooltip("Primary Bridge", {className: 'label',permanent: false,offset: [-60, 20],direction: 'center'});
var  p_bridgesPopup = layer;
p_bridgesPopup.bindPopup("<span font-size='24px'><strong>Primary Bridge</strong></span><br>"+'<br>SFHA: '+attr.In_SFHA);
};
var p_bridges = omnivore.csv('data/primary_bridges.csv').on('ready', function () {p_bridges.eachLayer(p_bridges_eachLayer);
});
//Public Schools
function public_eachLayer(layer) {var feature = layer.toGeoJSON();var attr = layer.feature.properties;
var placesIcon = L.icon({iconUrl: layer.feature.properties.logo_url,iconSize: new L.Point(24, 24),});layer.setIcon(placesIcon);
var publicptTooltip = layer;
publicptTooltip.bindTooltip("Public School", {className: 'label',permanent: false,offset: [-20, 20],direction: 'center'});
var publicptPopup = layer;
publicptPopup.bindPopup("<span font-size='24px'><strong>Public School</strong></span><br> City: "+attr.City+'<br>County: '+attr.County+'<br>SFHA: '+attr.In_SFHA);
};
var publicSchool = omnivore.csv('data/public_schools.csv').on('ready', function () {publicSchool.eachLayer(public_eachLayer);
});
//Private Schools
function priv_eachLayer(layer) {var feature = layer.toGeoJSON();var attr = layer.feature.properties;
var placesIcon = L.icon({iconUrl: layer.feature.properties.logo_url,iconSize: new L.Point(24, 24),});layer.setIcon(placesIcon);
var privptTooltip = layer;
privptTooltip.bindTooltip("Private School", {className: 'label',permanent: false,offset: [-60, 20],direction: 'center'});
var privptPopup = layer;
privptPopup.bindPopup("<span font-size='24px'><strong>Private School</strong></span><br> City: "+attr.City+'<br>County: '+attr.County+'<br>SFHA: '+attr.In_SFHA);
};
var privateSchool = omnivore.csv('data/private_schools.csv').on('ready', function () {privateSchool.eachLayer(priv_eachLayer);
});
//Secondary Bridges
function s_bridge_eachLayer(layer) {var feature = layer.toGeoJSON();var attr = layer.feature.properties;
var placesIcon = L.icon({iconUrl: layer.feature.properties.logo_url,iconSize: new L.Point(24, 24),});layer.setIcon(placesIcon);
var s_bridgeTooltip = layer;
s_bridgeTooltip.bindTooltip("Secondary Bridge", {className: 'label',permanent: false,offset: [-20, 20],direction: 'center'});
var s_bridgePopup = layer;
s_bridgePopup.bindPopup("<span font-size='24px'><strong>Secondary Bridge</strong></span><br>"+'<br>SFHA: '+attr.In_SFHA);
};
var s_bridge = omnivore.csv('data/secondary_bridges.csv').on('ready', function () {s_bridge.eachLayer(s_bridge_eachLayer);
});
//Shelter
function shelters_eachLayer(layer) {var feature = layer.toGeoJSON();var attr = layer.feature.properties;
var placesIcon = L.icon({iconUrl: layer.feature.properties.logo_url,iconSize: new L.Point(32, 32),});layer.setIcon(placesIcon);
var sheltersTooltip = layer;
sheltersTooltip.bindTooltip(attr.NAME, {className: 'label',permanent: false,offset: [-60, 20],direction: 'center'});
var sheltersPopup = layer;
sheltersPopup.bindPopup("<span font-size='24px'><strong>" + attr.NAME + "</strong></span>" + "<br>" + attr.ADDRESS + "<br>" + attr.Name_1);
};
var shelters = omnivore.csv('data/shelters.csv').on('ready', function () {shelters.eachLayer(shelters_eachLayer);
});
//Supplemental Colleges
function supCollege_eachLayer(layer) {var feature = layer.toGeoJSON();var attr = layer.feature.properties;
var placesIcon = L.icon({iconUrl: layer.feature.properties.logo_url,iconSize: new L.Point(32, 32),});layer.setIcon(placesIcon);
var supCollegeTooltip = layer;
supCollegeTooltip.bindTooltip("Supplemental College", {className: 'label',permanent: false,offset: [-20, 20],direction: 'center'});
var supCollegePopup = layer;
supCollegePopup.bindPopup("<span font-size='24px'><strong>Supplmental College</strong></span><br> City: "+attr.City+'<br>County: '+attr.County+'<br>SFHA: '+attr.In_SFHA);
};
var supCollege = omnivore.csv('data/supplemental_colleges.csv').on('ready', function () {supCollege.eachLayer(supCollege_eachLayer);
});
//TSCA Facilities
function tsca_eachLayer(layer) {var feature = layer.toGeoJSON();var attr = layer.feature.properties;
var placesIcon = L.icon({iconUrl: layer.feature.properties.logo_url,iconSize: new L.Point(24, 24),});layer.setIcon(placesIcon);
var tscaTooltip = layer;
tscaTooltip.bindTooltip("TSCA", {className: 'label',permanent: false,offset: [-20, 20],direction: 'center'});
var tscaPopup = layer;
tscaPopup.bindPopup("<span font-size='24px'><strong>Toxic Substance Control Act Facilities</strong></span>"+'<br>SFHA: '+attr.In_SFHA);
};
var tsca = omnivore.csv('data/tsca.csv').on('ready', function () {tsca.eachLayer(tsca_eachLayer);
});
//Waste Systems
function wWater_eachLayer(layer) {var feature = layer.toGeoJSON();var attr = layer.feature.properties;
var placesIcon = L.icon({iconUrl: layer.feature.properties.logo_url,iconSize: new L.Point(24, 24),});layer.setIcon(placesIcon);
var wWaterTooltip = layer;
wWaterTooltip.bindTooltip("Waste Water Treatment", {className: 'label',permanent: false,offset: [-20, 20],direction: 'center'});
var wWaterPopup = layer;
wWaterPopup.bindPopup("<span font-size='24px'><strong>Waste Water Treament Plant</strong></span>"+'<br>SFHA: '+attr.In_SFHA);
};
var wWater = omnivore.csv('data/wastewater.csv').on('ready', function () {wWater.eachLayer(wWater_eachLayer);
});

var emGroup = L.layerGroup([emsStations,fireStations,hospitalsLayer,policeStations,localEoc,shelters,hurrevac]);
var govSect = L.layerGroup([privateSchool,publicSchool,supCollege,military,govBldg,collegeUniv]);
var commSec = L.layerGroup([amTower,antenna,cell,fmTower]);
var energyGroup = L.layerGroup([p_plant,genUnits,subStations])
var transGroup = L.layerGroup([airportpt,p_bridges,s_bridge,majPort,heliP,ferry,fld_roadpt,fld_roadline,interState]);

// var ciGroup = L.layerGroup([emGroup,govSect,commSec,energyGroup,transGroup]);
