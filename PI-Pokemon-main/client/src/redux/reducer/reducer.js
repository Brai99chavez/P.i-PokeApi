const initialState = {
    pokemons: [],
    types: [],
    detail: [],
    founded: [],
    loading: false,
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_ALL_POKEMONS':
            return {
                ...state,
                pokemons: action.payload,
                loading: false
            }
        case 'GET_ALL_TYPES':
            return {
                ...state,
                types: action.payload,
            }
        case 'GET_POKEMON_BY_NAME':
            return {
                ...state,
                founded: action.payload,
                loading: false
            }
        case 'GET_POKEMON_BY_ID':
            return {
                ...state,
                detail: action.payload,
                loading: false
            }
        case 'LOADING':
            return {
                ...state,
                loading: true
            }
        case 'POST_NEW_POKEMON':
            return {
                ...state,
                loading: false
            }
        case 'GET_SORTED_POKEMONS':
            const sort = (action.payload === "a-z") ?
                state.pokemons.sort((function(a, b) {
                    if (a.name > b.name) return 1
                    if (b.name > a.name) return -1;
                    return 0;
                })) :
                (action.payload === "z-a") ?
                state.pokemons.sort(function(a, b) {
                    if (a.name > b.name) return -1;
                    if (b.name > a.name) return 1;
                    return 0
                }) : (action.payload === "atk-asc") ?
                state.pokemons.sort(function(a, b) { return a.attack - b.attack; }) :
                state.pokemons.sort(function(a, b) { return b.attack - a.attack; })
            return {
                ...state,
                pokemons: sort,
                loading: false
            }
        default:
            return state;
    }
};


export default rootReducer;