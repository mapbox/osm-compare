module.exports = function (tileLayers, tile, writeData, done) {
    var osm = tileLayers.osm.osm;

    var results = [];
    for (var i = 0; i < osm.features.length; i++) {
        var feature = osm.features[i];

        if (feature.properties.hasOwnProperty('name:en')) {
            var name = feature.properties['name:en'];
            for (var j = 0; j < name.length; j++) {
                if (name.charCodeAt(j) > 255) {
                    results.push(JSON.stringify(feature));
                    break;
                }
            }
        }
    }

    if (results.length > 0) {
        process.stdout.write('\n' + results.join('\n') + '\n');
    }
    done(null, null);
};
