var readline = require('readline');
var fs = require('fs');
var argv = require('minimist')(process.argv.slice(2));

if (!argv.wikidata) {
    console.log('');
    console.log('USAGE: node parse-wikidata.js [OPTIONS]');
    console.log('');
    console.log('  OPTIONS:');
    console.log('    --wikidata     Line delimited wikidata file');
    console.log('');
    return;
}

var reader = readline.createInterface({
    input: fs.createReadStream(argv.wikidata),
    output: null
});


function getFeatureName(feature) {
    if (feature.hasOwnProperty('labels') && feature['labels'].hasOwnProperty('en'))
        return feature['labels']['en']['value'];
    else
        return undefined;
}

reader.on('line', function (line) {
    // Handling the trailing comma at the end of line.
    line = line.slice(0, -1);
    try {
        var feature = JSON.parse(line);

        var featureID = feature['id'];
        var featureName = getFeatureName(feature);
        if (featureName !== undefined) {
            console.log(featureID + ', ' + featureName);
        }
    } catch(error) {
    }
});

reader.on('close', function () {
});
