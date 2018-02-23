'use strict';
const checkPlaceType = require('../lib/important_place').checkPlaceType;
/**
 * Detects type changes to place tag and removal, addition of the tag
 * For now, only cities and towns* mapped as points are flagged under the comparator
 */
function placeTypeChange(newVersion, oldVersion) {
  const isNew = newVersion.properties['osm:version'] === 1 || !oldVersion;
  const isDeleted = !!newVersion.deleted;
  if (isNew || isDeleted) return false;
  if (oldVersion.properties.place || newVersion.properties.place) {
    const newType = checkPlaceType(newVersion);
    const oldType = checkPlaceType(oldVersion);
    if (newType !== oldType) {
      return {
          'result:place_type_change': true

      };
    }
  }
  return false;
}
module.exports = placeTypeChange;