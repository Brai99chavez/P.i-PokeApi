import React, {  useState } from 'react'
import "./searchBar.css"
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux';


export default function SearchBar() {
    const [state, setState] = useState({
        name: '',
        error:'',
    })


    const history = useHistory();
    const {pokemons} =  useSelector(state => state);

    function onChange(e) {
        setState({...state,name:e.target.value,error:''})
    }

    function onSubmit(e) {
        e.preventDefault();
        if (state.name === '') {
            setState({...state,error:'Name is required'})
        }else {
            let encountered = pokemons.filter(p => p.name === state.name)
            if (encountered[0]) {
                history.push(`/detail/${encountered[0].id}`)
            }else{
                setState({...state,error:'Pokemon not found'})
            }
        }
    }

    return(
        <React.Fragment>
                <form className='search-form' onSubmit={onSubmit}>
                    <input name='name' className='search-input' value={state.name} type="text"  placeholder='Search a pokemon...'  onChange={(e)=> onChange(e)}/>
                    <button type='submit'  className='search-button'>
                            <i className="fa-solid fa-magnifying-glass fa-2xl"></i>
                    </button>
                        {state.error && (<div className='search-warning'><p> {state.error}</p></div>)}
                </form>
        </React.Fragment>
    )
}
