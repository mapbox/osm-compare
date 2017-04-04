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

tileReduce({
    bbox: [77.55180358886719, 12.951698393721799, 77.61428833007812, 13.017269075810677],
    zoom: 12,
    map: path.join(__dirname, 'extract.js'),
    sources: [{ name: 'osm', mbtiles: argv.osm }],
});
