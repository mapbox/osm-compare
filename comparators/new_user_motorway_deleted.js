'use strict';
const newUser = require('./new_user');

function isMotorway(newVersion, oldVersion) {
  if (!oldVersion) {
    return false;
  }
  if (newVersion.properties && newVersion.properties.highway) {
    if (
      newVersion.properties.highway === 'motorway' ||
      newVersion.properties.highway === 'trunk' ||
      newVersion.properties.highway === 'motorway_link' ||
      newVersion.properties.highway === 'trunk_link'
    ) {
      return true;
    }
  }
  return false;
}
function isDeleted(newVersion) {
  if (newVersion.deleted) {
    return true;
  }
  return false;
}
const isANewUser = (newVersion, oldVersion) =>
  newUser(newVersion, oldVersion, {maxChangesets: 200});
const newUserMotorwayDeleted = (newVersion, oldVersion) => {
  if (
    isANewUser(newVersion, oldVersion) &&
    isMotorway(newVersion, oldVersion) &&
    isDeleted(newVersion)
  ) {
    return {'result:new_user_motorway_deleted': true};
  }
  return false;
};

module.exports = newUserMotorwayDeleted;
