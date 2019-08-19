'use strict';
const isPrioNameKey = require('../lib/names.js').isPrioNameKey;
const diffWords = require('diff').diffWords;
const importantPlace = require('../lib/important_place').importantPlace;

module.exports = placeNameChanged;

function nameChanged(newTags, oldTags) {
  for (const key in oldTags) {
    if (!isPrioNameKey(key)) continue;
    if (newTags[key] === oldTags[key]) continue;

    // allow name tag differences if the only difference is text (in parentheses)
    if (
      diffWords(newTags[key] || '', oldTags[key] || '').filter(change => {
        if (!change.added && !change.removed) return false;
        if (/^\([^)]+\)$/.test(change.value.trim())) return false;
        return true;
      }).length === 0
    )
      continue;
    return {'result:place_name_changed': true};
  }

  const newNameTags = new Set(Object.keys(newTags).filter(isPrioNameKey));
  const oldNameTags = new Set(Object.keys(oldTags).filter(isPrioNameKey));

  const addedNameTags = Array.from(newNameTags.values()).filter(
    n => !oldNameTags.has(n)
  );
  const removedNameTags = Array.from(oldNameTags.values()).filter(
    n => !newNameTags.has(n)
  );

  if (addedNameTags.length > 0) {
    return {'result:place_name_changed': true};
  }
  if (removedNameTags.length > 0) {
    return {'result:place_name_changed': true};
  }
  return false;
}

function placeNameChanged(newVersion, oldVersion) {
  if (newVersion && oldVersion && importantPlace(newVersion, oldVersion)) {
    const change = nameChanged(newVersion.properties, oldVersion.properties);
    if (change) return change;
  }
  return false;
}
