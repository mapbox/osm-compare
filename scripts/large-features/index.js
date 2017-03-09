var tileReduce = require('tile-reduce');
var argv = require('minimist')(process.argv.slice(2));
var path = require('path');

if (!argv.osm) {
    console.log('');
    console.log('node index OPTIONS');
    console.log('');
    console.log('  OPTIONS');
    console.log('    --osm osm-qa-tiles.mbtiles');
    console.log('');
    return;
}

var largeFeatures = [];
tileReduce({
    bbox: [77.50373840332031, 12.915560227894478, 77.66510009765625, 13.04469656691112],
    zoom: 12,
    map: path.join(__dirname, 'extract.js'),
    sources: [{ name: 'osm', mbtiles: argv.osm }],
})
.on('reduce', function (features, tile) {
    largeFeatures = largeFeatures.concat(features);
})
.on('end', function () {
    largeFeatures = largeFeatures.sort(function(feature, anotherFeature) {
        return anotherFeature.properties.area - feature.properties.area;
    });

    var limit = largeFeatures.length > 1000 ? 1000 : largeFeatures.length;
    for (var i = 0; i < limit ; i++) {
        var feature = largeFeatures[i];
        feature.properties['areaRank'] = i + 1;
        console.log(JSON.stringify(largeFeatures[i]));
        // console.log(feature.properties['name'] + ': ' + (feature.properties['area'] / 1000000).toFixed(2));
    }
});
