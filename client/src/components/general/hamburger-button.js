import React from 'react';
import './hamburger-button.css';

export default props => {
    return(
    <button className='hamburger-button' onClick={props.click}>
        <div className="button-line"></div>
        <div className="button-line"></div>
        <div className="button-line"></div>
    </button>
    )
}
