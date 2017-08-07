'use strict';

var turfArea = require('turf-area');
module.exports = largeBuilding;

function largeBuilding(newVersion, oldVersion) {
  if (
    newVersion.deleted ||
    !newVersion.hasOwnProperty('geometry') ||
    newVersion['geometry'] === null
  ) {
    return false;
  }
  var area = turfArea(newVersion);

  if (area > 500000 && newVersion.properties.hasOwnProperty('building')) {
    return {'result:large_building': area};
  }
  return false;
}
