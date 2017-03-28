'use strict';

var fs = require('fs');

module.exports = commonTagValues;

var primaryTags = ['highway'];

function commonTagValues(newVersion, oldVersion, callback) {
  var result = {};

  if (!newVersion || !newVersion.properties)
    return callback(null, result);

  for (var i = primaryTags.length - 1; i >= 0; i--) {
    var tag = primaryTags[i];

    if (tag in newVersion.properties) {
      var data = fs.readFileSync('common_tag_values/' + tag + '.json');
      var commonValues = JSON.parse(data.toString()).data;
      var value = newVersion.properties[tag];
      for (var j = commonValues.length - 1; j >= 0; j--) {
        if (commonValues[j]['value'] === value && commonValues[j]['count'] > 10000) {
          result['result:common_tag_values'] = true;
        }
      }
    }
  }

  return callback(null, result);
}
