import React from 'react';
import { Link } from 'react-router-dom';
import './create-group.css';
import Header from '../general/header'

export default () => {
   return (
      <div>
         <Header />
         <h1>Create Group Page</h1>
         <Link to="/hamburger">Hamburger</Link>
         <Link to="/home">X</Link>
         <div>info goes here</div>
         <Link to="/home"><button>Create Group</button></Link>
      </div>
   )
}