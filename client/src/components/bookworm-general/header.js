import React from 'react';
import worm from '../images/bookworm.png';
import menu from '../images/menu.png';
import magnifier from '../images/magnifier.png';
import './header.css';
import {Link} from 'react-router-dom';


export default ()=>{
    return(
        <div className='header-container'>
            <nav className='navbar'>
                <div className='nav-header row d-flex align-items-center'>
                    <div className='hamburger'>
                        <img className='burger-bar' src={menu}/>
                    </div>
                    <div className='nav-logo col-2'>
                        <img className='worm' src={worm}/>
                    </div>
                    <div className='nav-title col-7'>
                        <span className='navbar-text'>Book Worms</span>
                    </div>
                    <div className="nav-search">
                        <Link to='/search-group'>
                            <img src={magnifier} className="search-icon"></img>
                        </Link>
                        
                    </div>
                </div>
            </nav>  
        </div>
    )
}

