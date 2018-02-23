'use strict';
const naughtyWords = require('../forked/naughty-words');
const priorityLanguages = require('../config/priority_languages.json');
const isNameKey = require('../lib/names').isNameKey;

function profanity(newVersion, oldVersion) {
  if (newVersion.deleted) return false;
  const oldTags = (oldVersion && oldVersion.properties) || {};
  const tags = newVersion.properties;

  if (!tags) return false;
  for (const tag in tags) {
    if (!isNameKey(tag)) continue;

    // Only consider name tags that have changed from their previous value
    if (tags[tag] === oldTags[tag]) continue;

    const val = tags[tag];
    // Replace punctuation with whitespace
    // http://stackoverflow.com/a/25575009
    const normalized = val.replace(
      /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-.\/:;<=>?@\[\]^_`{|}~]/ig,
      ' '
    );
    const splitTag = tag.split(':');
    const lang = (splitTag[splitTag.length - 1] || '').split('_')[0];
    // If there is a language code, check against the matching language,
    // Otherwise check priority languages
    const languagesToCheck = naughtyWords[lang] ? [lang] : priorityLanguages;
    const incidents = languagesToCheck.map(lang => {
      for (let i = 0; i < naughtyWords[lang].length; i++) {
        const word = naughtyWords[lang][i];
        const regex = new RegExp('(\\s|^)' + word + '(\\s|$)', 'gi');
        if (regex.test(normalized)) {
          const msg = `Profanity for language:${lang}, found ${word} in ${tag}=${val}`;
          return {
            message: 'name tag has profanity',
            'result:profanity': true
          };
        }
      }
      return false;
    });
  }
}
