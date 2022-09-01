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
        await axios.get('/pokemons')
            .then(response => response.data)
            .then(data => dispatch({ type: GET_ALL_POKEMONS, payload: data }))
    }
}

export const getAllTypes = () => {
    return async function(dispatch) {
        dispatch({ type: LOADING })
        await axios.get('/types')
            .then(response => response.data)
            .then(data => dispatch({ type: GET_ALL_TYPES, payload: data }))
    }
}

export const getPokemonById = (id) => {
    return async function(dispatch) {
        dispatch({ type: LOADING })
        await axios.get(`/pokemons/${id}`)
            .then(response => response.data)
            .then(data => dispatch({ type: GET_POKEMON_BY_ID, payload: data }))
    }
}

export const getPokemonByName = (name) => {
    let n = name.toLowerCase();
    return function(dispatch) {
        dispatch({ type: LOADING })
        let a = new Promise((resolve, reject) => {
            resolve(axios.get(`/pokemons?name=${n}`))
        })
        dispatch({ type: GET_POKEMON_BY_NAME, payload: a.data })
    }
}




export const getSortedPokemon = (sorted) => {
    return { type: GET_SORTED_POKEMONS, payload: sorted }
}

export const postNewPokemon = (data) => {
    return async function(dispatch) {
        dispatch({ type: LOADING })
        await axios.post('/pokemons', data)
            .then(function(response) {
                dispatch(dispatch({ type: POST_NEW_POKEMON, payload: data }))
                console.log(response);
            })
            .catch(function(error) {
                console.log(error);
            });
    }

}