'use strict';

var interestedFeatures = require('../data/low-zoom-features');

module.exports = low_zoom_features;

/**
* Check if feature is an identified low zoom feature.
* @param {object} newVersion New version of feature in OSM.
* @param {object} oldVersion Old version of feature in OSM.
* @param {object} callback Called with (error, result).
* @returns {undefined} Calls callback.
*/
function low_zoom_features(newVersion, oldVersion, callback) {

  if (!newVersion || !newVersion.properties) {
    return callback(null, {});
  }

  var lowZoomCount = 0;
  var lowZoomFeatures = {};
  for (var key in newVersion.properties) {
    if (newVersion.properties.hasOwnProperty(key)) {
      // Check if key is part of interestedFeatures.
      if (key in interestedFeatures && interestedFeatures[key].indexOf(newVersion.properties[key]) !== -1) {
        lowZoomCount += 1;
        // Add the key, value to lowZoomFeatures.
        if (key in lowZoomFeatures) {
          lowZoomFeatures[key].push(newVersion.properties[key]);
        } else {
          lowZoomFeatures[key] = [newVersion.properties[key]];
        }
      }
    }
  }
  var result = {
    'result:low_zoom_features': {
      'lowZoomCount': lowZoomCount,
      'lowZoomFeatures': lowZoomFeatures
    }
  };
  callback(null, result);
}
