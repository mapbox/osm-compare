'use strict';

module.exports = dirty_word;

/**
* Identify potentially "dirty" words in any of the name tags.
* @param {object} newVersion Features new version in GeoJSON.
* @param {object} oldVersion Features old version in GeoJSON.
* @param {Function} callback called with (error, result).
* @returns {undefined} calls callback.
*/
function dirty_word(newVersion, oldVersion, callback) {

  var cfVersion = 2;

  if (!newVersion || !newVersion.properties) {
    return callback(null, {});
  }
  var dirtyWords = ['shit', 'fuck', 'gangbang', 'gang-bang', 'pokemon', 'pokémon'];
  var count = 0;
  var keys = Object.keys(newVersion.properties);
  keys.forEach(function(key) {
    if (key.indexOf('name') !== -1) {
      var name = newVersion.properties[key];
      name.split(' ').forEach(function(word) {
        if (dirtyWords.indexOf(word.toLowerCase()) !== -1) {
          count++;
        }
      });
    }
  });
  callback(null, {
    'result:dirty_word': {
      'cfVersion': cfVersion,
      'count': count
    }
  });
}
