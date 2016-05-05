'use strict';

var frequentKeyValues = require('../data/frequent-key-value-from-taginfo');

module.exports = infrequent_key_value;

/**
* Check for infrequent key and value by comparing against frequent data from TagInfo.
* @param {object} newVersion New version of feature in OSM.
* @param {object} oldVersion Old version of feature in OSM.
* @param {object} callback Called with (error, result).
* @returns {undefined} Calls callback.
*/
function infrequent_key_value(newVersion, oldVersion, callback) {
  if (!newVersion || !newVersion.properties) {
    return callback(null, {});
  }

  var infrequentCount = 0;
  var infrequentKeyValue = {};
  for (var key in newVersion.properties) {
    if (newVersion.properties.hasOwnProperty(key)) {
      // Check if key is part of frequentKeyValues.
      if (key in frequentKeyValues && frequentKeyValues[key].indexOf(newVersion.properties[key]) === -1) {
        infrequentCount += 1;
        // Add the key, value to infrequentKeyValue.
        if (key in infrequentKeyValue) {
          infrequentKeyValue[key].push(newVersion.properties[key]);
        } else {
          infrequentKeyValue[key] = [newVersion.properties[key]];
        }
      }
    }
  }
  var result = {
    'result:infrequent_key_value': {
      'infrequentCount': infrequentCount,
      'infrequentKeyValue': infrequentKeyValue
    }
  };
  callback(null, result);
}
