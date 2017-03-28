'use strict';

module.exports = invalidTagModification;


function getPrimaryTag(properties) {
  var primaryTags = [
    'aerialway', 'aeroway', 'amenity', 'barrier', 'boundary', 'building', 'craft', 'emergency',
    'geological', 'highway', 'historic', 'landuse', 'leisure', 'man_made', 'military', 'natural',
    'office', 'places', 'power', 'public_transport', 'railway', 'route', 'shop', 'sport',
    'tourism', 'waterway'
  ];
  for (var key in properties) {
    if (primaryTags.indexOf(key) !== -1) return key;
  }
}


function invalidTagModification(newVersion, oldVersion, callback) {
  var result = {};
  if (!newVersion || !oldVersion) return callback(null, result);

  var newPrimaryTag = getPrimaryTag(newVersion.properties);
  var oldPrimaryTag = getPrimaryTag(oldVersion.properties);

  if (newPrimaryTag !==  oldPrimaryTag) return callback(null, {'result:invalid_tag_modification': true});

  return callback(null, {});
}
