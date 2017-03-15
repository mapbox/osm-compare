'use strict';

var turfArea = require('turf-area');
module.exports = largeBuilding;

function largeBuilding(newVersion, oldVersion, callback) {
  var result = {};
  if (!newVersion || !newVersion.hasOwnProperty('geometry') || newVersion['geometry'] === null) {
    return callback(null, result);
  }
  var area = turfArea(newVersion);

  if (area > 1500 && newVersion.properties.hasOwnProperty('building')) {
    result['result:large-building'] = area;
  }
  return callback(null, result);
}
