'use strict';

const namePattern = /^(int_|short_|)?(name|wikidata:labels)(:.*)?$/;
const isNameKey = key => namePattern.test(key);

const priorityLanguages = new Set(require('../config/priority_languages.json'));

function isPrioNameKey(key) {
  if (key === 'name') return true;
  if (!isNameKey(key)) return false;
  const parts = key.split(':');
  if (
    (parts[0] === 'name' ||
      [parts[0], parts[1]].join(':') === 'wikidata:labels') &&
    !priorityLanguages.has(parts[parts.length - 1])
  )
    return false;
  return true;
}

exports.isPrioNameKey = isPrioNameKey;
exports.isNameKey = isNameKey;
