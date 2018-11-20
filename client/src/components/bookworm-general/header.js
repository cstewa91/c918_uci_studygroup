import React from 'react'
import worm from '../images/bookworm.png'

export default ()=>{
    return(
        <div className='header-container'>
            <div className='page-header'>
                <div className='hamburger-menu'>   
                    <div className='hamburger-box'></div>   
                    <div className='hamburger-box'></div>   
                    <div className='hamburger-box'></div>        
                </div>
                <div className='logo'>
                    <img className='' src={worm}/>
                </div>
                <div className='header-title'>
                    <span>Book Worms</span>
                </div>
            </div>
        </div>  
    )
}