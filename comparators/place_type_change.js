'use strict';
const checkPlaceType = require('../lib/important_place').checkPlaceType;

function placeTypeChange(newVersion, oldVersion) {
  if (
    !oldVersion || !oldVersion.properties || !oldVersion || !oldVersion.geometry
  ) {
    return false;
  }
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
