'use strict';
module.exports = invalidHighwayTags;

function invalidHighwayTags(newVersion, oldVersion, callback) {
  var result = {};
  var validHighwayTags = [
    'yes',
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
    'track',
    'bus_guideway',
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
    'turning_circle'
  ];
  if (newVersion && newVersion.properties && newVersion.properties['highway'] && validHighwayTags.indexOf(newVersion.properties.highway) === -1) {
    result['result.invalidHighwayTags'] = true;
  }
  callback(null, result);
}

