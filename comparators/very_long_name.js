'use strict';

module.exports = veryLongName;

function veryLongName(newVersion, oldVersion) {
  if (
    !newVersion.deleted &&
    newVersion.properties &&
    newVersion.properties.hasOwnProperty('name') &&
    newVersion.properties['name'].length > 80
  ) {
    if (
      newVersion.properties.hasOwnProperty('type') &&
      newVersion.properties.hasOwnProperty('osm:type') &&
      newVersion.properties['type'] === 'route' &&
      newVersion.properties['osm:type'] === 'relation' &&
      newVersion.properties['name'].length < 121
    ) {
      return false;
    } else {
      return {'result:very_long_name': true};
    }
  } else {
    return false;
  }
}
