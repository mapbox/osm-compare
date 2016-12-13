'use strict';
var turfDistance = require('turf-distance');
var turfCentroid = require('turf-centroid');

/**
* Identify the distance the feature was moved.
* @param {object} newVersion Features new version in GeoJSON.
* @param {object} oldVersion Features old version in GeoJSON.
* @param {Function} callback called with (error, result).
* @returns {undefined} calls callback with {'result:location_changed': <distance>}
* where distance represents the distance the feature was moved, in km.
*/

function compare_geometry(newVersion, oldVersion, callback) {
  if (!newVersion || !('geometry' in newVersion) || !oldVersion || !('geometry' in oldVersion)) {
    callback(null, {});
  } else {

    var distance = turfDistance(
      turfCentroid(newVersion),
      turfCentroid(oldVersion),
      'kilometers');

    if (distance > 0.001) {
      callback(null, {
        'result:location_changed': distance
      });
    } else {
      callback(null, {});
    }
  }
}

module.exports = compare_geometry;
