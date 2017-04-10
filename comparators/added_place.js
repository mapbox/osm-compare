'use strict';

module.exports = addedPlace;

function addedPlace(newVersion, oldVersion) {
  var result = {'result:added_place': false};
  if (!newVersion) {
    return result;
  }
  if (oldVersion) {
    if ('place' in newVersion.properties && !('place' in oldVersion.properties)) {
      if (newVersion.properties['place'] === 'city' ||
            newVersion.properties['place'] === 'town' ||
            newVersion.properties['place'] === 'country') {
        return {'result:added_place': true};
      }
    }
  } else if ('place' in newVersion.properties &&
        (newVersion.properties['place'] === 'city' ||
         newVersion.properties['place'] === 'town' ||
         newVersion.properties['place'] === 'country')) {
    return {'result:added_place': true};
  }
  return result;
}
