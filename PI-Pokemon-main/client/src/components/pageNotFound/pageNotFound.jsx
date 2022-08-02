import React from 'react'
import './pageNotFound.css'
import notFound from '../../img/notFound.png'
import { Link } from 'react-router-dom'

export default function PageNotFound() {
    return (
        <div >
            <Link to= {`/home`}>
                <img className='pageNotFound' src={notFound} alt="not found" />
            </Link>
        </div>
    )
}
