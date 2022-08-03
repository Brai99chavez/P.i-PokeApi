const axios = require('axios');
const PATH = 'https://pokeapi.co/api/v2';
const { Pokemon, Type } = require('../db')
const { getAllPokes } = require('./GETS')



async function createPokemon(req, res) {
    const { name, height, weight, health, attack, speed, defense, spAttack, spDefense, types } = req.body;
    let pokes = await getAllPokes();
    try {
        if (pokes.filter(p => p.name === name).length === 0) {
            const newPoke = await Pokemon.create({ name, height, weight, health, attack, speed, defense, spAttack, spDefense });
            const t = await Type.findAll({ where: { name: types } });
            await newPoke.addType(t);
            res.json(newPoke)
        } else {
            throw new Error('pokemon ya existe');
        }

    } catch (e) {
        res.status(400).json(e.message);
    };
}

module.exports = { createPokemon };