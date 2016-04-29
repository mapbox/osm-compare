'use strict';
/**
 * Calls back with `{'result:significant_tag': true}` if the object edited has a significant tag.
 */
function compare_tag(newVersion, oldVersion, callback) {
  var significant_tags = ['name', 'place', 'name:en', 'name:fr', 'name:es', 'name:de', 'highway'];
  if (!(oldVersion && newVersion && oldVersion.properties && newVersion.properties)) {
    return callback(null, {});
  } else if (significant_tags.some(function(tag) {
    return (newVersion.properties[tag] !== oldVersion.properties[tag]);
  })) {
    callback(null, {
      'result:significant_tag': true
    });
  } else {
    callback(null, {});
  }
}

module.exports = compare_tag;
