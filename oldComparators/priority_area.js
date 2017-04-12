'use strict';

var fs = require('fs');
var path = require('path');
var turfWithin = require('turf-within');
var turfCentroid = require('turf-centroid');
var turfFC = require('turf-featurecollection');

module.exports = priority_area;

/**
* Returns a flag if a feature is located in a priority area
* @param {object} newVersion Features new version in GeoJSON.
* @param {object} oldVersion Features old version in GeoJSON.
* @param {Function} callback called with (error, result).
* @returns {undefined} calls callback.
*/
function priority_area(newVersion, oldVersion, callback) {
  var cfVersion = 1;

  // Exit if the feature has been deleted
  if (!newVersion || !newVersion.geometry) return callback(null, {});

  // Load the areas
  var priority_area_file = path.join(
    __dirname,
    '../data/priority_areas.geojson'
  );
  var priority_areas = JSON.parse(fs.readFileSync(priority_area_file, 'utf-8'));

  var result = Boolean(
    turfWithin(
      turfFC([turfCentroid(newVersion)]),
      priority_areas
    ).features.length
  );
  // console.log('Result', result); // DEBUG

  return callback(null, {
    'result:priority_area': {
      cfVersion: cfVersion,
      priority_area: result
    }
  });
}
