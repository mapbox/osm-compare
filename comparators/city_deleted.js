'use strict';
// To flag deleted city.

function city_deleted(newVersion, oldVersion, callback) {
  // Note: newVersion does not have any tags, so using oldVersion.
  if (newVersion.deleted === true && oldVersion.tags && oldVersion.tags.place === 'city') {
    callback(null, {
      'result:city_deleted': true
    });
  } else {
    callback(null, {});
  }
}
module.exports = city_deleted;
