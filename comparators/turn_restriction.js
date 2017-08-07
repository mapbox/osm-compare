'use strict';

module.exports = turnRestriction;

function turnRestriction(newVersion, oldVersion) {
  console.log('**** Here! ****');
  if (
    (newVersion && 'restriction' in newVersion.properties) ||
    (oldVersion && 'restriction' in oldVersion.properties)
  ) {
    return true;
  }
  return false;
}
