'use strict';
module.exports = deprecated_construction_proposal_tag;

function deprecated_construction_proposal_tag(newVersion, oldVersion) {
  if (newVersion) {
    if (
      newVersion.properties &&
      newVersion.properties.highway &&
      newVersion.properties.construction &&
      newVersion.properties.construction === 'yes'
    ) {
      return {
        'result:deprecated_construction_proposal_tag': true
      };
    }
  }
  return false;
}
