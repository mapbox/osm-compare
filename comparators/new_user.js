'use strict';
module.exports = newUser;

function newUser(newVersion, oldVersion, opts) {
  if (!newVersion || !newVersion.properties) {
    return false;
  }
  opts = Object.assign({maxChangesets: 50}, opts);

  const changesetCount = newVersion.properties['osm:user:changesetcount'];

  if (changesetCount > 0 && changesetCount <= opts.maxChangesets) {
    return {'result:new_user': true};
  }
  return false;
}
