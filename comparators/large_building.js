'use strict';

var turfArea = require('turf-area');
module.exports = largeBuilding;

function largeBuilding(newVersion, oldVersion) {
  if (newVersion.deleted || !newVersion.geometry) {
    return false;
  }

  if (newVersion.properties.hasOwnProperty('building')) {
    const area = turfArea(newVersion);
    if (newVersion.geometry.type !== 'MultiPolygon' && area > 500000) {
      return {'result:large_building': true};
    }
    if (area > 2000000) {
      return {'result:large_building': true};
    }
    return false;
  }

  return false;
}
