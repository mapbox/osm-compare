'use strict';

var queue = require('d3-queue').queue;
var getLakes = require('osm-landmarks').getLakes;
var getAirports = require('osm-landmarks').getAirports;
var getRestaurants = require('osm-landmarks').getRestaurants;

module.exports = osmLandmarks;

function osmLandmarks(newVersion, oldVersion, callback) {
  var result = {};
  var featureID, featureType;

  if (newVersion && newVersion.properties && ('osm:id' in newVersion.properties) && ('osm:type' in newVersion.properties)) {
    featureID = String(newVersion.properties['osm:id']);
    featureType = newVersion.properties['osm:type'];
  } else if (oldVersion && oldVersion.properties && ('osm:id' in oldVersion.properties) && ('osm:type' in oldVersion.properties)) {
    featureID = String(oldVersion.properties['osm:id']);
    featureType = oldVersion.properties['osm:type'];
  } else {
    return callback(null, result);
  }

  var q = queue(1);

  q.defer(getLakes);
  q.defer(getAirports);
  q.defer(getRestaurants);

  q.awaitAll(function(err, results) {
    if (err)
      console.log(err);

    for (var i = 0; i < results.length; i++) {
      for (var j = 0; j < results[i].length; j++) {
        if (results[i][j][0] === featureID && results[i][j][1] === featureType) {
          return callback(null, {
            'result:osm_landmarks': true
          });
        }
      }
    }

    return callback(null, {});
  });
}
