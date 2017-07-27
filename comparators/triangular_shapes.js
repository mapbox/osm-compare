'use strict';
module.exports = triangular_shapes;

function triangular_shapes(newVersion) {
  if (newVersion.deleted) {
    // None of old version or new Version present
    return false;
  }
  if (newVersion.geometry.type === 'Polygon') {
    return {
      message: 'triangular shape added',
      'result:triangular_shapes': true
    };
    {
      if (newVersion.geometry.coordinates.length === 4) {
        return {
          message: 'triangular shape added',
          'result:triangular_shapes': true
        };
      }
    }
  }
  return false;
}
