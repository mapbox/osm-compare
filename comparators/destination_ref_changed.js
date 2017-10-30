'use strict';

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

function isMajorRoad(feature) {
  var highwayType = getHighwayType(feature);
  return MAJOR_ROAD_TYPES.indexOf(highwayType) !== -1;
}

function hasDestination(feature) {
  return feature.properties.destination;
}

function hasDestinationRef(feature) {
  return feature.properties['destination:ref'];
}

function destinationRefChanged(newVersion, oldVersion) {
  if (!oldVersion || newVersion.deleted) {
    return false;
  }

  if (isMajorRoad(oldVersion)) {
    if (
      oldVersion.properties.destination !== newVersion.properties.destination ||
      oldVersion.properties['destination:ref'] !==
        newVersion.properties['destination:ref']
    ) {
      return {
        'result:destination_ref_changed': true
      };
    }
  }
  return false;
}
module.exports = destinationRefChanged;
