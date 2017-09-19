'use strict';

module.exports = modifiedSurveyPoint;

function modifiedSurveyPoint(newVersion, oldVersion) {
  if (newVersion.deleted && !oldVersion) {
    // None of old version or new Version present
    return false;
  }

  // checks for changes
  if (
    newVersion &&
    !newVersion.deleted &&
    oldVersion &&
    oldVersion.properties &&
    oldVersion.properties.hasOwnProperty('man_made') &&
    oldVersion.properties.man_made === 'survey_point'
  ) {
    if (
      newVersion.geometry &&
      oldVersion.geometry &&
      (newVersion.geometry.coordinates[0] !==
        oldVersion.geometry.coordinates[0] ||
        newVersion.geometry.coordinates[1] !==
          oldVersion.geometry.coordinates[1])
    ) {
      // survey_point was moved
      return {'result:modified_survey_point': true};
    }
    if (
      newVersion.properties &&
      (!newVersion.properties.hasOwnProperty('man_made') ||
        newVersion.properties.man_made !== 'survey_point')
    ) {
      // survey_point lost its main tag
      return {'result:modified_survey_point': true};
    }
  }

  if (
    oldVersion &&
    newVersion.deleted &&
    oldVersion.properties &&
    oldVersion.properties.hasOwnProperty('man_made') &&
    oldVersion.properties.man_made === 'survey_point'
  ) {
    return {'result:modified_survey_point': true};
  }
  return false;
}
