'use strict';
const newUser = require('./new-user');
const pokemonNest = require('../lib/pokemon-nest');
const isNewUser = (n, o) => newUser(n, o, {maxChangesets: 20});

const newUserPokemonNest = (newVersion, oldVersion) => {
  if (!newVersion || !newVersion.properties) {
    return false;
  }
  if (
    isNewUser(newVersion, oldVersion) && pokemonNest(newVersion, oldVersion)
  ) {
    return {'result:new_user_pokemon_nest': true};
  }
  return false;
};

module.exports = newUserPokemonNest;
