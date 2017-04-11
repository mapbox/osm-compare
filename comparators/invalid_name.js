'use strict';

module.exports = invalidName;

function invalidName(newVersion, oldVersion, callback) {
  // Not interested if there isn't a newVersion.
  if (!newVersion) return callback(null, false);

  var properties = newVersion.properties;
  for (var key in properties) {
    var naughtyWords;

    // TODO: Having English as the default locale for now.
    if (key === 'name') {
      naughtyWords = require('naughty-words/en.json');
      if (naughtyWords.indexOf(properties[key]) !== -1) return callback(null, {'result:invalid_name': true});
    } else if (key.indexOf('name') === 0) {
      // Splitting 'name:ko' into ['name', 'ko']
      var locale = key.split(':')[1];

      // Name of the locale's naughty word file.
      var filename = 'naughty-words/' + locale + '.json';

      try {
        naughtyWords = require(filename);
        if (naughtyWords.indexOf(properties[key]) !== -1) return callback(null, {'result:invalid_name': true});
      } catch (error) {
        // TODO: naughty-words for the locale does not exist. Skip for now.
      }

    }
  }
  return callback(null, false);
}
