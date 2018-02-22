'use strict';

const findChangedTag = (newVersion, oldVersion, tags) => {
  const regex = new RegExp(`^${tags.join('|')}$`);
  if (!newVersion || !oldVersion) return false;

  let key, initial, final;
  const changed = (() => {
    for (const tag in oldVersion.properties) {
      if (!regex.test(tag)) continue;
      if (newVersion.properties[tag] === oldVersion.properties[tag]) continue;
      key = tag;
      initial = oldVersion.properties[tag];
      final = newVersion.properties[tag];
      return true;
    }

    for (const tag in newVersion.properties) {
      if (!regex.test(tag)) continue;
      if (newVersion.properties[tag] === oldVersion.properties[tag]) continue;
      key = tag;
      initial = oldVersion.properties[tag];
      final = newVersion.properties[tag];
      return true;
    }

    return false;
  })();

  return {changed, key, initial, final};
};

module.exports = findChangedTag;
