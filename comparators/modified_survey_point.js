'use strict';

module.exports = modifiedSurveyPoint;

function modifiedSurveyPoint(newVersion, oldVersion) {
  if (
    !newVersion.deleted &&
    newVersion.properties['osm:version'] !== 1 &&
    newVersion.properties.hasOwnProperty('man_made') &&
    newVersion.properties.man_made === 'survey_point' &&
    oldVersion.properties.hasOwnProperty('man_made') &&
    oldVersion.properties.man_made === 'survey_point'
  ) {
    if (
      newVersion.geometry.coordinates[0] !==
        oldVersion.geometry.coordinates[0] ||
      newVersion.geometry.coordinates[1] !== oldVersion.geometry.coordinates[1]
    ) {
      return {'result:modified_survey_point': true};
    }
  }

  if (
    oldVersion &&
    newVersion.deleted &&
    oldVersion.properties.hasOwnProperty('man_made') &&
    oldVersion.properties.man_made === 'survey_point'
  ) {
    return {'result:modified_survey_point': true};
  }
  return false;
}
