'use strict';

module.exports = modifiedMonument;

function modifiedMonument(newVersion, oldVersion) {
  var result = {};
  if (newVersion && newVersion.properties.hasOwnProperty('historic') && newVersion.properties.historic === 'monument' && newVersion.properties['osm:version'] > 10) {
    result['result:modified-monument'] = true;
  }

  if (oldVersion && !newVersion && oldVersion.properties.hasOwnProperty('historic') && oldVersion.properties.historic === 'monument' && oldVersion.properties['osm:version'] > 10) {
    result['result:modified-monument'] = true;
  }
  return result;
}
