'use strict';
module.exports = disputedBorderDeleted;

function disputedBorderDeleted(newVersion, oldVersion) {
  if (newVersion.deleted && !oldVersion) {
    // None of old version or new Version present
    return false;
  }
  if (newVersion.deleted && oldVersion) {
    // Only old Version is present, which indicates feature has been deleted
    /*
    Comparing the tags
    Creating a result object
  */
    if (oldVersion.properties && oldVersion.properties['disputed']) {
      return {
        message: 'Disputed border deleted',
        'result:disputed_border_deleted': true
      };
    }
  }

  return false;
}
