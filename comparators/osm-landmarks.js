'use strict';

var getLakes = require('osm-landmarks').getLakes;

module.exports = osmLandmarks;

function osmLandmarks(newVersion, oldVersion, callback) {
  var result = {'result:osm-landmark': false};
  var featureID = String(newVersion.properties['osm:id']);
  var featureType = String(newVersion.properties['osm:type']);

  getLakes(function (error, lakes) {
    if (error) return callback(null, result);

    for (var i = 0; i < lakes.length; i++) {
      if (lakes[i][0] === featureID && lakes[i][1] === featureType) {
        return callback(null, {'result:osm-landmark': true});
      }
    }

    return callback(null, result);
  });
}
