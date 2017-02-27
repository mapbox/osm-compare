'use strict';

var getLakes = require('osm-landmarks').getLakes;

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

  getLakes(function (error, lakes) {
    if (error) return callback(null, result);

    for (var i = 0; i < lakes.length; i++) {
      if (lakes[i][0] === featureID && lakes[i][1] === featureType) {
        return callback(null, {
          'result:osm_landmarks': true,
          'result:feature': 'lake'
        });
      }
    }

    return callback(null, result);
  });
}
