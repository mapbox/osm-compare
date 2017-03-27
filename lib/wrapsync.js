'use strict';

/**
* Converts a synchronous comparator function into an async one to have consistent interface
* @param {Function} comparator - synchronous function which returns value or throws error
* @returns {Function} A Node style asynchronous function that accepts a callback
*/
var wrapSync = function(comparator) {
  return function(newVersion, oldVersion, callback) {
    try {
      var result = comparator(newVersion, oldVersion);
      return callback(null, result);
    } catch (err) {
      return callback(err);
    }
  };
};

module.exports = wrapSync;
