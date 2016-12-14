'use strict';
module.exports = disputedBorderTagChanged;

function disputedBorderTagChanged(newVersion, oldVersion, callback) {
  var result = {};
  result['result:disputed_border_tag'] = {};

  if (!newVersion && !oldVersion) {
  // None of old version or new Version present
    return callback(null, {});
  }
  if (newVersion && oldVersion) {
  // Both new Version and old Version are present, which indicates feature has been modified
  /*
    Comparing the tags
    Creating a result object like following:
    result['result:comparator_name'][parameter] = value;
  */
    if (oldVersion.properties && oldVersion.properties['disputed']) {
      if (oldVersion.properties['disputed'] !== null) {
        result['result:disputed_border_tag']['modified'] = true;
      }
    }

  } else if (!newVersion && oldVersion) {
  // Only old Version is present, which indicates feature has been deleted
  /*
    Comparing the tags
    Creating a result object
  */
    if (oldVersion.properties && oldVersion.properties['disputed']) {
      result['result:disputed_border_tag']['deleted'] = true;
    }
  } else { return callback(null, { }); }


  callback(null, result);
}
