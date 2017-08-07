'use strict';

module.exports = turnRestriction;

function turnRestriction(newVersion, oldVersion) {
  if (
    (newVersion && 'restriction' in newVersion.properties) ||
    (oldVersion && 'restriction' in oldVersion.properties)
  ) {
    return true;
  }
  return false;
}
