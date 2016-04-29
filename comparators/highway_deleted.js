'use strict';
// To flag deleted highway's.

function highway_deleted(newVersion, oldVersion, callback) {
  var highwayTypesToFlag = ['motorway', 'trunk', 'primary', 'secondary', 'tertiary'];
  if (newVersion && oldVersion && newVersion.deleted && oldVersion.properties && oldVersion.properties.highway && highwayTypesToFlag.indexOf(oldVersion.properties.highway) !== -1) {
    callback(null, {
      'result:highway_deleted': true
    });
  } else {
    callback(null, {});
  }
}
module.exports = highway_deleted;
