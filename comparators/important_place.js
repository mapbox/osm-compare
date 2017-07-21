'use strict';
const welltagged = require('../lib/welltagged');
module.exports = importantPlace;
module.exports.checkPlaceType = checkPlaceType;

function importantPlace(newVersion, oldVersion) {
  const newType = checkPlaceType(newVersion);
  const oldType = checkPlaceType(oldVersion);
  return oldType || newType;
}

function checkPlaceType(feature) {
  if (!feature) return false;
  if (feature && feature.geometry && feature.geometry.type !== 'Point') {
    return false;
  }
  const tags = feature.properties;
  if (tags && tags.place) {
    if (tags.place === 'city') return 'city';
    if (tags.place === 'town' && welltagged.hasWikiTags(tags)) {
      return 'town';
    }
  }
  return false;
}
