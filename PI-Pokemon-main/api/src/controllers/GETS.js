const axios = require('axios');
const { response } = require('express');
const e = require('express');
const PATH = 'https://pokeapi.co/api/v2';
const { Pokemon, Type } = require('../db')

async function getInfo(pokemon) {
    let obj = {};
    await axios.get(pokemon.url)
        .then(p => {
            obj.id = p.data.id;
            obj.name = p.data.name;
            obj.types = p.data.types.length > 1 ? [p.data.types[0].type.name, p.data.types[1].type.name] : [p.data.types[0].type.name];
            obj.health = p.data.stats[0].base_stat;
            obj.attack = p.data.stats[1].base_stat;
            obj.defense = p.data.stats[2].base_stat;
            obj.speed = p.data.stats[3].base_stat;
            obj.height = p.data.height;
            obj.weight = p.data.weight;
            obj.img = p.data.sprites.other.dream_world.front_default
        })

    return obj
}

async function getAllPokes() {
    let pokemons_1 = await axios.get(`${PATH}/pokemon`);
    let pokemons_2 = await axios.get(pokemons_1.data.next);
    let pokemons_db = await Pokemon.findAll();
    let pokemonsApi = pokemons_1.data.results.concat(pokemons_2.data.results)
    pokemonsApi = await Promise.all(pokemonsApi.map(p => getInfo(p)));
    return (pokemonsApi).concat(pokemons_db)
}



async function getTypes(req, res) {
    let tipos = await Type.findAll();
    try {
        if (tipos.length > 0) {
            return res.json(tipos)
        } else {
            const API = await axios.get(`${PATH}/type`)
            tipos = await Promise.all(
                API.data.results.map(type => {
                    return Type.create({ name: type.name });
                })
            )
            res.json(tipos)
        }
    } catch (error) {
        console.log(error)
    }
}

async function get_All_Pokemons_or_By_Name(req, res) {
    try {
        let { name } = req.query
        let pokemons = await getAllPokes();
        if (name) {
            answer = await Promise.all(pokemons.filter(p => p.name == name))
            res.json(answer)
        } else {
            res.json(pokemons);
        }
    } catch (error) {
        res.send(error);
    }
}

async function getPokemonsById(req, res) {
    try {
        let { id } = req.params
        let allPokes = await getAllPokes()
        let answer = allPokes.filter(p => p.id == id);
        res.json(answer)
    } catch (error) {
        res.send(error);
    }
}


module.exports = { getTypes, get_All_Pokemons_or_By_Name, getPokemonsById };