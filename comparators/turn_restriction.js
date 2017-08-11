'use strict';

module.exports = turnRestriction;

/**
* Checks for existence of name tag and if it is modified between old and new version, it callbacks with the result.
* @param {object} newVersion Features new version in GeoJSON.
* @param {object} oldVersion Features old version in GeoJSON.
* @returns {bool} Boolean indicating a turn restriction.
*/
function turnRestriction(newVersion, oldVersion) {
  if (
    (newVersion &&
      newVersion.properties &&
      newVersion.properties.hasOwnProperty('restriction')) ||
    (oldVersion &&
      oldVersion.properties &&
      oldVersion.properties.hasOwnProperty('restriction'))
  ) {
    return {
      'result:turn_restriction': true
    };
  }
  return false;
}
