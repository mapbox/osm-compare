var turf = require('@turf/turf');
var csv = require('csv');

module.exports = function (tileLayers, tile, writeData, done) {
    var osm = tileLayers.osm.osm;

    var largeFeatures = [];
    for (var i = 0; i < osm.features.length; i++) {
        var feature = osm.features[i];

        var area = turf.area(feature).toFixed(2);  // Area is square meters.
        // Filter features who's area is greater than 1 km2
        if (area > Math.pow(10, 6)) {
            feature.properties['area'] = area;
            largeFeatures.push(JSON.stringify(feature));
        }
    }

    if (largeFeatures.length > 0) console.log(largeFeatures.join('\n'));
    done(null, null);
};
