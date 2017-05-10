'use strict';

module.exports = invalidTagModification;

function getPrimaryTags(properties) {
  var result = [];
  var primaryTags = [
    'aerialway',
    'aeroway',
    'amenity',
    'barrier',
    'boundary',
    'building',
    'craft',
    'emergency',
    'geological',
    'highway',
    'historic',
    'landuse',
    'leisure',
    'man_made',
    'military',
    'natural',
    'office',
    'places',
    'power',
    'public_transport',
    'railway',
    'route',
    'shop',
    'sport',
    'tourism',
    'waterway'
  ];
  for (var key in properties) {
    if (primaryTags.indexOf(key) !== -1) result.push(key);
  }
  return result;
}

function invalidTagModification(newVersion, oldVersion, callback) {
  if (newVersion.deleted || !oldVersion) return callback(null, false);

  var primaryTags = getPrimaryTags(oldVersion.properties);
  // Check if all primary tags are retained in newVersion.
  for (var i = 0; i < primaryTags.length; i++) {
    if (!(primaryTags[i] in newVersion.properties))
      return callback(null, {'result:invalid_tag_modification': true});
  }

  return callback(null, false);
}
