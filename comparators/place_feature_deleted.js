'use strict';
const importantPlace = require('../lib/important_place').importantPlace;

module.exports = placeFeatureDeleted;

function placeFeatureDeleted(newVersion, oldVersion) {
  const isDeleted = !!newVersion.deleted;
  const isImportant = importantPlace(newVersion, oldVersion);

  if (isDeleted && isImportant) {
    return {'result:place_feature_deleted': true};
  }
  return false;
}
