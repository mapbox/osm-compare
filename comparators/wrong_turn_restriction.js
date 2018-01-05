'use strict';

module.exports = wrongTurnRestriction;

/**
* Checks for existence of name tag and if it is modified between old and new version, it callbacks with the result.
* @param {object} newVersion Features new version in GeoJSON.
* @param {object} oldVersion Features old version in GeoJSON.
* @returns {bool} Boolean indicating a turn restriction.
*/

function via_in_ways(via, ways) {
  return ways.filter(function(e) {
    return JSON.stringify(via.geometry.coordinates) !==
      JSON.stringify(e.geometry.coordinates[0]) &&
      JSON.stringify(via.geometry.coordinates) !==
        JSON.stringify(
          e.geometry.coordinates[e.geometry.coordinates.length - 1]
        );
  }).length > 0;
}

function wrongTurnRestriction(newVersion, oldVersion) {
  if (
    newVersion &&
    newVersion.properties &&
    newVersion.properties.hasOwnProperty('restriction') &&
    newVersion.properties.relations
  ) {
    var roles = newVersion.properties.relations.map(function(e) {
      return e.properties.role;
    });
    // a turn restriction needs at least 3 members
    if (roles.length < 3) {
      return {'result:wrong_turn_restriction': true};
    }
    // detect members with wrong roles
    if (
      roles.filter(function(e) {
        return ['from', 'via', 'to', 'location_hint'].indexOf(e) === -1;
      }).length > 0
    ) {
      return {'result:wrong_turn_restriction': true};
    }
    // only no_entry restrictions can have more than one FROM way
    if (
      roles.filter(function(e) {
        return e === 'from';
      }).length > 1 && newVersion.properties.restriction !== 'no_entry'
    ) {
      return {'result:wrong_turn_restriction': true};
    }
    // only no_exit restrictions can have more than one TO way
    if (
      roles.filter(function(e) {
        return e === 'to';
      }).length > 1 && newVersion.properties.restriction !== 'no_exit'
    ) {
      return {'result:wrong_turn_restriction': true};
    }
    // a turn restriction can have only one VIA node
    var via_nodes = newVersion.properties.relations.filter(function(e) {
      return e.properties.role === 'via' && e.properties.type === 'node';
    });
    if (via_nodes.length > 1) {
      return {'result:wrong_turn_restriction': true};
    }
    // check if the VIA node is present in the FROM and TWO ways
    var via = via_nodes[0];
    var ways = newVersion.properties.relations.filter(function(e) {
      return e.properties.type === 'way';
    });
    if (
      via && via.geometry && via.geometry.coordinates && via_in_ways(via, ways)
    ) {
      return {'result:wrong_turn_restriction': true};
    }
  }
  return false;
}
