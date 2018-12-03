import React from 'react';
import worm from '../../assets/images/bookworm.png';
import menu from '../../assets/images/menu.png';
import magnifier from '../../assets/images/magnifier.png';
import './header.css';
import {Link} from 'react-router-dom';
import HamburgerButton from './hamburger-button'


export default (props) => {
    return (
        <div className='header-container'>
            <nav className='navbar'>
                <div className='nav-header row d-flex align-items-center'>
                    <div className='nav-hamburger-button'>
                        <HamburgerButton click={props.hamburgerClick}/>
                    </div>
                    <div className='nav-logo col-2'>
                        <img className='worm' src={worm}/>
                    </div>
                    <div className='nav-title col-6'>
                        <span className='navbar-text'>Book Worms</span>
                    </div>
                    <div className="nav-search">
                        <Link to='/search-group'>
                            <img src={magnifier} className="search-icon"></img>
                        </Link>
                    </div>
                    <div className="nav-links">
                        <ul>
                            <li>
                                <Link to='/home'>HOME</Link>
                            </li>
                            <li>
                                <Link to='/search-group'>SEARCH</Link>
                            </li>
                            <li>
                                <Link to='/create-group'>CREATE</Link>
                            </li>
                            <li>
                                <Link to='/profile'>PROFILE</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>  
    </div>
    )
}

