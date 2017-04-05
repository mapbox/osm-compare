'use strict';

module.exports = invalidName;

function invalidName(newVersion, oldVersion, callback) {

  // Not interested if there isn't a newVersion.
  if (!newVersion) return callback(null, {});


  var properties = newVersion.properties;
  for (var key in properties) {
    if (key === 'name') {
      var naughtyWords = require('naughty-words/en.json');
      if (naughtyWords.indexOf(properties[key]) !== -1) return callback(null, {'result:invalid_name': true});
    }
  }
  return callback(null, {});
}
