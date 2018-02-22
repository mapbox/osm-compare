'use strict';

module.exports = impossibleAngle;

function findAngle(A, B, C) {
  const pi = 3.14159265;
  const AB = Math.sqrt(Math.pow(B[0] - A[0], 2) + Math.pow(B[1] - A[1], 2));
  const BC = Math.sqrt(Math.pow(B[0] - C[0], 2) + Math.pow(B[1] - C[1], 2));
  const AC = Math.sqrt(Math.pow(C[0] - A[0], 2) + Math.pow(C[1] - A[1], 2));
  return Math.acos((BC * BC + AB * AB - AC * AC) / (2 * BC * AB)) * (180 / pi);
}

function impossibleAngle(newVersion) {
  const valueAngle = 30;
  if (!newVersion.deleted && newVersion.geometry.type === 'LineString') {
    const coords = newVersion.geometry.coordinates;
    for (let j = 0; j < coords.length - 2; j++) {
      const angle = findAngle(coords[j], coords[j + 1], coords[j + 2]);
      if (angle < valueAngle) {
        return true;
      }
    }
    return false;
  } else {
    return false;
  }
}
