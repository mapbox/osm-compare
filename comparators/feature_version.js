'use strict';

module.exports = feature_version;

/**
* Identify version of the feature.
* @param {object} newVersion New version of a feature in GeoJSON.
* @param {object} oldVersion Old version of a feature in GeoJSON.
* @param {function} callback Called with (error, result).
* @returns {undefined} calls callback.
*/
function feature_version(newVersion, oldVersion, callback) {
  var version = -1;
  var result = {};
  if (newVersion) {
    version = newVersion.properties ? newVersion.properties['osm:version'] : newVersion['version'];
    result = {'result:feature_version': version};
    return callback(null, result);
  } else if (oldVersion) {
    version = oldVersion.properties ? oldVersion.properties['osm:version'] : oldVersion['version'];
    result = {'result:feature_version': version};
    return callback(null, result);
  } else {
    return callback(null, {});
  }
}
