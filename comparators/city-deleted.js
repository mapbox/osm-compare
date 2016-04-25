'use strict';
function cityDeleted(newVersion, oldVersion, callback) {
  var name = 'cityDeleted';
  // Note: newVersion does not have any tags, so using oldVersion.
  if (newVersion && newVersion.deleted === true && oldVersion.tags && oldVersion.tags.place === 'city') {
    callback(null, { name: name, data: { 'cityDeleted': true }});
  } else {
    callback(null, { name: name, data: { 'cityDeleted': false }});  }
}
module.exports = cityDeleted;
