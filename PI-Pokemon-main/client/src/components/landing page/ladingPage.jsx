import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import "./landingPage.css"

export default class ladingPage extends Component {
    render(){
        return(
            <React.Fragment>
                <div className='title-container'>
                    <h1 className='title'>⛩PikAPi⛩</h1>
                    <br />
                    <Link to="/home" className='join'> Join to Pokedex</Link>
                </div>
                
            </React.Fragment>
        )
    }
}
