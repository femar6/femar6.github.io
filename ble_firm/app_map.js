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
      if (feature.properties.CORELOGIC == 1) {
        communityCounts[community].CORELOGIC++;
      }
      if (feature.properties.BLE_A_ZONE == 1) {
        communityCounts[community].BLE_A_ZONE++;
      }
      if (!countyCounts[county]) {
        countyCounts[county] = {
          CORELOGIC: 0,
          BLE_A_ZONE: 0
        };
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
  county.forEach(function (county) {
    countyTotals[county] = {
      CORELOGIC: countyCounts[county].CORELOGIC,
      BLE_A_ZONE: countyCounts[county].BLE_A_ZONE
    };
  });
  // Remove the existing table control from the map
  if (tableControl) {
    tableControl.remove();
  }

  // Create a new TableControl with updated data
  var TableControl = L.Control.extend({
    onAdd: function (map) {
      var container = L.DomUtil.create('div', 'structure-table-control');

      var tableHTML = "<span style='background-color:#005287;padding:0.5rem;font-size:0.95rem;'>Buildings in 1% annual chance floodplain | Source: FEMA/ORNL<button onclick='tableClose_btn()' style='background-color:white;color:red;font-weight:900;border-radius:1rem;'>x</button></span><table class='building-table'><tr><th>Geography (left-click to zoom-in/out)</th><th>BLE</th><th>Paper</th></tr>";
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
  tableControl = new TableControl();


  if (tableControl_ == true) {
    tableControl.addTo(map);
  } else if (tableControl_ == false) {
    map.removeControl(tableControl);
  }


  var communityRows = document.getElementsByClassName('community-row');
  for (var i = 0; i < communityRows.length; i++) {
    communityRows[i].addEventListener('click', flyToFeature);
  }
}
function flyToFeature(event) {
  var community = event.currentTarget.dataset.community;
  if (community) {
    var feature = filteredFeatures2.find(function (f) {
      return f.properties.POL_NAME2 === community;
    });

    if (feature) {
      // var latLng = L.latLng(feature.geometry.coordinates[1], feature.geometry.coordinates[0]);
      map.setView([feature.geometry.coordinates[1] + 0.015, feature.geometry.coordinates[0]], 15);
    }
  }
  var county = event.currentTarget.dataset.county;
  if (county) {
    var feature = filteredFeatures2.find(function (f) {
      return f.properties.CNTY === county;
    });
    if (feature) {
      // var latLng = L.latLng(feature.geometry.coordinates[1], feature.geometry.coordinates[0]);
      map.setView([feature.geometry.coordinates[1] + 0.015, feature.geometry.coordinates[0]], 15);
    }    
  }
}

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