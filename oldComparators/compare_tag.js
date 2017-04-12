'use strict';

module.exports = compare_tag;

/**
* Identify edits to a significant tag.
* @param {object} newVersion Features new version in GeoJSON.
* @param {object} oldVersion Features old version in GeoJSON.
* @param {Function} callback called with (error, result).
* @returns {undefined} calls callback.
*/
function compare_tag(newVersion, oldVersion, callback) {
  if (!newVersion || !oldVersion) {
    return callback(null, {});
  }

  var significant_tags = [
    'name',
    'place',
    'name:en',
    'name:fr',
    'name:es',
    'name:de',
    'highway'
  ];
  if (
    !(oldVersion &&
      newVersion &&
      oldVersion.properties &&
      newVersion.properties)
  ) {
    return callback(null, {});
  } else if (
    significant_tags.some(function(tag) {
      return newVersion.properties[tag] !== oldVersion.properties[tag];
    })
  ) {
    callback(null, {
      'result:significant_tag': true
    });
  } else {
    callback(null, {});
  }
}
