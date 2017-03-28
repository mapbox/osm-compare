'use strict';
module.exports = disputedBorderDeleted;

function disputedBorderDeleted(newVersion, oldVersion) {
  var result = {};

  if (!newVersion && !oldVersion) {
  // None of old version or new Version present
    return {};
  }
  if (!newVersion && oldVersion) {
  // Only old Version is present, which indicates feature has been deleted
  /*
    Comparing the tags
    Creating a result object
  */
    if (oldVersion.properties && oldVersion.properties['disputed']) {
      result['result:disputed_border_deleted'] = true;
    }
  } else { return {}; }

  return result;
}
