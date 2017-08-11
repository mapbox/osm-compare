'use strict';
module.exports = significant_features;

function significant_features(newVersion, oldVersion) {
  if (newVersion.deleted && !oldVersion) {
    // None of old version or new Version present
    return false;
  }
  if (newVersion && oldVersion) {
    // Both new Version and old Version are present, which indicates feature has been modified
    /*
      Comparing the tags
      return false;
     */
  } else if (newVersion && !oldVersion) {
    // Only new Version is present, which indicates feature has been added
    /*
      Comparing the tags
      return false;
     */
  } else if (newVersion.deleted && oldVersion) {
    // Only old Version is present, which indicates feature has been deleted
    /*
      Comparing the tags
      returning result
     */
    if (oldVersion.properties && oldVersion.properties['osm:version']) {
      if (oldVersion.properties['osm:version'] > 25) {
        return {'result:significant_feature': true};
      }
    }
  }

  return false;
}
