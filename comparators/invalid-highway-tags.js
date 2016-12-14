'use strict';
module.exports = invalidHighwayTags;

function invalidHighwayTags(newVersion, oldVersion, callback) {
  var result = {};
  if (newVersion && newVersion.properties && newVersion.properties['highway']) {
    if (newVersion.properties.highway !== 'yes') {
      result['result.invalidHighwayTags'] = true;
    }
  }
  callback(null, result);
}
