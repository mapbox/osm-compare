'use strict';

module.exports = addedWebsite;

function addedWebsite(newVersion, oldVersion) {
  if (
    oldVersion &&
    oldVersion.properties &&
    !newVersion.deleted &&
    newVersion.properties &&
    oldVersion.properties.website === newVersion.properties.website
  ) {
    return false;
  } else if (
    !newVersion.deleted &&
    newVersion.properties &&
    'website' in newVersion.properties
  ) {
    return {'result:added_website': true};
  } else if (
    oldVersion &&
    oldVersion.properties &&
    'website' in oldVersion.properties &&
    !newVersion.deleted &&
    newVersion.properties &&
    !('website' in newVersion.properties)
  ) {
    return {'result:added_website': true};
  } else {
    return false;
  }
}
