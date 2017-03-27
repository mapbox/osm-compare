'use strict';

/**
* Converts a synchronous comparator function into an async one to have consistent interface
* @param {Function} func - synchronous function which returns value or throws error
* @returns {Function} A Node style asynchronous function that accepts a callback
*/
var wrapSync = function(func) {
  return function(newVersion, oldVersion, callback) {
    try {
      var result = func(newVersion, oldVersion);
      return callback(null, result);
    } catch (err) {
      return callback(err);
    }
  };
};

module.exports = wrapSync;
