'use strict';

module.exports = park;

const parkValues = new Set([
  'recreation_ground',
  'village_green',
  'park',
  'nature_reserve',
  'protected_area',
  'national_park',
  'garden'
]);

function isPark(tags) {
  return parkValues.has(tags.landuse) || parkValues.has(tags.boundary) || parkValues.has(tags.leisure);
}


function park(newVersion, oldVersion) {
  if (newVersion && isPark(newVersion.properties)) return true;
  if (oldVersion && isPark(oldVersion.properties)) return true;
  return false;
}
