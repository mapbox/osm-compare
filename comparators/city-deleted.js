'use strict';
function cityDeleted(newVersion, oldVersion, callback) {
    // Note: newVersion does not have any tags, so using oldVersion.
    if (newVersion && newVersion.deleted === true && oldVersion.tags && oldVersion.tags.place === 'city') {
        callback(null, { 'cityDeleted': true });
    } else {
        callback(null, { 'cityDeleted': false });
    }
}
module.exports = cityDeleted;
