'use strict';
module.exports = disputedBorderTagChanged;

function disputedBorderTagChanged(newVersion, oldVersion) {
  var result = {};

  if (!newVersion && !oldVersion) {
  // None of old version or new Version present
    return {};
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
        result['result:disputed_border_tag_changed'] = true;
      }
    }

  } else { return {}; }

  return result;
}
