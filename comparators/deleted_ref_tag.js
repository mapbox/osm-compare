'use strict';

module.exports = addedPlace;

function addedPlace(newVersion, oldVersion) {
  if (newVersion.deleted || !oldVersion) {
    return false;
  }
  if (oldVersion) {
    if (
      'ref' in oldVersion.properties &&
      !('ref' in newVersion.properties) &&
      ('highway' in newVersion.properties ||
        ('route' in newVersion.properties &&
          newVersion.properties.route === 'road'))
    ) {
      return {'result:deleted_ref_tag': true};
    }
  }
  return false;
}
