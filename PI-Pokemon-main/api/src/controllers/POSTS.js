const axios = require('axios');
const PATH = 'https://pokeapi.co/api/v2';
const { Pokemon, Type } = require('../db')

async function createPokemon(req, res) {
    const { name, height, weight, healt, attack, speed, defense, types } = req.body;
    try {
        const newPoke = await Pokemon.create({ name, height, weight, healt, attack, speed, defense, types });
        const t = await Type.findAll({ where: { name: type } });
        await newPoke.addType(t);
        res.json(newPoke);
    } catch (e) {
        res.send(e);
    };
}

module.exports = { createPokemon };