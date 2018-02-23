'use strict';

module.exports = impossibleAngle;

function findAngle(A, B, C) {
  const pi = 3.14159265;
  const AB = Math.sqrt(Math.pow(B[0] - A[0], 2) + Math.pow(B[1] - A[1], 2));
  const BC = Math.sqrt(Math.pow(B[0] - C[0], 2) + Math.pow(B[1] - C[1], 2));
  const AC = Math.sqrt(Math.pow(C[0] - A[0], 2) + Math.pow(C[1] - A[1], 2));
  return Math.acos((BC * BC + AB * AB - AC * AC) / (2 * BC * AB)) * (180 / pi);
}

/*
  Features having an impossible angle as specified by the options.
  @param {geojson} newVersion
  @param {null} oldVersion
  @param {object} options
  @param {number} [options.maxAngle=30]
  @returns {bool) returns true for detected angles or false
*/
function impossibleAngle(newVersion, oldVersion, options) {
  options = Object.assign(
    {
      maxAngle: 30
    },
    options
  );

  if (newVersion.deleted || !newVersion.geometry) return false;
  let coords = [];
  if (newVersion.geometry.type === 'MultiPolygon') {
    coords = newVersion.geometry.coordinates[0][0];
  } else if (newVersion.geometry.type === 'Polygon') {
    coords = newVersion.geometry.coordinates[0];
  } else if (newVersion.geometry.type === 'LineString') {
    coords = newVersion.geometry.coordinates;
  }

  for (let j = 0; j < coords.length - 2; j++) {
    const angle = findAngle(coords[j], coords[j + 1], coords[j + 2]);
    if (angle < options.maxAngle) {
      return {
        message: `Found impossible angle ${angle}`,
        angle: angle
      };
    }
  }
  return false;
}
