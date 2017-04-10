'use strict';

var turfArea = require('turf-area');
module.exports = largeBuilding;

function largeBuilding(newVersion, oldVersion) {
  var result = {'result:large_building': false};
  if (!newVersion || !newVersion.hasOwnProperty('geometry') || newVersion['geometry'] === null) {
    return result;
  }
  var area = turfArea(newVersion);

  if (area > 5000 && newVersion.properties.hasOwnProperty('building')) {
    result = {'result:large_building': area};
  }
  return result;
}
