var turf = require('@turf/turf');

module.exports = function (tileLayers, tile, writeData, done) {
    var osm = tileLayers.osm.osm;
    var maxFeatures = 5;  // Maximum number of large features form a tile.

    var featureAreas = [];
    for (var i = 0; i < osm.features.length; i++) {
        var feature = osm.features[i];

        // Area is square meters.
        var area = turf.area(feature).toFixed(2);
        feature.properties['area'] = area;
        featureAreas.push([feature.properties['@id'], area]);
    }
    // Sort features by decending area and filter top 5 features by area.
    featureAreas = featureAreas.sort(function (a, b) { return b[1] - a[1]; }).slice(0, maxFeatures).map(function (item) { return item[0]; });

    var largeFeatures = [];
    for (var i = 0; i < osm.features.length; i++) {
        var feature = osm.features[i];
        if (featureAreas.indexOf(feature.properties['@id']) !== -1) largeFeatures.push(feature);
    }

    done(null, largeFeatures);
};
