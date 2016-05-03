'use strict';

function delete_create(newVersion, oldVersion, callback) {
  var result = {};
  if (newVersion && 'properties' in newVersion && newVersion.properties['osm:action'] === 'delete') {
    result['result:deleted_feature'] = true;
  }

  if (oldVersion && 'properties' in oldVersion && oldVersion.properties['osm:action'] === 'delete') {
    result['result:previously_deleted_feature'] = true;
  }

  if (newVersion && 'properties' in newVersion && newVersion['properties']['osm:version'] === 1) {
    result['result:new_feature'] = true;
  }

  callback(null, result);
}

module.exports = delete_create;
