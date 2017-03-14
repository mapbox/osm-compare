var argv = require('minimist')(process.argv.slice(2));
var readline = require('readline');
var fs = require('fs');

if (!argv.features) {
    console.log('');
    console.log('USAGE: node sort-by-area.js [OPTIONS]');
    console.log('');
    console.log('  OPTIONS:');
    console.log('    --features     features.json');
    console.log('');
    return;
}

var features = [];

var reader = readline.createInterface({
    input: fs.createReadStream(argv.features),
    output: null
});

reader.on('line', function (line) {
    var feature = JSON.parse(line);
    features.push(feature);
});

reader.on('close', function () {
    features = features.sort(function (a, b) { return b.properties.area - a.properties.area; });

    var limit = features.length > 10 ? 10 : features.length;
    for (var i = 0; i < features.length; i++) {
        console.log(JSON.stringify(features[i]));
    }
})
