'use strict';
const newUser = require('./new_user');
const version = require('../lib/version');

module.exports = newUserWater;

function isWaterFeature(feature) {
  const landuse_values = ['pond', 'reservoir', 'salt_pond', 'basin'];
  const props = feature.properties;

  if ('natural' in props && props['natural'] === 'water') return true;
  if ('water' in props) return true;
  if ('landuse' in props && landuse_values.indexOf(props['landuse']) !== -1)
    return true;
  if ('reservoir_type' in props && props['reservoir_type'] === 'water_storage')
    return true;
  if ('man_made' in props && props['man_made'] === 'reservoir_covered')
    return true;
  if ('waterway' in props) return true;

  return false;
}

function newUserWater(newVersion, oldVersion) {
  if (!newVersion || !newVersion.properties) {
    return false;
  }
  const hasWater = isWaterFeature(newVersion);
  const isNewVersion = version(newVersion, oldVersion, {
    minVersion: 0,
    maxVersion: 1
  });
  const isNewUser = newUser(newVersion, oldVersion, {maxChangesets: 10});

  if (hasWater && isNewVersion && isNewUser) {
    return {'result:new_user_water': true};
  }
  return false;
}
