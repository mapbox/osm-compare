var argv = require('minimist')(process.argv.slice(2));
var readline = require('readline');
var fs = require('fs');

if (!argv.features) {
    console.log('');
    console.log('USAGE: node explore.js [OPTIONS]');
    console.log('');
    console.log('  OPTIONS:');
    console.log('    --features     features.json');
    console.log('');
    return;
}

var reader = readline.createInterface({
    input: fs.createReadStream(argv.features),
    output: null
});

function isWhitelisted(character) {
    var whitelist = '–é—’‘ńűšćőžāėŠ→ș';
    for (var i = 0; i < whitelist.length; i++) {
        if (character === whitelist[i]) return true;
    }
    return false;
}

reader.on('line', function (line) {

    var feature = JSON.parse(line);
    var name = feature.properties['name:en'];

    var nonEnglishCount = 0;
    for (var i = 0; i < name.length; i++) {
        if (name.charCodeAt(i) > 127) nonEnglishCount += 1;
    }
    if (nonEnglishCount >= 5) console.log(JSON.stringify(feature));

});
