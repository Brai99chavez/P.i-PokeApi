const { Router } = require('express');

const { createPokemon } = require('../controllers/POSTS')
const { get_All_Pokemons_or_By_Name, getPokemonsById } = require('../controllers/GETS')

const router = Router();

router.get('', get_All_Pokemons_or_By_Name);

router.get('/:id', getPokemonsById);

router.post('', createPokemon);

module.exports = router;