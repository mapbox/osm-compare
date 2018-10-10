'use strict';

module.exports = addedPlace;

function addedPlace(newVersion, oldVersion) {
  if (newVersion.deleted) {
    return false;
  }
  if (oldVersion) {
    if ('ref' in newVersion.properties && !('ref' in oldVersion.properties)) {
      return {'result:added_ref_tag': true};
    }
  }
  return false;
}
