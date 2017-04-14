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
  if (!oldVersion && newVersion.deleted) {
    return false;
  }

  if (oldVersion && newVersion.deleted) {
    // Don't care about path road deletions.
    return false;
  }

  if (!oldVersion && !newVersion.deleted) {
    if (isPathRoad(newVersion)) {
      return {
        'result:path_road_changed': {
          'added': true
        }
      };
    }
  }

  if (oldVersion && !newVersion.deleted) {
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

  return false;
}

module.exports = pathRoadChanged;
