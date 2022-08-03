const axios = require('axios');
const PATH = 'https://pokeapi.co/api/v2';
const { Pokemon, Type } = require('../db')

async function createPokemon(req, res) {
    const { name, height, weight, health, attack, speed, defense, spAttack, spDefense, types } = req.body;
    try {
        const newPoke = await Pokemon.create({ name, height, weight, health, attack, speed, defense, spAttack, spDefense });
        const t = await Type.findAll({ where: { name: types } });
        await newPoke.addType(t);
        res.json(newPoke);
    } catch (e) {
        res.status(400).send(e);
    };
}

module.exports = { createPokemon };