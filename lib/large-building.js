'use strict';

const turfArea = require('@turf/area');
const thresholdAngle = 50;
function findAngle(A, B, C) {
  const pi = 3.14159265;
  const AB = Math.sqrt(Math.pow(B[0] - A[0], 2) + Math.pow(B[1] - A[1], 2));
  const BC = Math.sqrt(Math.pow(B[0] - C[0], 2) + Math.pow(B[1] - C[1], 2));
  const AC = Math.sqrt(Math.pow(C[0] - A[0], 2) + Math.pow(C[1] - A[1], 2));
  return Math.acos((BC * BC + AB * AB - AC * AC) / (2 * BC * AB)) * (180 / pi);
}
function largeBuilding(newVersion) {
  if (
    newVersion.deleted ||
    !newVersion.hasOwnProperty('geometry') ||
    newVersion['geometry'] === null
  ) {
    return false;
  }
  if (newVersion.properties.hasOwnProperty('building')) {
    const area = turfArea(newVersion);
    if (
      newVersion.geometry.type !== 'MultiPolygon' &&
      area > 500000 &&
      checkAngle(newVersion)
    ) {
      return true;
    }
    if (area > 2000000) {
      return true;
    }
    return false;
  }
}
function checkAngle(newVersion) {
  let angle = 0;
  const coords = newVersion.geometry['coordinates'][0];
  if (coords.length > 2) {
    for (let j = 0; j < coords.length - 2; j++) {
      angle = findAngle(coords[j], coords[j + 1], coords[j + 2]);
      if (angle < thresholdAngle) {
        return true;
      }
    }
  }
  return false;
}
module.exports = largeBuilding;
