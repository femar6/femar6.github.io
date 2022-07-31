




var basemapDiv = document.getElementById("baseMaps");
var closeBase_ = document.getElementById("closeBase");


var basemap1_ = document.getElementById("basemap1")
basemap1_.onclick = function () {

	if (!baseMapLayers.hasLayer(google_hybrid)) {
		baseMapLayers.clearLayers();
		baseMapLayers.addLayer(google_hybrid);


		basemap1_.classList.add("basemapSelected");
		basemap2_.classList.remove("basemapSelected");
		basemap3_.classList.remove("basemapSelected");
		basemap4_.classList.remove("basemapSelected");
		basemap5_.classList.remove("basemapSelected");
		basemap6_.classList.remove("basemapSelected");
		basemap7_.classList.remove("basemapSelected");
		basemap8_.classList.remove("basemapSelected");
		basemap9_.classList.remove("basemapSelected");
	}
	huc8Layer.setStyle(style1);
}
var basemap2_ = document.getElementById("basemap2");
basemap2_.onclick = function () {
	if (!baseMapLayers.hasLayer(google_terrain)) {
		baseMapLayers.clearLayers();
		baseMapLayers.addLayer(google_terrain);
		basemap1_.classList.remove("basemapSelected");
		basemap2_.classList.add("basemapSelected");
		basemap3_.classList.remove("basemapSelected");
		basemap4_.classList.remove("basemapSelected");
		basemap5_.classList.remove("basemapSelected");
		basemap6_.classList.remove("basemapSelected");
		basemap7_.classList.remove("basemapSelected");
		basemap8_.classList.remove("basemapSelected");
		basemap9_.classList.remove("basemapSelected");
	}
    huc8Layer.setStyle(style2);
}
var basemap3_ = document.getElementById("basemap3");
basemap3_.onclick = function () {
	if (!baseMapLayers.hasLayer(googleRoad)) {
		baseMapLayers.clearLayers();
		baseMapLayers.addLayer(googleRoad);

		basemap1_.classList.remove("basemapSelected");
		basemap2_.classList.remove("basemapSelected");
		basemap3_.classList.add("basemapSelected");
		basemap4_.classList.remove("basemapSelected");
		basemap5_.classList.remove("basemapSelected");
		basemap6_.classList.remove("basemapSelected");
		basemap7_.classList.remove("basemapSelected");
		basemap8_.classList.remove("basemapSelected");
		basemap9_.classList.remove("basemapSelected");
	}
	huc8Layer.setStyle(style2);
}
var basemap4_ = document.getElementById("basemap4");
basemap4_.onclick = function () {
	if (!baseMapLayers.hasLayer(Esri_WorldImagery)) {
		baseMapLayers.clearLayers();
		baseMapLayers.addLayer(Stamen_TerrainLabels);
		baseMapLayers.addLayer(Esri_WorldImagery);
		basemap1_.classList.remove("basemapSelected");
		basemap2_.classList.remove("basemapSelected");
		basemap3_.classList.remove("basemapSelected");
		basemap4_.classList.add("basemapSelected");
		basemap5_.classList.remove("basemapSelected");
		basemap6_.classList.remove("basemapSelected");
		basemap7_.classList.remove("basemapSelected");
		basemap8_.classList.remove("basemapSelected");
		basemap9_.classList.remove("basemapSelected");
	}
	huc8Layer.setStyle(style1);
}
var basemap5_ = document.getElementById("basemap5");
basemap5_.onclick = function () {
	if (!baseMapLayers.hasLayer(USGS_USTopo)) {
		baseMapLayers.clearLayers();
		baseMapLayers.addLayer(USGS_USTopo);
		basemap1_.classList.remove("basemapSelected");
		basemap2_.classList.remove("basemapSelected");
		basemap3_.classList.remove("basemapSelected");
		basemap4_.classList.remove("basemapSelected");
		basemap5_.classList.add("basemapSelected");
		basemap6_.classList.remove("basemapSelected");
		basemap7_.classList.remove("basemapSelected");
		basemap8_.classList.remove("basemapSelected");
		basemap9_.classList.remove("basemapSelected");
	}
	huc8Layer.setStyle(style2);
}
var basemap6_ = document.getElementById("basemap6");
basemap6_.onclick = function () {
	if (!baseMapLayers.hasLayer(USGS_USImageryTopo)) {
		baseMapLayers.clearLayers();
		baseMapLayers.addLayer(USGS_USImageryTopo);
		basemap1_.classList.remove("basemapSelected");
		basemap2_.classList.remove("basemapSelected");
		basemap3_.classList.remove("basemapSelected");
		basemap4_.classList.remove("basemapSelected");
		basemap5_.classList.remove("basemapSelected");
		basemap6_.classList.add("basemapSelected");
		basemap7_.classList.remove("basemapSelected");
		basemap8_.classList.remove("basemapSelected");
		basemap9_.classList.remove("basemapSelected");
	}
	huc8Layer.setStyle(style1);
}
var basemap7_ = document.getElementById("basemap7");
basemap7_.onclick = function () {
	if (!baseMapLayers.hasLayer(OPNVKarte)) {
		baseMapLayers.clearLayers();
		baseMapLayers.addLayer(OPNVKarte);
		basemap1_.classList.remove("basemapSelected");
		basemap2_.classList.remove("basemapSelected");
		basemap3_.classList.remove("basemapSelected");
		basemap4_.classList.remove("basemapSelected");
		basemap5_.classList.remove("basemapSelected");
		basemap6_.classList.remove("basemapSelected");
		basemap7_.classList.add("basemapSelected");
		basemap8_.classList.remove("basemapSelected");
		basemap9_.classList.remove("basemapSelected");
	}
	huc8Layer.setStyle(style2);
}
var basemap8_ = document.getElementById("basemap8");
basemap8_.onclick = function () {
	if (!baseMapLayers.hasLayer(Stadia_AlidadeSmoothDark)) {
		baseMapLayers.clearLayers();
		baseMapLayers.addLayer(Stadia_AlidadeSmoothDark);
		basemap1_.classList.remove("basemapSelected");
		basemap2_.classList.remove("basemapSelected");
		basemap3_.classList.remove("basemapSelected");
		basemap4_.classList.remove("basemapSelected");
		basemap5_.classList.remove("basemapSelected");
		basemap6_.classList.remove("basemapSelected");
		basemap7_.classList.remove("basemapSelected");
		basemap8_.classList.add("basemapSelected");
		basemap9_.classList.remove("basemapSelected");
	}

}
var basemap9_ = document.getElementById("basemap9");
basemap9_.onclick = function () {
	if (!baseMapLayers.hasLayer(OpenTopoMap)) {
		baseMapLayers.clearLayers();
		baseMapLayers.addLayer(OpenTopoMap);
		basemap1_.classList.remove("basemapSelected");
		basemap2_.classList.remove("basemapSelected");
		basemap3_.classList.remove("basemapSelected");
		basemap4_.classList.remove("basemapSelected");
		basemap5_.classList.remove("basemapSelected");
		basemap6_.classList.remove("basemapSelected");
		basemap7_.classList.remove("basemapSelected");
		basemap8_.classList.remove("basemapSelected");
		basemap9_.classList.add("basemapSelected");
	}
	huc8Layer.setStyle(style2);
}