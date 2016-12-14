'use strict';

module.exports = addedWebsite;

function addedWebsite(newVersion, oldVersion, callback) {
  if (newVersion && newVersion.properties && 'website' in newVersion.properties) {
    callback(null, {'result:added-website': true});
  } else {
    callback(null, {});
  }
}
