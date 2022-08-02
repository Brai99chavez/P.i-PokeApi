import React from 'react'
import load from '../../img/loading_gift.gif'
import './loading.css'

export default function Loading() {
    return (
        <img className='loading' src={load} alt="loading_gift" />
    )
}
