'use strict';

var argv = require('minimist')(process.argv.slice(2));
var queue = require('d3-queue').queue;
var request = require('request');
var csv = require('csv');
var fs = require('fs');
(function() {
  if (!argv.output) {
    console.log('');
    console.log('USAGE: node primary-map-features.js OPTIONS');
    console.log('');
    console.log('  OPTIONS');
    console.log('    --output counts.csv');
    console.log('');
    return;
  }

  // From: https://wiki.openstreetmap.org/wiki/Map_Features
  var features = [
    'aerialway',
    'aeroway',
    'amenity',
    'barrier',
    'boundary',
    'building',
    'craft',
    'emergency',
    'geological',
    'highway',
    'historic',
    'landuse',
    'leisure',
    'man_made',
    'military',
    'natural',
    'office',
    'places',
    'power',
    'public_transport',
    'railway',
    'route',
    'shop',
    'sport',
    'tourism',
    'waterway'
  ];

  function readURL(url, callback) {
    console.log(url);
    request(url, function(error, response, body) {
      if (error) callback(error);

      var counts = [];
      if (!error && response.statusCode === 200) {
        var combinations = JSON.parse(body).data;

        for (var i = 0; i < features.length; i++) {
          // Initialize counts to zero.
          counts[i] = 0;

          for (var j = 0; j < combinations.length; j++) {
            if (combinations[j]['other_key'] === features[i]) {
              counts[i] = 100.0 * combinations[j]['to_fraction'];
            }
          }
        }

        callback(null, counts);
      }
    });
  }

  var q = queue(1);

  for (var i = 0; i < features.length; i++) {
    var url = 'https://taginfo.openstreetmap.org/api/4/key/combinations?key=';
    var featureURL = encodeURI(url + features[i]);

    q.defer(readURL, featureURL);
  }

  q.awaitAll(function(error, results) {
    if (error) console.log(error);

    results = [features].concat(results);
    csv.stringify(results, function(error, resultsAsString) {
      fs.writeFileSync(argv.output, resultsAsString);
    });
  });
})();

/*

Vertical headers of 26 primary features for csv file.

aerialway
aeroway
amenity
barrier
boundary
building
craft
emergency
geological
highway
historic
landuse
leisure
man_made
military
natural
office
places
power
public_transport
railway
route
shop
sport
tourism
waterway

*/
