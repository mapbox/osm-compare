'use strict';

module.exports = dirty_word;

/**
* Identify deletion of a city.
* @param {object} newVersion Features new version in GeoJSON.
* @param {object} oldVersion Features old version in GeoJSON.
* @param {Function} callback called with (error, result).
* @returns {undefined} calls callback.
*/
function dirty_word(newVersion, oldVersion, callback) {
  if (!newVersion || !newVersion.properties) {
    return callback(null, {});
  }
  var dirtyWords = ['shit', 'dirty', 'fuck'];
  var count = 0;
  if (dirtyWords.indexOf(newVersion.properties.name) !== -1) {
    count = 1;
  }
  callback(null, {
    'result:dirty_word': {
      'count': count
    }
  });
}
