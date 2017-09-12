'use strict';
const importantPlace = require('./important_place');

module.exports = deletePlace;

/**
 * Detects whether a feature was or is a park
  @param {geojson} newVersion - New version of feature
  @param {geojson} oldVersion - Previous version of feature
  @returns {object|false} returns the detected incident or false
 */
function deletePlace(newVersion, oldVersion) {
  const isDeleted = !!newVersion.deleted;
  const isImportant = importantPlace(newVersion, oldVersion);

  if (isDeleted && isImportant) {
    return {
      message: `Important place=${newVersion.properties.place} deleted`
    };
  }
  return false;
}
