import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {getPokemonById} from '../../redux/action/actions'
import Loading from '../loading/loading';
import imgDefault from '../../img/default_img.gif'
import './detail.css'

export default function Detail({match}) {

    // me traigo imagenes
    function importAll(r) {
        let images = {};
        r.keys().map((item) => (images[item.replace('./', '')] = r(item)));
        return images;
    }
    const typeIcons = importAll(
        require.context('./icons-types', false, /.jpg/)
    );
    // -----------
    const dispatch = useDispatch();

    let id = match.params.id
    
    useEffect ( () => {
        dispatch(getPokemonById(id))
    },[dispatch,id])

    const poke = useSelector(state => state.detail[0]);
    const loading = useSelector(state => state.loading);
    if (loading) {
        return <Loading/>
    }
    console.log(poke)
    return (
        <React.Fragment>
            {poke &&
            <div className='detail-container'>
                <div className='detail'>
                    <div className="poke-details">
                        <h2>{ poke.name}</h2>
                        <div className='detail-image'>
                            <img src={typeof  poke.id !== 'string' ?  poke.img :  imgDefault} alt="" />
                        </div>
                        <br />
                        <div className="detail-type-icon">
                            { (typeof poke.types === 'string' ? poke.types.split(',') : poke.types).map((t,i) => 
                                        <img
                                            key={i}
                                            className='detail-type-icon'
                                            src={typeIcons[`${t}.jpg`].default}
                                            alt="type"
                                            height="30px"
                            />)}
                        </div>
                    </div>
                    <div className='poke-stats'>
                        <h2>Stats</h2>
                        <div className='poke-stat'>
                            <p>hp:</p> <p> {poke.health  }</p>
                        </div>
                        <div className='poke-stat'>
                            <p>attack:</p> <p> {poke.attack}</p>
                        </div>
                        <div className='poke-stat'>
                            <p>defense:</p> <p> {poke.defense}</p>
                        </div>
                        <div className='poke-stat'>
                            <p>speed:</p> <p> {poke.speed}</p>
                        </div>
                    </div>
                </div>
            </div>}
        </React.Fragment>

    )
}

