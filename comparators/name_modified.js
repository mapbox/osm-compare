'use strict';

var isEmpty = require('lodash.isempty');

var compareJSON = function(obj1, obj2) {
  var ret = {};
  for (var i in obj2) {
    if (!obj1.hasOwnProperty(i) || obj2[i] !== obj1[i]) {
      ret[i] = obj2[i];
    }
  }
  return ret;
};

/**
* Checks for existence of name tag and if it is modified between old and new version, it callbacks with the result.
* @param {object} newVersion Features new version in GeoJSON.
* @param {object} oldVersion Features old version in GeoJSON.
* @param {Function} callback called with (error, result).
* @returns {undefined} calls callback.
*/
function name_modified(newVersion, oldVersion) {
  var result = {};
  var cfVersion = 2;

  if (newVersion.deleted || !oldVersion) {
    return result;
  }
  var newVersionNames = {};
  var oldVersionNames = {};

  if (newVersion.properties) {
    var props = newVersion.properties;
    for (var prop in props) {
      if (prop.indexOf('name') === 0) {
        newVersionNames[prop] = props[prop];
      }
    }
  }

  if (oldVersion.properties) {
    props = oldVersion.properties;
    for (prop in props) {
      if (prop.indexOf('name') === 0) {
        oldVersionNames[prop] = props[prop];
      }
    }
  }

  var arr = {};
  arr = compareJSON(oldVersionNames, newVersionNames);

  result['result:name_modified'] = {};

  for (var obj in arr) {
    result['result:name_modified'][obj] = 1;
  }

  arr = compareJSON(newVersionNames, oldVersionNames);

  for (obj in arr) {
    result['result:name_modified'][obj] = 1;
  }
  if (isEmpty(result['result:name_modified'])) {
    result = false;
  }
  return result;
}

module.exports = name_modified;
