import React from 'react'
import {Link} from 'react-router-dom';
import './profile.css';
import Header from '../bookworm-general/header';

export default ()=>{
    return(
        <div className='profile'>
            <Header/>
            <main className='main-content'>
                <div className='container'>
                    <div className='main-section'>
                        <div className='profile'>Profile</div>
                        <div className='user-info'>
                            <div className='username'>
                                <div className='username-title'></div>
                            </div>
                            <div className='user-input'>
                                <input className='username-field' type='text' placeholder='Username'/>
                            </div>
                        </div>
                        <div className="error-list">
                            <span className="glyphicon glyphicon-check text-danger">Username must be ----</span>
                        </div>
                    </div>
                </div>
            </main>
            <footer>
                <div className='confirm'>
                <Link to='/home-joined' className='confirm'>
                    <button type="button" className="btn blue">Confirm</button>
                </Link>
                </div>
            </footer>
            
        </div>
    )
}
