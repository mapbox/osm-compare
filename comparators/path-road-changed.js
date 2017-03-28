'use strict';


var PATH_ROAD_TYPES = [
  'pedestrian',
  'footway',
  'cycleway',
  'path'
];

function getHighwayType(feature) {
  return feature.properties.highway;
}

function isPathRoad(feature) {
  var highwayType = getHighwayType(feature);
  return PATH_ROAD_TYPES.indexOf(highwayType) !== -1;
}

function pathRoadChanged(newVersion, oldVersion, callback) {
  var result = {};
  result['result:path-road-changed'] = {};

  if (!oldVersion && !newVersion) {
    return callback(null, {});
  }

  if (oldVersion && !newVersion) {
    // Don't care about path road deletions.
    return callback(null, {});
  }

  if (!oldVersion && newVersion) {
    if (isPathRoad(newVersion)) {
      result['result:path-road-changed'].added = true;

      return callback(null, result);
    }
  }

  if (oldVersion && newVersion) {
    var newHighwayType = getHighwayType(newVersion);
    var oldHighwayType = getHighwayType(oldVersion);

    if (isPathRoad(oldVersion) || isPathRoad(newVersion)) {
      if (oldHighwayType !== newHighwayType) {
        result['result:path-road-changed'].modified = true;
        result['result:path-road-changed'].from = oldHighwayType;
        result['result:path-road-changed'].to = newHighwayType;

        return callback(null, result);
      }
    }
  }

  return callback(null, {});
}

module.exports = pathRoadChanged;
