module.exports = function (tileLayers, tile, writeData, done) {
    var osm = tileLayers.osm.osm;

    var lakes = [];
    for (var i = 0; i < osm.features.length; i++) {
        var feature = osm.features[i];
        if ((feature.properties['@version'] == 1) && feature.properties.hasOwnProperty('water') && (feature.properties['water'] === 'lake')) {
            lakes.push(JSON.stringify(feature));
        }
    }

    if (lakes.length) writeData('\n' + lakes.join('\n'));
    done(null, null);
};
