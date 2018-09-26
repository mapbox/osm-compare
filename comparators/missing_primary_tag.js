'use strict';

var fs = require('fs');
var join = require('path').join;
const primaryTags = require('../lib/primary_tags').primaryTags;

module.exports = missingPrimaryTag;

function missingPrimaryTag(newVersion, oldVersion) {
  if (newVersion.deleted || !newVersion.properties) return false;

  const feature_tags = Object.keys(newVersion.properties);
  const feature_primary_tags = primaryTags.filter(
    i => feature_tags.filter(t => t === i).length > 0
  );

  if (feature_primary_tags.length > 0) return false;
  return {'result:missing_primary_tag': true};
}
