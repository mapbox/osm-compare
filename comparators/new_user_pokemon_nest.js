'use strict';

const newUser = require('./new_user');
const pokemonNest = require('../lib/pokemon_nest');

const newUserPokemonNest = (newVersion, oldVersion) => {
  if (!newVersion || !newVersion.properties) {
    return false;
  }

  if (newUser(newVersion, oldVersion) && pokemonNest(newVersion, oldVersion)) {
    return {'result:new_user_pokemon_nest': true};
  }
  return false;
};

module.exports = newUserPokemonNest;
