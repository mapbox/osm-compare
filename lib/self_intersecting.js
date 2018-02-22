'use strict';
const lineintersect = require('@turf/line-intersect');

function selfIntersectingWays(newVersion) {
  if (
    newVersion &&
    newVersion.geometry &&
    newVersion.geometry.type === 'LineString'
  ) {
    const coords = newVersion.geometry.coordinates;
    const intersecting = lineintersect(newVersion, newVersion);
    if (
      intersecting.features.length > coords.length - 2 &&
      (coords[0][0] !== coords[coords.length - 1][0] &&
        coords[0][1] !== coords[coords.length - 1][1])
    ) {
      return true;
    } else {
      return false;
    }
  }
  return false;
}

module.exports = selfIntersectingWays;
