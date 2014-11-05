var map,
    tracts,
    tractsData;


function main() {
    'use strict';
    map = new L.Map('map', {
        zoomControl: true,
        center: [
            44.94089619435966,
            -93.25742483139038
        ],
        zoom: 15
    });

    // map.on('click', function(e) {
    //     identifyTracts(e, tracts);
    // });

    L.tileLayer('http://tile.stamen.com/toner/{z}/{x}/{y}.png', {
        attribution: 'Stamen'
    }).addTo(map);

    // add census tracts as tile layer
    tracts = L.esri.featureLayer('http://tigerweb.geo.census.gov/arcgis/rest/services/TIGERweb/Tracts_Blocks/MapServer/10',
    {
        opacity: 0.5
    }).addTo(map);

    // Initialise the FeatureGroup to store editable layers
    var drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);

    // Initialise the draw control and pass it the FeatureGroup of editable layers
    var drawControl = new L.Control.Draw({
        draw: {
            circle: false,
            rectangle: false,
            marker: false,
            polyline: false
        },
        edit: false
    });
    map.addControl(drawControl);

    map.on('draw:created', drawComplete );

    tractsData = TAFFY();
}

// identify layer on map click
function identifyTracts(event, layer) {
    layer.identify()
        .on(map)
        .at(event.latlng)
        .layers('2')
        .ids(function(error, featureCollection){
          console.log(featureCollection, error);
        });
}

function drawComplete (e) {
    var type = e.layerType,
        layer = e.layer;

    // Do whatever else you need to. (save to db, add to map etc)
    map.addLayer(layer);
    queryTracts(layer);
}

function queryTracts(drawLayer) {
    if (drawLayer.getBounds()) {
        tracts.query()
            .intersects(drawLayer.getBounds())
            .ids(function(error, ids){
                console.log(error);
                if (ids.length > 0) {
                    map.removeLayer(drawLayer);
                    selectTracts(ids);
                }
            });
    }
}

function selectTracts(ids) {
    var selectedTracts = [];
    for (var i = ids.length - 1; i >= 0; i--) {
      tracts.setFeatureStyle(ids[i], { color: 'red', weight: 2 });
      selectedTracts.push(tracts.getFeature(ids[i]));
    };
    console.log(selectedTracts);
}

function insertTractsDB(selectedTracts) {
    for(var i = selectedTracts.length - 1; i >= 0; i--
}

$(window).load( main );

