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

function majorRoadChanged(newVersion, oldVersion, callback) {
  var result = {};
  result['result:major-road-changed'] = {};

  if (!oldVersion && !newVersion) {
    return callback(null, {});
  }

  if (!oldVersion && newVersion) {
    return callback(null, {});
  }

  var oldVersionNumber = getVersion(oldVersion);
  var oldHighwayType = getHighwayType(oldVersion);

  if (oldVersion && newVersion) {
    var newVersionNumber = getVersion(newVersion);
    var newHighwayType = getHighwayType(newVersion);

    if (oldVersionNumber > TRIGGER_AFTER_VERSION && isMajorRoad(oldVersion)) {
      if (oldHighwayType !== newHighwayType) {
        result['result:major-road-changed'].modified = true;
        result['result:major-road-changed'].from = oldHighwayType;
        result['result:major-road-changed'].to = newHighwayType;

        return callback(null, result);
      }
    }
  }

  if (oldVersion && !newVersion) {
    if (oldVersionNumber > TRIGGER_AFTER_VERSION && isMajorRoad(oldVersion)) {
      result['result:major-road-changed'].deleted = true;
      result['result:major-road-changed'].version = oldVersionNumber;

      return callback(null, result);
    }
  }

  return callback(null, {});
}

module.exports = majorRoadChanged;
