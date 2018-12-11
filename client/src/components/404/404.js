import React from 'react';
import {Link} from 'react-router-dom';
import worm from '../../assets/images/bookworm.png';
import home from '../../assets/images/home.png';
import './404.css';

export default props => {
    return (
        <div className="login-background container-fluid not-found-page">
            <div className="login-padding">
                <img src={worm} className="worm-image" />
                <h1 className="login-title">Book Worms</h1>
            </div>
                <div>
                <h1 className="not-found">404 Not Found</h1>
                <Link className="transparent-btn" to="/home">
                  <img src={home}/> Home
                </Link>
            </div>
        </div>
    )
}
