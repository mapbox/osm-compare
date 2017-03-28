'use strict';

module.exports = addedWebsite;

function addedWebsite(newVersion, oldVersion, callback) {
  if (oldVersion && oldVersion.properties && newVersion && newVersion.properties && oldVersion.properties.website === newVersion.properties.website) {
    callback(null, {});
  } else if (newVersion && newVersion.properties && 'website' in newVersion.properties) {
    callback(null, {'result:added_website': true});
  } else if (oldVersion && oldVersion.properties && ('website' in oldVersion.properties) && newVersion && newVersion.properties && !('website' in newVersion.properties)) {
    callback(null, {'result:added_website': true});
  } else {
    callback(null, {});
  }
}
