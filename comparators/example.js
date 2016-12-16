'use strict';

module.exports = example;

function example(newVersion, oldVersion, callback) {
  callback(null, {
    'result:example': {}
  });
}
