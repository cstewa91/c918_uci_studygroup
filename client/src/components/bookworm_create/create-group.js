import React from 'react';
import { Link } from 'react-router-dom';
import './create-group.css';
import Header from '../bookworm-general/header'

export default () => {
   return (
      <div>
         <Header/>
         <h1 className="moreCss">Create Group Page</h1>
         <Link to="/hamburger">Hamburger</Link>
         <Link className="float" to="/home">X</Link>
         <div className="moreCss">info goes here</div>
         <Link to="/home"><button className="float-center">Create Group</button></Link>
      </div>
   )
}