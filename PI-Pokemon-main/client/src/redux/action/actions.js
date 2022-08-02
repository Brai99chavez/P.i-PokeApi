import axios from 'axios';
const POST_NEW_POKEMON = 'POST_NEW_POKEMON';
const GET_ALL_POKEMONS = 'GET_ALL_POKEMONS';
const GET_ALL_TYPES = 'GET_ALL_TYPES';
const GET_POKEMON_BY_NAME = 'GET_POKEMON_BY_NAME';
const GET_POKEMON_BY_ID = 'GET_POKEMON_BY_ID';
const GET_SORTED_POKEMONS = 'GET_SORTED_POKEMONS';
const LOADING = 'LOADING';



export const getAllPokemons = () => {
    return async function(dispatch) {
        dispatch({ type: LOADING })
        await axios.get('http://localhost:3001/pokemons')
            .then(response => response.data)
            .then(data => dispatch({ type: GET_ALL_POKEMONS, payload: data }))
    }
}

export const getAllTypes = () => {
    return async function(dispatch) {
        dispatch({ type: LOADING })
        await axios.get('http://localhost:3001/types')
            .then(response => response.data)
            .then(data => dispatch({ type: GET_ALL_TYPES, payload: data }))
    }
}

export const getPokemonById = (id) => {

    return async function(dispatch) {
        dispatch({ type: LOADING })
        await axios.get(`http://localhost:3001/pokemons/${id}`)
            .then(response => response.data)
            .then(data => dispatch({ type: GET_POKEMON_BY_ID, payload: data }))
    }

}

export const getPokemonByName = (name) => {
    let n = name.toLowerCase();
    return async function(dispatch) {
        dispatch({ type: LOADING })
        await axios.get(`http://localhost:3001/pokemons?name=${n}`)
            .then(response => response.data)
            .then(data => dispatch({ type: GET_POKEMON_BY_NAME, payload: data }))
    }
}

export const getSortedPokemon = (sorted) => {
    return { type: GET_SORTED_POKEMONS, payload: sorted }
}

export const loading = () => {
    return { type: LOADING }
}

export const postNewPokemon = (data) => {
    return async function(dispatch) {
        dispatch({ type: LOADING })
        let poke = {
            "name": data.name,
            "height": data.height,
            "weight": data.weight,
            "healt": data.hp,
            "attack": data.attack,
            "speed": data.speed,
            "defense": data.defense,
            "types": data.types
        }
        console.log(poke.type)
        await axios.post('http://localhost:3001/pokemons', poke)

        .then(function(response) {
                dispatch(dispatch({ type: POST_NEW_POKEMON, payload: data }))
                console.log(response);
            })
            .catch(function(error) {
                console.log(error);
            });
    }

}