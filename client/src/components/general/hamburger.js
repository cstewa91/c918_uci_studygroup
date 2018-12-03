import React from 'react';
import { Link } from 'react-router-dom';
import './hamburger.css';

export default (props) => {
    let hamburgerClasses = 'hamburger-nav'

    if(props.show){
        hamburgerClasses = 'hamburger-nav open'
    }
    return (
        <nav className={hamburgerClasses}>
            <h1>This is the hamburger menu</h1>
            <ul>
                <li className='hamburger-home'>
                    <Link to='/home' className='btn blue confirm'>Home</Link>
                </li>
                <li className='hamburger-search'>
                    <Link to='/search-group' className='btn blue confirm'>Search</Link>
                </li>
                <li className='hamburger-create'>
                    <Link to='/create-group' className='btn blue confirm'>Create</Link>
                </li>
                <li className='hamburger-profile'>
                    <Link to='/profile' className='btn blue confirm'>Profile</Link>
                </li>  
            </ul>
            
        </nav>
            
        
    )
}