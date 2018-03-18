'use strict';
const newUser = require('./new_user');
const version = require('../lib/version');
const park = require('../lib/park');

module.exports = newUserWater;

const isPark = (newVersion, oldVersion) => park(newVersion, oldVersion);
const isNewVersion = (newVersion, oldVersion) => version(newVersion, oldVersion, {minVersion: 0, maxVersion: 1});
const isNewUser = (newVersion, oldVersion) => newUser(newVersion, oldVersion, {maxChangesets: 10});

function newUserWater(newVersion, oldVersion) {
  if (!newVersion || !newVersion.properties) {
    return false;
  }

  if (isPark(newVersion, oldVersion) && isNewVersion(newVersion, oldVersion) && isNewUser(newVersion, oldVersion)) {
    return {'result:new_user_park': true};
  }

  return false;
}
