'use strict';
// Goal: Catch unusually large geometry changes or movements.
// Note: False positives expected when large geometries are split or joined.
var turfDistance = require('turf-distance');
var turfArea = require('turf-area');
var turfEnvelope = require('turf-envelope');
var turfCentroid = require('turf-centroid');

module.exports = compare_geometries;

function getFeatureSize(feature) {
  if (!feature || !feature.geometry) {
    return 0;
  }
  var bbox = turfEnvelope(feature);
  var area = turfArea(bbox);
  return area;
}

/**
* To flag unusually large geometry changes or movements.
*/
function compare_geometries(newVersion, oldVersion, callback) {

  if (!newVersion || !oldVersion) {
    return callback(null, {});
  }

  // Note: When a feature is deleted, it does not have a geometry.
  var newArea = getFeatureSize(newVersion);
  var oldArea = getFeatureSize(oldVersion);
  var areaDelta = newArea - oldArea;

  var centroidDisplacement = 0;
  if (newVersion && oldVersion && newVersion.geometry && oldVersion.geometry) {
    var newCentroid = turfCentroid(newVersion);
    var oldCentroid = turfCentroid(oldVersion);
    centroidDisplacement = turfDistance(newCentroid, oldCentroid, 'kilometers') * 1000;
  }
  var version = newVersion.properties ? newVersion.properties['osm:version'] : newVersion.version;
  var geometryTransformation = version;
  if (areaDelta) { geometryTransformation = geometryTransformation * areaDelta; }
  if (centroidDisplacement) { geometryTransformation = geometryTransformation * centroidDisplacement; }

  callback(null, {
    'result:compare_geometries': {
      'areaDelta': areaDelta,
      'centroidDisplacement': centroidDisplacement,
      'geometryTransformation': geometryTransformation
    }
  });
}
