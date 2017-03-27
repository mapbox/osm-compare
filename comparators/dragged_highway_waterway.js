'use strict';

module.exports = draggedHighwayWaterway;
var Geopoint = require('geopoint');
var threshold = 10;
function draggedHighwayWaterway(newVersion, oldVersion) {
  var result = {};

  if (!newVersion) {
    return result;
  }

  if (newVersion.properties &&
    (newVersion.properties.hasOwnProperty('highway') ||
    newVersion.properties.hasOwnProperty('waterway')) &&
    newVersion.properties['osm:type'] === 'way' &&
    newVersion.geometry &&
    newVersion.geometry.hasOwnProperty('coordinates') &&
    newVersion.geometry.coordinates.length > 1) {
    for (var i = 0; i < newVersion.geometry.coordinates.length - 1; i++) {
      var point1 = new Geopoint(newVersion.geometry.coordinates[i][1], newVersion.geometry.coordinates[i][0]);
      var point2 = new Geopoint(newVersion.geometry.coordinates[i + 1][1], newVersion.geometry.coordinates[i + 1][0]);
      var distance = point1.distanceTo(point2, true);
      if (distance > threshold) {
        result['result:draggedHighwayWaterway'] = true;
      }
    }
  }
  return result;
}
