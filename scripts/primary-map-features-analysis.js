var fs = require('fs');
var csv = require('csv');
var argv = require('minimist')(process.argv.slice(2));

if (!argv.counts) {
    console.log('');
    console.log('USAGE: node primary-map-features-analysis.js OPTIONS');
    console.log('');
    console.log('  OPTIONS');
    console.log('    --counts counts.csv');
    console.log('');
    return;
}

// Statistics for number of counts that are zero, less than 1 and greater than 1.
var stats = [0, 0, 0];

csv.parse(fs.readFileSync(argv.counts), function (error, rows) {
    var header = [];
    for (var i = 0; i < rows.length; i++) {

        if (header.length === 0) {
            header = rows[i];
            continue;
        }

        for (var j = 0; j < rows[i].length; j++) {
            var count = parseFloat(rows[i][j]);
            if (count === 0) stats[0] += 1;
            else if (count < 1) stats[1] += 1;
            else stats[2] += 1;
        }
    }
    console.log(stats);
});
