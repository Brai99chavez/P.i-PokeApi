import React from 'react'
import { Link } from 'react-router-dom';
import imgDefault from '../../img/default_img.gif'
import'./card.css';

function importAll(r) {
        let images = {};
        r.keys().map((item) => (images[item.replace('./', '')] = r(item)));
        return images;
}
const typeIcons = importAll(
    require.context('./icons-types', false, /.jpg/)
);

export default function Card({id,img,name,type}) {
    return (
        <Link to= {`/detail/${id}`} className="card">
            <header>
                <h2>{name}</h2>
            </header>    
            <img className='poke-img' src={img ? img : imgDefault} alt={name}/>
            <div className="content">
                <div className='card-footer'>
                    <div className="pokemon-id">
                            #{typeof id === 'string' ? 'UUID' : id}
                        </div>
                        <div className="pokemon-types">
                        {(typeof type !== 'string')? type.map((t,i) => {
                            
                            return (
                                <img
                                key={i}
                                className='type-icon'
                                src={typeIcons[`${t}.jpg`].default }
                                alt="type"
                                height="30px"
                                />
                            )
                        } 
                        ): type.split(',').map((t,i) => {
                            
                            return (
                                <img
                                key={i}
                                className='type-icon'
                                src={typeIcons[`${t}.jpg`].default }
                                alt="type"
                                height="30px"
                                />
                            )
                        } 
                        )}
                    </div>  
                </div>
            </div>
        </Link>
    )
}

