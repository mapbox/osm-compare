'use strict';
const namePattern = /^(int_|loc_|nat_|official_|reg_|short_|sorting_)?name(:.*)?$/;
module.exports = wellMaintained;
module.exports.hasTranslations = hasTranslations;
module.exports.hasWikiTags = hasWikiTags;
module.exports.hasPlaceMetadata = hasPlaceMetadata;

function hasWikiTags(tags) {
  return tags && (tags.wikipedia || tags.wikidata);
}

function hasTranslations(tags) {
  const translations = Object.keys(tags)
    .map(key => namePattern.test(key))
    .filter(k => !!k).length;
  return translations > 1;
}

function hasAddr(tags) {
  const addrs = Object.keys(tags)
    .map(key => /^addr/.test(key))
    .filter(k => !!k).length;
  return addrs > 0;
}

function hasRefs(tags) {
  const refs = Object.keys(tags)
    .map(key => /^ref/.test(key))
    .filter(k => !!k).length;
  return refs > 0;
}

function hasContact(tags) {
  return tags.website ||
    tags.phone ||
    tags['contact:phone'] ||
    tags['contact:website'];
}

function hasPlaceMetadata(tags) {
  return tags.population || tags.ele || tags.postal_code || tags.is_in;
}

function hasMetadataTags(tags) {
  return hasAddr(tags) ||
    hasContact(tags) ||
    hasRefs(tags) ||
    hasTranslations(tags) ||
    hasWikiTags(tags) ||
    hasPlaceMetadata(tags);
}

function wellMaintained(newVersion, oldVersion) {
  if (hasMetadataTags(newVersion.properties)) {
    return true;
  } else if (oldVersion && hasMetadataTags(oldVersion.properties)) {
    return true;
  }
  return false;
}
