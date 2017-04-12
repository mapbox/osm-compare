'use strict';

var commonTags = require('../data/common-tags-from-taginfo');

module.exports = uncommon_tags;

/**
* Check for infrequent key and value by comparing against frequent data from TagInfo.
* @param {object} newVersion New version of feature in OSM.
* @param {object} oldVersion Old version of feature in OSM.
* @param {object} callback Called with (error, result).
* @returns {undefined} Calls callback.
*/
function uncommon_tags(newVersion, oldVersion, callback) {
  var cfVersion = 2;

  if (!newVersion || !newVersion.properties) {
    return callback(null, {});
  }

  var uncommonCount = 0;
  var uncommonTags = {};
  for (var key in newVersion.properties) {
    if (newVersion.properties.hasOwnProperty(key)) {
      // Check if key is part of commonTags.
      if (
        key in commonTags &&
        commonTags[key].indexOf(newVersion.properties[key]) === -1
      ) {
        uncommonCount += 1;
        // Add the key, value to uncommonTags.
        if (key in uncommonTags) {
          uncommonTags[key].push(newVersion.properties[key]);
        } else {
          uncommonTags[key] = [newVersion.properties[key]];
        }
      }
    }
  }
  var result = {
    'result:uncommon_tags': {
      cfVersion: cfVersion,
      uncommonCount: uncommonCount,
      uncommonTags: uncommonTags
    }
  };
  callback(null, result);
}
