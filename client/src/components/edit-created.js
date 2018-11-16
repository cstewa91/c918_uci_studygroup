import React from 'react';
import {Link} from 'react-router-dom';

export default () => {
    return(
        <div className="edit-created">
            <Link to='/home_created' className='btn blue'>Update</Link>
            <Link to='/hamburger' className='btn blue'>Hamburger</Link>
        </div>
    )
}