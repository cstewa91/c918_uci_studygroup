import React from 'react'
import {Link} from 'react-router-dom';
import './profile.css';

export default ()=>{
    return(
        <div className='profile'>
            <h1>Profile</h1>
            <Link to='/home-joined' className='btn blue confirm'>Confirm</Link>
            <Link to='/hamburger' className='btn blue'>Hamburger</Link>
        </div>
    )
}
