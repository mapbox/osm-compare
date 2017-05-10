'use strict';

module.exports = invalidTagModification;


function getPrimaryTags(properties) {
  var result = [];
  var primaryTags = [
    'aerialway', 'aeroway', 'amenity', 'barrier', 'boundary', 'building', 'craft', 'emergency',
    'geological', 'highway', 'historic', 'landuse', 'leisure', 'man_made', 'military', 'natural',
    'office', 'places', 'power', 'public_transport', 'railway', 'route', 'shop', 'sport',
    'tourism', 'waterway'
  ];
  for (var key in properties) {
    if (primaryTags.indexOf(key) !== -1) result.push(key);
  }
  return result;
}


function invalidTagModification(newVersion, oldVersion, callback) {
  if (newVersion.deleted || !oldVersion) return callback(null, false);

  // If all properties of feature are removed, assume feature is being moved into a relation.
  if (Object.keys(newVersion.properties).length === 0) return callback(null, {});

  var primaryTags = getPrimaryTags(oldVersion.properties);
  for (var i = 0; i < primaryTags.length; i++) {
    // Check if all primary tags are retained in newVersion.
    // If not retained, check if there were two primary tags to start with.
    if (!(primaryTags[i] in newVersion.properties) && (primaryTags.length < 2)) return callback(null, {'result:invalid_tag_modification': true});
  }

  return callback(null, false);
}
