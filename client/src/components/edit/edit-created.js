import React from 'react';
import { Link } from 'react-router-dom';
import './edit-created.css';
import Header from '../general/header'

export default () => {
    return (
        <div className="edit-created">
            <Header />
            <h1>Edit Group</h1>
            <Link to='/home_created' className='btn blue'>Update</Link>
            <Link to='/hamburger' className='btn blue'>Hamburger</Link>
            <Link to='/home'>X</Link>
        </div>
    )
}