'use strict';

var filtered_tags = ['natural', 'water', 'highway', 'building', 'leisure', 'tourism'];
module.exports = pokemonEdits;

function hasPokename(name) {
  return name.match(/(P|p)ok(é|e)((m|M)on|(S|s)top|(G|g)ym|(G|g)o)/g) ||
    name.match(/(P|p)ok(é|e)/g);
}

function pokemonEdits(newVersion, oldVersion) {
  var result = {};
  result['result:pokemon_edits'] = {};

  if (!newVersion && !oldVersion) {
    // None of old version or new Version present
    return {};
  }
  if (newVersion) {
    var pass = filtered_tags.reduce(function(accum, tag) {
      return (tag in newVersion.properties) || accum;
    }, false);

    if (pass) {
      for (var prop in newVersion.properties) {
        if (prop.indexOf('name') === 0) {
          if (hasPokename(newVersion.properties[prop])) {
            result['result:pokemon_edits'] = true;
            return result;
          }
        }
      }
    }
  }

  return {};
}
