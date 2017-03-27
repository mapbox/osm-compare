'use strict';

module.exports = addedPlace;

function addedPlace(newVersion, oldVersion) {
  if (!newVersion) {
    return {};
  }
  if (oldVersion) {
    if ('place' in newVersion.properties && !('place' in oldVersion.properties)) {
      if (newVersion.properties['place'] === 'city' ||
            newVersion.properties['place'] === 'town' ||
            newVersion.properties['place'] === 'country') {
        return {'result:addedPlace': true};
      }
    }
  } else if ('place' in newVersion.properties &&
        (newVersion.properties['place'] === 'city' ||
         newVersion.properties['place'] === 'town' ||
         newVersion.properties['place'] === 'country')) {
    return {'result:addedPlace': true};
  }
  return {};
}
