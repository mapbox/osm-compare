'use strict';

module.exports = veryLongName;

function veryLongName(newVersion, oldVersion) {
  if (
    !newVersion.deleted &&
    newVersion.properties &&
    newVersion.properties.hasOwnProperty('name') &&
    newVersion.properties['name'].length > 80
  ) {
    return {'result:very_long_name': true};
  } else {
    return false;
  }
}
