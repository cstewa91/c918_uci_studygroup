import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/app.css';

export default () => {
   return (
      <div>
         <h1 className="someCss">Login Page</h1>
         <h1 className="moreCss">BookWorms</h1>
         <h2 className="moreCss">Worm Photo</h2>
         <Link to="/home"><h2 className="loginCss">Login</h2></Link>
      </div>
   )
}