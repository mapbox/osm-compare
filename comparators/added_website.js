'use strict';

module.exports = addedWebsite;

function addedWebsite(newVersion, oldVersion) {
  var result = false;
  if (oldVersion && oldVersion.properties && newVersion && newVersion.properties && oldVersion.properties.website === newVersion.properties.website) {
    return result;
  } else if (newVersion && newVersion.properties && 'website' in newVersion.properties) {
    return {'result:added_website': true};
  } else if (oldVersion && oldVersion.properties && ('website' in oldVersion.properties) && newVersion && newVersion.properties && !('website' in newVersion.properties)) {
    return {'result:added_website': true};
  } else {
    return result;
  }
}
