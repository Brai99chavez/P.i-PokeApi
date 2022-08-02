import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import img from './pokemon-logo.jpg'
import './navbar.css'

export default class navbar extends Component {
    render() {
        return (
            <nav className="navbar">
                <Link to='/'><img src={img} alt="pokemon" /></Link>
                <div className='btns'>
                    <Link className="btn" to='/home'>Home</Link>
                    <Link className="btn" to='/create'>Create</Link>
                </div>
                
            </nav>
        )
    }
}
