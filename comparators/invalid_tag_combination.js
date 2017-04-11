'use strict';

var csv = require('csv');
var fs = require('fs');
var path = require('path');

module.exports = invalidTagCombination;
function invalidTagCombination(newVersion, oldVersion, callback) {
  // What should be the minimum value of count to be a valid tag combination.
  var MIN_COUNT = 1;

  if (!newVersion) return callback(null, false);

  csv.parse(fs.readFileSync(path.join(__dirname, 'tag-combinations.csv')), function (error, rows) {
    var tags = Object.keys(newVersion.properties);

    for (var i = 0; i < tags.length; i++) {
      for (var j = 0; j < tags.length; j++) {
        if (i === j) continue;

        var tag = tags[i];
        var anotherTag = tags[j];

        var rowIndex = rows[0].indexOf(tag);
        var columnIndex = rows[0].indexOf(anotherTag);
        if (rowIndex === -1 || columnIndex === -1) continue;

        var count = parseFloat(rows[rowIndex][columnIndex]);

        if (isNaN(count) || (count < MIN_COUNT)) return callback(null, {'result:invalid_tag_combination': true});
      }
    }
    return callback(null, false);
  });
}
