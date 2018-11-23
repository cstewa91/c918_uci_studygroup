import React from 'react'
import { Link } from 'react-router-dom';
import './profile.css';
import Header from '../general/header'

export default () => {
    return (
        <div className='profile'>
            <Header />
            <h1>Profile</h1>
            <Link to='/home-joined' className='btn blue confirm'>Confirm</Link>
            <Link to='/hamburger' className='btn blue'>Hamburger</Link>
        </div>
    )
}
