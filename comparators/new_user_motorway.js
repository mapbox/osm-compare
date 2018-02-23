'use strict';
const newUser = require('./new_user');

function isMotorway(newVersion) {
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
function isAdded(newVersion) {
  if (newVersion.properties['osm:version'] === 1) {
    return true;
  }
  return false;
}
const isANewUser = (newVersion, oldVersion) =>
  newUser(newVersion, oldVersion, {maxChangesets: 100});
const motorwayNewUser = (newVersion, oldVersion) => {
  if (
    isANewUser(newVersion, oldVersion) &&
    isMotorway(newVersion) &&
    isAdded(newVersion)
  ) {
    return {'result:new_user_motorway': true};
  }
  return false;
};
module.exports = motorwayNewUser;
