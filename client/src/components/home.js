import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/app.css';

export default () => {
   return (
      <div>
         <h1 className="home">Home Page</h1>
         <Link to="/hamburger">Hamburger</Link>
         <Link to="/search-group"><button className="float">Search</button></Link>
         <div className="moreCss">Joined</div>
         <div className="moreCss">Created</div>
         <Link to="/create-group"><button className="float">Create a group</button></Link>
         <Link to="/selected-group"><div className="moreCss">Awesome Group</div></Link>
      </div>
   )
}