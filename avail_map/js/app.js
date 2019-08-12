
    L.Marker.prototype.animateDragging = function () {



      var iconMargin, shadowMargin;



      this.on('dragstart', function () {

        if (!iconMargin) {

          iconMargin = parseInt(L.DomUtil.getStyle(this._icon, 'marginTop'));

          shadowMargin = parseInt(L.DomUtil.getStyle(this._shadow, 'marginLeft'));

        }



        this._icon.style.marginTop = (iconMargin - 15)  + 'px';

        this._shadow.style.marginLeft = (shadowMargin + 8) + 'px';

      });



      return this.on('dragend', function () {

        this._icon.style.marginTop = iconMargin + 'px';

        this._shadow.style.marginLeft = shadowMargin + 'px';

      });

    };




setTimeout(function(){let splash_ = document.getElementById("splash");splash_.classList.add("hide");},3000);
function restart_(){
setTimeout(function () {
var restart = document.getElementById("restart");
restart.classList.remove("hide");
restart.onclick = function(){
location.reload()}
},2000);
};
var mapC = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {maxZoom: 21,attribution: '&copy; <a href="http://www.google.com">Google</a>',subdomains: ['mt0', 'mt1', 'mt2', 'mt3']});
var map1 = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {maxZoom: 21,attribution: '&copy; <a href="http://www.google.com">Google</a>',subdomains: ['mt0', 'mt1', 'mt2', 'mt3']});
var map2 = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {maxZoom: 21,attribution: '&copy; <a href="http://www.google.com">Google</a>',subdomains: ['mt0', 'mt1', 'mt2', 'mt3']});
var map3 = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {maxZoom: 21,attribution: '&copy; <a href="http://www.google.com">Google</a>',subdomains: ['mt0', 'mt1', 'mt2', 'mt3']});
var map4 = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {maxZoom: 21,attribution: '&copy; <a href="http://www.google.com">Google</a>',subdomains: ['mt0', 'mt1', 'mt2', 'mt3']});

var renderingRule = {
    "rasterFunction":"Hillshade",
    "rasterFunctionArguments": {
        "Azimuth":215,
        "Altitude":60,
        "ZFactor":1
    },"variableName":"DEM"
};
L.esri.get = L.esri.get.JSONP;

const mCover = new L.map("coverMap", {
  layers:[mapC],
  zoom: 5,center: [38, -96],zoomControl: false,minZoom: 1,maxZoom: 21,attributionControl: false});

  // const elevation = L.https://elevation.arcgis.com/arcgis/rest/services/NED30m/ImageServer

  var hillshade = L.esri.imageMapLayer({
    url: 'https://elevation.nationalmap.gov/arcgis/rest/services/3DEPElevation/ImageServer',
    // url: 'https://elevation.arcgis.com/arcgis/rest/services/NED30m/ImageServer',
    renderingRule: renderingRule,
    useCors: false,
    opacity:0.5
  });
  // var identifiedPixel;
  // var pane = document.getElementById('pixelValue');
  // mCover.on('mousemove', function (e) {
  //     if(identifiedPixel){
  //         pane.innerHTML = 'Loading';
  //     }
  //     hillshade.identify().at(e.latlng).run(function(error, results){
  //         identifiedPixel = results.pixel;
  //         pane.innerHTML = identifiedPixel.properties.value + 'm';
  //     });
  // });


  const results = L.layerGroup().addTo(mCover);
  var geocodeService = L.esri.Geocoding.geocodeService();
  var searchControl = L.esri.Geocoding.geosearch({expanded:true,collapseAfterResult:false,searchBounds:L.latLngBounds([ 48.904331,-124.503294],[  24.489948,-66.885886])}).addTo(mCover);
  searchControl.on('results', function(data){
    document.getElementById("test").classList.add("hide");
    results.clearLayers();
    for (var i = data.results.length - 1; i >= 0; i--) {
      var latlng = data.results[i].latlng;

      const marker1 = L.marker([data.latlng.lat,data.latlng.lng],{draggable:true}).addTo(results);
      marker1.on("click", function(){
        document.getElementById("commit_div").classList.remove("hide");
        $( "#commit_div" ).animate({
          left:150
        }, 250 );
      });




      var distance = marker1.getLatLng().distanceTo([data.latlng.lat,data.latlng.lng]).toFixed(0);
      marker1.bindTooltip("Drag and Click<br>to Commit",{className:'test1'});
      marker1.on('dragend', function(){
      var distance = marker1.getLatLng().distanceTo([data.latlng.lat,data.latlng.lng]).toFixed(0);

      var getLatLng_ = marker1.getLatLng();
      var getLat_ = getLatLng_.lat;
      var getLng_ = getLatLng_.lng;



      marker1.setTooltipContent("Current Location: "+getLat_+","+getLng_ +"<br>"+"Distance to first Located Point: "+marker1.getLatLng().distanceTo([data.latlng.lat,data.latlng.lng]).toFixed(0)+" meters<br>");
      document.getElementById("commit_div").classList.add("hide");
      }).animateDragging();

      setTimeout(function(){
        mCover.flyTo([data.latlng.lat,data.latlng.lng],18);
      },500);
       document.getElementById("commit").onclick = function(){
              var getLatLng = marker1.getLatLng();
              var getLat = getLatLng.lat;
              var getLng = getLatLng.lng;
               document.getElementById("cover").classList.add("hide");
               document.getElementById("printBtn").classList.remove("hide");
               m.setView([getLat,getLng],18);

               var identifiedPixel;
               var pane = document.getElementById('pixelValue');
                   if(identifiedPixel){
                       pane.innerHTML = 'Loading';
                   }
               hillshade.identify().at(marker1.getLatLng()).run(function(error, results){
                   identifiedPixel = results.pixel;
                   var pixValueNum = identifiedPixel.properties.value* 3.28084;
                   var rounded = Math.round( pixValueNum * 10 ) / 10;
                   var elevationResult = "<b>, Elevation: "+rounded.toFixed(1) + ' feet</b>';
                   pane.innerHTML = elevationResult;
               });
               document.getElementById('lat').innerHTML =
                   '<b>Latitude: <b>'+getLatLng.lat;
                 document.getElementById('long').innerHTML =
                   '<b>Longitude: <b>'+getLatLng.lng;
               geocodeService.reverse().latlng(getLatLng).run(function(error, result){document.getElementById('address').innerHTML = '<b>Address: <b>'+result.address.Match_addr;});
               // geocodeService.reverse().latlng(dragmarkerLatlng).run(function(error, result2){console.log(result2.address.Match_addr)});
               setTimeout(function () {const marker2 = L.marker([getLat,getLng], {bounceOnAdd: true}).addTo(m);},2000);
               setTimeout(function () {const marker3 = L.marker([getLat,getLng], {bounceOnAdd: true}).addTo(m2);},2500);
               setTimeout(function () {const marker4 = L.marker([getLat,getLng], {bounceOnAdd: true}).addTo(m3);},3000);
               setTimeout(function () {const marker5 = L.marker([getLat,getLng], {bounceOnAdd: true}).addTo(m4);},3500);
               m.setView([getLat,getLng],18);
             setTimeout(function () {
             var pending = L.esri.featureLayer({url:'https://hazards.fema.gov/gis/nfhl/rest/services/PrelimPending/Pending_NFHL/MapServer/24',where:"FLD_ZONE IN ('A','AE','A99','V','VE')",
                 style: function (feature) {
                   if(feature.properties.FLD_ZONE === 'VE'){
                     return {color: 'darkpurple', weight: 0,fillOpacity:0.5 };
                   } else if(feature.properties.FLD_ZONE === 'V'){
                     return { color: 'purple', weight: 0,fillOpacity:0.5 };
                   } else {
                     return { color: '#01e5ff', weight: 0,fillOpacity:0.5 };
                   }
                 }
               }).addTo(m2);
             var preliminary = L.esri.featureLayer({url:'https://hazards.fema.gov/gis/nfhl/rest/services/PrelimPending/Prelim_NFHL/MapServer/24',where:"FLD_ZONE IN ('A','AE','A99','V','VE')",
                 style: function (feature) {
                   if(feature.properties.FLD_ZONE === 'VE'){
                     return {color: 'darkpurple', weight: 0,fillOpacity:0.5 };
                   } else if(feature.properties.FLD_ZONE === 'V'){
                     return { color: 'purple', weight: 0,fillOpacity:0.5 };
                   } else {
                     return { color: '#01e5ff', weight: 0,fillOpacity:0.5 };
                   }
                 }
                 }).addTo(m3);
             var draft = L.esri.featureLayer({url:'https://hazards.fema.gov/gis/nfhl/rest/services/AFHI/Draft_FIRM_DB/MapServer/11',where:"FLD_ZONE IN ('A','AE','A99','V','VE')",
                 style: function (feature) {
                   if(feature.properties.FLD_ZONE === 'VE'){
                     return {color: 'darkpurple', weight: 0,fillOpacity:0.5 };
                   } else if(feature.properties.FLD_ZONE === 'V'){
                     return { color: 'purple', weight: 0,fillOpacity:0.5 };
                   } else {
                     return { color: '#01e5ff', weight: 0,fillOpacity:0.5 };
                   }
                 }
                 }).addTo(m4);
             }, 1500);
         document.getElementById('effect_source').innerHTML = "<div class='loading'>Loading</div>";
           document.getElementById('effect_fld').innerHTML = '';
           document.getElementById('effect_date').innerHTML = '';
           document.getElementById('effect_panel').innerHTML = "";
           document.getElementById('effect_bfe').innerHTML = '';
             L.esri.query({
               url: "https://hazards.fema.gov/gis/nfhl/rest/services/public/NFHL/MapServer/28"
             }).intersects(getLatLng).run(function(error, nfhl) {
               if (nfhl.features.length > 0) {
                 document.getElementById('effect_source').innerHTML =
                   'Source: ' + nfhl.features[0].properties.SOURCE_CIT;
                   document.getElementById('effect_panel').innerHTML =
                   'FIRM PANEL: ' + nfhl.features[0].properties.DFIRM_ID;
                 document.getElementById('effect_fld').innerHTML =
                   'Flood Zone: ' + nfhl.features[0].properties.FLD_ZONE;
                   document.getElementById('effect_bfe').innerHTML =
                     // 'Determined BFE: ' + nfhl.features[0].properties.STATIC_BFE+" ft.";
                     'Determined BFE:' + "____________";
               } else {
                 document.getElementById('effect_source').innerHTML ='';
                 document.getElementById('effect_panel').innerHTML ='';
                 document.getElementById('effect_date').innerHTML ='';
                 document.getElementById('effect_fld').innerHTML ='Please see Corelogic Dataset.';
                 document.getElementById('effect_bfe').innerHTML ='';
               }
               document.getElementById('nfhl_site').innerHTML = '<br><a target="_blank" href="https://hazards-fema.maps.arcgis.com/apps/webappviewer/index.html?id=8b0adb51996444d4879338b5529aa9cd&level=13&marker='+getLatLng.lng+';'+getLatLng.lat+
               ';"><img height=50 width=125 class="agol" src="./img/agol.png"></a>&nbsp;&nbsp;&nbsp;<a target="_blank" href="https://msc.fema.gov/portal/downloadProduct?productID=NFHL_'
               +nfhl.features[0].properties.DFIRM_ID+'">PNG</a>&nbsp;&nbsp;<a target="_blank" href="https://msc.fema.gov/portal/downloadProduct?productID=NFHL_'
               +nfhl.features[0].properties.DFIRM_ID+'">SHP</a><br><br>';
             });
             document.getElementById('pending_source').innerHTML = "<div class='loading'>Loading</div>";
             document.getElementById('pending_fld').innerHTML = '';
             document.getElementById('pending_date').innerHTML = '';
             document.getElementById('pending_panel').innerHTML = "";
             document.getElementById('pending_bfe').innerHTML = '';
             L.esri.query({
               url: "https://hazards.fema.gov/gis/nfhl/rest/services/PrelimPending/Pending_NFHL/MapServer/24"
             }).intersects(getLatLng).run(function(error, pending) {
               if (pending.features.length > 0) {
                 document.getElementById('pending_source').innerHTML =
                   'Source: ' + pending.features[0].properties.SOURCE_CIT;
                 document.getElementById('pending_fld').innerHTML =
                   'Flood Zone: ' + pending.features[0].properties.FLD_ZONE;
                 document.getElementById('pending_panel').innerHTML =
                   'FIRM PANEL: ' + pending.features[0].properties.DFIRM_ID;
                   document.getElementById('pending_bfe').innerHTML =
                     // 'Determined BFE: ' + pending.features[0].properties.STATIC_BFE+" ft.";
                     'Determined BFE:' + "____________";
               } else {
                 document.getElementById('pending_source').innerHTML =''
                 document.getElementById('pending_panel').innerHTML =''
                 document.getElementById('pending_date').innerHTML =''
                 document.getElementById('pending_fld').innerHTML ='There is no pending data.'
                 document.getElementById('pending_bfe').innerHTML =''
               }
             });
             document.getElementById('prelim_source').innerHTML = "<div class='loading'>Loading</div>"
              document.getElementById('prelim_fld').innerHTML = ''
              document.getElementById('prelim_date').innerHTML = ''
              document.getElementById('prelim_panel').innerHTML = ""
              document.getElementById('prelim_bfe').innerHTML = ''
              L.esri.query({
                url: "https://hazards.fema.gov/gis/nfhl/rest/services/PrelimPending/Prelim_NFHL/MapServer/24"
              }).intersects(getLatLng).run(function(error, prelim) {
                if (prelim.features.length > 0) {
                  document.getElementById('prelim_source').innerHTML =
                    'Source: ' + prelim.features[0].properties.SOURCE_CIT;
                  document.getElementById('prelim_fld').innerHTML =
                    'Flood Zone: ' + prelim.features[0].properties.FLD_ZONE;
                  document.getElementById('prelim_panel').innerHTML =
                    'FIRM PANEL: ' + prelim.features[0].properties.DFIRM_ID;
                    document.getElementById('prelim_bfe').innerHTML =
                      // 'Determined BFE: ' + prelim.features[0].properties.STATIC_BFE+" ft.";
                     'Determined BFE:' + "____________";
                } else {
                  document.getElementById('prelim_source').innerHTML =''
                  document.getElementById('prelim_panel').innerHTML =''
                  document.getElementById('prelim_date').innerHTML =''
                  document.getElementById('prelim_fld').innerHTML ='There is no prelim data.'
                  document.getElementById('prelim_bfe').innerHTML =''
                }
              });
               document.getElementById('draft_source').innerHTML = "<div class='loading'>Loading</div>"
                document.getElementById('draft_fld').innerHTML = ''
                document.getElementById('draft_date').innerHTML = ""
                document.getElementById('draft_panel').innerHTML = ""
                document.getElementById('draft_bfe').innerHTML = ''
                L.esri.query({
                  url: "https://hazards.fema.gov/gis/nfhl/rest/services/AFHI/Draft_FIRM_DB/MapServer/11"
                }).intersects(getLatLng).run(function(error, draft) {
                  if (draft.features.length > 0) {
                    document.getElementById('draft_source').innerHTML =
                      'Source: ' + draft.features[0].properties.SOURCE_CIT;
                    document.getElementById('draft_fld').innerHTML =
                      'Flood Zone: ' + draft.features[0].properties.FLD_ZONE;
                    document.getElementById('draft_panel').innerHTML =
                      'FIRM PANEL: ' + draft.features[0].properties.DFIRM_ID;
                      document.getElementById('draft_bfe').innerHTML =
                        // 'Determined BFE: ' + draft.features[0].properties.STATIC_BFE+" ft.";
                     'Determined BFE:' + "____________";
                  } else {
                    document.getElementById('draft_source').innerHTML =''
                    document.getElementById('draft_panel').innerHTML =''
                    document.getElementById('draft_date').innerHTML =''
                    document.getElementById('draft_fld').innerHTML ='There is no draft data.'
                    document.getElementById('draft_bfe').innerHTML =''
                  }
                });
      } // Commit Button


} // Loop






}); // search

const m = new L.map("m", {layers:[map1],zoom: 4,center: [30, -99],zoomControl: false,minZoom: 1,maxZoom: 21,attributionControl: false});
const m2 = new L.map("m2", {zoom: 4,center: [30, -99],zoomControl: false,minZoom: 1,maxZoom: 21,layers:[map2],attributionControl: false,});
const m3 = new L.map("m3", {zoom: 4,center: [30, -99],zoomControl: false,minZoom: 1,maxZoom: 21,layers:[map3],attributionControl: false,});
const m4 = new L.map("m4", {zoom: 4,center: [30, -99],zoomControl: false,minZoom: 1,maxZoom: 21,layers:[map4],attributionControl: false,});
m.sync(m2);m.sync(m3);m.sync(m4);m.sync(mCover);
m2.sync(m);m2.sync(m3);m2.sync(m4);m2.sync(mCover);
m3.sync(m);m3.sync(m2);m3.sync(m4);m3.sync(mCover);
m4.sync(m);m4.sync(m2);m4.sync(m3);m4.sync(mCover);
mCover.sync(m);mCover.sync(m2);mCover.sync(m3);mCover.sync(m4);
function printDiv(divName) {
     var printContents = document.getElementById(divName).innerHTML;
     var originalContents = document.body.innerHTML;
     document.body.innerHTML = printContents;
     window.print();
     document.body.innerHTML = originalContents;
}
  var currentTime = new Date();
  document.getElementById("source").innerHTML = currentTime;
var fldHazLayer = L.tileLayer.wms('https://hazards.fema.gov/gis/nfhl/services/public/NFHLWMS/MapServer/WMSServer?', {layers: '4',transparent: true,opacity: 0.5,minZoom: 12,maxZoom: 21,format: 'image/png'}).addTo(m);
