'use strict';
const newUser = require('./new_user');

module.exports = waterFeatureByNewUser;

function isWaterFeature(feature) {
  var landuse_values = ['pond', 'reservoir', 'salt_pond', 'basin'];

  var properties = feature.properties;

  if (properties.hasOwnProperty('natural') && properties['natural'] === 'water')
    return true;
  if (properties.hasOwnProperty('water')) return true;
  if (
    properties.hasOwnProperty('landuse') &&
    landuse_values.indexOf(properties['landuse']) !== -1
  )
    return true;
  if (
    properties.hasOwnProperty('reservoir_type') &&
    properties['reservoir_type'] === 'water_storage'
  )
    return true;
  if (
    properties.hasOwnProperty('man_made') &&
    properties['man_made'] === 'reservoir_covered'
  )
    return true;
  if (properties.hasOwnProperty('waterway')) return true;

  return false;
}

function waterFeatureByNewUser(newVersion, oldVersion, callback) {
  if (newVersion.deleted || newVersion.properties['osm:version'] !== 1) {
    return false;
  }

  if (isWaterFeature(newVersion) && newUser(newVersion)) {
    return {'result:water_feature_by_new_user': true};
  }
  return false;
}
