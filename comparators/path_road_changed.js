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
  var result = false;

  if (!oldVersion && !newVersion) {
    return result;
  }

  if (oldVersion && !newVersion) {
    // Don't care about path road deletions.
    return result;
  }

  if (!oldVersion && newVersion) {
    if (isPathRoad(newVersion)) {
      return {
        'result:path_road_changed': {
          'added': true
        }
      };
    }
  }

  if (oldVersion && newVersion) {
    var newHighwayType = getHighwayType(newVersion);
    var oldHighwayType = getHighwayType(oldVersion);

    if (isPathRoad(oldVersion) || isPathRoad(newVersion)) {
      if (oldHighwayType !== newHighwayType) {
        return {
          'result:path_road_changed': {
            'modified': true,
            'from': oldHighwayType,
            'to': newHighwayType
          }
        };
      }
    }
  }

  return result;
}

module.exports = pathRoadChanged;
