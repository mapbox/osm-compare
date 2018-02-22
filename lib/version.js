'use strict';

module.exports = version;

function version(newVersion, oldVersion, opts) {
  opts = Object.assign(
    {
      minVersion: 0,
      maxVersion: 1
    },
    opts
  );
  if (opts.maxVersion === 'Infinity') opts.maxVersion = Infinity;

  const currentVersion = newVersion.properties['osm:version'];
  if (currentVersion >= opts.minVersion && currentVersion <= opts.maxVersion) {
    return true;
  }
  return false;
}
