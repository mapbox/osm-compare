'use strict';
const isNameKey = require('../lib/names.js').isNameKey;

const isEmoji = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff])[\ufe0e\ufe0f]?(?:[\u0300-\u036f\ufe20-\ufe23\u20d0-\u20f0]|\ud83c[\udffb-\udfff])?(?:\u200d(?:[^\ud800-\udfff]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff])[\ufe0e\ufe0f]?(?:[\u0300-\u036f\ufe20-\ufe23\u20d0-\u20f0]|\ud83c[\udffb-\udfff])?)*/;

module.exports = emoji;

/*
  Contains an emoji in one of the name tags
  @param {geojson} newVersion
  @returns {object|false) returns the detected incident or false
*/
function emoji(newVersion) {
  if (!newVersion || !newVersion.properties) return false;

  const tags = newVersion.properties;
  for (const tag in tags) {
    if (!isNameKey(tag)) continue;
    const name = tags[tag];
    if (isEmoji.test(name)) {
      return {message: 'Found emoji in ' + tag};
    }
  }
  return false;
}
