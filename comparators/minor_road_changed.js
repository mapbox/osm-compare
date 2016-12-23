'use strict';


var MINOR_ROAD_TYPES = [
  'pedestrian',
  'footway',
  'cycleway',
  'track',
  'path'
];

function getHighwayType(feature) {
  return feature.properties.highway;
}

function isMinorRoad(feature) {
  var highwayType = getHighwayType(feature);
  return MINOR_ROAD_TYPES.indexOf(highwayType) !== -1;
}

function minorRoadChanged(newVersion, oldVersion, callback) {
  var result = {};
  result['result:minor_road_changed'] = {};

  if (!oldVersion && !newVersion) {
    return callback(null, {});
  }

  if (oldVersion && !newVersion) {
    // Don't care about minor road deletions.
    return callback(null, {});
  }

  if (!oldVersion && newVersion) {
    if (isMinorRoad(newVersion)) {
      result['result:minor_road_changed'].added = true;

      return callback(null, result);
    }
  }

  if (oldVersion && newVersion) {
    var newHighwayType = getHighwayType(newVersion);
    var oldHighwayType = getHighwayType(oldVersion);

    if (isMinorRoad(oldVersion) || isMinorRoad(newVersion)) {
      if (oldHighwayType !== newHighwayType) {
        result['result:minor_road_changed'].modified = true;
        result['result:minor_road_changed'].from = oldHighwayType;
        result['result:minor_road_changed'].to = newHighwayType;

        return callback(null, result);
      }
    }
  }

  return callback(null, {});
}

module.exports = minorRoadChanged;
