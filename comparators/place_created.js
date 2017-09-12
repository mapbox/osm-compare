'use strict';
const importantPlace = require('./important_place');

module.exports = createPlace;

/**
 * Detects whether a feature was or is a park
  @param {geojson} newVersion - New version of feature
  @param {geojson} oldVersion - Previous version of feature
  @returns {object|false} returns the detected incident or false
 */
function createPlace(newVersion, oldVersion) {
  const isNew = newVersion.properties['osm:version'] === 1 || !oldVersion;
  const isImportant = importantPlace(newVersion, oldVersion);

  if (isNew && isImportant) {
    return {
      message: `Important place=${newVersion.properties.place} created`
    };
  }
  return false;
}
