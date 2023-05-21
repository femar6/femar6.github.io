var map = L.map('map').setView([31.505, -90.09], 5);
var Esri_WorldImagery = L.tileLayer(
  'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {}).addTo(map);
var controlAdded = false;
var MyControl = L.Control.extend({
  onAdd: function (map) {
    var container = L.DomUtil.create('div', 'story-toggle-container');
    var button = L.DomUtil.create('div', 'story-toggle', container);
    return container;
  },
  onRemove: function (map) {
  }
});

var myControl = new MyControl({
  position: 'topright'
});

var url ='https://services.arcgis.com/XG15cJAlne2vxtgt/arcgis/rest/services/BP_Platform_DATA/FeatureServer/0/query?where=1%3D1&outFields=*&f=geojson';
fetch(url).then(function (response) {return response.json();}).then(function (data) {
    var marker;
    var geojsonLayer = L.geoJSON(data, {
      pointToLayer: function (feature, latlng) {
        marker = L.marker(latlng, {
          autoPanOnFocus: true,
          riseOnHover: true,
          zIndexOffset: 1000
        }).setBouncingOptions({
          bounceHeight: 20,
          contractHeight: 20,
          bounceSpeed: 60,
          contractSpeed: 30,
          shadowAngle: null
        });
        return marker;
      },
    }).addTo(map);
    var totalFeatures = geojsonLayer.getLayers().length;
    var stateCounts = {}; // Object to store count by state
        var featureData = [];
        geojsonLayer.eachLayer(function (layer) {
          var state = layer.feature.properties.State;
          if (state in stateCounts) {
            stateCounts[state]++;
          } else {
            stateCounts[state] = 1;
          }
          var properties = layer.feature.properties;
          var {
            Story_Name,
            City,
            State,
          } = properties;
          featureData.push({
            Story_Name,
            City,
            State
          });
        });
        if (geojsonLayer.getLayers().length > 0) {
          var bounds = geojsonLayer.getBounds();
          map.fitBounds(bounds, {
            padding: [50, 50],
            maxZoom: 4
          });
        }
        featureData.sort(function (a, b) {
          if (a.State < b.State) return -1;
          if (a.State > b.State) return 1;
          if (a.City < b.City) return -1;
          if (a.City > b.City) return 1;
          if (a.Story_Name < b.Story_Name) return -1;
          if (a.Story_Name > b.Story_Name) return 1;
          return 0;
        });
        var table = document.createElement('table');
        table.classList.add('animated-table');
        var headerRow = document.createElement('tr');
        var headerNames = ['Story Name', 'City', 'State'];
        var propertyNames = ['Story_Name', 'City', 'State'];
        headerNames.forEach(function (headerName, index) {
          var th = document.createElement('th');
          th.textContent = headerName;
          headerRow.appendChild(th);
        });

        table.appendChild(headerRow);

        featureData.forEach(function (data) {
          var row = document.createElement('tr');
          row.addEventListener('click', function () {
            var layer = geojsonLayer.getLayers().find(function (layer) {
              return layer.feature.properties.Story_Name === data.Story_Name &&
              layer.feature.properties.City === data.City &&
              layer.feature.properties.State === data.State;
            });
            if (layer) {
              var latLng = layer.getLatLng();
              map.flyTo(latLng, 10, {
                duration: 1.25,
                noMoveStart: true,
                easeLinearity: 0.1
              }); // Adjust the zoom level as needed
              if (!controlAdded) {
                map.removeControl(myControl);
                myControl.addTo(map);
                controlAdded = true;
              } else {
                // map.removeControl(myControl);
                // controlAdded = false;
              }
            }

            // var backButton = document.createElement("div");
            // backButton.id = "back";
            
            // backButton.style.backgroundColor = "white";
            // backButton.innerHTML = "Do you want to go back?";
            // document.querySelector(".story-toggle").appendChild(backButton);
            // backButton.onclick = function(e) {
            //   document.querySelector("#text-animation").classList.remove("hide");
            //   document.getElementById("feature-info").classList.add("hide");
            //   document.querySelector(".story-toggle").innerHTML = "";
            // };





            var storyName = layer.feature.properties.Story_Name;
            document.querySelector(".story-toggle").innerHTML = '<div style="background-color:white;color:black;padding:15px;"><span style="font-size:1.25rem;"><b>Do you want to see this story?</b></span><br><br>' + storyName + '<br><button id="test">yes</button></div>';
            
            
            
            
            document.querySelector("#test").onclick = function(e) {
              myControl.addTo(map);
              document.querySelector("#text-animation").classList.add("hide");
              document.querySelector(".story-toggle").innerHTML =  `<div style="background-color:white;color:black;padding:15px;"><span style="font-size:1.25rem;"><b>Do you want to go back?</b></span><br><button id="test2">yes</button></div>`;
                document.getElementById("feature-info").classList.remove("hide");
                document.getElementById("feature-info").innerHTML =
                  '<div style="color:white;padding:15px;">' +
                  '<span style="font-size:1.5rem;"><b>' +
                  storyName +
                  "</b></span>" +
                  '<span style="margin-top:2rem;">' +
                  layer.feature.properties.Summary_1 +
                  "</span>" +
                  '<span style="margin-top:2rem;"><img class="story-img" height="350" width="350" src="' +
                  layer.feature.properties.img +
                  '" /></span>' +
                  '<span style="margin-top:2rem;margin-bottom:3rem;">' +
                  layer.feature.properties.Summary_2 +
                  "</span>" +
                  '<a style="color:white;" target="_blank" href="' +
                  layer.feature.properties.link_url +
                  '">' +
                  layer.feature.properties.link_title +
                  "</a>" +
                  "</div>";
                  document.querySelector("#test2").onclick = function(e) {
                    document.querySelector("#text-animation").classList.remove("hide");
                    document.querySelector("#feature-info").classList.add("hide");
                    map.removeControl(myControl);
                    controlAdded = false;
                    var bounds = geojsonLayer.getBounds();
                    map.fitBounds(bounds, {
                      padding: [50, 50],
                      maxZoom: 4
                    });
                  }
            };










          });
          row.setAttribute('data-State', data.State);
          propertyNames.forEach(function (propertyName) {
            var td = document.createElement('td');
            td.textContent = data[propertyName];
            row.appendChild(td);
          });
          table.appendChild(row);
        });
        var tableContainer = document.getElementById('table-container');
        tableContainer.appendChild(table);
        var tableRows = document.querySelectorAll('tr');
        tableRows.forEach(function (row) {
          row.addEventListener('mouseover', function () {
            var layer = geojsonLayer.getLayers().find(function (layer) {
              return layer.feature.properties.Story_Name === row.cells[0].textContent &&
                layer.feature.properties.City === row.cells[1].textContent &&
                layer.feature.properties.State === row.cells[2].textContent;
            });
            if (layer && marker) {
              marker.setLatLng(layer.getLatLng());
              marker.bounce(1);
            }
          });
          row.addEventListener('mouseout', function () {
            // if (marker) {
              marker.bounce(0);
            // }
          });
        });


















        




        const title = document.getElementsByTagName('h1')[0].innerText.split("").map((e, i) => e != " " ? `<span class="char">${e}</span>` : `<span class="space">&nbsp;</span>`).join("");
        document.getElementsByTagName('h1')[0].innerHTML = title;
        let title2 = document.getElementsByTagName('h1')[0];
        var tl = new TimelineMax();
        tl.staggerFrom('h1 .char', 1, {
            autoAlpha: 0,
            scale: 50,
            cycle: {
              x: randomPos,
              y: randomPos
            },
            rotation: -1080,
            ease: Power4.easeOut
          },.1, "heading").staggerFrom('.horizontal', 1, {
            cycle: {
              x: [4000, -4000]
            },
            ease: Power3.easeOut
          },
          0, "heading+=1.25", "horizontal").
        staggerFrom('.vertical', 1, {
            cycle: {
              y: [-2000, 2000]
            },
    
            ease: Power4.easeOut
          },0, "horizontal-=0.9");
        function randomPos(i) {
          let val = Math.random() * 1000 * (i + 1);
          val *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
          return val;
        }
        TweenMax.fromTo("h2", 1, {
          opacity: 0,
          x: -50
        }, {
          opacity: 1,
          delay: 2,
          x: 0
        });
        TweenMax.from(".pic1", 1.25, {
          opacity: 0,
          scale: 0.1,
          delay: 1
        });
        TweenMax.from(".pic2", 1, {
          opacity: 0,
          scale: 0.1,
          delay: 1
        });
        TweenMax.from(".pic3", 1, {
          opacity: 0,
          scale: 0.1,
          delay: 1
        });
        TweenMax.from(".pic4", 1, {
          opacity: 0,
          scale: 0.1,
          delay: 1
        });
        var nextPage = document.querySelector("main");
    
        nextPage.onclick = function (e) {
          tl.reverse(); // Reverse the intro animation
          tl.eventCallback("onReverseUpdate", function () {
          });
          TweenMax.fromTo("h2", 1, {
            opacity: 1,
            x: 0
          }, {
            opacity: 0,
            delay: 0,
            x: -100
          });
          document.querySelectorAll(".pic").forEach(function (pic) {
            var delay = Math.random() * 1; // Generate a random delay between 0 and 1 second
            pic.style.animation = `fade-out 0.5s ease ${delay}s forwards`;
          });
          tl.eventCallback("onReverseComplete", function () {
            // Remove all elements
            document.getElementsByTagName('h1')[0].innerHTML = "";
            document.querySelector("h2").style.display = "none";
            document.querySelectorAll(".pic").forEach(function (pic) {
              pic.style.display = "none";
            });
            const mainElement = document.querySelector("main");
            mainElement.remove();
            document.querySelector(".main-map").classList.remove("hide");
            document.querySelector(".right-map").style.animation = `changeHeight 0.5s ease 0.5s forwards`;
            document.querySelector(".left-map").style.animation = `changeWidth 0.75s ease 0.5s forwards`;
            document.getElementById("map").style.animation = `fade-in 1s ease 1s forwards`;
            map.invalidateSize();
          });
    }
    document.querySelector(".totalCnt").innerHTML = 'Total Best Practices: ' + totalFeatures + "<br><br>FL: " + stateCounts.FL + " | LA: " + stateCounts.LA +
      " | MO: " + stateCounts.MO + " | NC: " + stateCounts.NC + " | PR: " + stateCounts.PR + " | TX: " + stateCounts.TX + " | UT: " + stateCounts.UT + " | WA: " + stateCounts.WA;
  });



  