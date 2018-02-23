'use strict';

const namePattern = /^(int_|loc_|nat_|official_|reg_|short_|sorting_)?name(:.*)?$/;
module.exports = important;
module.exports.hasTranslations = hasTranslations;
module.exports.hasWikiTags = hasWikiTags;
module.exports.hasPlaceMetadata = hasPlaceMetadata;

function hasWikiTags(tags) {
  return tags && (tags.wikipedia || tags.wikidata);
}

function hasTranslations(tags) {
  const translations = Object.keys(tags).map((key) => namePattern.test(key)).filter((k) => !!k).length;
  return translations > 1;
}

function hasAddr(tags) {
  const addrs = Object.keys(tags).map((key) => /^addr/.test(key)).filter((k) => !!k).length;
  return addrs > 0;
}

function hasRefs(tags) {
  const refs = Object.keys(tags).map((key) => /^ref/.test(key)).filter((k) => !!k).length;
  return refs > 0;
}

function hasContact(tags) {
  return tags.website || tags.phone || tags['contact:phone'] || tags['contact:website'];
}

function hasPlaceMetadata(tags) {
  return tags.population || tags.ele || tags.postal_code || tags.is_in;
}

function hasImportantTags(tags) {
  return hasAddr(tags) || hasContact(tags) || hasRefs(tags) || hasTranslations(tags) || hasWikiTags(tags) || hasPlaceMetadata(tags);
}

function important(newVersion, oldVersion) {
  if (hasImportantTags(newVersion.properties)) {
    return true;
  } else if (oldVersion && hasImportantTags(oldVersion.properties)) {
    return true;
  }
  return false;
}
