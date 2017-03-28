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

function pathRoadChanged(newVersion, oldVersion) {
  var result = {};
  result['result:path_road_changed'] = {};

  if (!oldVersion && !newVersion) {
    return {};
  }

  if (oldVersion && !newVersion) {
    // Don't care about path road deletions.
    return {};
  }

  if (!oldVersion && newVersion) {
    if (isPathRoad(newVersion)) {
      result['result:path_road_changed'].added = true;

      return result;
    }
  }

  if (oldVersion && newVersion) {
    var newHighwayType = getHighwayType(newVersion);
    var oldHighwayType = getHighwayType(oldVersion);

    if (isPathRoad(oldVersion) || isPathRoad(newVersion)) {
      if (oldHighwayType !== newHighwayType) {
        result['result:path_road_changed'].modified = true;
        result['result:path_road_changed'].from = oldHighwayType;
        result['result:path_road_changed'].to = newHighwayType;

        return result;
      }
    }
  }

  return {};
}

module.exports = pathRoadChanged;
