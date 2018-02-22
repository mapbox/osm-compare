'use strict';
const newUser = require('./new_user');
const largeBuilding = require('../lib/large_building');

const newUserLargeBuilding = (newVersion, oldVersion) => {
  if (
    newUser(newVersion, oldVersion) && largeBuilding(newVersion, oldVersion)
  ) {
    return {'result:new_user_large_building': true};
  }
  return false;
};

module.exports = newUserLargeBuilding;
