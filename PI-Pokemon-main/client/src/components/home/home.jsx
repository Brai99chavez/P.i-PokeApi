import React, {useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Card from '../card/card.jsx';
import './home.css'
import { getAllPokemons, getAllTypes, getSortedPokemon } from '../../redux/action/actions.js';
import Loading from '../loading/loading';
import SearchBar from '../searchBar/searchBar';


export default function Home() {
    const [state, setState] = useState({
        currentPage:0,
        typeFilter: 'none',
        apiOrDbFilter: 'none', 
        order: 'none',
        change: false,
    })
    const dispatch = useDispatch();
    
    useEffect ( () => {
        dispatch(getAllPokemons());
        dispatch(getAllTypes())
        
    },[dispatch])
    
    const {pokemons,loading,types} =  useSelector(state => state);
    //---------------------------------------------------------------------
    
    function onChange(e) {
        setState({...state,[e.target.name]: e.target.value })
    }
    //filter and sort-------------------------------------------------------------
    let filtered = pokemons;
    if (state.typeFilter !== 'none') {
        filtered = (pokemons.filter(p =>
            ((typeof p.types !== 'string' ? (p.types.filter(t => (
                t === state.typeFilter
            )).length):(p.types.split(',').filter(t => (
                t === state.typeFilter
            )).length)) > 0)
        ))
    }
    if (state.apiOrDbFilter !== 'none') {
        if (state.apiOrDbFilter === 'existing') {
            filtered = filtered.filter(p => typeof p.id !== 'string' )
        }else{
            if (state.currentPage !== 0) {
                setState({...state,currentPage: 0})
            }
            filtered = filtered.filter(p => typeof p.id === 'string' )
        }
    }
    const sortByName = (e) => {
        setState({...state,order:e.target.value});
        let aux = pokemons
        if (e.target.value !== 'none') {
            dispatch(getSortedPokemon(e.target.value));
        }else if (e.target.value === 'none'){
            dispatch(getAllPokemons());
        }
    };
    // pagination----------------------------------------------------------------
    let paginado = filtered.slice(state.currentPage,state.currentPage + 12)
    function nextPage() {
        if (state.currentPage < filtered.length-12) {
            setState({...state,currentPage: state.currentPage + 12})
        }
    }
    function prevPage() {
        if (state.currentPage < filtered.length && state.currentPage > 0) {
            setState({...state,currentPage: state.currentPage - 12})
        }
    }


    if (loading) {
        return <Loading/>
    }   
    //currentPokemons = currentPokemons.slice(state.currentPage,state.currentPage + 12);
     //---------------------------------------------------------------------
    return (        
    <div >
        <div className='filters-container'>
            <div className='filters'>
                <SearchBar />
                <select name="apiOrDbFilter" onChange={e => onChange(e)}>
                    <option value="none">api or db:</option>
                    <option value="existing">existing</option>
                    <option value="created">created</option>
                </select>
                <select name="typeFilter" onChange={e => onChange(e)}>
                    <option value="none">choose type:</option>
                    {types && types.map(type => <option key={type.id} value={type.name}>{type.name}</option>)}
                </select>
                <select name="order" onChange={e => {sortByName(e)}}>
                    <option value="none" >order:</option>
                    <option value="a-z">a-z</option>
                    <option value="z-a">z-a</option>
                    <option value="atk-asc">attack Asc</option>
                    <option value="atk-des">attack Des</option>
                </select>
            </div>
        </div>
        <div className="cards-container">
        {paginado.map((pokemon) => (
            <Card
                id= {pokemon.id}
                key={pokemon.id}
                img={pokemon.img}
                name= {pokemon.name}
                type= {typeof pokemon.types !== 'string' ? pokemon.types : pokemon.types.split(',')}
                />
        ))}
        </div>
        <div className='pagination'>
            <button type="submit" onClick={prevPage}> prev </button>
            &nbsp;
            <button type="submit" onClick={nextPage}> next </button>
        </div>
    </div>
    )
}


