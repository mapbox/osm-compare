'use strict';
module.exports = significant_feature;

function contains_addr(properties) {
  var keys = Object.keys(properties);
  for (var i = 0; i < keys.length; i++) {
    if (keys[i].indexOf('addr') != -1) {
      return true;
    }
  }
  return false;
}

function significant_feature(newVersion, oldVersion) {
  if (newVersion.deleted && !oldVersion) {
    // None of old version or new Version present
    return false;
  }
  if (
    newVersion.properties.highway &&
    (newVersion.properties.phone ||
      newVersion.properties.website ||
      contains_addr(newVersion.properties))
  ) {
    return {
      message: 'Invalid  tags on highway',
      'result:invalidtag_on_highway': true
    };
  }
  return false;
}
