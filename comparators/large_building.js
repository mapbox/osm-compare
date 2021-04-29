'use strict';
const turfArea = require('turf-area');
const impossibleAngle = require('../lib/impossible_angle');

module.exports = largeBuilding;

/*
  Buildings with very large areas or large areas and weird angles.
  @param {geojson} newVersion
  @param {null} oldVersion
  @returns {object|false) returns the detected incident or false
*/
function largeBuilding(newVersion, oldVersion) {
  if (newVersion.deleted || !newVersion.geometry) return false;
  if (!newVersion.properties.hasOwnProperty('building')) return false;
  const area = Math.round(turfArea(newVersion));
  const hasImpossibleAngle = impossibleAngle(newVersion, oldVersion, {
    maxAngle: 50
  });
  if (area > 500000 && hasImpossibleAngle) {
    return {'result:large_building': true};
  }

  if (area > 2000000) {
    return {'result:large_building': true};
  }
  return false;
}
