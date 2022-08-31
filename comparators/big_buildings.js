'use strict';
// Goal: Catch big buildings which are modificated greater than ten times.
var turfArea = require('turf-area');
var turfFC = require('turf-featurecollection');

module.exports = big_buildings;

/**
 * Identify big buildings.
 * @param {object} newVersion Features new version in GeoJSON.
 * @param {object} oldVersion Features old version in GeoJSON.
 * @param {Function} callback called with (error, result).
 * @returns {undefined} calls callback.
 */
function big_buildings(newVersion, oldVersion, callback) {

  if (!newVersion || !oldVersion) {
    return callback(null, {});
  }
  // Note: newVersion does not have any tags, so using oldVersion.
  var oldArea = oldVersion ? turfArea(turfFC([oldVersion])) : null;
  var newArea = turfArea(turfFC([newVersion]));
  var maxBig = 10000; //square meters
  var flag = false;
  if (oldArea && ((newArea / oldArea > 10) || (newArea >= maxBig))) {
    flag = true;
  }
  callback(null, {
    'result:big_buildings': flag
  });
}
