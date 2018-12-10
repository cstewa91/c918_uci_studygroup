import React from 'react';
import {Link} from 'react-router-dom';
import notfound from './notfound.png';
import './404.css';

export default props => {
    return (
        <div className="not-found">
            <div>
                <img className="not-found-img" src={notfound}/>
                <p>
                    <Link className="btn btn-light" to="/">
                        Home
                    </Link>
                </p>
            </div>
        </div>
    )
}
