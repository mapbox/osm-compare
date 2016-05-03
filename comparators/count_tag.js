'use strict';

function count_tag(newVersion, oldVersion, callback) {
  if (!(oldVersion && newVersion && oldVersion.properties && newVersion.properties)) {
    return callback(null, {});
  }

  callback(null, {
    'result:count_tag': Object.keys(newVersion.properties).filter(function(k) {
      return (k.substr(0, 4) !== 'osm:' &&
          (!(k in oldVersion.properties) || newVersion.properties[k] !== oldVersion.properties[k]));
    }).length +
    Object.keys(oldVersion.properties).filter(function(k) {
      return (k.substr(0, 4) !== 'osm:' && !(k in newVersion.properties));
    }).length
  });
}

module.exports = count_tag;
