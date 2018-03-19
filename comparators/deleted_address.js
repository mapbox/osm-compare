'use strict';

module.exports = deletedAddress;

function deletedAddress(newVersion, oldVersion) {
  if (
    oldVersion &&
    oldVersion.properties &&
    (oldVersion.properties['addr:housenumber'] ||
      oldVersion.properties['addr:housename'])
  ) {
    if (newVersion.deleted || !newVersion.properties) {
      return {'result:deleted_address': true};
    }
    if (
      !('addr:housenumber' in newVersion.properties) &&
      !('addr:housename' in newVersion.properties)
    ) {
      return {'result:deleted_address': true};
    }
    if (
      oldVersion.properties['addr:street'] &&
      !('addr:street' in newVersion.properties)
    ) {
      return {'result:deleted_address': true};
    }
  }
  return false;
}
