var map,
    tracts;


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

    L.tileLayer('http://tile.stamen.com/toner/{z}/{x}/{y}.png', {
        attribution: 'Stamen'
    }).addTo(map);

    // add census tracts as tile layer
    tracts = L.esri.dynamicMapLayer('http://tigerweb.geo.census.gov/arcgis/rest/services/TIGERweb/Tracts_Blocks/MapServer',
    {
        layers: [0],
        opacity: 0.5
    }).addTo(map);

    // tracts = L.tileLayer.wms("http://tigerweb.geo.census.gov/arcgis/services/TIGERweb/tigerWMS_Current/MapServer/WMSServer", {
    //     layers: 'Census Tracts',
    //     format: 'image/png',
    //     transparent: true,
    //     attribution: "U.S. Census Bureau"
    // }).addTo(map);
}

$(window).load( main );