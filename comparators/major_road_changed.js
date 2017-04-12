'use strict';

var TRIGGER_AFTER_VERSION = 10;

var MAJOR_ROAD_TYPES = [
  'motorway',
  'trunk',
  'primary',
  'secondary',
  'tertiary',
  'motorway_link',
  'trunk_link',
  'primary_link',
  'secondary_link',
  'tertiary_link'
];

function getHighwayType(feature) {
  return feature.properties.highway;
}

function getVersion(feature) {
  return feature.properties['osm:version'];
}

function isMajorRoad(feature) {
  var highwayType = getHighwayType(feature);
  return MAJOR_ROAD_TYPES.indexOf(highwayType) !== -1;
}

function majorRoadChanged(newVersion, oldVersion) {
  if (!oldVersion && !newVersion) {
    return false;
  }

  if (!oldVersion && newVersion) {
    return false;
  }

  var oldVersionNumber = getVersion(oldVersion);
  var oldHighwayType = getHighwayType(oldVersion);

  if (oldVersion && newVersion) {
    var newVersionNumber = getVersion(newVersion);
    var newHighwayType = getHighwayType(newVersion);

    if (oldVersionNumber > TRIGGER_AFTER_VERSION && isMajorRoad(oldVersion)) {
      if (oldHighwayType !== newHighwayType) {
        return {
          'result:major_road_changed': {
            modified: true,
            from: oldHighwayType,
            to: newHighwayType
          }
        };
      }
    }
  }

  if (oldVersion && !newVersion) {
    if (oldVersionNumber > TRIGGER_AFTER_VERSION && isMajorRoad(oldVersion)) {
      return {
        'result:major_road_changed': {
          deleted: true,
          version: oldVersionNumber
        }
      };
    }
  }

  return false;
}

module.exports = majorRoadChanged;
