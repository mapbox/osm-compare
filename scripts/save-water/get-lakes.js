var osmium = require('osmium');
var argv = require('minimist')(process.argv.slice(2));
var turf = require('@turf/turf');

if (!argv.pbf) {
    console.log('');
    console.log('node get-lakes.js OPTIONS');
    console.log('');
    console.log('  OPTIONS');
    console.log('    --pbf osm-planet.pbf');
    console.log('');
    return;
}

var file = new osmium.File(argv.pbf);
var location_handler = new osmium.LocationHandler();
var stream = new osmium.Stream(new osmium.Reader(file, location_handler));

var counts = { node: 0, way: 0, relation: 0, other: 0 };
stream.on('data', function(object) {
    var feature = {
        'type': 'Feature',
        'geometry': undefined,
        'properties': undefined
    };

    try {
        var type = object['type'];

        var version = object['version'];
        if (version !== 1) return;

        var properties = object.tags();
        if (!(('water' in properties) && (properties['water'] === 'lake'))) return;

        // Add other properties from object to feature.
        for (key in object) properties[key] = object[key];
        feature['properties'] = properties;

        // If an area feature is from a way, skip and catch the LineString version of the feature.
        if (type === 'area' && properties.hasOwnProperty('from_way') && (properties['from_way'] === true)) return;

        var geometry = object.geojson();
        feature['geometry'] = geometry;

        // If feature is a way and geometry type is a LineString, try and make it a polygon
        try {
            // Throws an error if LineString cannot be converted to a Polygon.
            geometry = turf.polygon([feature['geometry']['coordinates']])['geometry'];
            feature['geometry'] = geometry;
        } catch (error) {
            // Nothing to do as the feature already has a default geometry.
        }

        console.log(JSON.stringify(feature));
    } catch (error) {
        // Nothing to do for now.
    }
});

stream.on('end', function() {
});
