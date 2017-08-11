'use strict';

var lakeIds = [
  3987743,
  4039486,
  2606941,
  1205151,
  1205149,
  1374224,
  555716,
  2791372,
  2631184,
  1834172,
  4039900,
  1159098,
  1206310,
  3367363,
  2195612,
  1754729,
  5872303,
  4618842,
  2709093,
  1308279,
  3000330,
  2194833,
  2791738,
  188230,
  1969016,
  2617981,
  1082659,
  36970,
  1239458,
  3120035,
  1110965,
  108807,
  5869931,
  1269323,
  2795794,
  3119933,
  1206317,
  404236,
  404644,
  1414848,
  1125603
];

module.exports = majorLakeModified;

function majorLakeModified(newVersion, oldVersion) {
  var obj = {};
  if (!newVersion.deleted) {
    obj = newVersion;
  } else if (oldVersion) {
    obj = oldVersion;
  } else {
    return false;
  }
  if (
    !obj.properties || !obj.properties['osm:type'] || !obj.properties['osm:id']
  ) {
    return false;
  }
  var props = obj.properties;
  var osmType = props['osm:type'];
  var osmId = props['osm:id'];
  if (osmType === 'relation' && lakeIds.indexOf(osmId) !== -1) {
    return {
      message: 'Major lake modified',
      'result:major_lake_modified': true
    };
  } else {
    return false;
  }
}
