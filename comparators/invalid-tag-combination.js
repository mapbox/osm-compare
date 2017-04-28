'use strict';
/* This where all the combination of wrong tags go.
Each array inside array in one combination and there would no cross-array verification
*/
var invalidTagCombinations = [
  [
    'highway', 'leisure'
  ],
  [
    'amenity', 'highway'
  ],
  [
    'highway', 'tourism'
  ],
  [
    'tourism', 'landuse'
  ],
  [
    'highway', 'building'
  ],
  [
    'highway', 'natural'
  ],
  [
    'highway', 'waterway'
  ],
  [
    'place', 'shop'
  ]
];



module.exports = invalidTagsCombined;

function invalidTagsCombined(newVersion, oldVersion, callback) {
  var result = {};
  result['result:invalid-tag-combination'] = {};

  /* Ignore all deleted feature versions */
  if (!newVersion) {
    return callback(null, {});
  }


  var newProps = newVersion.properties;

  /* Loop over each array inside the main array */
  var foundCombination;

  for (var i = 0; i < invalidTagCombinations.length; i++) {
    var combination = invalidTagCombinations[i];

    var hasAllTags = combination.reduce(function(acc, tag) {
      return acc && (tag in newProps);
    }, true);

    if (hasAllTags) {
      foundCombination = combination;
      break;
    }
  }

  if (foundCombination) {
    result['result:invalid-tag-combination'].combination = foundCombination;
    return callback(null, result);
  }

  return callback(null, {});
}
