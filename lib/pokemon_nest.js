'use strict';
const findChangedTag = require('./changed_tag');

module.exports = pokemonNest;

const pokemonValues = new Set([
  'recreation_ground',
  'park',
  'pitch',
  'playground',
  'golf_course',
  'meadow',
  'grass',
  'cemetery',
  'grass',
  'forest',
  'farmland',
  'cliff',
  'bare_rock',
  'residential'
]);

const pokemonTags = ['leisure', 'landuse', 'natural'];

function hasPokemonTags(newVersion, oldVersion) {
  const changedInfo = findChangedTag(newVersion, oldVersion, pokemonTags);
  if (changedInfo.changed && pokemonValues.has(changedInfo.final)) {
    return changedInfo;
  }
  return false;
}

function pokemonNest(newVersion, oldVersion) {
  const suspiciousTag = hasPokemonTags(newVersion, oldVersion);
  if (suspiciousTag) {
    return true;
  }
  return false;
}
