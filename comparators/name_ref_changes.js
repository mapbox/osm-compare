'use strict';

var MAJOR_ROAD_TYPES = ['motorway', 'trunk', 'motorway_link', 'trunk_link'];

function getHighwayType(feature) {
  return feature.properties.highway;
}

function isMajorRoad(feature) {
  var highwayType = getHighwayType(feature);
  return MAJOR_ROAD_TYPES.indexOf(highwayType) !== -1;
}

function nameRefChanged(newVersion, oldVersion) {
  if (!oldVersion || newVersion.deleted) {
    return false;
  }

  if (isMajorRoad(oldVersion)) {
    if (
      oldVersion.properties.name !== newVersion.properties.name ||
      oldVersion.properties.ref !== newVersion.properties.ref
    ) {
      return {
        'result:name_ref_changes': true
      };
    }
  }
  return false;
}

module.exports = nameRefChanged;
