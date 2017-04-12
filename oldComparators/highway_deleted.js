'use strict';
// To flag deleted highway's.

/**
* Identify deletion of a highway.
* @param {object} newVersion Features new version in GeoJSON.
* @param {object} oldVersion Features old version in GeoJSON.
* @param {Function} callback called with (error, result).
* @returns {undefined} calls callback.
*/
function highway_deleted(newVersion, oldVersion, callback) {
  if (!newVersion || !oldVersion) {
    return callback(null, {});
  }

  var highwayTypesToFlag = [
    'motorway',
    'trunk',
    'primary',
    'secondary',
    'tertiary'
  ];
  if (
    newVersion &&
    oldVersion &&
    newVersion.deleted &&
    oldVersion.properties &&
    oldVersion.properties.highway &&
    highwayTypesToFlag.indexOf(oldVersion.properties.highway) !== -1
  ) {
    callback(null, {
      'result:highway_deleted': true
    });
  } else {
    callback(null, {});
  }
}
module.exports = highway_deleted;
