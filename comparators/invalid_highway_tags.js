'use strict';
module.exports = invalidHighwayTags;

function invalidHighwayTags(newVersion, oldVersion) {
  var validHighwayTags = [
    'motorway',
    'trunk',
    'primary',
    'secondary',
    'tertiary',
    'unclassified',
    'residential',
    'service',
    'motorway_link',
    'trunk_link',
    'primary_link',
    'secondary_link',
    'tertiary_link',
    'living_street',
    'pedestrian',
    'corridor',
    'track',
    'bus_guideway',
    'busway',
    'escape',
    'raceway',
    'road',
    'footway',
    'bridleway',
    'steps',
    'path',
    'cycleway',
    'proposed',
    'construction',
    'rest_area',
    'services',
    'bus_stop',
    'platform',
    'crossing',
    'elevator',
    'emergency_access_point',
    'give_way',
    'mini_roundabout',
    'motorway_junction',
    'passing_place',
    'speed_camera',
    'street_lamp',
    'stop',
    'traffic_signals',
    'milestone',
    'traffic_mirror',
    'turning_circle',
    'turning_loop'
  ];
  if (
    !newVersion.deleted &&
    newVersion.properties &&
    newVersion.properties['highway'] &&
    validHighwayTags.indexOf(newVersion.properties.highway) === -1
  ) {
    if (
      oldVersion &&
      oldVersion.properties &&
      oldVersion.properties['highway'] &&
      oldVersion.properties.highway === newVersion.properties.highway
    ) {
      return false;
    } else {
      return {'result:invalid_highway_tags': true};
    }
  }
  return false;
}
