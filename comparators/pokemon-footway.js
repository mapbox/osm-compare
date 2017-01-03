'use strict';

module.exports = pokemonFootway;

function pokemonFootway(newVersion, oldVersion, callback) {
  try {
    if (newVersion.properties.highway === 'footway' && newVersion.properties['osm:version'] === 1) {
      return callback(null, {
        'result:pokemonFootway': true,
        'result:escalate': true
      });
    }
  } catch (error) {
    console.log(String(error));
  }

  return callback(null, {});
}
