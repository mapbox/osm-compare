'use strict';

module.exports = cityDeleted;

function cityDeleted(newVersion, oldVersion, callback) {

  if (!newVersion || !oldVersion) {
    return callback(null, {});
  }

  var name = 'cityDeleted';
  // Note: newVersion does not have any tags, so using oldVersion.
  if (newVersion.deleted === true && oldVersion.tags && oldVersion.tags.place === 'city') {
    callback(null, {
      name: name,
      data: {
        'cityDeleted': true
      }
    });
  } else {
    callback(null, {
      name: name,
      data: {
        'cityDeleted': false
      }
    });
  }
}
