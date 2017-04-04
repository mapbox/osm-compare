'use strict';

module.exports = draggedHighwayWaterway;
var turfPoint = require('turf-point');
var turfDistance = require('turf-distance');

function hasDrag(feature) {

  // Not interesting if there isn't a feature.
  if (!feature) return false;

  // Not interesting if there are not properties and geometries.
  var properties = feature.properties;
  var geometry = feature.geometry;
  if (!properties || !geometry) return false;

  // Not interesting if not a highway or a waterway.
  if (!(properties.hasOwnProperty('highway') || properties.hasOwnProperty('waterway'))) return false;

  // Not interesting if has required geometry.
  if ((properties['osm:type'] !== 'way') || (geometry.coordinates.length <= 1)) return false;

  var threshold = 10;  // In kilometers.
  for (var i = 0; i < geometry.coordinates.length - 1; i++) {
    var point1 = turfPoint(geometry.coordinates[i]);
    var point2 = turfPoint(geometry.coordinates[i + 1]);

    var distance = turfDistance(point1, point2, 'kilometers');
    // The feature has a drag if distance is greater than threshold.
    if (distance > threshold) return true;
  }
}
function draggedHighwayWaterway(newVersion, oldVersion) {
  var result = {};

  var newVersionDragged = hasDrag(newVersion);
  var oldVersionDragged = hasDrag(oldVersion);

  if (newVersionDragged && !oldVersionDragged) result = {'result:dragged_highway_waterway': true};
  return result;
}
