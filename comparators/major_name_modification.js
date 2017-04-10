'use strict';

var Levenshtein = require('levenshtein');

module.exports = majorNameModification;

function majorNameModification(newVersion, oldVersion) {
  var result = {'result:major_name_modification': false};

  if (!newVersion || !newVersion.properties || !newVersion.properties.name || (!(newVersion.properties.wikidata ||  newVersion.properties.wikipedia))) return result;
  if (!oldVersion || !oldVersion.properties || !oldVersion.properties.name) return result;

  // If the name tag was not modified
  if (oldVersion.properties.name === newVersion.properties.name) return result;

  var distance = new Levenshtein(newVersion.properties.name, oldVersion.properties.name).distance;
  var length = oldVersion.properties.name.length;
  var modification = 100.0 * distance / length;

  // If modification is greater than 50%, it is a major name modification.
  process.stderr.write('# version ' + newVersion.properties['osm:version']);
  if (modification >= 50 && newVersion.properties['osm:version'] > 10) {
    return {
      'result:major_name_modification': true,
      'result:levenshtein_distance': distance
    };
  }

  return result;
}
