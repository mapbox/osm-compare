'use strict';
module.exports = newUser;

function ensureFeatureAugmented(ft) {
  if (
    !('osm:user:mapping_days' in ft.properties) &&
    !('osm:user:changesetcount' in ft.properties)
  ) {
    throw new Error(
      `Feature ${ft.id} is not augmented with required user information`
    );
  }
}

function newUser(newVersion, oldVersion, opts) {
  if (!newVersion || !newVersion.properties) {
    return false;
  }
  ensureFeatureAugmented(newVersion);
  opts = Object.assign(
    {
      maxChangesets: 5,
      maxMappingdays: 5
    },
    opts
  );

  const changesetCount = newVersion.properties['osm:user:changesetcount'];
  const mappingdaysCount = newVersion.properties['osm:user:mapping_days'];
  const user = newVersion.properties['osm:user'];
  if (changesetCount && changesetCount <= opts.maxChangesets) {
    return {'result:new_user': true};
  }

  if (mappingdaysCount && mappingdaysCount <= opts.maxMappingdays) {
    return {'result:new_user': true};
  }

  return false;
}
