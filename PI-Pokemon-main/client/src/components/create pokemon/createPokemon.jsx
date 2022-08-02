import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getAllPokemons, getAllTypes, postNewPokemon } from '../../redux/action/actions';
import Loading from '../loading/loading';
import './createPokemon.css'

export default function CreatePokemon() {
    const [state, setState] = useState({
        name: '',
        hp:1,
        attack:1,
        defense:1,
        speed:1,
        type_1: '',
        type_2: '',
        height: 1,
        weight: 1,
        change: false,
    })
    const [errors, setErrors] = useState({})

    let dispatch = useDispatch();

    useEffect (() => {
        dispatch(getAllPokemons())
        dispatch(getAllTypes())
    },[dispatch])

    const {pokemons,types,loading} =  useSelector(state => state);
    const history = useHistory();
    const expRegNombre=/^[a-zA-ZÑñÁáÉéÍíÓóÚúÜü\s]+$/;
    console.log(pokemons)
    function validate(state) {

        let errors = {}

        if (state.type_1 === '' && state.type_2 === '') {
            errors.error_null='the minimum types required is 1'
        }
        if ( (state.type_1 !== '' && state.type_2 !== '') && state.type_1 === state.type_2 ) {
            errors.error_duplicate ='you cant repeat a type'
        }
        if (state.name === '' ) {
            errors.error_name = 'pokemon name is required';
        }
        
        let exist = pokemons.filter(p => p.name === state.name)
        if (exist.length > 0) {
            errors.error_existing_name= 'Name already exist ' ;
        }
        if (state.name !== '' && !expRegNombre.exec(state.name)) {
            errors.error_name = 'pokemon name is invalid';
        }

        if (1 > state.hp  || state.hp > 255 ) {
            errors.error_hp ='insert a value between 1-255';
        }
        if (state.attack < 1 || state.attack > 255) {
            errors.error_attack ='insert a value between 1-255';
        }
        if (state.defense < 1 || state.defense > 255) {
            errors.error_defense ='insert a value between 1-255';
        }
        if (state.speed < 1 || state.speed > 255) {
            errors.error_speed ='insert a value between 1-255';
        }
        if (state.weight < 1 || state.weight > 255) {
            errors.error_weight ='insert a value between 1-255';
        }
        if (state.height < 1 || state.height > 255) {
            errors.error_height ='insert a value between 1-255';
        }
        
        return errors;
    }
    // primera interaccion


    function onChange(e) {
        setState({...state,[e.target.name]:e.target.value,change:true});
        setErrors(validate({...state,[e.target.name]:e.target.value}));
    }

    function onSubmit(e) {
        e.preventDefault();
        if (Object.keys(errors).length === 0 && state.change) {
            let pokeNew = {
                "name": state.name,
                "height": state.height,
                "weight": state.weight,
                "attack": state.attack,
                "defense": state.defense,
                "hp": state.hp,
                "speed": state.speed,
                "types": ''
            }
            if (state.type_1 && state.type_2) {
                pokeNew.types =`${state.type_1},${state.type_2}`;
            }else if (state.type_1){
                pokeNew.types= state.type_1;
            }else if (state.type_2){
                pokeNew.types= state.type_2;
            }   
                dispatch(postNewPokemon(pokeNew))
                history.push(`/home`);
                dispatch(getAllPokemons());
        }
    }

    if (loading) {
        return <Loading/>
    }

    return (
        <div className='create-container'>
            <form action="" className='create-form' onSubmit={e => onSubmit(e)}>
                <h3 className='create-title'>Crear Pokemon</h3>
                <div className='create-all-inputs'>
                    <div className='create-input'>
                        <label htmlFor="">name:</label>
                        <input value={state.name} name='name' type="text" onChange={(e)=> onChange(e)}/>
                    </div>
                    {errors.error_name && (<div className='show-error'><p>{errors.error_name}</p></div>)}
                    {errors.error_existing_name && (<div className='show-error'><p>{errors.error_existing_name}</p></div>)}
                    <div className='create-input'>
                        <p>height:</p>
                        <input type="number" name='height' value={state.height} onChange={(e)=> onChange(e)}/>
                    </div>
                    {errors.error_height && (<div className='show-error'><p>{errors.error_height}</p></div>)}

                    <div className='create-input'>
                        <p>weight:   </p>
                        <input type="number" name='weight' value={state.weight} onChange={(e)=> onChange(e)}/>
                    </div>
                    {errors.error_weight && (<div className='show-error'><p>{errors.error_weight}</p></div>)}

                    <div className='create-input'>
                        <p>hp:  </p>
                        <input type="number" name='hp' value={state.hp} onChange={(e)=> onChange(e)}/>
                    </div>
                    {errors.error_hp && (<div className='show-error'><p>{errors.error_hp}</p></div>)}

                    <div className='create-input'>
                        <p>attack:  </p>
                        <input type="number" name='attack' value={state.attack} onChange={(e)=> onChange(e)}/>
                    </div>
                    {errors.error_attack && (<div className='show-error'><p>{errors.error_attack}</p></div>)}

                    <div className='create-input'>
                        <p>speed: </p>
                        <input type="number" name='speed' value={state.speed}onChange={(e)=> onChange(e)}/>
                    </div>
                    {errors.error_speed && (<div className='show-error'><p>{errors.error_speed}</p></div>)}

                    <div className='create-input'>
                        <p>defense:   </p>
                        <input type="number" name='defense' value={state.defense} onChange={(e)=> onChange(e)}/>
                    </div>
                    {errors.error_defense && (<div className='show-error'><p>{errors.error_defense}</p></div>)}


                    <div className='create-input'>
                        <label htmlFor="">type 1:</label>
                        <select name='type_1' onChange={(e)=> onChange(e)}>
                            <option key='0' value=''>ninguno</option>
                            {types && types.map(t => (
                                <option key={t.id} value={t.name}>{t.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className='create-input'>
                        <label htmlFor="">type 2:</label>
                        <select name='type_2' onChange={(e)=> onChange(e)}>
                        <option key='0' value=''>ninguno</option>
                            {types && types.map(t => (
                                <option key={t.id} value={t.name}>{t.name}</option>
                            ))}
                        </select>
                    </div>
                    {errors.error_null && (<div className='show-error'><p>{errors.error_null}</p></div>)}
                    {errors.error_duplicate && (<div className='show-error'><p>{errors.error_duplicate}</p></div>)}
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}
