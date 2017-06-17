var argv = require('minimist')(process.argv.slice(2));
var readline = require('readline');
var fs = require('fs');
var csv = require('csv');
var queue = require('d3-queue').queue;
var turf = require('@turf/turf');
var request = require('request');

if (!argv.lakes) {
    console.log('');
    console.log('node get-features.js OPTIONS');
    console.log('');
    console.log('  OPTIONS');
    console.log('    --lakes lakes.json');
    console.log('');
    return;
}
var headers = [
    'feature_id', 'feature_type', 'feature_version', 'feature_area', 'feature_coordinates', 'feature_bbox_area',
    'name', 'changeset_id', 'changeset_timestamp', 'user_id', 'user_name', 'user_changesets', 'user_features'

];
csv.stringify([headers], function (error, headersAsString) {
    process.stdout.write(headersAsString);
});

function getUserDetails(user, callback) {
    var directory = 'data/user-details';
    var filename = directory + '/' + user + '.json';

    if (fs.existsSync(filename)) return callback(null, JSON.parse(fs.readFileSync(filename)));

    var url = 'https://osm-comments-api.mapbox.com/api/v1/users/name/' + encodeURIComponent(user);
    request(url, function (error, response, body) {
        fs.writeFileSync(filename, body);
        return callback(error, JSON.parse(body));
    });
}

function getFeatures(feature, callback) {
    var features = [];
    if (feature.properties.hasOwnProperty('from_way') && (feature.properties['from_way'] === false)) {
        features.push(feature.properties['orig_id']);
        features.push('relation');
    } else {
        features.push(feature.properties['id']);
        features.push(feature.properties['type']);
    }
    features.push(feature.properties['version']);
    features.push(turf.area(feature).toFixed(2));
    features.push(turf.coordAll(feature).length);
    features.push(turf.area(turf.bboxPolygon(turf.bbox(feature))).toFixed(2));
    features.push(feature.properties.hasOwnProperty('name') ? feature.properties['name'] : undefined);
    features.push(feature.properties['changeset']);
    features.push(feature.properties['timestamp_seconds_since_epoch']);
    features.push(feature.properties['uid']);
    features.push(feature.properties['user']);

    var userQ = queue(1);
    userQ.defer(getUserDetails, feature.properties['user']);
    userQ.awaitAll(function (error, userDetails) {
        userDetails = userDetails[0];
        features.push(userDetails['changeset_count']);
        features.push(userDetails['num_changes']);

        // Write all features in csv format on the console.
        csv.stringify([features], function (error, featuresAsString) {
            // Not using console.log since that adds an extra newline character.
            process.stdout.write(featuresAsString);
            return callback(null, null);
        });
    })
}

var reader = readline.createInterface({
    input: fs.createReadStream(argv.lakes),
    terminal: false,
    output: null
});

var q = queue(20);
reader.on('line', function (line) {
    if (line.length > 1) {
        var feature = JSON.parse(line);
        q.defer(getFeatures, feature);
    }
});
reader.on('close', function () {
    q.awaitAll(function (error, results) {
    });
});
