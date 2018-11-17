import React from 'react';
import {Link} from 'react-router-dom';

export default ()=>{
    return(
        <div>
            <h1>This is the hamburger menu</h1>
            <div className='hamburger-home'>
                <Link to='/home' className='btn blue confirm'>Home</Link>
            </div>
            <div className='hamburger-profile'>
                <Link to='/profile' className='btn blue confirm'>Profile</Link>
            </div>
            <div className='hamburger-search'>
                <Link to='/search' className='btn blue confirm'>Search</Link>
            </div>
            <div className='hamburger-create'>
                <Link to='/create' className='btn blue confirm'>Create</Link>
            </div>
            <div className='hamburger-created'>
                <Link to='/created-group' className='btn blue confirm'>Created Groups</Link>
            </div>
            <div className='hamburger-landing'>
                <Link to='/' className='btn blue confirm'><button className='btn blue logout'>Log Out</button></Link>
            </div>  
        </div>
    )
}