'use strict';

var turfArea = require('turf-area');
module.exports = largeBuilding;

function largeBuilding(newVersion, oldVersion, callback) {
  var result = {};
  if (!newVersion) {
    return callback(null, result);
  }
  var area = turfArea(newVersion);

  if (area > 5000000 && newVersion.properties.hasOwnProperty('building')) {
    result['result:large-building'] = area;
  }
  return callback(null, result);
}
