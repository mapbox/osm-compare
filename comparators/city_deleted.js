'use strict';

module.exports = city_deleted;

function city_deleted(newVersion, oldVersion, callback) {

  if (!newVersion || !oldVersion) {
    return callback(null, {});
  }

  // Note: newVersion does not have any tags, so using oldVersion.
  if (newVersion.deleted === true && oldVersion.tags && oldVersion.tags.place === 'city') {
    callback(null, {
      'result:city_deleted': true
    });
  } else {
    callback(null, {});
  }
}
