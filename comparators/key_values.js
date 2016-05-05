'use strict';

var frequentKeyValues = require('../data/key-values-from-taginfo');

module.exports = tag_values;

/**
* Check if keys have not a frequently used value.
* @param {object} newVersion New version of feature in OSM.
* @param {object} oldVersion Old version of feature in OSM.
* @param {object} callback Called with (error, result).
* @returns {undefined} Calls callback.
*/
function tag_values(newVersion, oldVersion, callback) {
  if (!newVersion || !newVersion.properties) {
    return callback(null, {});
  }

  var infrequentTagCount = 0;
  var infrequentTags = {};
  for (var key in newVersion.properties) {
    if (newVersion.properties.hasOwnProperty(key)) {
      // Check if key is part of frequentKeyValues.
      if (key in frequentKeyValues && frequentKeyValues[key].indexOf(newVersion.properties[key]) === -1) {
        infrequentTagCount += 1;
        // Add the key, value to infrequentTags.
        if (key in infrequentTags) {
          infrequentTags[key].push(newVersion.properties[key]);
        } else {
          infrequentTags[key] = [newVersion.properties[key]];
        }
      }
    }
  }
  var result = {
    'result:tag_values': {
      'infrequentTagCount': infrequentTagCount,
      'infrequentTags': infrequentTags
    }
  };
  callback(null, result);
}
