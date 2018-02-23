'use strict';
const ruler = require('cheap-ruler');

module.exports = straightSegment;

function straightSegment(newVersion, oldVersion) {
  if (newVersion.deleted || !newVersion.geometry) return false;

  const geom = newVersion.geometry;
  if (geom.type === 'Point') return false;

  if (newVersion.properties['hires'] || newVersion.properties['hires:imagery'])
    return false;
  if (newVersion.properties['route'] === 'ferry') return false;
  if (
    newVersion.properties['natural'] === 'coastline' ||
    newVersion.properties['natural'] === 'reserve'
  )
    return false;
  if (
    newVersion.properties['boundary'] === 'administrative' ||
    newVersion.properties['boundary'] === 'historic' ||
    newVersion.properties['boundary'] === 'maritime'
  )
    return false;
  if (newVersion.properties['power']) return false;

  const threshold = newVersion.properties.boundary ? 400e3 : 50e3;

  function checkSegments(coords) {
    const measure = ruler(coords[0][1], 'meters');
    for (let i = 1; i < coords.length; i++) {
      const segment = [coords[i], coords[i - 1]];
      const distance = measure.lineDistance(segment, 'meters');
      if (distance > threshold) {
        return true;
      }
    }
    return false;
  }

  if (geom.type === 'Polygon') {
    const rings = geom.coordinates;
    const incidents = rings
      .map(ring => checkSegments(ring))
      .filter(incident => !!incident);
    if (incidents.length) return {'result:straight_segment': true};
  }

  if (geom.type === 'MultiPolygon') {
    const incidents = [].concat
      .apply(
        [],
        geom.coordinates.map(polygon =>
          polygon.map(ring => checkSegments(ring)))
      )
      .filter(incident => !!incident);
    if (incidents.length) return {'result:straight_segment': true};
  }

  if (geom.type === 'LineString') {
    const incident = checkSegments(geom.coordinates);
    if (incident) return {'result:straight_segment': true};
  }

  return false;
}
