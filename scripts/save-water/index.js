var argv = require('minimist')(process.argv.slice(2));
var tileReduce = require('tile-reduce');
var path = require('path');
var fs = require('fs');

if (!argv.osm || !argv.lakes) {
    console.log('');
    console.log('node index.js OPTIONS');
    console.log('');
    console.log('  OPTIONS');
    console.log('    --osm osm-qa-tiles.mbtiles');
    console.log('    --lakes lakes.json');
    console.log('');
    return;
}

tileReduce({
    // BBOX of US.
    bbox: [-125.33203125, 28.304380682962783, -53.26171875, 51.28940590271679],
    zoom: 12,
    map: path.join(__dirname, 'extract.js'),
    sources: [
        {
            name: 'osm',
            mbtiles: argv.osm
        }
    ],
    output: fs.createWriteStream(argv.lakes)
});
