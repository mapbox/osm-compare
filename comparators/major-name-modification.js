'use strict';

var Levenshtein = require('levenshtein');

module.exports = majorNameModification;

function majorNameModification(newVersion, oldVersion, callback) {

  if (!newVersion || !newVersion.properties || !newVersion.properties.name) return callback(null, {});
  if (!oldVersion || !oldVersion.properties || !oldVersion.properties.name) return callback(null, {});

  var distance = new Levenshtein(newVersion.properties.name, oldVersion.properties.name);
  var length = oldVersion.properties.name.length;
  var modification = 100.0 * distance / length;

  // If modification is greater than 50%, it is a major name modification.
  if (modification >= 50) {
    return callback(null, {
      'result:major_name_modification': true,
      'result:levenshtein_distance': distance.distance,
      'result:escalate': true
    });
  }

  return callback(null, {});
}
